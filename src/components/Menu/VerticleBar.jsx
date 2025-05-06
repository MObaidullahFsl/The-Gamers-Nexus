import React, { useEffect, useState } from "react";
import images from "../../assets/images/constants";
import { DarkModeProvider, useDarkMode } from "../../context/DarkModeContext";
import "./VerticleBar.css";
import { useNavigate } from "react-router-dom";


function VerticleBar({ title, list }) {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    console.log("wishlist",list);
    const navigate = useNavigate();

  return (
    <div className="VerMain">
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
       <div className="Vcards">
  {list.map((game, index) => (
    <div key={index} className={`${index + 1}th`}>
      <img
        onClick={() => navigate(`/games/${game.game_id}`, { state: game })}
        src={game.thumbnailUrl}
        alt={game.title}
      />
      Base Game
      <div className="T">{game.title}</div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default VerticleBar;
