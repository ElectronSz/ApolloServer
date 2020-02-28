import mongoose from 'mongoose'
import UserSchema from '../schema/user'

const User = mongoose.model('User', UserSchema);

export default User