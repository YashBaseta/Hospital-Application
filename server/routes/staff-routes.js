const express = require('express');
const router = express.Router();
const { getStaffs,addStaff,editStaff,deleteStaff } = require('../controllers/staff-controller');

// Define routes
router.get('/', getStaffs);
router.post('/', addStaff);
router.put('/:id', editStaff);
router.delete('/:id', deleteStaff);

module.exports = router;
