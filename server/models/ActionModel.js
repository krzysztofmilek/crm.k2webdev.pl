const mongoose = require('mongoose');


    const ActionModel = new mongoose.Schema(
        {   contactData: Date, 
            nextContactData:Date,
            information:String,
            conatactWay:String,
            direction:String,
            fileName:String,
            status:String, 
            user:{type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }, 
             customer:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Customer"
            } ,
            offer:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Offer"
            }         
         },
        { timestamps: true }
)
module.exports = mongoose.model('Action', ActionModel)