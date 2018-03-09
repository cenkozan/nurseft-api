import * as mongoose from 'mongoose';
import Appointment from './appointment';

const clientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  currentRate: Number,
  currentSleepoverRate: Number,
  gender: String,
  dob: Date,
  addressLine1: String,
  addressLine2: String,
  city: String,
  postcode: String,
  additionalInformation: String,
  // appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
  // contacts: [{name: String, phone: Number, address: String}],
  bloodPressures: [{date: Date, systolic: Number, diastolic: Number}],
  weights: [{date: Date, weight: Number, metrics: String}],
  temperatures: [{date: Date, temperature: Number}],
  incidents: [{date: Date, description: String, files: [{fileId: String}] }]
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
