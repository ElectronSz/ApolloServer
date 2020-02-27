import mongoose from 'mongoose'
import CompanySchema from '../schema/company'

const Company = mongoose.model('Company', CompanySchema);

export default Company