import React, { useEffect, useState } from 'react'
import './Profile.css'
const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      let isMounted = true; // Cleanup flag
      
      const getUser = async () => {
        try {
          const req = await fetch('http://localhost:5000/api/auth', {
            credentials: 'include',
          });
  
          if (!req.ok) {
            throw new Error(`HTTP error! status: ${req.status}`);
          }
          if(req === null){
            throw new Error(`Null error!`); 
          }
          const res = await req.json();
          console.log("API response:", res);
          // Only update state if component is still mounted
          if (isMounted) {
            setUser(res.user);
            setError(null);
          }
        } catch (err) {
          if (isMounted) {
            setError(err.message || 'Failed to fetch user data');
            console.error('Auth fetch error:', err);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
      getUser();
      console.log("user:",user);
  
      return () => {
        isMounted = false; // Cleanup on unmount
      };
    }, []);
  
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
      <div className="headerP">

        <div className="avatarP">
              {user.username[0]}
            </div>
            <div className="descP">
              <div className="titleP">
                {user.username}
              </div>
                  <div className="totalfriends">
                        Total Friends
                        <div>

                        </div>
                  </div>
                  <div className="totalgames">
                    Total Games
                      <div></div>
                  </div>
            </div>
      </div>
            <div className="tabsP">
              <div className="libP">
                Catalog
              </div>
              <div className="FriP">
                Friends
              </div>
            </div>
    </div>
  )
}

export default Profile