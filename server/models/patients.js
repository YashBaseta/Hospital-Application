const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
    allergies: { type: String, default: '' },
    medicalHistory: { type: String, default: '' },
    emergencyContact: { type: String, required: true },
    insuranceInfo: { type: String, default: '' },
    lastVisit:String,
    nextAppointment: String,
})

const Patients = mongoose.model("Patients",patientSchema);
module.exports = Patients;