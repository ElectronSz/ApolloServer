import Person from '../models/person.model'
import { Schema } from 'mongoose'

export function create(data) {
    return Person.create(data)
}

export function findAll() {
    return Person.find()
}

export function findById(id) {
    return Person.findOne(Schema.Types.ObjectId(id)).exec()
}

export function deleteOne(id){
    return Person.deleteOne(Schema.Types.ObjectId(id)).exec()
}