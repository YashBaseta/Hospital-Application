const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {

    patient: String,
    appointmentDate:Date,
    dueDate: Date,
    appointmentCost:Number,
    insuranceProvider: String,
    policyNumber: String,
    coverageAmount: Number,
    paymentMethod: String,
    notes: String,
    
    total: Number,
    status: { type: String },
    additionalCharges: [
      {
        description: String,
        amount: Number,
        
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", BillSchema);
