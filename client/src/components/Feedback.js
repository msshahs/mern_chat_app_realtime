import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import '../feedback.css'
import {MdOutlineCabin, MdOutlineCancel, MdOutlineInfo} from 'react-icons/md';
import {IoMdArrowRoundBack} from 'react-icons/io';
const Feedback = () => {
    const [arrdet ,setarrdet] = useState({});
    const [textareadet ,settextareadet] = useState("");
    const navigate =useNavigate();
    const hi =(e)=>{
        let o = e.target.value ;
        settextareadet(o);
    }
    useEffect(async() => {
    let udetim = await fetch('/specificuser').then(ds=>ds.json()).then(h=>h);
    setarrdet(udetim.uinf);
    console.log(udetim.uinf);
    console.log(arrdet);
    }, [])

    const senddata = async()=>{
        let sa = document.querySelector('.sa');
        if(textareadet==""){
            sa.style.opacity =1;
            sa.innerText = "Review Cannot be empty"
        }
        else{
            let fes = await fetch('/feedback',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    usename:arrdet.fname,
                    emailofuser : arrdet.email,
                    idofu :arrdet._id,
                    ph:arrdet.number,
                    text:textareadet
                })
            })
            // setarrdet({});
            settextareadet("");
            sa.style.opacity =1;
            sa.innerText = "success"

        }
    }
    const btochat=()=>{
        navigate('/chat');
    }
    
  return (
    <div className='fcont'>
    <div className='bcbt'>
  
        <IoMdArrowRoundBack className='bc1' onClick={btochat} size="2em" color='white' style={{'z-Index':100}}/>
        
    </div>
        <div className='tc'>
        
            <div className='lefttc'>
            <div className='major'>
                <h1 className='s1'>Contact Info</h1>
                <p className='pps'>I am greatful to hear your reviews on this chat app</p>
                <p className='pps'>It will help me grow and improve user exp!</p>
                <h2 className='s3'>meethshah663@gmail.com</h2>
                <h3 className='s2'>8780432383</h3>
                <span className='s4'>Developer : Meet Shah</span>
            </div>
            </div>
            <div className='righttc'>
                <h1 id='ddsw'>Feedback Form</h1>
                <div className='n'>
                    <h3>Name:</h3>
                    <input className='isp1' value={arrdet.fname} name="op">
                    </input>
                </div>
                <div className='n'>
                    <h3>Email:</h3>
                    <input className='isp1' value={arrdet.email} name="op1">
                    </input>
                </div>
                <div className='n'>
                    <h3>PhoneNo:</h3>
                    <input className='isp1' value={arrdet.number} name="op2">
                    </input>
                </div>
                <div className='n'>
                    <h3>Review:</h3>
                    <textarea id='ta' rows="2"  value={textareadet} onChange={hi} name="op3" placeholder='Enter Your Review'/>
                   
                </div>
                <span className='sa'>fdsfws</span>
                <button className='fsubmit' onClick={senddata}>SEND</button>
            </div>
        </div>
    </div>
  )
}

export default Feedback