import mongoose from 'mongoose';

const LanguagesSchema = new mongoose.Schema({
    language: String,
    skill: {
      type: String,
      enum: [ 'basic', 'fluent', 'native' ],
    },
  });

  export default LanguagesSchema