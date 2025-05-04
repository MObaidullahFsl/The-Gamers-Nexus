import React, { useEffect, useState } from "react";
import images from '../../assets/images/constants'
import { DarkModeProvider, useDarkMode } from '../../context/DarkModeContext'
import './HorizontalBar.css'

function HorizontalBar({ title,list }) {

    const {isDarkMode,toggleDarkMode} = useDarkMode();


  return (
    <div className="horMain">
      <div className="topLine">
        <div className="topLineTitle">{title}
            <img src={images.arrow} alt="" srcset="" />
        </div>
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
      <div className="midLine">
            <div className="cards">
                <div className="1st">
                    <img src={list[0].thumbnailUrl} alt="" srcset="" />
                    Base Game
                    <div>
                        {list[0].title}
                    </div>

                </div>
                <div className="2nd">
                    
                </div>
                <div className="2nd">
                    
                </div>
                <div className="2nd">
                    
                </div>
                <div className="2nd">
                    
                </div>
            </div>
      </div>
    </div>
  );
}

export default HorizontalBar;
