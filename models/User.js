const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Counter schema (reuse for patient_id auto-increment)
const patientCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const PatientCounter = mongoose.model('PatientCounter', patientCounterSchema);

const userSchema = new mongoose.Schema(
  {
    patient_id: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate patient_id (PAT-001, PAT-002, ...) before saving
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await PatientCounter.findByIdAndUpdate(
        'patient_id',
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.patient_id = `PAT-${String(counter.seq).padStart(3, '0')}`;
    } catch (error) {
      return next(error);
    }
  }

  // Hash password
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
