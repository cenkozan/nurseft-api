'use strict';

import * as mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  allDay: Boolean,
  dow: String,
  rate: Number,
  carer: String,
  client: String
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;
