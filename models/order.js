const mongoose = require("mongoose");
const Joi = require("joi");

/* ---------------- Order Schema ---------------- */
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment"
  },
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery"
  }
}, { timestamps: true });

/* ---------------- Joi Validation ---------------- */
function validateOrder(data) {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(),

    products: Joi.array()
      .items(Joi.string().hex().length(24))
      .min(1)
      .required(),

    totalPrice: Joi.number().min(0).required(),

    address: Joi.string().min(5).max(200).required(),

    status: Joi.string()
      .valid("pending", "processing", "shipped", "delivered", "cancelled"),

    payment: Joi.string().hex().length(24).allow(null),

    delivery: Joi.string().hex().length(24).allow(null)
  });

  return schema.validate(data);
}


/* ---------------- Export ---------------- */
module.exports = {
  orderModel:mongoose.model("order",orderSchema),
  validateOrder
};
