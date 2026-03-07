const express = require('express');
const Trial = require('../models/Trial');
const { generateScreeningQuestions } = require('../config/openai');

const router = express.Router();

// ───────────────────────────────────────────────
// POST /api/trials  — Create a new clinical trial
// ───────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { trialName, disease, minAge, maxAge, inclusions, exclusions } = req.body;

    // Basic validation
    if (!trialName || !disease || minAge === undefined || maxAge === undefined) {
      return res.status(400).json({
        success: false,
        message: 'trialName, disease, minAge, and maxAge are required fields',
      });
    }

    // Generate screening questions using OpenAI
    console.log('🤖 Generating screening questions via OpenAI...');
    let screeningQuestions = [];
    try {
      screeningQuestions = await generateScreeningQuestions({
        trialName, disease, minAge, maxAge, inclusions, exclusions,
      });
      console.log(`✅ Generated ${screeningQuestions.length} screening questions`);
    } catch (aiError) {
      console.error('⚠️ AI generation failed, saving trial without questions:', aiError.message);
    }

    const trial = new Trial({
      trialName,
      disease,
      minAge: Number(minAge),
      maxAge: Number(maxAge),
      inclusions: inclusions || '',
      exclusions: exclusions || '',
      screeningQuestions,
    });

    const savedTrial = await trial.save();

    res.status(201).json({
      success: true,
      message: 'Clinical trial created successfully',
      data: savedTrial,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Error creating trial:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ───────────────────────────────────────────────
// GET /api/trials  — Get all clinical trials
// ───────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const trials = await Trial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: trials.length, data: trials });
  } catch (error) {
    console.error('Error fetching trials:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ───────────────────────────────────────────────
// GET /api/trials/:trial_id  — Get a single trial
// ───────────────────────────────────────────────
router.get('/:trial_id', async (req, res) => {
  try {
    const trial = await Trial.findOne({ trial_id: req.params.trial_id });
    if (!trial) {
      return res.status(404).json({ success: false, message: 'Trial not found' });
    }
    res.status(200).json({ success: true, data: trial });
  } catch (error) {
    console.error('Error fetching trial:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ───────────────────────────────────────────────
// DELETE /api/trials/:trial_id  — Delete a trial
// ───────────────────────────────────────────────
router.delete('/:trial_id', async (req, res) => {
  try {
    const trial = await Trial.findOneAndDelete({ trial_id: req.params.trial_id });
    if (!trial) {
      return res.status(404).json({ success: false, message: 'Trial not found' });
    }
    res.status(200).json({ success: true, message: 'Trial deleted successfully' });
  } catch (error) {
    console.error('Error deleting trial:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
