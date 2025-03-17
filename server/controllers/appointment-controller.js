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
      const { date, time, doctor } = req.body;
      const existingAppointment = await Appointment.findOne({ date, time, doctor });

      if (existingAppointment) {
          return res.status(400).json({ msg: "The selected time slot for this doctor is unavailable."});
      }

      const newAppointment = new Appointment(req.body);
      await newAppointment.save();

      res.status(201).json({ msg: "Appointment added successfully", appointment: newAppointment });
  } catch (error) {
      res.status(500).json({ msg: "Error saving appointment" });
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


const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
  
      res.json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ message: "Error updating appointment" });
    }
};

const updatePriority = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { priority },
        { new: true }
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
  
      res.json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ message: "Error updating appointment" });
    }
};



module.exports = { getAppointments, addAppointment, updateAppointment, deleteAppointment ,updateStatus,updatePriority };
