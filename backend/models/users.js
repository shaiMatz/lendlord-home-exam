const mongoose = require('mongoose')
const { USER_ROLES } = require('../constants'); 

const collectionName = 'users'
const schemaName = 'users'
const SchemaTypes = mongoose.Schema

const schema = new mongoose.Schema(
  {
  _id: { type: SchemaTypes.ObjectId, auto: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    dateStarted: { type: Date, required: true },
    salary: { type: Number, required: true },
    role: { type: String, enum: [USER_ROLES.MANAGER, USER_ROLES.WORKER, USER_ROLES.DRIVER], required: true },
    manager: { type: SchemaTypes.ObjectId, ref: 'User' } //manager don't have manager
  },
  { strict: false, autoCreate: true, timestamps: true }
)

const model = mongoose.model(schemaName, schema, collectionName)

module.exports = model
module.exports.schema = schema
