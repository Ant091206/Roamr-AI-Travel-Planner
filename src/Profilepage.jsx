import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useTrips } from './App.jsx';
import { GRADIENTS } from './Shared.jsx';

const BADGES = [
    { icon: '🌍', label: 'First Trip', desc: 'Planned your first trip', condition: (t) => t.length >= 1 },
    { icon: '🗺️', label: 'Explorer', desc: 'Planned 3+ trips', condition: (t) => t.length >= 3 },
    { icon: '✈️', label: 'Globetrotter', desc: 'Planned 5+ trips', condition: (t) => t.length >= 5 },
    { icon: '📅', label: 'Week Planner', desc: 'Planned a 7-day trip', condition: (t) => t.some(x => parseInt(x.days) >= 7) },
    { icon: '💰', label: 'Budget Master', desc: 'Used Custom budget', condition: (t) => t.some(x => x.budget?.includes('Custom')) },
    { icon: '🏖️', label: 'Beach Lover', desc: 'Planned a beach trip', condition: (t) => t.some(x => /goa|beach|coast/i.test(x.title + x.preferences)) },
    { icon: '🏔️', label: 'Mountain Soul', desc: 'Planned a mountain trip', condition: (t) => t.some(x => /manali|kashmir|himalaya|mountain|trek/i.test(x.title + x.preferences)) },
    { icon: '🦁', label: 'Wildlife Fan', desc: 'Planned a safari trip', condition: (t) => t.some(x => /safari|wildlife|gir|jungle/i.test(x.title + x.preferences)) },
];

const TRAVEL_STYLES = ['Adventure Seeker', 'Culture Explorer', 'Foodie Traveller', 'Beach Bum', 'Budget Backpacker', 'Luxury Traveller', 'Nature Lover', 'History Buff'];

