import React, { useEffect, useState } from "react";
import images from "../../assets/images/constants";
import { DarkModeProvider, useDarkMode } from "../../context/DarkModeContext";
import "./HorizontalBar.css";
import { useNavigate } from "react-router-dom";


function HorizontalBar({ title, list }) {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    
    const navigate = useNavigate();
  return (
    <div className="horMain">
      <div className="topLine">
        <div className="topLineTitle">
          {title}
        </div>
          <img src={images.arrowDark} alt="" srcset="" />
        <div className="arrows">
          <div className="l">
            <img
              src={isDarkMode ? images.arrowDark : images.arrow}
              alt="arrow left"
            />
          </div>
          <div className="r">
            <img
              src={isDarkMode ? images.arrowDark : images.arrow}
              alt="arrow left"
            />
          </div>
        </div>
      </div>
      <div className="midLine">
        <div className="Hcards">
          <div className="1st">
            <img onClick= {()=>navigate(`/games/${list[0].id}`,{state:list[0] })} src={list[0].thumbnailUrl} alt="" srcset="" />
            Base Game
            <div className="T">{list[0].title}</div>
          </div>
          <div className="2nd">
          <img onClick= {()=>navigate(`/games/${list[1].id}`,{state:list[1] })} src={list[1].thumbnailUrl} alt="" srcset="" />
            Base Game
            <div className="T">{list[1].title}</div>
          </div>
          <div className="3rd">
          <img onClick= {()=>navigate(`/games/${list[2].id}`,{state:list[2] })} src={list[2].thumbnailUrl} alt="" srcset="" />
            Base Game
            <div className="T">{list[2].title}</div>
          </div>
          <div className="4th">
          <img onClick= {()=>navigate(`/games/${list[3].id}`,{state:list[3] })} src={list[3].thumbnailUrl} alt="" srcset="" />
            Base Game
            <div className="T">{list[3].title}</div>
          </div>
          <div className="5th">
          <img onClick= {()=>navigate(`/games/${list[4].id}`,{state:list[4] })} src={list[4].thumbnailUrl} alt="" srcset="" />
            Base Game
            <div className="T">{list[4].title}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalBar;
