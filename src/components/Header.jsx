import React, { useState } from 'react'
import './Header.css'
import '../pages/auth/themes.css'
import images from '../assets/images/constants'
import { DarkModeProvider, useDarkMode } from '../context/DarkModeContext'

const Header = () => {

  const {isDarkMode,toggleDarkMode} = useDarkMode()
  const [searchQuery, setsearchQuery] = useState('')
  return (
    <>

  <header className="main-header">
        <div className="header-content">
            <div className="back-arrow">
              <img className="arrow" src={images.arrow} alt="" srcset="" />
            </div>
            <div className="search">
              <img className="search-icon" src={images.search} alt="" srcset="" />
              <form action="/search" method="get">
              <input type="text" 
              placeholder='search'
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
            <nav className="sec-nav"
            >
              <div className="wishlist">
                Wishlist
              </div>
              <div className="cart">
                Cart
              </div>

            </nav>
            <div className="avatar">
              <img  src={images.avatar} alt="" srcset="" />
            </div>
        </div>
    </header>
        <aside className="permanent-sidebar">
        <div className="sidebar-content">
            <img className="logo" onClick={toggleDarkMode} src={isDarkMode?images.logoDark:images.logoDay} alt="" srcset="" />
            <ul className="sidebar-nav">
                <li><img className="store" src={images.store} alt="" srcset="" /><a href="#">Store</a></li>
                <li><img className="library" src={images.library} alt="" srcset="" /><a href="#">Library</a></li>
            </ul>
        </div>
    </aside>
      </>
    
  )
} 

export default Header