export default function ProfilePage() {
    const { userName, handleLogout } = useAuth();
    const { savedTrips } = useTrips();
    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);
    const [displayName, setDisplayName] = useState(userName || 'Explorer');
    const [bio, setBio] = useState(localStorage.getItem('roamr_bio') || '');
    const [travelStyle, setTravelStyle] = useState(localStorage.getItem('roamr_style') || '');
    const [homeCity, setHomeCity] = useState(localStorage.getItem('roamr_city') || '');

    const saveProfile = () => {
        localStorage.setItem('roamr_bio', bio);
        localStorage.setItem('roamr_style', travelStyle);
        localStorage.setItem('roamr_city', homeCity);
        setEditing(false);
    };

    const totalDays = savedTrips.reduce((a, t) => a + (parseInt(t.days) || 0), 0);
    const uniqueDests = new Set(savedTrips.map(t => t.title)).size;
    const earnedBadges = BADGES.filter(b => b.condition(savedTrips));
    const lockedBadges = BADGES.filter(b => !b.condition(savedTrips));

    const initials = displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div style={{ background: 'var(--sand)', minHeight: 'calc(100vh - 64px)' }}>
            {/* Hero banner */}
            <div style={{ background: 'linear-gradient(135deg,#1A3D5C 0%,#0D1E2D 100%)', padding: '3rem 2rem 5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
                <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: 500, height: 120, background: 'var(--sand)', borderRadius: '50%' }} />
            </div>

            <div style={{ maxWidth: 860, margin: '-64px auto 0', padding: '0 2rem 4rem', position: 'relative' }}>
                {/* Avatar + name card */}
                <div className="card card-p" style={{ textAlign: 'center', marginBottom: '1.5rem', paddingTop: '1.5rem' }}>
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg,#1A3D5C,#C4532A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontWeight: 700, fontSize: '2rem', color: '#fff', margin: '0 auto 1rem', border: '4px solid var(--white)', boxShadow: '0 4px 20px rgba(26,61,92,.2)' }}>
                        {initials}
                    </div>

                    {editing ? (
                        <div style={{ maxWidth: 400, margin: '0 auto' }}>
                            <input className="input" style={{ marginBottom: 10, textAlign: 'center', fontFamily: "'DM Serif Display',serif", fontSize: '1.1rem', fontWeight: 700 }}
                                value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" />
                            <input className="input" style={{ marginBottom: 10 }} value={homeCity} onChange={e => setHomeCity(e.target.value)} placeholder="📍 Your city (e.g. Mumbai)" />
                            <select className="select" style={{ marginBottom: 10 }} value={travelStyle} onChange={e => setTravelStyle(e.target.value)}>
                                <option value="">Select travel style…</option>
                                {TRAVEL_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <textarea className="textarea" rows={2} style={{ marginBottom: 10 }} value={bio} onChange={e => setBio(e.target.value)} placeholder="Short bio — e.g. 'Passionate traveller from Ahmedabad'" />
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                                <button className="btn btn-primary btn-sm" onClick={saveProfile}>Save Profile</button>
                                <button className="btn btn-sm" style={{ background: 'var(--sand)', border: '1.5px solid var(--sand-3)', color: 'var(--ink-3)' }} onClick={() => setEditing(false)}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{displayName}</h2>
                            {homeCity && <p style={{ fontSize: '.88rem', color: 'var(--ink-3)', marginBottom: 4 }}>📍 {homeCity}</p>}
                            {travelStyle && <span style={{ display: 'inline-block', background: 'var(--sky-l)', color: 'var(--sky-mid)', fontSize: '.78rem', fontWeight: 700, padding: '4px 14px', borderRadius: 100, border: '1px solid rgba(46,107,158,.2)', marginBottom: 8 }}>{travelStyle}</span>}
                            {bio && <p style={{ fontSize: '.9rem', color: 'var(--ink-3)', maxWidth: 400, margin: '0 auto 12px', lineHeight: 1.7 }}>{bio}</p>}
                            <button className="btn btn-sm" style={{ background: 'var(--sand)', border: '1.5px solid var(--sand-3)', color: 'var(--ink-2)' }} onClick={() => setEditing(true)}>✏️ Edit Profile</button>
                        </>
                    )}
                </div>

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    {[
                        { label: 'Saved Trips', value: savedTrips.length, col: 'var(--sky-mid)' },
                        { label: 'Days Planned', value: totalDays, col: 'var(--green)' },
                        { label: 'Destinations', value: uniqueDests, col: 'var(--gold)' },
                        { label: 'Badges Earned', value: earnedBadges.length, col: 'var(--terra)' },
                    ].map(s => (
                        <div key={s.label} className="card" style={{ padding: '1.1rem 1.25rem', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: s.col, borderRadius: '4px 0 0 4px' }} />
                            <div style={{ fontSize: '.73rem', fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>{s.label}</div>
                            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
                        </div>
                    ))}
                </div>

                {/* Badges */}
                <div className="card card-p" style={{ marginBottom: '1.5rem' }}>
                    <div className="card-header">
                        <div className="card-icon card-icon-terra">🏅</div>
                        <span className="card-title">Travel Badges</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '0.75rem' }}>
                        {BADGES.map(b => {
                            const earned = b.condition(savedTrips);
                            return (
                                <div key={b.label} style={{ background: earned ? 'var(--sand)' : 'var(--white)', border: `1.5px solid ${earned ? 'var(--terra-l)' : 'var(--sand-3)'}`, borderRadius: 12, padding: '0.9rem', textAlign: 'center', opacity: earned ? 1 : 0.45, transition: 'all .2s' }}>
                                    <div style={{ fontSize: '1.8rem', marginBottom: 5, filter: earned ? 'none' : 'grayscale(1)' }}>{b.icon}</div>
                                    <div style={{ fontWeight: 700, fontSize: '.82rem', color: earned ? 'var(--terra)' : 'var(--ink-3)', marginBottom: 3 }}>{b.label}</div>
                                    <div style={{ fontSize: '.73rem', color: 'var(--ink-3)', lineHeight: 1.5 }}>{b.desc}</div>
                                    {earned && <div style={{ fontSize: '.68rem', color: 'var(--green)', fontWeight: 700, marginTop: 5 }}>✓ Earned</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent trips */}
                {savedTrips.length > 0 && (
                    <div className="card card-p" style={{ marginBottom: '1.5rem' }}>
                        <div className="card-header">
                            <div className="card-icon card-icon-sky">🗺️</div>
                            <span className="card-title">Recent Trips</span>
                            <Link to="/dashboard" style={{ marginLeft: 'auto', fontSize: '.83rem', color: 'var(--sky-mid)', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '0.75rem' }}>
                            {savedTrips.slice(0, 4).map((trip, i) => (
                                <div key={trip.id} style={{ background: trip.gradient || GRADIENTS[i % GRADIENTS.length], borderRadius: 12, padding: '1rem 1.25rem', cursor: 'pointer', transition: 'transform .2s', minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = ''}>
                                    <div style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 700, color: '#fff', fontSize: '.95rem' }}>{trip.title}</div>
                                    <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.7)', marginTop: 3 }}>{trip.days} days · {trip.budget}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/planner"><button className="btn btn-primary btn-md">✦ Plan New Trip</button></Link>
                    <Link to="/dashboard"><button className="btn btn-outline-sky btn-md">View Dashboard</button></Link>
                    <button className="btn btn-sm" style={{ background: 'transparent', border: '1.5px solid #FECACA', color: '#991B1B' }}
                        onClick={() => { handleLogout(); navigate('/'); }}>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}