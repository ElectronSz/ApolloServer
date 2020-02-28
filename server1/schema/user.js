import mongoose from 'mongoose';
import LanguagesSchema from './languages'
import bcrypt from 'bcrypt';

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


  // userSchema.pre('save', function() {
  //   const hashedPassword = bcrypt.hashSync(this.password, 12);
  //   this.password = hashedPassword;
  // });

  export default UserSchema
  