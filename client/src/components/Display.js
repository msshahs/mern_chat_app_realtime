import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../display.css'
const Display = () => {
    const navigate = useNavigate();
  useEffect(() => {
    checkitasasp1();
  }, [])
  const checkitasasp1 = async()=>{
    let cda = await fetch('/authenticateuser').then(f=>f.json()).then(k=>k);
    if(cda.success){
        navigate('/chat');
    } 
}

  return (
    <div className='saee'>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>
    <div className='wel'>WELCOME TO</div>
    <div className="waviy">
   <span style={{'--i':1}} id="s1" className='aass'>C</span>
   <span style={{'--i':2}} id="s2" className='aass'>O</span>
   <span style={{'--i':3}} id="s3" className='aass'>R</span>
   <span style={{'--i':4}} id="s4" className='aass'>E</span>
   <span style={{'--i':5}} id="s5" className='aass'></span>
   <span style={{'--i':6}} id="s6" className='aass'>C</span>
   <span style={{'--i':7}} id="s7" className='aass'>H</span>
   <span style={{'--i':8}} id="s8" className='aass'>A</span>
   <span style={{'--i':9}} id="s9" className='aass'>T</span>
   <span style={{'--i':1}} id="s10" className='aass'></span>
   <span style={{'--i':2}} id="s11" className='aass'>A</span>
   <span style={{'--i':3}} id="s12" className='aass'>P</span>
   <span style={{'--i':4}} id="s13" className='aass'>P</span>

  </div>
  <div className='btnopt'>
      <button className='in' onClick={()=>{
          navigate('/signup')
      }}>
          SIGN IN 
      </button>
      <button className='out' onClick={()=>{
          navigate('/login')
      }}>
        LOGIN
      </button>
  </div>
    </div>
  )
}

export default Display