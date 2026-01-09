const mongoose = require("mongoose");
const Joi = require("joi");

/* ---------------- Delivery Schema ---------------- */
const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  deliveryBoy: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in-transit", "delivered", "cancelled"],
    default: "pending"
  },
  trackingURL: {
    type: String,
    trim: true
  },
  estimatedDeliveryTime: {
    type: Number,
    min: 0
  }
}, { timestamps: true });

/* ---------------- Joi Validation ---------------- */
function validateDelivery(data) {
  const schema = Joi.object({
    order: Joi.string().hex().length(24).required(),

    deliveryBoy: Joi.string().min(2).max(50).required(),

    status: Joi.string()
      .valid("pending", "picked", "in-transit", "delivered", "cancelled")
      .required(),

    trackingURL: Joi.string().uri(),

    estimatedDeliveryTime: Joi.number().min(1)
  });

  return schema.validate(data);
}


/* ---------------- Export ---------------- */
module.exports = {
  deliveryModel:mongoose.model("delivery",deliverySchema),
  validateDelivery
};
