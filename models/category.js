const mongoose = require("mongoose");
const Joi = require("joi");

/* ---------------- Category Schema ---------------- */
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
    unique: true
  }
}, { timestamps: true });

/* ---------------- Joi Validation ---------------- */
function validateCategory(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required()
  });

  return schema.validate(data);
}


/* ---------------- Export ---------------- */
module.exports = {
  categoryModel:mongoose.model("category", categorySchema),
  validateCategory
};
