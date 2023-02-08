import mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: true,
    unique: true, 
    min: [1, 'Must be greater than 1!'],
    max: [99999999, 'Must not be lesser than 99999999']
  },
  name: {
    type: String,
    required: true,
    min: [3, 'Must be greater than 3!']
  },
  dob: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: [0, 'Must be greater than 0!'],
    max: [100, 'Must be lesser than 100!']
  }
});

export const TeacherSchema = new mongoose.Schema({ 
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    requird: true,
    min: [6, 'Password length must be greater than 6!']
  }
});