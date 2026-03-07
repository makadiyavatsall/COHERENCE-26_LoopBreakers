const mongoose = require('mongoose');

const entryPatientSchema = new mongoose.Schema(
  {
    patient_id: {
      type: String,
      required: [true, 'Patient ID is required'],
      trim: true,
    },
    score: {
      type: Number,
      required: [true, 'Score is required'],
    },
    detail: {
      type: String,
      default: '',
    },
    trial_id: {
      type: String,
      required: [true, 'Trial ID is required'],
      trim: true,
    },
    pdfFilePath: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const EntryPatient = mongoose.model('EntryPatient', entryPatientSchema, 'entry_patient');

module.exports = EntryPatient;
