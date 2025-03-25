const express = require('express');
const { getBills, createBill, updateBill, deleteBill, recordPayment } = require('../controllers/bill-controller');

const router = express.Router();

// Define routes and link to controllers
router.get('/', getBills);         // Get all bills
router.post('/', createBill);       // Create a new bill
router.put('/:id', updateBill);     // Update a bill
router.delete('/:id', deleteBill);  // Delete a bill
router.post('/payment/:id', recordPayment); // Record payment for a bill

module.exports = router;
