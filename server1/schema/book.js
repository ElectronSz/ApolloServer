import mongoose from 'mongoose'
//import Author from  '../models/author'

var bookSchema = new mongoose.Schema({
    title: { type: String },
    price: {
        type: Number,
        required: true,
    },
    date_published: {
        type: Date,
        default: Date.now()
    },
    authorId: {
        type: String
    }
})

bookSchema.post('save', function (doc) {
    //console.log('%s has been saved', doc._id);
});

export default bookSchema