const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    patient_id: String,
    patient_name: String,
    due_date: Date,
    insurance_provider: String,
    insurance_policy_number: String,
    insurance_coverage_amount: Number,
    payment_method: String,
    notes: String,
    total_amount: Number,
    paid_amount: { type: Number, default: 0 },
    status: { type: String, default: "pending" },
    items: [
      {
        description: String,
        quantity: Number,
        unit_price: Number,
        category: String,
        total: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", BillSchema);
