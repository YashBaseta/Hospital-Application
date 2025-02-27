const express = require('express');
const router = express.Router();
const {getPatients,addPatient,editPatient,deletePatient  } = require('../controllers/patients-controller');

// Define routes
router.get('/', getPatients);
router.post('/', addPatient);
router.put('/:id', editPatient);
router.delete('/:id', deletePatient);

module.exports = router;
