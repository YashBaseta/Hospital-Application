const mongoose = require('mongoose');
const bedSchema = new mongoose.Schema({
    number: String,
    department: String,
    status: String,
    type: String,
    floor: String
});
const Bed = mongoose.model('Bed', bedSchema);
module.exports = Bed;