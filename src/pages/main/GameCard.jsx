import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const GameCard = () => {
  const [game, setgame] = useState(null)
 const extraDes = ['Exciting Gameplay','Inclusive characters','Exciting Action'] 
 
  const location = useLocation();
  const gameState = location.state;

  return (
  
   <div className="mainGC">
    <div className="leftGC">

    <div className="headerGC">

    <div className="titleGC">{gameState.title}</div>
    <div className="ratingGC">
      <div className="star"></div>
      <div className="score"></div>
    </div>
    <div className="ShortDesc"></div>

    </div>
<div className="mainGC">
  <div className="tabGC">

  </div>
  <div className="trailer">
  <iframe
        width="600"
        height="350"
        borderRadius="30%"
        src={gameState.trailerUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> 

  </div>
</div>
    </div>
    <div className="rightGC">
      
    </div>
   </div>
  

  )
}

export default GameCard