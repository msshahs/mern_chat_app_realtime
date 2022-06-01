import React, { useState } from "react";
import "../signin.css";
import {useNavigate} from 'react-router-dom'

const SignIn = () => {
  
    const navigate = useNavigate();
    const [curr,setcurr] = useState("");
    const [cred,setcred] = useState('');
  
    const manipulating =(e)=>{
  
      let fields = e.target.name;
  
      if(fields=='email1'){
        setcurr(e.target.value);
      }
      else{
        setcred(e.target.value);
      }
  
    }
    const hey = async(e)=>{
    const letsdo = document.querySelector('.show');

      e.preventDefault();
  
      if(curr == "" || cred== ""){
        letsdo.style.display="block";
        letsdo.innerText="Fields Cannot be Empty";
      }else{
        if(curr.length<3 || cred.length<3){
          letsdo.style.display="block";
          letsdo.innerText="Fields must be atleast 3 characters";
        }else{
          letsdo.style.display="none";
  
          const userresp = await fetch('/login',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              email:curr,
              password:cred
            })
          }).then((response) => {
            if(response.status === 400){
                console.log("Error");
              }else{
                navigate('/chat');
              }
              return response.json()})
          .then(result => {
            letsdo.style.display="block";
            letsdo.innerText=result.errormsg;
            console.log('Error:', result);
          })
          .catch(error => {
            console.error('Error:', error);
          });

         
          
        }
      }
  
    }
  return (
    <>
      <div className="maincontainer">
      <div class="circle1">

    </div>
    <div class="circle2">

    </div>
    <div class="circle3">

    </div>
    <div class="circle4">

    </div>
        <div className="content">
          <div className="heading">
            <h1>
              <span>R</span>ealtime <span>C</span>hat
            </h1>
            <h2>SIGN UP</h2>
          </div>
          <form method="POST" className="f1">
            <div className="childs">
              <label className="lb" for="t">
                Email :
              </label>
              <input
                className="ip" 
                onChange={manipulating}
                placeholder="Enter Your Email"
                name="email1"
                id="t"
                value={curr}
              ></input>
            </div>
            <div className="childs">
              <label className="lb" for="t12">
                Password :
              </label>
              <input
                className="ip"
                onChange={manipulating}
                placeholder="Enter Your Password"
                name="password1"
                id="t12"
                value={cred}
              ></input>
            </div>
          
          <h3 className='show'>sjhh</h3>
          <h3 className='show1' style={{textAlign:'center', fontSize:'15px',marginTop:'10px',fontWeight:'bold'}} onClick={()=>{
            navigate('/signup')
          }}>Create New Account ?</h3>
          <input type="submit" onClick={hey} value="LOGIN" className="s"></input>
            </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
