import Person from '../models/person.model'

export function create(data) {
    return Person.create(data)
}

export function findAll() {
    return Person.find()
  }