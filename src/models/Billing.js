const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      district: {
        type: String,
        required: true
      },
      zipCode: {
        type: String,
        required: true
      },
    },
    phone: {
      type: String,
      required: true,
    },
    documentType: {
      type: String,
      enum: ["DNI", "RUC"],
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", billingSchema);
