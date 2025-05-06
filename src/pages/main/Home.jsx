import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Recomended from "../../components/Menu/Recomended";
import HorizontalBar from "../../components/Menu/HorizontalBar";
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const [trendingGames, setTrendingGames] = useState([]);
  const [latestEditions, setLatestEditions] = useState([]);
  const [salesGames, setSalesGames] = useState([]);

  const navigate = useNavigate();

  const [doneCount, setDoneCount] = useState(0);
  const markDone = () => setDoneCount(prev => {
    const next = prev + 1;
    if (next >= 2) setLoading(false);
    return next;
  });

  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  useEffect(() => {
    const getRecommended = async () => {
      try {
        const req = await fetch('http://localhost:5000/api/home/recommended', { credentials: "include" });
        if (!req.ok) throw new Error(`Http fetching error!: ${req.status}`);
        const res = await req.json();
        setRecommendations(res);

        const shuffled = shuffleArray(res);
        setTrendingGames(shuffled.slice(0, 5));
        setLatestEditions(shuffleArray(res).slice(0, 5));
        setSalesGames(shuffleArray(res).slice(0, 5));
      } catch (error) {
        console.error('Error fetching recommended games:', error);
        setError(error.message);
      } finally {
        markDone();
      }
    };
    getRecommended();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const req = await fetch("http://localhost:5000/api/auth", { credentials: "include" });
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
        markDone();
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
      if (!res.error) setLibrary(res);
    } catch (error) {
      console.error("Error fetching library:", error);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="mainHome">
      <Recomended list={recommendations} />
      <HorizontalBar title="Trending Games" list={trendingGames} />
      <HorizontalBar title="Latest Editions" list={latestEditions} />
      <HorizontalBar title="Sales" list={salesGames} />
    </div>
  );
};

export default Home;
