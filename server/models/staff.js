const mongoose = require('mongoose');
const staffSchema = new mongoose.Schema({
    name: String,
    role: String,
    department: String,
    contact: String,
    email: String,
});
const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;