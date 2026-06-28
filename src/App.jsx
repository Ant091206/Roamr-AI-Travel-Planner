import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { GLOBAL_CSS, GRADIENTS } from './Shared.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import LandingPage from './Landingpage.jsx';
import AboutPage from './Aboutpage.jsx';
import { LoginPage, SignupPage } from './Authpages.jsx';
import TripsPage from './Tripspage.jsx';
import PlannerPage from './Plannerpage.jsx';
import Dashboard from './Dashboard.jsx';
import NotFoundPage from './Notfoundpage.jsx';
import ProfilePage from './Profilepage.jsx';
import PackingList from './Packinglist.jsx';
import ExplorePage from './Explorepage.jsx';
import ChatBot from './Chatbot.jsx';

// ── Auth Context ──────────────────────────────────────────────────────────────
export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// ── Trip Context ──────────────────────────────────────────────────────────────
export const TripContext = createContext(null);
export const useTrips = () => useContext(TripContext);

// ── Protected Route ───────────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

// ── Scroll to top on route change ────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [preloadTrip, setPreloadTrip] = useState(null);

  const [savedTrips, setSavedTrips] = useState(() => {
    try { return JSON.parse(localStorage.getItem('roamr_trips') || '[]'); } catch { return []; }
  });

  // Inject global CSS (always replace to pick up latest version)
  useEffect(() => {
    const id = 'roamr-css';
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const el = document.createElement('style');
    el.id = id; el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
  }, []);

  // Persist trips
  useEffect(() => {
    try { localStorage.setItem('roamr_trips', JSON.stringify(savedTrips)); } catch { }
  }, [savedTrips]);

  const handleLogin = (name) => { setUserName(name); setIsLoggedIn(true); };
  const handleLogout = () => { setIsLoggedIn(false); setUserName(''); };

  const handleSaveTrip = ({ destination, days, budget, preferences, itinerary }) => {
    if (savedTrips.find(t => t.title === destination && t.days === days)) return;
    setSavedTrips(prev => [{
      id: Date.now(), title: destination, days, budget, preferences, itinerary,
      savedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      gradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
    }, ...prev]);
  };
  const handleDeleteTrip = (id) => setSavedTrips(prev => prev.filter(t => t.id !== id));

  const auth = { isLoggedIn, userName, handleLogin, handleLogout };
  const trips = { savedTrips, handleSaveTrip, handleDeleteTrip, preloadTrip, setPreloadTrip };

  return (
    <AuthContext.Provider value={auth}>
      <TripContext.Provider value={trips}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <ScrollToTop />
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/packing" element={<PackingList />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </TripContext.Provider>
    </AuthContext.Provider>
  );
}