import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import '../home.css'
import { MdOutlineInfo} from "react-icons/md";
import {IoMdArrowRoundBack} from 'react-icons/io';
import { ImUser } from 'react-icons/im';

const Home = () => {
    const [searchparams] = useSearchParams();
    const [orirecid,setorirecid] = useState('');
    const [pmsgar,setpmsgar] = useState([]);
    const [tempers,settempers] = useState('');
    const [d,setd] = useState({});
    const [oriuserid,setuserid] = useState('');

    const navigate = useNavigate();
    let y;
    useEffect(() => {
    // console.log(searchparams.get('recid'));
    let p = searchparams.get('recid');
    setorirecid(p)
    console.log(p);
    getuserid();
    manipulateusername(p);
    manipulateprivatechatmsgs(p);
    setTimeout(() => {
      again1();
      }, 1000);
    }, []);

    const getuserid =async()=>{
      let collect = await fetch('/authenticateuser').then(res=>res.json()).then(dat=>dat);
      console.log(collect.useit);
      setuserid(collect.useit);
      console.log(oriuserid);

    }
    const manipulateusername = async (pa)=>{
      let url = '/recinfo?recid=' + pa;
      console.log(url);
      let ourdata = await fetch(url).then(da=>da.json()).then(dat=>dat);
      console.log(ourdata);
      setd(ourdata.r);
      console.log(d);
    }

    const again1 = () =>{
      const sds1 = document.querySelector('#sds1');
      sds1.scrollIntoView(); 
    }
    const manipulateprivatechatmsgs = async(pp)=>{
      let s = '/reciever?id='+pp;
      let load = await fetch (s).then(datas=>datas.json()).then(s=>s);
      // setpmsgar(load.usefuldata)
      let ar1 = load.usefuldata
      console.log(ar1);

      setpmsgar(ar1);
    }
    const submitting = ()=>{
      let mytemp = tempers;
      console.log(mytemp);
    // const inpofuser = document.querySelector('.inpofuser');
      if(mytemp==""){
        alert('empty val not allowed');
      }else{
        console.log(mytemp);
        // let temp = inpofuser.value;
        callmyf(mytemp);
        setTimeout(() => {
        manipulateprivatechatmsgs(orirecid);
        }, 1000);
        setTimeout(() => {
        again1(); 
        }, 1500);
        settempers('');
      }
    }
    
    const callmyf =async (t)=>{
      let fs=await fetch('/updateprivatemsgs',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
         rid:orirecid,
         msgcont:t  
      })
    })
  }
  const itischanging = (e)=>{
    let temp1 = e.target.value;
    settempers(temp1);  
  }
  const fscancel = ()=>{
    navigate('/chat');
  }
  const infoshow = ()=>{
    let tempurl ='/info?reg='+orirecid;
    navigate(tempurl);
  }

  setTimeout(() => {
    manipulateprivatechatmsgs(orirecid);
  }, 7000);

  return (
    <div className="chatmainbox">
    <IoMdArrowRoundBack className='ms' size="2em" onClick={fscancel} />
      <div className='chatinbox'>
        <div className='head'>
        <ImUser size="1.5em"/>
          <h2 className='hh2'>{d.fname}</h2>
         <MdOutlineInfo size="1.5em" onClick={infoshow} />
        </div>
        <div className='mainchatcontentbox'>
          {pmsgar.map((impval)=>{
          if((orirecid==impval.rid && oriuserid==impval.sid) || (orirecid==impval.sid && oriuserid==impval.rid)){
            return (
            <div className={(orirecid==impval.rid)?'leftofperson':'rightofperson'}>
          <p className='con'>
          {impval.msgcont}
          </p>
          <span className='timeu'>
            {impval.time1}
          </span>
          </div>
            )
            }
          
          })}
          <span id='sds1'></span>
        </div>
        <div className='inputmsgarea'>
          <input className='inpofuser' value={tempers} onChange={itischanging}>

          </input>
          <button className='btnofuser' onClick={submitting}>SEND</button>
        </div>
      </div>
    </div>
  )
}

export default Home