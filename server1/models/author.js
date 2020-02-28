import mongoose from 'mongoose'
import AuthorSchema from '../schema/author.js'

const Author = mongoose.model('Author',AuthorSchema);

export default  Author