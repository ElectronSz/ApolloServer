import mongoose from 'mongoose'
import PostSchema from '../schema/post'

const Post = mongoose.model('Post', PostSchema);

export default Post