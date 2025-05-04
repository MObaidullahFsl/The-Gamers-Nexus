import React, { useEffect } from "react";
import { useState } from "react";
import "./Recomended.css";
function Recomended({ list }) {
  const time = 7000; // 7 secs
  const catchers = [
    "Now Available",
    "Get Latest",
    "Play Now",
    "Hot Releases",
    "Just Dropped",
    "Must-Play Titles",
  ];

  const [word, setword] = useState(catchers[0]);
  const [item, setitem] = useState(list[0]);
  const [index, setindex] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval;
    console.log(item);
    if (isActive) {
      interval = setInterval(() => {
        setword((prev) => {
          const curr = catchers.indexOf(prev);
          let next = (curr + 1) % catchers.length;
          setindex(next);
          setitem(list[next]);
          return catchers[next];
        });
      }, time);
    }

    return () => clearInterval(interval);
  }, [isActive, catchers.length]);

  return (
    <>
      <div className="bigCard">
      <div 
  className="vid" 
  style={{ 
    backgroundImage: `url(${item.thumbnailUrl})`, // Removed extra braces
    backgroundSize: 'cover', // Recommended to control sizing
    backgroundPosition: 'center', // Optional: focus area
  }}
></div>
      {/* <div className="vid" style={{ backgroundImage: `url(${{item.thumbnailUrl}})`}}>
       <iframe
        width="100%"
        height="450"
        borderRadius="30%"
        src={item.trailerUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> 
      <img src={item.thumbnailUrl} alt="" srcset="" />
    </div> */}
        <div className="cards">
          <div className="First" >
          <div className="thumbnail">
              <img src={list[(index + 0) % 6].thumbnailUrl} alt="" srcset="" />
            </div>
            <div className="title">{list[(index + 0) % 6].title}</div>
          </div>
          <div className="second">
            <div className="thumbnail">
              <img src={list[(index + 1) % 6].thumbnailUrl} alt="" srcset="" />
            </div>
            <div className="title">{list[(index + 1) % 6].title}</div>
          </div>
          <div className="third">
            <div className="thumbnail">
              <img src={list[(index + 2) % 6].thumbnailUrl} alt="" srcset="" />
            </div>
            <div className="title">{list[(index + 2) % 6].title}</div>
          </div>
          <div className="fourth">
            {" "}
            <div className="thumbnail">
              <img src={list[(index + 3) % 6].thumbnailUrl} alt="" srcset="" />
            </div>
            <div className="title">{list[(index + 3) % 6].title}</div>
          </div>
          <div className="fifth">
            {" "}
            <div className="thumbnail">
              <img src={list[(index + 4) % 6].thumbnailUrl} alt="" srcset="" />
            </div>
            <div className="title">{list[(index + 4) % 6].title}</div>
          </div>
          <div className="sixth">
            {" "}
            <div className="thumbnail">
              <img src={list[(index + 5) % 6].thumbnailUrl} alt="" srcset="" />
            </div>
            <div className="title">{list[(index + 5) % 6].title}</div>
          </div>
        </div>
        <div className="box">
          <div className="line"></div>
        </div>
      </div>
    </>
  );
}

export default Recomended;
