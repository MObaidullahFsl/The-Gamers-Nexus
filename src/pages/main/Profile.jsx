import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import images from '../../assets/images/constants'

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [session, setsession] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clicked, setclicked] = useState(0);
  const [friends, setfriends] = useState([]);
  const [games, setgames] = useState([]);
  const [publisherMap, setPublisherMap] = useState({});
  const [friendStats, setFriendStats] = useState({});

  const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#9D4EDD'];
  const logout = async () => {
    await fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.reload(); 
  };
  const location = useLocation();
  const sentuser = location.state;
  

  const fetchFriendsById = async (pid) => {
    const res = await fetch(`http://localhost:5000/api/user/${pid}/friends`, {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    return data;
  };
  
  const fetchGamesById = async (pid) => {
    const res = await fetch(`http://localhost:5000/api/user/${pid}/games`, {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    return data;
  };
  

 useEffect(() => {
    const checkAuth = async () => {
      try {
        const req = await fetch("http://localhost:5000/api/auth", {
          credentials: "include",
        });
        const res = await req.json();

        if (res.user) {
          setsession(res.user);
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
  useEffect(() => {
    if (sentuser) {
      setUser(sentuser);
    }
  }, [sentuser]);
  
  useEffect(() => {
    const fetchPublishers = async () => {
      const map = {};
      for (const game of games) {
        if (!map[game.publisher]) {
          const res = await fetch(`http://localhost:5000/api/user/${game.publisher}`, {
            credentials: "include",
          });
          const data = await res.json();
          map[game.publisher] = data.name; // or whatever field you want
        }
      }
      setPublisherMap(map);
    };
  
    if (games.length > 0) fetchPublishers();
  }, [games]);
  
  useEffect(() => {
    if (!user) return; // Wait for user to be set
  
    let isMounted = true;
  
    const getFriends = async () => {
      try {
        const req = await fetch(`http://localhost:5000/api/user/${user.id}/friends`, {
          credentials: "include",
        });
  
        if (!req.ok) throw new Error(`HTTP error! status: ${req.status}`);
        const res = await req.json();
        if (isMounted) {
          setfriends(res);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to fetch friends");
          console.error("Friends fetch error:", err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    const getGames = async () => {
      try {
        const req = await fetch(`http://localhost:5000/api/user/${user.id}/games`, {
          credentials: "include",
        });
  
        if (!req.ok) throw new Error(`HTTP error! status: ${req.status}`);
        const res = await req.json();
        if (isMounted) {
          setgames(res);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to fetch games");
          console.error("Games fetch error:", err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    getGames();
    getFriends();
  
    return () => {
      isMounted = false;
    };
  }, [user]); 

  useEffect(() => {
    const loadStats = async () => {
      const stats = {};
      for (const friend of friends) {
        const [f, g] = await Promise.all([
          fetchFriendsById(friend.id),
          fetchGamesById(friend.id),
        ]);
        stats[friend.id] = { totalFriends: f.length, totalGames: g.length };
      }
      setFriendStats(stats);
    };
  
    if (friends.length > 0) {
      loadStats();
    }
  }, [friends]);
  
  const [userStats, setUserStats] = useState({ totalFriends: null, totalGames: null });

useEffect(() => {
  const fetchStats = async () => {
    if (!user) return;
    const friends = await fetchFriendsById(user.id);
    const games = await fetchGamesById(user.id);
    setUserStats({ totalFriends: friends.length, totalGames: games.length });
  };
  fetchStats();
}, [user]);


const removeFriend = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/friends/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      setfriends((prev) => prev.filter((f) => f.id !== id));
    } else {
      console.error(data.error || "Failed to remove friend");
    }
  } catch (err) {
    console.error("Remove error:", err);
  }
};

  // Render states
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading user profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>⚠️ Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  return (
    <div className="mainP">
      <div className="idk">

      <div className="headerP">
        <div className="avatarP">{user.username[0]}</div>
        <div className="descP">
          <div className="titleP">{user.username}</div>
          <div className="totalP">
            <div className="totalfriends">
              Total Friends
              <div>{userStats.totalFriends ?? '...'}</div>
            </div>
            <div className="totalgames">
              Total Games
              <div>{userStats.totalGames ?? '...'}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="logoutP">
        <img onClick={logout} src={images.loginLight} alt="" srcset="" />
      </div>
      </div>
      {clicked === 0 ? (
        <>
          <div className="tabsP">
            <div className="libP clickedP">Catalog</div>
            <div onClick={() => setclicked(1)} className="FriP">
              Friends
            </div>
          </div>

          <div className="contentP">
            {games.map((game, index) => (
              <div className="gameCardP" key={index} onClick= {()=>navigate(`/games/${game.id}`,{state:game })}>
                <img className="thumbnailP" src={game.thumbnailUrl} alt="" />

                <div className="cardDescP">
                  <div className="cardtitleP">{game.title}</div>
                  <div className="publishedP">
                      Published By: {publisherMap[game.publisher] }
                    </div>

                  <div className="pubDateP">
                    Published At: {game.publish_date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
          <>
        <div className="tabsP">
          <div onClick={() => setclicked(0)} className="libP">
            Catalog
          </div>
          <div className="FriP clickedP">Friends</div>
        </div>

        

        <div className="contentP">
  {friends.map((friend, index) => {
    const color = colors[index % colors.length]; 
    return (
      <div className="friendP" key={index}>
        <div
          className="cardavatarP"
          onClick={() => navigate(`/Profile/${friend.id}`, { state: friend })}
          style={{ backgroundColor: color }}
        > 
          {friend.username[0]}
        </div>

        <div className="cardDescP">
          <div className="cardtitleP">{friend.username}</div>  
          <div className="publishedP">
            Total Friends: {friendStats[friend.id]?.totalFriends ?? '...'}
          </div>
          <div className="pubDateP">
            Total Games: {friendStats[friend.id]?.totalGames ?? '...'}
          </div>
          <div className="removeFriend" onClick={() => removeFriend(friend.id)}>
            Remove Friend
          </div>
        </div>
      </div>
    );
  })}
</div>

          </>
        
      )}
    </div>
  );
};

export default Profile;
      //   const getUser = async () => {
      //     try {
      //       const req = await fetch("http://localhost:5000/api/auth", {
      //         credentials: "include",
      //       });
    
      //       if (!req.ok) {
      //         throw new Error(`HTTP error! status: ${req.status}`);
      //       }
      //       if (req === null) {
      //         throw new Error(`Null error!`);
      //       }
      //       const res = await req.json();
      //       console.log("API response User:", res);
      //       // Only update state if component is still mounted
      //       if (isMounted) {
      //         setUser(res.user);
      //         setError(null);
      //       }
      //     } catch (err) {
      //       if (isMounted) {
      //         setError(err.message || "Failed to fetch user data");
      //         console.error("Auth fetch error:", err);
      //       }
      //     } finally {
      //       if (isMounted) {
      //         setLoading(false);
      //       }
      //     }
      //   };
