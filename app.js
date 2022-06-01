const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./db/models');
const messageModel = require('./db/messagemodel');
// const catchAsyncErrors = require('./middlewares/catchAsyncErrors');
const ErrorHander = require('./utils/errorHandler');
const errorMiddleware = require('./middlewares/error');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const feedModel = require('./db/feedbackmodel');
require('dotenv').config()
// require('./config.env')
//calling expresss functions in app...

const app = express();
const port = process.env.PORT || 5000;

// taken from mongo atlas cluster

const DB ='mongodb+srv://mhs_db:1234meetshah@cluster0.dg2l0.mongodb.net/mernstack?retryWrites=true&w=majority';

//Middleware to get data in json format...

app.use(express.json());
app.use(errorMiddleware);
app.use(cookieParser());

//coonecting with database -->mongo atlas

mongoose.connect(DB,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connection successful');
}).catch((err)=>{
    console.log(err);
})

// DECLARING API ROUTES
// user routes
//  1.create user 
// 2.get specific user
// 3.login user 
// 4.Logout user
//message routes
//  1. create message 
// 2.get all messages 
// 3.add or update new messages

app.get('/',(req,res)=>{
    res.send('hello server runningg properly');
})

// **********************USER ROUTES***********************

// Create New User

app.post('/createnewuser', async(req,res,next)=>{

    const {fname,lname,num,email,pass,cpass,desc}=req.body;
    console.log(req.body);
    try {
        const exist = await userModel.findOne({email:email});
        if(exist){
            return res.status(422).json({
                error:"User with this email already exist"
            })
        }else{
            const newUser = await userModel.create({
                fname:fname,
                lname:lname,
                number:num,
                email:email,
                password:pass,
                cpassword:cpass,
                aboutYou:desc,
                avatar : "avatar"
            })
        
            const token = newUser.getJWTToken();

            res.status(200).cookie('token',token,{
                expires: new Date(Date.now() + 55542135454468),
                httpOnly:true
            }).json({
                success:true,
                token
            })
        }
       

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            error:"Connectivity error"
        })
    }
 
      
    
});
//Login User

app.post('/login',async(req,res,next)=>{

try {
    // console.log(req.body.email + req.body.password);
    let checkuser = await userModel.findOne({email:req.body.email});

    if(!checkuser){
        return res.status(400).json({
            success:false,
            errormsg:"User Not Found"
        });
    }
//     const checkPassword = checkuser.comparePassword(req.body.password);
//    console.log(checkPassword);
    if(checkuser.cpassword != req.body.password){
        return res.status(400).json({
            success:false,
            errormsg:"Passwords Do not Match"
        });
    }
  
    const token = checkuser.getJWTToken();

    res.status(200).cookie('token',token,{
        expires: new Date(Date.now() + 55542135454468),
        httpOnly:true
    }).json({
        success:true,
        token
    })
} catch (error) {
    console.log(error);
    res.status(400).json({
        success:false,
        errormsg:"Connectivity error"
    })
}
})

//Logout a user
app.get('/logout',async(req,res,next)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        res.status(200).json({
            success:true,
            mess:"Logged Out Successfully"
        })
    }catch(e){
        console.log(e);
    }

})


app.get('/getuser/:id',async(req,res,next)=>{

    try{
        let userdetails = await userModel.findById(req.params.id);

        // console.log(userdetails);
        if(!userdetails){
            return res.status(400).json({
                success:false,
                msg:'user not found'
            })
        }
        res.status(200).json({
            success:true,
            userdetails
        })
    }catch(e){
        console.log(e);
    }

})



// **********************MESSAGE ROUTES***********************

// Create new message

app.post('/createnewmessage',async(req,res,next)=>{
    
    try{
        const newMessage = await messageModel.create({
            messages:[
                {
                    userid:req.body.userid,
                    phone:req.body.phone,
                    content:req.body.content
                }
            ]
        })
        res.status(200).json({
            success:true,
            newMessage
        })
    }catch(e){
        console.log(e);
    }
   

})

// update message or chat everytime


