const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');


const schoffee =mongoose.Schema({
    userkiid:{
        type:ObjectId,
    },
    nameofuser:{
        type:String
    },
    phoneno:{
        type:Number
    },
    emailofuser:{
        type:String
    },
    review:{
        type:String
    }
})

const feedModel = mongoose.model('feedback',schoffee);

module.exports = feedModel;