import React from 'react'
import './Header.css'
import '../pages/auth/themes.css'
const Header = () => {
  return (
    <>
  <header class="main-header">
        <div class="header-content">
            <h1>Website Title</h1>
            <nav class="main-nav">
                
            </nav>
        </div>
    </header>
        <aside class="permanent-sidebar">
        <div class="sidebar-content">
            <h3>Menu</h3>
            <ul class="sidebar-nav">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Messages</a></li>
                <li><a href="#">Settings</a></li>
            </ul>
        </div>
    </aside>
      </>
    
  )
} 

export default Header