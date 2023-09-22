const mongoose = require('mongoose');

const PlainModel = new mongoose.Schema(
        {   
            january: Number,
            february: Number,
            march: Number,
            april: Number,
            may: Number,
            june: Number,
            july: Number,
            august: Number,
            september: Number,
            october: Number,
            november: Number,
            december: Number,
            id_user: Object,
            name: String         
         },
        { timestamps: true }
)
module.exports = mongoose.model('Plain', PlainModel)