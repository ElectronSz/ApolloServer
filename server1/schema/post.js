import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  description: {
    type: String,
    required: true
  },
  date_published: {
    type: Date,
    default: Date.now()
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true })


// PostSchema.index({ userId: 1 }, { background: true })
export default PostSchema
