import mongoose from 'mongoose'

var CompanysSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  employeeIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
})


export default CompanysSchema