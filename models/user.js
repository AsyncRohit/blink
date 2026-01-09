const mongoose = require("mongoose");
const Joi = require("joi");

/* ---------------- Address Schema ---------------- */
const AddressSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  zip: {
    type: Number,
    required: true,
    min: 100000,
    max: 9999999
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  landmark: {
    type: String,
    maxlength: 100
  }
});

/* ---------------- User Schema ---------------- */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: Number,
    required: true,
    match:/^[0-9]{10}$/,
  },
  addresses: {
    type: [AddressSchema],
  }
}, { timestamps: true });



/* ---------------- Joi Validation ---------------- */
function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone:Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
    addresses:Joi.array()
    .items(
 
        Joi.object({
            state: Joi.string().min(2).max(50).required(),
            zip: Joi.number().min(100000).max(999999).required(),
            city: Joi.string().min(2).max(50).required(),
            address: Joi.string().min(5).max(200).required(),
            landmark: Joi.string().max(100).allow("")
          })
        )
        .max(5),
  });

  return schema.validate(data);
}

/* ---------------- Exports ---------------- */
module.exports = {
  userModel:mongoose.model("user", userSchema),
  validateUser
};
