import mongoose from 'mongoose';
import LanguagesSchema from './languages'

const UserSchema = new mongoose.Schema({
    fname: String,
    lname: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      index: true,
    },
    languages: {
      type: [LanguagesSchema],
      default: [],
    },
    contacts: { 
      email: String,
      phones: [String],
    },
  });

  export default UserSchema
  