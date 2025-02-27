const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient_name: String,
    doctor: String,
    date: String,
    time: String,
    type: String,
    status: { type: String, default: 'Scheduled' },
    notes: String,
    duration: String,
    priority: { type: String, default: 'Normal' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
