import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    unique: true
  },
});

const profile = mongoose.model('profile', profileSchema);

export default profile;
