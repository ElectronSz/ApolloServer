import mongoose from 'mongoose'
import timestamps  from 'mongoose-timestamp'
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

PersonSchema.plugin(timestamps)
PersonSchema.index({ createdAt: 1, updatedAt: 1 });


export default mongoose.model('person', PersonSchema)