app.post('/message',async(req,res,next)=>{
    try{
        const {token} =req.cookies;
        if(!token){
            return res.status(400).json({
                success:false,
                errormsg:"Login First!"
            });
        }
        const decodeData = jwt.verify(token,'HBJFEUGBERFGERGU');
        console.log(decodeData);
        req.user = await userModel.findById(decodeData.id);
        next();
    }catch(e){
        console.log(e);
    }
    
},async(req,res,next)=>{
    try{
        let curr = await messageModel.findOne({"tofind":100});
        let data = curr.messages;
        let date= new Date();

        //am to pm coversion and for setting message time

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        let stroe= strTime;
    
        console.log(new Date().toLocaleTimeString('en-US'));
        let obj = {
            userid:req.user.id,
            phone:req.user.number,
            content:req.body.content,
            usern:req.user.fname,
            time: strTime
    
        }
        data.push(obj);
        console.log(data);
        
        let newone = await messageModel.findOneAndUpdate({"tofind":100},{"messages":data},{new:true});
        res.status(200).json({
            success:true,
            newone
        })
    }catch(e){
        console.log(e);
    }
   
});

//Load all messages with authentication

app.get('/allmessages',async(req,res,next)=>{

    try{
        const {token} =req.cookies;
        if(!token){
            return res.status(400).json({
                success:false,
                errormsg:"Login First!"
            });
        }
        const decodeData = jwt.verify(token,'HBJFEUGBERFGERGU');
        console.log(decodeData);
        req.user = await userModel.findById(decodeData.id);
        console.log(req.user);
    
        next();
    }catch(e){
        console.log(e);
    }

},
async(req,res,next)=>{
    try{
        let allmessages = await messageModel.find();
        allmessages=allmessages[0].messages
        res.status(200).json({
            success:true,
            allmessages
        })
    }catch(e){
        console.log(e);
    }
   
});

//Get Details Of Specific User
app.get('/authenticateuser',(req,res,next)=>{
    try{
        const {token} =req.cookies;
        if(!token){
            return res.status(400).json({
                success:false,
                errormsg:"Login First!"
            });
        }
        const decodeData = jwt.verify(token,'HBJFEUGBERFGERGU');
        console.log(decodeData);
        res.status(200).json({
            success:true,
            useit:decodeData.id
        })
    }catch(e){
        console.log(e);
    }
})

//update chat rooms

app.post('/updatechatrooms',async(req,res,next)=>{
    try{
        const {token} =req.cookies;
        if(!token){
            return res.status(400).json({
                success:false,
                errormsg:"Login First!"
            });
        }
        const decodeData = jwt.verify(token,'HBJFEUGBERFGERGU');
        console.log(decodeData);
        req.user = await userModel.findById(decodeData.id);
        next();
    }catch(e){
        console.log(e);
    }
 
},async(req,res,next)=>{
    try{
    let curr1 = await userModel.findById(req.user.id);
    let curr112 = await userModel.findById(req.body.recieverid);
    console.log(curr1);

    let data1 = curr1.chatrooms;
    let data112 = curr112.chatrooms;
    let obj1 = {
        recieverid:req.body.recieverid,
        usern:curr112.fname,
        phone:curr112.number,
    }
    let obj112={
        recieverid:req.user.id,
        usern:req.user.fname,
        phone:req.user.number
    }
    data1.push(obj1);
    data112.push(obj112);
    console.log(data1);
    
    let newone2 = await userModel.findOneAndUpdate({_id:req.user._id},{chatrooms:data1},{new:true});
    let newone21 = await userModel.findOneAndUpdate({_id:req.body.recieverid},{chatrooms:data112},{new:true});
    res.status(200).json({
        success:true,
        newone2,
        newone21
    })
    }catch(e){
        console.log(e);
    }

    
});

