'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    sleepover: Boolean,
    dow: String,
    rate: Number,
    sleepoverRate: Number,
    carer: String,
    client: String
});
const Appointment = mongoose.model('Appointment', AppointmentSchema);
exports.default = Appointment;
//# sourceMappingURL=appointment.js.map