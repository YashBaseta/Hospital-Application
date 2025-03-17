const express = require('express');
const router = express.Router();
const { getAppointments, addAppointment, updateAppointment, deleteAppointment, updateStatus, updatePriority } = require('../controllers/appointment-controller');

// Define routes
router.get('/', getAppointments);
router.post('/', addAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);
router.put('/:id', updateStatus);
router.put('/:id', updatePriority);


module.exports = router;
