"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    gender: String,
    dob: Date,
    addressLine1: String,
    addressLine2: String,
    city: String,
    postcode: String,
    services: String,
    // appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
    // contacts: [{name: String, phone: Number, address: String}],
    bloodPressures: [{ date: Date, systolic: Number, diastolic: Number }],
    weights: [{ date: Date, weight: Number }],
    temperatures: [{ date: Date, temperature: Number }]
});
const Client = mongoose.model('Client', clientSchema);
exports.default = Client;
//# sourceMappingURL=client.js.map