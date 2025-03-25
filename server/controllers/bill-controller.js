const Bill = require('../models/bill'); // Import Bill model

// Get all bills
exports.getBills = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Create a new bill
exports.createBill = async (req, res) => {
    try {
        const newBill = new Bill(req.body);
        await newBill.save();
        res.status(201).json(newBill);
    } catch (error) {
        res.status(400).json({ message: 'Error creating bill', error });
    }
};

// Update a bill
exports.updateBill = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBill = await Bill.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBill) return res.status(404).json({ message: 'Bill not found' });

        res.status(200).json(updatedBill);
    } catch (error) {
        res.status(400).json({ message: 'Error updating bill', error });
    }
};

// Delete a bill
exports.deleteBill = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBill = await Bill.findByIdAndDelete(id);
        if (!deletedBill) return res.status(404).json({ message: 'Bill not found' });

        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bill', error });
    }
};

// Record a payment for a bill
exports.recordPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentAmount } = req.body;

        const bill = await Bill.findById(id);
        if (!bill) return res.status(404).json({ message: 'Bill not found' });

        bill.paid_amount += parseFloat(paymentAmount);
        bill.status = bill.paid_amount >= bill.total_amount ? 'paid' : 'partial';
        bill.updated_at = new Date();
        await bill.save();

        res.status(200).json(bill);
    } catch (error) {
        res.status(400).json({ message: 'Error recording payment', error });
    }
};
