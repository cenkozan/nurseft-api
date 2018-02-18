import * as mongoose from 'mongoose';

const carerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  gender: String,
  dob: Date,
  // appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  addressLine1: String,
  addressLine2: String,
  city: String,
  postcode: String
});

const Carer = mongoose.model('Carer', carerSchema);

export default Carer;
