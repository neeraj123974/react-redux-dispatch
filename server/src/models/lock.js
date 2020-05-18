import mongoose from 'mongoose'
import mongodb from 'mongodb'
var Schema = mongoose.Schema

// create a schema
var lockSchema = new Schema({
  name: String
},{
  timestamps: true
})

//Make user Modal
const Lock = mongoose.model('Lock', lockSchema)

export default Lock
