const mongoose = require('mongoose');
const facilitiesSchema = new mongoose.Schema({
    name: String,
    status: String,
    type: String,
    capacity: String,
    location: String
});
const Facilities = mongoose.model('Facilities', facilitiesSchema);
module.exports = Facilities;
