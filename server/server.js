const express = require('express');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointment-routes');
const patientRoutes = require('./routes/patients-routes');
const bedRoutes = require('./routes/bed-routes');
const StaffRoutes = require('./routes/staff-routes');
const FacilitiesRoutes = require('./routes/facilities-routes');
const SuppliesRoutes = require('./routes/supplies-routes');
const LoginRoutes = require('./routes/auth-routes');
const billRoutes = require('./routes/bill-routes');
const { default: mongoose } = require('mongoose');
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Connect to MongoDB

mongoose.connect("mongodb+srv://HMS:hms@cluster0.9whmy.mongodb.net/").then(() => console.log("connect DB")).catch((console.error()))

// Use Routes
app.use('/appointments', appointmentRoutes);
app.use('/patients', patientRoutes);
app.use('/beds', bedRoutes);
app.use('/staff', StaffRoutes);
app.use('/facilities', FacilitiesRoutes);
app.use('/supplies', SuppliesRoutes);
app.use('/bill', billRoutes);
app.use('/api/auth', LoginRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


