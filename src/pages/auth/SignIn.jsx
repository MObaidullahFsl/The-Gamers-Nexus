import React from "react";
import "./SignIn.css";
import images from "../../assets/images/constants";
const SignIn = () => {
  return (
    <div className="main">
    
      <div className="leftSide">
    
        <div className="logo">
    
          <img src={images.logoDay} alt="Logo" />
    
        </div>
    
        <div className="buttons">
    
          <div className="login">
    
            <img src={images.login}  alt="login" />
    
            <div>Log In</div>
    
          </div>
    
          <div className="createAccount">
    
            <img src={images.create} alt="create" />
    
            <div>Create Account</div>
    
          </div>
    
        </div>

        <div className="greeting">

            <div className="title">
            Welcome back!<span> User</span>
            </div>
            <div className="msg">Get into your dashboard</div>
        </div>
        <div className="forgot">Forgot Password?</div>
        <div className="continue"> 
            <div className="text">
            <div className="continueText">or Continue With </div> <div className="line"></div>
            </div>
          
           

        </div>

        <div className="icons">

<div > <img className="google" src={images.google} alt="google" /></div>
<div >  <img className="discord" src={images.discord} alt="google" /></div>
<div > <img className="instagram" src={images.instagram} alt="google" /></div>
<div >  <img className="whatsapp" src={images.whatsapp} alt="google" /></div>

</div>
        {/* 
            <div className="email"></div>

            <div className="password"></div>

            <div className="send"></div>

           */}
      </div>
      <div className="rightSide">
            <div className="arrows">
                
              <div className="left"> <img src={images.arrow} alt="arrow left" /></div>
              <div className="right"> <img src={images.arrow} alt="arrow left" /></div>
            </div>

      </div>

           


    </div>
  );
};

export default SignIn;
