
import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeLayout from "./pages/main/Layout"
import Home from './pages/main/Home';
import Profile from './pages/main/Profile';
import Search from './pages/main/Search';
import GameCard from './pages/main/GameCard';
import SignIn from './pages/auth/SignIn'

function App() {

  return (
    <>
        <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>
        
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="gamecard" element={<GameCard />} />
          <Route path="search" element={<Search />} />
          
        </Route>
        
        
         <Route path="/signin" element={<SignIn />} /> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
