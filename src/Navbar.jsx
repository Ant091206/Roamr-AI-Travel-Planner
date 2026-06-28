import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Wordmark } from './Shared.jsx';
import { useAuth, useTrips } from './App.jsx';

export default function Navbar() {
    const { isLoggedIn, userName, handleLogout } = useAuth();
    const { savedTrips } = useTrips();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const nlClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
    const closeMenu = () => setMenuOpen(false);
    const logout = () => { handleLogout(); navigate('/'); closeMenu(); };

    const NAV_LINKS = [
        { to: '/', label: 'Home', end: true },
        { to: '/planner', label: 'AI Planner' },
        { to: '/trips', label: 'Sample Trips' },
        { to: '/explore', label: 'Explore' },
        { to: '/packing', label: 'Packing List' },
        { to: '/about', label: 'About' },
        ...(isLoggedIn ? [{ to: '/dashboard', label: 'My Trips', badge: savedTrips.length }, { to: '/profile', label: 'Profile' }] : []),
    ];

    return (
        <nav className="nav" style={{ position: 'sticky', top: 0, zIndex: 200 }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Wordmark logoSize={34} />
            </Link>

            {/* Desktop links */}
            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {NAV_LINKS.map(link => (
                    <NavLink key={link.to} to={link.to} end={link.end} className={nlClass}>
                        {link.label}
                        {link.badge > 0 && (
                            <span style={{ background: 'var(--terra)', color: '#fff', borderRadius: 100, fontSize: '.68rem', padding: '1px 6px', marginLeft: 4, fontWeight: 700 }}>
                                {link.badge}
                            </span>
                        )}
                    </NavLink>
                ))}

                <div className="nav-divider" />

                {isLoggedIn ? (
                    <div className="nav-user-chip">
                        <div className="nav-avatar">{(userName || 'E')[0].toUpperCase()}</div>
                        <span style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.85)', fontWeight: 500 }}>Hi, {userName}</span>
                        <button onClick={logout} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.5)', cursor: 'pointer', fontSize: '.85rem', marginLeft: 4 }}>✕</button>
                    </div>
                ) : (
                    <>
                        <Link to="/login"><button className="nav-btn-outline">Log in</button></Link>
                        <Link to="/signup"><button className="nav-btn-solid">Sign up free</button></Link>
                    </>
                )}
            </div>

            {/* Mobile hamburger */}
            <button
                className="nav-hamburger"
                onClick={() => setMenuOpen(o => !o)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1, display: 'none' }}
                aria-label="Toggle menu"
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div style={{
                    position: 'absolute', top: 64, left: 0, right: 0, zIndex: 199,
                    background: '#0D1E2D', padding: '1rem 1.5rem 1.5rem',
                    display: 'flex', flexDirection: 'column', gap: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,.35)',
                    borderTop: '1px solid rgba(255,255,255,.08)',
                }}>
                    {NAV_LINKS.map(link => (
                        <NavLink key={link.to} to={link.to} end={link.end} className={nlClass}
                            onClick={closeMenu}
                            style={{ padding: '10px 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            {link.label}
                            {link.badge > 0 && (
                                <span style={{ background: 'var(--terra)', color: '#fff', borderRadius: 100, fontSize: '.68rem', padding: '1px 6px', fontWeight: 700 }}>
                                    {link.badge}
                                </span>
                            )}
                        </NavLink>
                    ))}
                    <div style={{ height: 1, background: 'rgba(255,255,255,.1)', margin: '.6rem 0' }} />
                    {isLoggedIn ? (
                        <button className="nav-btn-outline" style={{ width: '100%', padding: 10 }} onClick={logout}>Sign out</button>
                    ) : (
                        <div style={{ display: 'flex', gap: 8 }}>
                            <Link to="/login" style={{ flex: 1 }} onClick={closeMenu}>
                                <button className="nav-btn-outline" style={{ width: '100%', padding: 10 }}>Log in</button>
                            </Link>
                            <Link to="/signup" style={{ flex: 1 }} onClick={closeMenu}>
                                <button className="nav-btn-solid" style={{ width: '100%', padding: 10 }}>Sign up</button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}