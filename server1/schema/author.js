import mongoose from 'mongoose'

var authorSchema = new mongoose.Schema({
    id: {
        type: String
    },
    fname: { type: String },
    lname: { type: String },
    fullname: {
        type: String
    },
    address: {
        zip: String,
        city: String,
        country: {
            type: String,
            enum: ['eSwatini', 'Africa', 'Botswana'],
        }
    },
    contacts: {
        email: String,
        phone: String
    }
})
authorSchema.pre('save', function(next) {
    this.fullname = this.fname+" "+this.lname
    next();
  });
  
export default authorSchema