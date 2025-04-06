import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Home = () => {

const [user, setuser] = useState(null)
const [Loading, setLoading] = useState(true);
let navigate = useNavigate();

useEffect(() => {
  const checkauth=async ()=>{

      try {
          const req = await fetch('/api/home',
            {credentials:"include"}
          );
          const res = await req.json();
          if(res.user){
            setuser(res.user);
          }else{
            navigate('/login');
            
          }
      } catch (error) {
          console.error('Auth check fail!',error,error.message)
          navigate('/login')
      }finally{
        setLoading(false);
      }
  }
  checkauth();
}, [navigate])

if(Loading){
  return (
    <h1>Loading...</h1>
  )
}


    return (
      <>
    <div>
      {user?`${user.username}`:"none"}
    </div>
      
      </>
    );
  };
  
  export default Home;
  