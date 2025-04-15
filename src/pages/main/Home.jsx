import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include", 
      });
  
      const result = await response.json();
      if (result.message) {
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const req = await fetch("http://localhost:5000/api/auth", {
          credentials: "include",
        });
        const res = await req.json();

        if (res.user) {
          setUser(res.user);
          fetchLibrary(res.user.id); 
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
  const fetchLibrary = async () => {
    try {
      const req = await fetch("http://localhost:5000/api/library", {
        method: "GET",
        credentials: "include",
      });
  
      const res = await req.json();
  
      if (res.error) {
        console.error("Library fetch failed:", res.error);
      } else {
        setLibrary(res); 
      }
    } catch (error) {
      console.error("Error fetching library:", error);
    }
  };
  
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h2>Welcome, {user ? user.username : "Guest"}</h2>
      <h3>Your Game Library:</h3>
      {library.length > 0 ? (
        <ul>
          {library.map((game) => (
            <li key={game.id}>
              <strong>{game.title}</strong> - Published on {game.publish_date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No games found in your library. </p>

      )}
      <button className="btn" onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
