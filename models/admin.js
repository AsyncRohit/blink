const mongoose = require("mongoose");
const Joi = require("joi");

/* ---------------- REGEX ---------------- */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------------- Admin Schema ---------------- */
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [emailRegex, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "superadmin"]
  }
}, { timestamps: true });

/* ---------------- Joi Validation ---------------- */
function validateAdmin(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),

    email: Joi.string()
      .pattern(emailRegex)
      .required()
      .messages({
        "string.pattern.base": "Email must be valid"
      }),

    password: Joi.string().min(6).required(),

    role: Joi.string().valid("admin", "superadmin").required()
  });

  return schema.validate(data);
}


/* ---------------- Export ---------------- */
module.exports = {
  adminModel:mongoose.model("admin", adminSchema),
  validateAdmin
};
