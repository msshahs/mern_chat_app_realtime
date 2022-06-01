import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../chat.css";
import { BiUserPlus } from "react-icons/bi";
import { ImSearch } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { IoLogoReddit, IoLogoSnapchat, IoLogOutSharp} from "react-icons/io5";
import { VscFeedback} from "react-icons/vsc";
import { TiGroup} from "react-icons/ti";
import { MdOutlineInfo} from "react-icons/md";
import { IoLogoWechat} from "react-icons/io5";
import { IoLogoSnapchats} from "react-icons/io5";
import FeedBack from 'react-feedback-popup'
import { IoMdArrowRoundBack } from "react-icons/io";



const Chat = () => {
  const [mess,setmess] = useState([]);
  const [chatting,setchatting] = useState([]);
  const [originaluser,setoriginaluser] = useState('');
  const [cont,setcont] = useState('');
  const [field,setfield] = useState('');
  const [contact,setcontact] = useState();
  const [field1,setfield1] = useState('');
  // const [r,setr] = useState('');
  let r ="";

  const navigate = useNavigate();

  useEffect(() => {

    manipulatingauthen();
    manipulatingmessages();
    manipulatingchatrooms();
    setTimeout(() => {
    again();
    }, 1000);
  }, []);

  const ins = document.querySelector('.ins');

  const again = () =>{
    const sds = document.querySelector('#sds');
    sds.scrollIntoView(); 
  }
 

  const manipulatingmessages =async(e)=>{
  
    let showallmessage = await fetch('/allmessages').then(response => response.json()).then(data=>data);
    let temp = showallmessage.allmessages;
    // console.log(showallmessage.allmessages);
    setmess(temp);
    // console.log(mess);
    
  }
  const manipulatingchatrooms = async()=>{
    let tempy = await fetch('allchatrooms').then(response =>response.json()).then(data2=>data2);
    let tempyupdate = tempy.usefulcont;
    console.log(tempyupdate);
    setchatting(tempyupdate);
  }

  const manipulatingauthen = async(e)=>{
  
    let showallmessage1 = await fetch('/authenticateuser').then(response => response.json()).then(datas1=>datas1);
    // console.log(showallmessage1.useit);
    let temp1 = showallmessage1.useit;
    setoriginaluser(temp1);
    // console.log(originaluser);
}
const inpco =(e)=>{
  setfield(e.target.value);
 // console.log(e.target.value);
}

const inpco1 =(e)=>{
  setfield1(e.target.value);
  //console.log(e.target.value);
}

  const addmessage = async()=>{

    let c = ins.value;
    if(c!=''){
      let added = await fetch('/message',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          content:c
        })
      })
      ins.value="";
      setfield("");
    }else{
      alert("Message cannot be empty");
    }
      // setcont("");
      manipulatingmessages();
      setTimeout(() => {
      again();
        
      }, 1000);
  }
  const feed =()=>{
    navigate('/feedback')
  }
    
  //const addnew = document.querySelector('.addnew');
  const vanish = document.querySelector('.vanish');
 // const posiwala = document.querySelector('.posiwala');
  const enterph = document.querySelector('.enterph');
  const sp = document.querySelector('.sp');
  //const adde = document.querySelector('.adde');

  const addpchat = ()=>{
    vanish.style.opacity =1; 
    vanish.style.zIndex = 1000; 
  }
  const imgcancel = ()=>{
    vanish.style.opacity =0; 
    vanish.style.zIndex = -1000; 
  }
  const addingurchat = ()=>{
    console.log(enterph.value);
    if(!enterph.value){
      sp.innerText = 'Number cannot be empty'
    }else{
      callitwhenndone(enterph.value);
      enterph.value = undefined;
    }
  }
  const callitwhenndone = async (vv)=>{
    let r="";
    console.log('called');
    console.log(vv);
    let a = await fetch('/findreciever',{
      method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          numbercheck:vv
        })
    }).then((da)=>{
      if(da.status === 400){
      sp.innerText = "No such user found pls check the number again"
      }
     return da.json()
    }).then(up=>up);
    console.log(a);
    if(a.recid){
      r = a.recid
      console.log(r);
      sp.innerText = a.recid
      chatroomsupdatecallapi(r);
      setTimeout(() => {
      manipulatingchatrooms();
      }, 1000);
    }

    
  }
  const chatroomsupdatecallapi = async (vr)=>{
    await fetch('/updatechatrooms',{
      method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          recieverid:vr,
          
        })
    })
  }
  setTimeout(() => {
    const messagebox = document.querySelectorAll('.messagebox');
    console.log(messagebox);
    messagebox.forEach(element => {
    // console.log(element);
    element.addEventListener('click',()=>{
      console.log(element.id);
      let url = '/home?recid='+element.id 
      navigate(url);

    })
    });
  }, 3000);

  const infosection =()=>{
    navigate('/info');
  }

  const logout = async()=>{
    let collect = await fetch('/logout').then(data=>data.json()).then(d=>d);
    if(collect.success == true){
      navigate('/login');
    }
  }
  setTimeout(() => {
    manipulatingmessages();
    manipulatingchatrooms();
  }, 7000);
  return (
    <div className="back">
    <div className="vanish">
      <div className="reci">
       <IoMdArrowRoundBack className="posiwala" size="1.8em" onClick={imgcancel} />
        <h2>Enter Phone Number:</h2>
        <input className="enterph"
         type="number" 
         onChange={inpco1}
         value={field1}>
         </input>
         <span className="sp"></span>
        <button className="adde" onClick={addingurchat}>ADD CHAT</button>
      </div>
    </div>
      <div className="backin">
        <div className="left">
          <div className="search">
            <h1 className="tag">CHATS :-</h1>
            <div className="ico">
              <input type="text" placeholder="search" className="ssre"></input>
              <ImSearch/>
            </div>
          </div>
          
          {/* <h1 className="tag" id="dd">Personal Chat :-</h1> */}
          <div className="addnew" onClick={addpchat}>
            <h2 className="sas" > Add New Chat</h2>
            <div className="imgs">
             <BiUserPlus size="1.5em" />
            </div>
          </div>
          <div className="scrollbody">
          {chatting.map((vals)=>{
           return(
            <div className="messagebox" id={vals.recieverid}>
             <div className="logoofgroup">
              <IoLogoReddit size="1.5em"  />
             </div>
             <div className="mss">
              <h2 className="grp">{vals.usern}</h2>
              <p className="para">{vals.phone}</p>
             </div>
            </div>
            )
          })}
          </div>
        </div>
        <div className="right">
          <div className="details">
            <div className="imagelogo">
              <TiGroup  size="1.5em" />
            </div>
            <div className="insidedetails">
               Group Chat 
            </div>
            <div className="info">
               <MdOutlineInfo size="1.5em" onClick={()=>{
                alert("info under maintainance")
              }}/>
            </div>
          </div>
          <div className="msgcont">
          {mess.map((val)=>{
            return(
            <div className={(val.userid==originaluser) ? 'sent' : 'recieved'}>
              <p className="username">{val.usern}</p>
              <p className="message">{val.content}</p>
              <p className="time">{val.time}</p>
            </div>
            )
          })}
          <span id="sds"></span>
           
          </div>
          <div className="textsend">
             <div className="inputfield">
               <input 
               placeholder="Enter Your Message"
               className="ins"
               onChange={inpco}
               value={field}
               
               ></input> 

             </div>
             <div className="sendmessage">
               <button className="sendm" onClick={addmessage}>SEND</button>
             </div>
           </div>
        </div>
        <div className="dummy">
          <div className="options" onClick={infosection}>
            <FaUserCircle size="2.5em" style={{cursor:"pointer"}} />
            <div className="hovi">Profile</div>
          </div>
          <div className="options" >
            <IoLogOutSharp onClick={logout} size="2.5em" style={{cursor:"pointer"}}/>
            <div className="hovi">Logout</div>
          </div>
          <div className="options" >
            <VscFeedback onClick={feed} size="2.5em" style={{cursor:"pointer"}}/>
            <div className="hovi">FeedBack</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Chat;
