import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import HomeLayout from "./pages/main/Layout";
import Home from "./pages/main/Home";
import Profile from "./pages/main/Profile";
import Search from "./pages/main/Search";
import GameCard from "./pages/main/GameCard";
import SignIn from "./pages/auth/SignIn";
import Wishlist from "./pages/sales/Wishlist";
import BuyNow from "./pages/sales/BuyNow";

function App() {
  return (
    
      <DarkModeProvider style={{margin:0, padding:0}} basename="/The-Gamers-Nexus">
        <BrowserRouter basename="/The-Gamers-Nexus">
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="games/:id" element={<GameCard />} />
              <Route path="search" element={<Search />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="buynow" element={<BuyNow />} />
              <Route path="search" element={<Search />} />
            </Route>
            
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    
  );
}

export default App;
