const mongoose = require('mongoose');

// Auto-increment counter schema for generating trial_id
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

// Clinical Trial schema
const trialSchema = new mongoose.Schema(
  {
    trial_id: {
      type: String,
      unique: true,
      index: true,
    },
    trialName: {
      type: String,
      required: [true, 'Trial name is required'],
      trim: true,
    },
    disease: {
      type: String,
      required: [true, 'Disease / condition is required'],
      trim: true,
    },
    minAge: {
      type: Number,
      required: [true, 'Minimum age is required'],
      min: [0, 'Minimum age cannot be negative'],
      max: [120, 'Minimum age cannot exceed 120'],
    },
    maxAge: {
      type: Number,
      required: [true, 'Maximum age is required'],
      min: [0, 'Maximum age cannot be negative'],
      max: [120, 'Maximum age cannot exceed 120'],
    },
    inclusions: {
      type: String,
      default: '',
    },
    exclusions: {
      type: String,
      default: '',
    },
    screeningQuestions: {
      type: [
        {
          question: { type: String },
          expectedAnswer: { type: String },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Pre-save hook to auto-generate trial_id like CT-001, CT-002, ...
trialSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        'trial_id',
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.trial_id = `CT-${String(counter.seq).padStart(3, '0')}`;
    } catch (error) {
      return next(error);
    }
  }

  // Validate minAge < maxAge
  if (this.minAge > this.maxAge) {
    return next(new Error('Minimum age cannot be greater than maximum age'));
  }

  next();
});

const Trial = mongoose.model('Trial', trialSchema);

module.exports = Trial;