app.post('/updateprivatemsgs',async(req,res,next)=>{
    try{
        const {token} =req.cookies;
        if(!token){
            return res.status(400).json({
                success:false,
                errormsg:"Login First!"
            });
        }
        const decodeData = jwt.verify(token,'HBJFEUGBERFGERGU');
        console.log(decodeData);
        req.user = await userModel.findById(decodeData.id);
        next();
    }catch(e){
        console.log(e);
    }
    
},async(req,res,next)=>{

    try{
        let curr2 = await userModel.findById(req.user.id);
        let curr3 = await userModel.findById(req.body.rid);
        console.log(curr2);
    
        let data2 = curr2.privatechatmsgs;
        let data3 = curr3.privatechatmsgs;
       
        let date= new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        // console.log(hours + ""+minutes);
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime1 = hours + ':' + minutes + ' ' + ampm;
        
        let stroe1= strTime1;
        let obj2 = {
            sid:req.user.id,
            rid:req.body.rid,
            msgcont:req.body.msgcont,
            time1: stroe1
        }
        data2.push(obj2);
        data3.push(obj2);
        console.log(data2);
        console.log(data3);
        
        let newone2 = await userModel.findOneAndUpdate({_id:req.user._id},{privatechatmsgs:data2},{new:true});
        let newone3 = await userModel.findOneAndUpdate({_id:req.body.rid},{privatechatmsgs:data3},{new:true});
        res.status(200).json({
            success:true,
            newone2,
            newone3
        })
    }catch(e){
        console.log(e);
    }
    
});

//get private messages of users

app.get('/reciever',async(req,res,next)=>{
    try{
        let d = await userModel.findById(req.query.id);
        console.log(d);
        let usefuldata = d.privatechatmsgs;
       
        res.status(200).json({
            success:true,
            usefuldata
        })
    }catch(e){
        console.log(e);
    }
 

})

//get chat rooms of logged in user
app.get('/allchatrooms',async(req,res,next)=>{
    try{
        const {token} =req.cookies;
        if(!token){
            return res.status(400).json({
                success:false,
                errormsg:"Login First!"
            });
        }
        const decodeData = jwt.verify(token,'HBJFEUGBERFGERGU');
        console.log(decodeData);
        let d1 = await userModel.findById(decodeData.id);
        let usefulcont = d1.chatrooms;
    
        res.status(200).json({
            success:true,
           usefulcont
        })
    }catch(e){
        console.log(e);
    }
})

app.post('/findreciever',async(req,res,next)=>{
   
    try{
        let checknum = req.body.numbercheck;

        let datasimp = await userModel.findOne({number:checknum});
        if(!datasimp){
            return res.status(400).json({
                success:false,
                errormsg:"No Such User Exist"
            });
        }
        let recid = datasimp._id;
    
        res.status(200).json({
            success:true,
            recid
        })
    }catch(e){
        console.log(e);
    }
    
})
app.get('/specificuser',async(req,res,next)=>{
    try{
        const {token} =req.cookies;
        if(!token){
            return res.status(400).json({
                success:false,
                errormsg:"Login First!"
            });
        }
        const decodeData = jwt.verify(token,'HBJFEUGBERFGERGU');
        console.log(decodeData);
        let userdetails1 = await userModel.findById(decodeData.id);
        res.status(200).json({
            success:true,
            uinf:userdetails1
        })
    }catch(e){
        console.log(e);
    }
   
})

app.get('/recinfo',async(req,res,next)=>{
    try{
        let myu = await userModel.findById(req.query.recid);
        if(!myu){
            return res.status(400).json({
                success:false,
                err:"No user found"
            })
        }
        res.status(200).json({
            success:true,
            r:myu
        })
    }catch(e){
        console.log(e);
    }
   
})
app.post('/feedback',(req,res,next)=>{
    try{
        const makingfeedback = feedModel.create({
            userkiid:req.body.idofu,
            nameofuser:req.body.usename,
            phoneno:req.body.ph,
            emailofuser:req.body.emailofuser,
            review:req.body.text
        });
        res.status(200).json({
            success:true
        })
    }catch(e){
        console.log(e);
    }
    

})
    if(process.env.NODE_ENV == 'production'){
        app.use(express.static("client/build"));
    }
//listening at server 

    app.listen(port,()=>{
    console.log(`Server running successfully at ${port}`);
    });

