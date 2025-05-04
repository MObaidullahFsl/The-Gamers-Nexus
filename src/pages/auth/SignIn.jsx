import React, { useEffect, useState } from "react";
import "./SignIn.css";
import "./themes.css";
import FormField from "../../components/FormField";
import images from "../../assets/images/constants";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

const SignIn = () => {
  const [form, setform] = useState({
    username: "",
    password: "",
  });
  
  const {isDarkMode,toggleDarkMode} = useDarkMode();


  const [mode, setmode] = useState(0);
  // const thumbnails = images.th;
  const navigate = useNavigate();
  const [user, setuser] = useState(null)

  useEffect(()=>{

    const alreadylogged=async()=>{
      try{
        const req = await fetch("http://localhost:5000/api/auth", {
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          }
        });
      
      const retype = req.headers.get("content-type");
      if(!retype || !retype.includes("application/json")){
        throw new Error("ret type err!, ret type is: \n",retype)
      }
      const result = await req.json(); 
      if(result.user){
        console.log(`Already logged in`)
        setuser(result.user)
        navigate('/')
      }else{
        alert("not logged in!")
      } }catch (error) {
        console.error('Error checking authentication:', error);
        
        //navigate('/signin');
      }
    }
   alreadylogged()
  },[navigate])

  
  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async() =>{
    console.log(form);
    if (form.username=="" || form.password=="") {
      alert("Error Fill in all the fields!");
      return;
    }
    setisSubmitting(true);
    try {
      const result = await fetch('http://localhost:5000/api/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },   
        credentials: 'include',
        body: JSON.stringify({
      username: `${form.username}`,
          password: `${form.password}`
        })
     
      })

        if(!result.ok){
          console.log("a:",result);
          // const errString = await result.json();
          
          //throw new Error(errString.message || "ERror");
          throw new Error(`HTTP error! status: ${result.status}`);
          
        }

        const data  = await result.json();
        setuser(data.user);
        
        alert("Logged in Successfully!");
        navigate("/");




    } catch (error) {
      console.error("failed!",error,error.message)
    }finally{
      setisSubmitting(false);
    }
  }
  
  return (
    <div className="main">
      <div className="leftSide">
        <div className="logo" >
          <img onClick={toggleDarkMode} src={isDarkMode ? images.logoDark : images.logoDay} alt="Logo" />
        </div>

        <div className="buttons">
          {mode ? (
            <>
              <div
                className="login "
                onClick={() => {
                  setmode(0);
                  console.log("clicked login");
                }}
              >
                <img src={images.login} alt="login" />

                <div className="logintext">Log In</div>
              </div>

              <div className="createAccount dark">
                <img src={images.createLight} alt="create" />

                <div className="createAccountText dark">Create Account</div>
              </div>
            </>
          ) : (
            <>
              <div className="login dark" >
                <img src={images.loginLight} alt="login" />

                <div className="loginText dark">Log In</div>
              </div>

              <div
                className="createAccount"
                onClick={() => {
                  setmode(1);
                  console.log("dark login");
                  
                }}
              >
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
          handleInput={(e) => setform({ ...form, username: e })}
          value={form.username}
          style={
            isDarkMode
              ? {
                  backgroundColor: "#323232",
                }
              : {
                  backgroundColor: "white",
                }
          }
          type="text"
        />
        <div className="passwordContainer">
          <FormField
            title="Password"
            placeholder="enter your password"
            handleInput={(e) => setform({ ...form, password: e })}
            value={form.password}
            style={
              isDarkMode
                ? {
                    backgroundColor: "#323232",
                    minWidth: "80%",
                    display: "inline",
                  }
                : {
                    backgroundColor: "white",
                    minWidth: "80%",
                    display: "inline",
                  }
            }
            type="password"
          />
          <div className="enter" onClick={submit}>
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
            <img
              className="google"
              src={isDarkMode ? images.googleDark : images.google}
              alt="google"
            />
          </div>
          <div>
            {" "}
            <img
              className="discord"
              src={isDarkMode ? images.discordDark : images.discord}
              alt="google"
            />
          </div>
          <div>
            {" "}
            <img
              className="instagram"
              src={isDarkMode ? images.instagramDark : images.instagram}
              alt="google"
            />
          </div>
          <div>
            {" "}
            <img
              className="whatsapp"
              src={isDarkMode ? images.whatsappDark : images.whatsapp}
              alt="google"
            />
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
            
            <img
              src={isDarkMode ? images.arrowDark : images.arrow}
              alt="arrow left"
            />
          </div>
          <div className="right">
            
            <img
              src={isDarkMode ? images.arrowDark : images.arrow}
              alt="arrow left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
