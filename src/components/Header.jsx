import React, { useEffect, useState } from 'react'
import './Header.css'
import '../pages/auth/themes.css'
import images from '../assets/images/constants'
import { DarkModeProvider, useDarkMode } from '../context/DarkModeContext'
import { useNavigate } from "react-router-dom";


const Header = () => {

  const {isDarkMode,toggleDarkMode} = useDarkMode()
  const [searchQuery, setsearchQuery] = useState('')
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Cleanup flag
    
    const getUser = async () => {
      try {
        const req = await fetch('http://localhost:5000/api/auth', {
          credentials: 'include',
        });

        if (!req.ok) {
          throw new Error(`HTTP error! status: ${req.status}`);
        }
        if(req === null){
          throw new Error(`Null error!`); 
        }
        const res = await req.json();
        console.log("API response:", res);
        // Only update state if component is still mounted
        if (isMounted) {
          setUser(res.user);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch user data');
          console.error('Auth fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    getUser();
    console.log("user:",user);

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  // Render states
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading user profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>⚠️ Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  
  return (
    <>

  <header className="main-header">
        <div className="header-content">
            <div className="first">
              <img className="arrow" src={images.menuArrow} alt="" srcset="" />
            
            <div className="search">
              <img className="search-icon" src={images.search} alt="" srcset="" />
              <form action="/search" method="get">
              <input type="text" 
              placeholder='Search Store'
              value={searchQuery}
              onChange={(e)=>{setsearchQuery(e.target.value)}}
              className='search-input'
              />
              
              </form>
            </div>
            <nav className="main-nav">
                <div className="discover">
                  Discover
                </div>
                <div className="browse">
                  Browse
                </div>
                <div className="news">
                  News
                </div>
            </nav>
            </div>
            <nav className="sec-nav"
            >
              <div className="wishlist">
                Wishlist
              </div>
              <div className="cart">
                Cart
              </div>

            </nav>
            <div  onClick={()=>navigate('/Profile')} className="avatar">
              {user.username[0]}
            </div>
        </div>
    </header>
        <aside className="permanent-sidebar">
        <div className="sidebar-content">
            <img className="logo" onClick={toggleDarkMode} src={isDarkMode?images.logoDark:images.logoDay} alt="" srcset="" />
            <ul className="sidebar-nav">
                <li onClick= {()=>navigate(`/`)}><img className="store" src={images.store} alt="" srcset="" /><a href="">Store</a></li>
                <li><img className="library" src={images.library} alt="" srcset="" /><a href="#">Library</a></li>
            </ul>
        </div>
    </aside>
      </>
    
    
  )
} 

export default Header