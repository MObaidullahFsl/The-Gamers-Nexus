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

function App() {
  return (
    
      <DarkModeProvider style={{margin:0, padding:0}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="games/:id" element={<GameCard />} />
              <Route path="search" element={<Search />} />
            </Route>

            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    
  );
}

export default App;
