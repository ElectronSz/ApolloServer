import mongoose from 'mongoose'
import BookSchema from '../schema/book'

const Book = mongoose.model('Book',BookSchema);

export default Book