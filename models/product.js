const mongoose = require("mongoose");
const Joi = require("joi");

/* ---------------- Product Schema ---------------- */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  }
}, { timestamps: true });

/* ---------------- Joi Validation ---------------- */
function validateProduct(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    stock: Joi.boolean(),
    description: Joi.string().optional(),
    image: Joi.string().optional()
  });

  return schema.validate(data);
}


/* ---------------- Export ---------------- */
module.exports = {
  product:mongoose.model("product",productSchema),
  validateProduct
};
