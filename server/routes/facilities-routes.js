const express = require('express');
const router = express.Router();
const { getFacilities,addFacility,editFacility,deleteFacility} = require('../controllers/facilities-controller');

// Define routes
router.get('/', getFacilities);
router.post('/', addFacility);
router.put('/:id', editFacility);
router.delete('/:id', deleteFacility);

module.exports = router;
