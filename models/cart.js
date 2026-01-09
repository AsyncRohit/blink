const mongoose = require("mongoose");
const Joi = require("joi");

/* ---------------- Cart Schema ---------------- */
const cartSchema = new mongoose.Schema({
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
  }
}, { timestamps: true });

/* ---------------- Joi Validation ---------------- */
function validateCart(data) {
  const schema = Joi.object({
    user: Joi.string().length(24).required(),
    products:Joi.array().items(joi.string().required()).required(),
    totalPrice: Joi.number().min(0).required()
  });

  return schema.validate(data);
}


/* ---------------- Export ---------------- */
module.exports = {
  cartModel: mongoose.model("cart",cartSchema),
  validateCart
};
