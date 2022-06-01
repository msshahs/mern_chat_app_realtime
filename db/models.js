const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose');
//mongoose Schema

const userdata = new mongoose.Schema({
    fname:{
        type:String,
        required:[true,"Enter First Name"],
        minLength:[3,"First Name must be greater than 3 characters"]
    },
    lname:{
        type:String,
        required:[true,"Enter Last Name"],
        minLength:[3,"First Name must be greater than 3 characters"]
    },
    number:{
        type:Number,
        required:[true,"Enter Number"],
        minLength:[10,"Minimum 10 digit number req wout country code"]
    },
    email:{
        type:String,
        required:[true,"Enter Email"],
        unique:true,
        validate:[validator.isEmail,"Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Enter Your Password"],
    },
    cpassword:{
        type:String,
        required:[true,"Enter Your Confirm Password"],
    },
    aboutYou:{
        type:String,
        minLength:[3,"First Name must be greater than 3 characters"],
        maxLength:[50,"First Name must be greater than 3 characters"],
        required:[true,"Enter Description"]
    },
    avatar:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    chatrooms:[
        {
            recieverid :{
                type:ObjectId,
                required:true
            },
            usern:{
                type:String,
                required:true
            },
            phone:{
                type:Number,
                required:true
            }
        }

    ],
    privatechatmsgs:[
        {
            sid :{
                type:ObjectId,
                required:true
            },
            rid :{
                type:ObjectId,
                required:true
            },
            msgcont:{
                type:String,
                required:true
            },
            time1:{
                type:String
            }
        }
    ]




});

userdata.pre('save',async function(){

   this.password = await bcrypt.hash(this.password,12);
})
userdata.methods.getJWTToken = function(){

    return jwt.sign({id:this._id},'HBJFEUGBERFGERGU');
}
userdata.methods.comparePassword = async function(entered){
    const us = await bcrypt.compare(entered,this.password);
    return us ;
}
const userModel =  mongoose.model('newuser',userdata);

module.exports = userModel;


