const mongoose = require("mongoose");
const Joi = require("joi");

/* ---------------- Payment Schema ---------------- */
const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  method: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  transactionID: {
    type: String,
    required: true,
    unique:true
}
}, { timestamps: true });

/* ---------------- Joi Validation ---------------- */
function validatePayment(data) {
  const schema = Joi.object({
    order: Joi.string().hex().length(24).required(),

    amount: Joi.number().min(0).required(),

    method: Joi.string()
      .required(),

    status: Joi.string()
      .required(),

    transactionID: Joi.string().min(5).required()
  });

  return schema.validate(data);
}


/* ---------------- Export ---------------- */
module.exports = {
  paymentModel:mongoose.model("payment", paymentSchema),
  validatePayment
};
