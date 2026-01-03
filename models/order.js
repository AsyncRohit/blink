const mongoose = require('mongoose');

const orderSchema=mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
},
product:[
    { type:mongoose.Schema.Types.ObjectId, 
    ref:"product",}
],
totalPrice:Number,
adresses:String,
status:String,
payment:{
    type:mongoose.Schema.Types.ObjectId, ref:'payment'
},
delivery:{
    type:mongoose.Schema.Types.ObjectId, ref:'delivery'
},
});

module.exports=mongoose("order",orderSchema);