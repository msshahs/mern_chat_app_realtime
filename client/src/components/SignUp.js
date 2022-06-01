import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../signup.css'

const SignUp = () => {
    const navigate =useNavigate();
    useEffect(() => {
      checkitasasp();
    }, )
 
    const lis = document.querySelector('.dfds');

    const checkitasasp = async()=>{
        let cda = await fetch('/authenticateuser').then(f=>f.json()).then(k=>k);
        if(cda.success){
            navigate('/chat');
        } 
    }
    const[current,setUpdated]=useState({
        fname:"",
        lname:"",
        num:0,
        email:"",
        pass:"",
        cpass:"",
        desc:""
      });
      const[live,setLive] = useState("")
  
    const inputChange = (e)=>{
    const lis = document.querySelector('.dfds');

        console.log(e.target.value);
    
        let crntval = e.target.value;
        let fieldname = e.target.name;
        
        // console.log(crntval,fieldname);
    
        setUpdated((preval)=>{
    
          return  {
            ...preval,
            [fieldname]:crntval
          }
    
    
        })
      }
      const saveit =  async(e)=>{

        e.preventDefault();
        if(current.fname=="" || current.lname=="" || current.num == 0 || current.email=="" || current.pass=="" || current.cpass=="" ){
            lis.style.display ='block';
            lis.innerText = 'Fields Cannot be Empty';
        }
        else{
            if(current.fname.length <3 || current.lname.length <3 || current.desc.length<3 ||current.pass.length<3 || current.cpass.length<3 || current.email.length<3 || current.num.length !=10 ){
                lis.style.display ='block'; 
                lis.innerText = 'Each Field atleast 3 characters and number field 10 characters !';
            }
            else{
                var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(!current.email.match(validRegex))
                {
                    lis.style.display ='block'; 
                    lis.innerText = 'Email must be correct - Try Again!';
                }
                else{
                    if(current.pass!=current.cpass ){
                        lis.style.display ='block';
                        lis.innerText = 'Passwords are not matching !!';
                    }
                    else{
                         lis.style.display ='none';
                        //  setLive(current);
                         const {fname,lname,num,email,pass,cpass,desc}=current;
                        console.log(current);
                        const impdata = await fetch('/createnewuser',{
                            method:'POST',
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify({
                                fname,lname,num,email,pass,cpass,desc
                            })
                     })
                    
                     if(impdata.status === 422){
                        lis.style.display ='block'; 
                        lis.innerText = 'User With This Email Already Exist !';
                     }
                     else if(impdata.status===400){
                        lis.style.display ='block'; 
                        lis.innerText = 'Connectivity Issues With Database !';
                     }
                     else{
                         alert('Sign Up Successful')
                         navigate('/chat')
                     }
                      
                    }
                }
               
            }
        }
     
      
        
       
      
      };
  return (
   <>
       <div className='main'>
       <div class="circle1">

</div>
<div class="circle2">

</div>
<div class="circle3">

</div>
<div class="circle4">

</div>
            <div className='insidecontainer'>

                <form className='formdata' method='POST'>
                    <div className='logo'>
                        <h1>
                            <span>R</span>ealtime <span>C</span>hat 
                        </h1>
                        <h2>SIGN UP</h2>
                    </div>

                   <div className='onelogo'>
                   <label for ='tex'>First Name :</label>
                    <input 
                    type="text"
                     placeholder='Enter Your First Name'
                     id='tex'
                     onChange={inputChange} 
                     name="fname"  
                     value={current.fname}
                     required />
                    </div>

                    <div className='onelogo'>
                    <label for ='tex1'>Last Name :</label>
                    <input 
                    type="text" 
                    id='tex1' 
                    placeholder='Enter Your Last Name' 
                    onChange={inputChange} 
                    name="lname" 
                    value={current.lname}
                    required />
                    </div>

                    <div className='onelogo'>
                    <label for ='tex2'> Phone Number :</label>
                    <input type="number" id='tex2' placeholder='Enter Your Number' onChange={inputChange} value={current.num} name="num" required />
                    </div>

                    <div className='onelogo'>
                    <label for ='tex3'>Email:</label>
                    <input type="email" id='tex3' placeholder='Enter Your Email' value={current.email} onChange={inputChange} name="email" required />
                    </div>
                    <div className='onelogo'>
                    <label for ='tex6'>Password :</label>
                    <input type="password" id='tex6' placeholder='Enter Your Password' value={current.pass} onChange={inputChange} name="pass" required />
                    </div>
                    <div className='onelogo'>
                    <label for ='tex5'>Confirm Password :</label>
                    <input type="password" id='tex5' placeholder='Enter Your Password Again' value={current.cpass} onChange={inputChange} name="cpass" required />
                    </div>

                    <div className='onelogo'>
                    <label for ='tex4'>Description:</label>
                    <textarea id='tex4' rows="2" onChange={inputChange} value={current.desc} name="desc" placeholder='Enter Your Description'/>
                    </div>
                    <h3 className='show1' style={{textAlign:'center', fontSize:'15px',fontWeight:'bold'}} onClick={()=>{
            navigate('/login')
          }}>Already have an Account ?</h3>
                    <input type='submit' onClick={saveit} value="CREATE" className='sub' />
                    <span className='dfds'>sjhh</span>
                </form>

            </div>

       </div>
   </>
  )
}


export default SignUp
