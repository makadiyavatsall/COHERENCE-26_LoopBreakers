const express = require('express');
const multer = require('multer');
const path = require('path');
const EntryPatient = require('../models/EntryPatient');

const router = express.Router();

// Multer config for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

// ───────────────────────────────────────────────
// POST /api/entry-patient  — Insert entry patient
// ───────────────────────────────────────────────
router.post('/', upload.single('pdf'), async (req, res) => {
  try {
    const { patient_id, score, detail, trial_id, status } = req.body;

    if (!patient_id || score === undefined || !trial_id) {
      return res.status(400).json({
        success: false,
        message: 'patient_id, score, and trial_id are required',
      });
    }

    const entry = new EntryPatient({
      patient_id,
      score: Number(score),
      detail: detail || '',
      trial_id,
      pdfFilePath: req.file ? req.file.path : '',
      status: status || 'pending',
    });

    const saved = await entry.save();

    res.status(201).json({
      success: true,
      message: 'Entry patient saved successfully',
      data: saved,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Error saving entry patient:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ───────────────────────────────────────────────
// GET /api/entry-patient  — Get all entries
// ───────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const entries = await EntryPatient.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: entries.length, data: entries });
  } catch (error) {
    console.error('Error fetching entries:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ───────────────────────────────────────────────
// GET /api/entry-patient/trial/:trial_id  — Get entries by trial ID (with patient name)
// ───────────────────────────────────────────────
router.get('/trial/:trial_id', async (req, res) => {
  try {
    const entries = await EntryPatient.find({ trial_id: req.params.trial_id }).sort({ score: -1 });

    // Lookup patient names from Users collection
    const User = require('../models/User');
    const enriched = await Promise.all(
      entries.map(async (entry) => {
        const obj = entry.toObject();
        // Try finding by patient_id field first, then by _id
        const user = await User.findOne({ patient_id: entry.patient_id }) || await User.findById(entry.patient_id).catch(() => null);
        obj.patientName = user ? user.name : 'Unknown';
        return obj;
      })
    );

    res.status(200).json({ success: true, count: enriched.length, data: enriched });
  } catch (error) {
    console.error('Error fetching entries by trial:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ───────────────────────────────────────────────
// PATCH /api/entry-patient/:id/accept  — Accept patient
// ───────────────────────────────────────────────
router.patch('/:id/accept', async (req, res) => {
  try {
    const entry = await EntryPatient.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Entry not found' });
    }
    res.status(200).json({ success: true, message: 'Patient accepted', data: entry });
  } catch (error) {
    console.error('Error accepting patient:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ───────────────────────────────────────────────
// PATCH /api/entry-patient/:id/reject  — Reject patient
// ───────────────────────────────────────────────
router.patch('/:id/reject', async (req, res) => {
  try {
    const entry = await EntryPatient.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Entry not found' });
    }
    res.status(200).json({ success: true, message: 'Patient rejected', data: entry });
  } catch (error) {
    console.error('Error rejecting patient:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
