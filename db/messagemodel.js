const { ObjectId } = require('mongoose');
const mongoose =require('mongoose');


const messagedata = mongoose.Schema({
    messages:[
        {
            userid:{
                type:ObjectId,
                required:true
            },
            phone:{
                type:Number,
                minLength:[10,"Must be minimum 10 digit"],
                required:true
            },
            content:{
                type:String,
                required:true
            },
            usern:{
                type:String,
                required:true
            },
            time:{
                type : String
            }
        }
    ],
    tofind:{
        type:Number,
        default:100
    }
});

const messageModel = mongoose.model('message',messagedata);

module.exports = messageModel;