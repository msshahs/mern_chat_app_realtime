import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../info.css'
import { MdOutlineCancel} from 'react-icons/md';
import { IoMdArrowRoundBack } from "react-icons/io";

const Info = () => {
    const [aruser,setaruser]=useState({});
    const [rs,setrs]=useState('');
    const navigate = useNavigate();
    const [searchparams] = useSearchParams();

    useEffect(() => {
    let p = searchparams.get('reg');
    console.log(p);
    setrs(p);
    callingauth(p);
    }, [])

    const callingauth=async(ps)=>{
        if(ps==null){
            let userimpdet = await fetch('/specificuser').then(res=>res.json()).then(datu=>datu);
            let uimp = userimpdet.uinf;
            console.log(uimp);
            await setaruser(uimp);
        }
        else{
            let uri = '/recinfo?recid='+ps;
            let userimpdet1 = await fetch(uri).then(res=>res.json()).then(datu=>datu);
            let te = userimpdet1.r;
            console.log(userimpdet1);
            console.log(te);
           await setaruser(te);
            // console.log(aruser);
        }
        
    }
    const backtochat =()=>{
        navigate('/chat')
    }
  return (
    <div className='abtpg'>
    <div class="circle1">

</div>
<div class="circle2">

</div>
<div class="circle3">

</div>
<div class="circle4">

</div>
    <IoMdArrowRoundBack className='bck' onClick={backtochat} size="2em" />
        <div className='insideabtpg'>
            <h1 className='myc'>About Me</h1>
            <div className='infocollec'>
                <div className='pr'>
                    <b>First Name </b>:{aruser.fname}
                </div>
                <div className='pr'>
                    <b>Last Name </b>: {aruser.lname}
                </div>
                <div className='pr'>
                    <b>Phone Number </b>: {aruser.number}
                </div>
                <div className='pr'>
                    <b>User ID </b>:{aruser._id}
                </div>
                <div className='pr'>
                    <b>Email </b>:{aruser.email}
                </div>
                <div className='pr'>
                    <b>Description </b>:{aruser.aboutYou}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Info