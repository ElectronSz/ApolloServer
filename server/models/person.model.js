import mongoose from 'mongoose'

const PersonSchema = new mongoose.Schema({
  fname: {
    type: String,
    unique: true
  },
  lname: {
    type: String,
    unique: false
  }
})

export default mongoose.model('person', PersonSchema)