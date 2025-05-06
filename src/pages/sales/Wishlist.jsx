import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import VerticleBar from "../../components/Menu/VerticleBar";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [wishlistError, setWishlistError] = useState(null);
    const [session, setSession] = useState(null); // Renamed to setSession (convention)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        
        const getUser = async () => {
            try {
                const req = await fetch('http://localhost:5000/api/auth', {
                    credentials: 'include',
                });

                if (!req.ok) {
                    throw new Error(`HTTP error! status: ${req.status}`);
                }
                
                const res = await req.json();
                console.log("API response:", res);
                
                if (isMounted) {
                    setSession(res.user); // Use renamed setter
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

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!session?.id) {
            console.log("No user session found");
            return;
        }

        const fetchWishlist = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/user/${session.id}/details`, {
                    credentials: "include",
                });
                
                if (!res.ok) throw new Error("Failed to fetch wishlist");
                
                const data = await res.json();
                setWishlist(data);
                console.log("fetched:",wishlist)
            } catch (err) {
                setWishlistError(err.message);
                console.error("Wishlist error:", err);
            }
        };
        
        fetchWishlist();
    }, [session]); // Dependency on session, not just session.id

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
    if(wishlist == null){
        return(
            <div>
                Empty list
            </div>
        )
    }

    return (
        <div className="mainW">
            <div className="titleW">
                Your Wishlist
            </div>
            <VerticleBar
                title="Games You Want To Buy"
                list={wishlist}
            />
        </div>
    );
}

export default Wishlist;