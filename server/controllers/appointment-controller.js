const Appointment = require('../models/appointment');

// Get all appointments
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add new appointment
const addAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Error saving appointment' });
    }
};

// Update appointment
const updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Error updating appointment' });
    }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting appointment' });
    }
};

module.exports = { getAppointments, addAppointment, updateAppointment, deleteAppointment };
