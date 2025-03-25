const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient_name: String,
    doctor: String,
    date: String,
    time: String,
    type: String,
    status: { type: String, default: 'Scheduled' },
    phone: String,
    specialization: String,
    priority: { type: String, default: 'Normal' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
