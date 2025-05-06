import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './GameCard.css'
import images from "../../assets/images/constants";
const GameCard = () => {
  const [game, setgame] = useState(null)
  const [loading, setLoading] = useState(true);
  
  
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);
  
  const pricer = () => {
    const min = 9.99;
    const max = 59.99;
    return `$${(Math.random() * (max - min) + min).toFixed(2)}`;
  };
  
  
  const navigate = useNavigate();
   useEffect(() => {
      const checkAuth = async () => {
        try {
          const req = await fetch("http://localhost:5000/api/auth", {
            credentials: "include",
          });
          const res = await req.json();
  
          if (res.user) {
            console.log("")
          } else {
            navigate("/signin");
          }
        } catch (error) {
          console.error("Auth check fail!", error);
          navigate("/signin");
        } finally {
          setLoading(false);
        }
      };
  
      checkAuth();
    }, [navigate]);

  const extraDes = [
    '\uD83C\uDFAE    Exciting Gameplay',        // 🎮
    '\uD83C\uDF0D    Inclusive Characters',      // 🌍
    '\uD83D\uDCA5    Exciting Action',           // 💥
    '\uD83D\uDCD6    Immersive Storyline',       // 📖
    '\uD83C\uDFA8    Stunning Visuals',          // 🎨
    '\uD83C\uDFB5    Dynamic Soundtrack',        // 🎵
    '\uD83D\uDC65    Multiplayer Mode',          // 👥
    '\uD83D\uDDFA\uFE0F    Open-World Exploration', // 🗺️
    '\uD83D\uDC64    Customizable Avatars',      // 👤
    '\uD83C\uDFC6    Challenging Quests',        // 🏆
    '\u269B\uFE0F    Realistic Physics',         // ⚛️
    '\u2694\uFE0F    Fast-Paced Combat',         // ⚔️
    '\uD83D\uDE22    Emotional Narrative',       // 😢
    '\uD83D\uDD8C\uFE0F    Unique Art Style',    // 🖌️
    '\uD83C\uDFB2    Procedural Generation',     // 🎲
    '\uD83E\uDD1D    Co-op Campaign',            // 🤝
    '\uD83C\uDFC5    Competitive Leaderboards',  // 🏅
    '\uD83D\uDC53    VR Support',                // 👓
    '\uD83D\uDEE0\uFE0F    Modding Community',   // 🛠️
    '\uD83D\uDD04    Regular Updates'            // 🔄
  ];
  const location = useLocation();
  const gameState = location.state;

  const [randomCount, setRandomCount] = useState(0);
  const [randomWords, setRandomWords] = useState([]);

  useEffect(() => {
    
    const count = Math.floor(Math.random() * 4); // 0-3 inclusive
    setRandomCount(count);

    // 2. Generate array of unique random words
    if (count > 0) {
      const shuffled = [...extraDes].sort(() => 0.5 - Math.random());
      const selectedWords = shuffled.slice(0, count);
      setRandomWords(selectedWords);
    } else {
      setRandomWords([]); // Handle case where count is 0
    }
  }, []); 
  const handleBuy = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/${userId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // for session cookies
        body: JSON.stringify({ gameId: game.id })
      });
  
      if (!res.ok) throw new Error('Purchase failed');
  
      const data = await res.json();
      alert(data.message); // or toast
    } catch (err) {
      console.error("Buy error:", err);
      alert("Something went wrong while buying: Lack of Funds.");
    }
  };
    if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
  
   <div className="mainGC">
    <div className="leftGC">

    <div className="headerGC">

    <div className="titleGC">{gameState.title}</div>
    <div className="ratingGC">
      <div className="star"><img src={images.star} alt="" srcset="" />
      <img src={images.star} alt="" srcset="" />
      <img src={images.star} alt="" srcset="" />
      <img src={images.star} alt="" srcset="" />
      <img src={images.star} alt="" srcset="" />
      </div>
      <div className="score">4.9</div>
    <div className="ShortDesc">
    {randomWords.map((word, index) => (
        <div key={index} className="emoji-item">
          <span className="emoji">{word.match(/\p{Emoji}/u)?.[0]}</span>
          <span>{word.replace(/^\p{Emoji}\s?/u, '')}</span>
        </div>
      ))}
      
      {randomCount === 0 && (
        <div className="empty-state">✨ No features selected ✨</div>
      )}
    </div>
    </div>

    </div>
<div className="centerGC">
  <div className="tabGC">
      Overview
  </div>
  <div className="trailerGC">
  <iframe
        width="600"
        height="350"
        borderradius="30px"
        src={gameState.trailerUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> 
    <div className="desc1">
    Lead the members of Expedition 33 on their quest to destroy the Paintress - so she can never paint death again. Explore a world of wonders inspired by Belle Époque France and battle unique enemies in this turn-based RPG with real-time mechanics.
    </div>
    <div className="genresFeatures">
      <div className="genres"></div>
      <div className="features"></div>
    </div>
  </div>
</div>
    </div>
    <div className="rightGC">
      <div className="thumbnailGC">
        <img src={gameState.thumbnailUrl} alt="" />
      </div>
      <div className="baseGame">Base Game</div>
      <div className="price">
      {pricer()}
      </div>
      <div className="buttonsGC">
      <div onClick={handleBuy}>Buy Now</div>
        <div className="addtocart">Add to Cart</div>
        <div className="wishlist">Wish List</div>
      </div>
    </div>
   </div>
  

  )
}

export default GameCard