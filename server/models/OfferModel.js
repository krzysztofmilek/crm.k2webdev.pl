const mongoose = require('mongoose');

    const OfferModel = new mongoose.Schema(
        {   data: Date, 
            addEquipOneName:String,
            addEquipOnePrice: Number,
            addEquipTwoName:String,
            addEquipTwoPrice: Number,
            addEquipThreeName:String,
            addEquipThreePrice: Number,
            scontoCash:Number,
            addInfo:String,
            fileName:String,
            status:String, //open, closed enum
            user:{type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }, 
             customer:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Customer"
            } ,
            car:{type:mongoose.Schema.Types.ObjectId,
                ref:"Car"
            },
            action:{type:mongoose.Schema.Types.ObjectId,
                ref:"Action"
            },     
         },
        { timestamps: true }
)
module.exports = mongoose.model('Offer', OfferModel)