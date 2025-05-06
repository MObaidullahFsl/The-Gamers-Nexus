import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Search() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchGames = async () => {
      try {
        const query = new URLSearchParams(location.search).get('q');
        if (!query) return;

        const response = await fetch(`http://localhost:5000/api/games/search?title=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    searchGames();
  }, [location.search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {games.length > 0 ? (
        <ul>
          {games.map(game => (
            <li key={game.id}>{game.title}</li>
          ))}
        </ul>
      ) : (
        <p>No games found</p>
      )}
    </div>
  );
}

export default Search;