import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & Routing
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '') || '/';
    return hash;
  });
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const handleHashChange = () => {
      const fullPath = window.location.hash.replace('#', '') || '/';
      const [path, query] = fullPath.split('?');
      setRoute(path || '/');
      if (query) {
        const search = new URLSearchParams(query);
        const params = Object.fromEntries(search.entries());
        setQueryParams(params);
      } else {
        setQueryParams({});
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path, params = {}) => {
    let target = path;
    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      target += `?${queryString}`;
    }
    window.location.hash = target;
  };

  // State Collections
  const [stats, setStats] = useState(INITIAL_DATA.stats);
  const [teams, setTeams] = useState(INITIAL_DATA.teams);
  const [players, setPlayers] = useState(INITIAL_DATA.players);
  const [creators, setCreators] = useState(INITIAL_DATA.creators);
  const [staff, setStaff] = useState(INITIAL_DATA.staff);
  const [tournaments, setTournaments] = useState(INITIAL_DATA.tournaments);
  const [bracketMatches, setBracketMatches] = useState(INITIAL_DATA.bracketMatches);
  const [matchHistory, setMatchHistory] = useState(INITIAL_DATA.matchHistory);
  const [podcasts, setPodcasts] = useState(INITIAL_DATA.podcasts);
  const [mediaContent, setMediaContent] = useState(INITIAL_DATA.mediaContent);
  const [merchProducts, setMerchProducts] = useState(INITIAL_DATA.merchProducts);
  const [sponsors, setSponsors] = useState(INITIAL_DATA.sponsors);

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('eternals_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('eternals_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (product, size) => {
    const selectedSize = size || (product.sizes ? product.sizes[0] : 'Standard');
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product._id === product._id && item.selectedSize === selectedSize);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      }
      return [...prev, { id: `${product._id}-${selectedSize}-${Date.now()}`, product, selectedSize, quantity: 1 }];
    });
    showToast(`Added "${product.title}" to cart!`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Authentication State
  const [user, setUser] = useState({
    name: "Alex 'Reaper' Mercer",
    email: "admin@eternalsggs.com",
    role: "Admin",
    title: "Organization Director",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
  });

  const login = (userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast("You have been signed out.", 'info');
  };

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Live Stats Updater (Admin actions)
  const updateStat = (key, value) => {
    setStats(prev => ({ ...prev, [key]: value }));
    showToast(`Updated live stat: ${key} = ${value}`, 'success');
  };

  const updateMatchScore = (matchId, t1Score, t2Score, status) => {
    setBracketMatches(prev => prev.map(m => {
      if (m._id === matchId) {
        const winner = t1Score > t2Score ? m.team1Name : (t2Score > t1Score ? m.team2Name : m.winnerTeamName);
        return {
          ...m,
          team1Score: parseInt(t1Score),
          team2Score: parseInt(t2Score),
          status: status || m.status,
          winnerTeamName: winner
        };
      }
      return m;
    }));
    showToast('Match scores updated live!', 'success');
  };

  // Modal control
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [registrationModalTournament, setRegistrationModalTournament] = useState(null);
  const [activeAudioPodcast, setActiveAudioPodcast] = useState(null);

  return (
    <AppContext.Provider value={{
      route,
      queryParams,
      navigate,
      stats,
      updateStat,
      teams,
      setTeams,
      players,
      setPlayers,
      creators,
      setCreators,
      featuredCreator: INITIAL_DATA.featuredCreator,
      staff,
      setStaff,
      tournaments,
      setTournaments,
      bracketMatches,
      updateMatchScore,
      matchHistory,
      podcasts,
      mediaContent,
      merchProducts,
      sponsors,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      user,
      login,
      logout,
      toasts,
      showToast,
      removeToast,
      checkoutModalOpen,
      setCheckoutModalOpen,
      registrationModalTournament,
      setRegistrationModalTournament,
      activeAudioPodcast,
      setActiveAudioPodcast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
