    const mongoose = require('mongoose');
    const suppliesSchema = new mongoose.Schema({
        name: String,
        category: String,
        quantity: String,
        unit: String,
        reorderLevel: String,
    });
    const Supplies = mongoose.model('Supplies', suppliesSchema);
    module.exports = Supplies;