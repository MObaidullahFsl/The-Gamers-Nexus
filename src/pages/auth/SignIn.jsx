import React, { useEffect, useState } from "react";
import "./SignIn.css";
import "./themes.css";
import FormField from "../../components/FormField";
import images from "../../assets/images/constants";
const SignIn = () => {
  const [form, setform] = useState({
    username: "",
    password: "",
  });

  const [mode, setmode] = useState(0);
  const [darkmode, setdarkmode] = useState(false)
  // const thumbnails = images.th;

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkmode ? 'dark' : 'light'
    );
  }, [darkmode]);

  return (
    <div className="main">
      <div className="leftSide">
        <div className="logo" onClick={()=>{
          setdarkmode(!darkmode);
        }}>
          <img src={darkmode?images.logoDark:images.logoDay} alt="Logo" />
        </div>

        <div className="buttons">
          {mode ? (
            <>
              <div className="login " 
                onClick={() => {
                  setmode(0);
                  console.log("clicked login")
                }}>
                <img src={images.login} alt="login" />

                <div className="logintext">Log In</div>
              </div>

              <div
                className="createAccount dark"
              
              >
                <img src={images.createLight} alt="create" />

                <div className="createAccountText dark">Create Account</div>
              </div>
            </>
          ) : (
            <>
              <div
                className="login dark">
                <img src={images.loginLight} alt="login" />

                <div className="loginText dark">Log In</div>
              </div>

              <div className="createAccount"  onClick={() => {
                  setmode(1);
                  console.log("dark login")
                }}>
                <img src={images.create} alt="create" />

                <div className="createAccountText">Create Account</div>
              </div>
            </>
          )}
        </div>

        <div className="greeting">
          <div className="title">
            Welcome back!<span> User</span>
          </div>
          <div className="msg">Get into your dashboard</div>
        </div>

        <FormField
          title="Username"
          placeholder="enter your username"
          handleInput={(e) => setform({ ...form, email: e })}
          value={form.email}
          
          style={darkmode?{
            backgroundColor:'#323232',

          }:{
            backgroundColor:'white',
          }}
          type="email"
        />
        <div className="passwordContainer">
        <FormField
          title="Password"
          placeholder="enter your password"
          handleInput={(e) => setform({ ...form, password: e })}
          value={form.password}
          style={darkmode?{
            backgroundColor:'#323232',
             minWidth: "80%",display:"inline"

          }:{
            backgroundColor:'white',
             minWidth: "80%",display:"inline"
          }}
          
          type="password"
        />
        <div className="enter">
          <img src={images.enter} alt="enter arrow" />
        </div>

        </div>
       

        <div className="forgot">Forgot Password?</div>
        <div className="continue">
          <div className="text">
            <div className="continueText">or Continue With </div>{" "}
            <div className="line"></div>
          </div>
        </div>

        <div className="icons">
          <div>
            {" "}
            <img className="google" src={darkmode?images.googleDark:images.google} alt="google" />
          </div>
          <div>
            {" "}
            <img className="discord" src={darkmode?images.discordDark:images.discord} alt="google" />
          </div>
          <div>
            {" "}
            <img className="instagram" src={darkmode?images.instagramDark:images.instagram} alt="google" />
          </div>
          <div>
            {" "}
            <img className="whatsapp" src={darkmode?images.whatsappDark:images.whatsapp} alt="google" />
          </div>
        </div>
        {/* 
            <div className="email"></div>

            <div className="password"></div>

            <div className="send"></div>

           */}
      </div>
      <div className="rightSide">
        <div className="arrows">
          <div className="left">
            {" "}
            <img src={darkmode?images.arrowDark:images.arrow} alt="arrow left" />
          </div>
          <div className="right">
            {" "}
            <img src={darkmode?images.arrowDark:images.arrow} alt="arrow left" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
