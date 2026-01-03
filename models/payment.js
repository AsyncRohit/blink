const mongoose = require('mongoose');

const paymentSchema=mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.Objectid,
        ref:'order',
    },
    amount:Number,
    method:String,
    status:String,
    transactionID:String,
})


module.exports=mongoose("payment",paymentSchema);