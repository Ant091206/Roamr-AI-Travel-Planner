import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from './App.jsx';

const DESTINATIONS = [
    { name: 'Goa', photo: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', region: 'West India', category: 'Beach', emoji: '🏖', tagline: 'Sun, sand & seafood', tags: ['Beach', 'Nightlife', 'Food'], days: '4-6', budget: 'Mid-range', gradient: 'linear-gradient(135deg,#11998e,#38ef7d)' },
    { name: 'Manali', photo: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80', region: 'Himachal Pradesh', category: 'Mountains', emoji: '⛷', tagline: 'Snow peaks & adventure', tags: ['Trekking', 'Snow', 'Adventure'], days: '5-7', budget: 'Budget', gradient: 'linear-gradient(135deg,#1d2671,#C33764)' },
    { name: 'Rajasthan', photo: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80', region: 'North India', category: 'Heritage', emoji: '🏰', tagline: 'Forts, palaces & deserts', tags: ['Heritage', 'Culture', 'Desert'], days: '7-10', budget: 'Mid-range', gradient: 'linear-gradient(135deg,#C4532A,#D97706)' },
    { name: 'Kerala', photo: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80', region: 'South India', category: 'Nature', emoji: '🌴', tagline: "God's own country", tags: ['Backwaters', 'Nature', 'Ayurveda'], days: '6-8', budget: 'Mid-range', gradient: 'linear-gradient(135deg,#56ab2f,#a8e063)' },
    { name: 'Kashmir', photo: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80', region: 'North India', category: 'Mountains', emoji: '🏔', tagline: 'Heaven on earth', tags: ['Lakes', 'Mountains', 'Houseboats'], days: '5-7', budget: 'Mid-range', gradient: 'linear-gradient(135deg,#4776E6,#8E54E9)' },
    { name: 'Sasan Gir', photo: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80', region: 'Gujarat', category: 'Wildlife', emoji: '🦁', tagline: 'Last home of Asiatic lions', tags: ['Safari', 'Wildlife', 'Culture'], days: '2-4', budget: 'Mid-range', gradient: 'linear-gradient(135deg,#134E5E,#71B280)' },
    { name: 'Andaman Islands', photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', region: 'Bay of Bengal', category: 'Beach', emoji: '🤿', tagline: 'Crystal waters & coral reefs', tags: ['Beach', 'Diving', 'Islands'], days: '5-7', budget: 'Mid-range', gradient: 'linear-gradient(135deg,#0093E9,#80D0C7)' },
    { name: 'Varanasi', photo: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&q=80', region: 'Uttar Pradesh', category: 'Spiritual', emoji: '🪔', tagline: 'Soul of ancient India', tags: ['Spiritual', 'Culture', 'History'], days: '3-4', budget: 'Budget', gradient: 'linear-gradient(135deg,#f7971e,#ffd200)' },
    { name: 'Coorg', photo: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80', region: 'Karnataka', category: 'Nature', emoji: '☕', tagline: 'Coffee, mist & waterfalls', tags: ['Nature', 'Coffee', 'Trekking'], days: '3-4', budget: 'Budget', gradient: 'linear-gradient(135deg,#5C4033,#A67C52)' },
    { name: 'Udaipur', photo: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80', region: 'Rajasthan', category: 'Heritage', emoji: '💎', tagline: 'City of lakes & palaces', tags: ['Heritage', 'Romance', 'Lakes'], days: '3-5', budget: 'Mid-range', gradient: 'linear-gradient(135deg,#1A3D5C,#C4532A)' },
    { name: 'Rishikesh', photo: 'https://images.unsplash.com/photo-1502519144081-acca18599776?w=600&q=80', region: 'Uttarakhand', category: 'Adventure', emoji: '🧘', tagline: 'Yoga, rafting & the Ganga', tags: ['Adventure', 'Yoga', 'Rafting'], days: '3-5', budget: 'Budget', gradient: 'linear-gradient(135deg,#2ecc71,#3498db)' },
    { name: 'Ladakh', photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', region: 'Union Territory', category: 'Mountains', emoji: '🏍', tagline: 'Land of high passes', tags: ['Mountains', 'Biking', 'Monasteries'], days: '7-12', budget: 'Mid-range', gradient: 'linear-gradient(135deg,#373B44,#4286f4)' },
];

const CATEGORIES = ['All', 'Beach', 'Mountains', 'Heritage', 'Nature', 'Wildlife', 'Spiritual', 'Adventure'];
const BUDGETS = ['All', 'Budget', 'Mid-range', 'Luxury'];

export default function ExplorePage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [budget, setBudget] = useState('All');
    const { setPreloadTrip } = useTrips();
    const navigate = useNavigate();

    const filtered = DESTINATIONS.filter(d => {
        const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        const matchCat = category === 'All' || d.category === category;
        const matchBudget = budget === 'All' || d.budget === budget;
        return matchSearch && matchCat && matchBudget;
    });

    const planTrip = (dest) => {
        setPreloadTrip({ title: dest.name, days: dest.days.split('-')[0], budget: dest.budget, preferences: dest.tags.join(', '), itinerary: '' });
        navigate('/planner');
    };

    return (
        <div>
            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg,#1A3D5C 0%,#0D1E2D 100%)', padding: 'clamp(50px,7vw,80px) 2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
                <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(196,83,42,.2)', border: '1px solid rgba(196,83,42,.4)', color: '#E8A07A', fontSize: '.78rem', fontWeight: 700, padding: '5px 16px', borderRadius: 100, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                        ✦ Discover India
                    </div>
                    <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>Explore Destinations</h1>
                    <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1rem', marginBottom: '2rem' }}>Browse 12+ curated destinations. Click any to jump straight into the AI Planner.</p>
                    {/* Search */}
                    <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
                        <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem' }}>🔍</span>
                        <input
                            className="input"
                            style={{ paddingLeft: 44, borderRadius: 100, height: 50, fontSize: '1rem', background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.2)', color: '#fff' }}
                            placeholder="Search destinations or activities…"
                            value={search} onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filters sticky bar */}
            <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--sand-3)', padding: '.9rem 2rem', position: 'sticky', top: 64, zIndex: 90 }}>
                <div style={{ maxWidth: 1060, margin: '0 auto', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginRight: 4 }}>Type:</span>
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setCategory(c)}
                                style={{ background: category === c ? 'var(--sky)' : 'var(--sand)', color: category === c ? '#fff' : 'var(--ink-2)', border: `1.5px solid ${category === c ? 'var(--sky)' : 'var(--sand-3)'}`, borderRadius: 100, padding: '4px 14px', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}>
                                {c}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginLeft: 'auto' }}>
                        <span style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginRight: 4 }}>Budget:</span>
                        {BUDGETS.map(b => (
                            <button key={b} onClick={() => setBudget(b)}
                                style={{ background: budget === b ? 'var(--terra)' : 'var(--sand)', color: budget === b ? '#fff' : 'var(--ink-2)', border: `1.5px solid ${budget === b ? 'var(--terra)' : 'var(--sand-3)'}`, borderRadius: 100, padding: '4px 14px', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}>
                                {b}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results count */}
            <div style={{ maxWidth: 1060, margin: '1.5rem auto 0', padding: '0 2rem' }}>
                <p style={{ fontSize: '.85rem', color: 'var(--ink-3)', fontWeight: 500 }}>{filtered.length} destination{filtered.length !== 1 ? 's' : ''} found</p>
            </div>

            {/* Grid */}
            <div style={{ maxWidth: 1060, margin: '1rem auto 4rem', padding: '0 2rem' }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--ink-3)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                        <p style={{ fontWeight: 500 }}>No destinations match your filters.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: '1.25rem' }}>
                        {filtered.map((dest, i) => (
                            <div key={dest.name} className="fade-up"
                                style={{ background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--sand-3)', overflow: 'hidden', transition: 'transform .2s,box-shadow .2s', cursor: 'pointer' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                            >
                                {/* Banner — curated Unsplash photo with gradient fallback */}
                                <div style={{ height: 140, position: 'relative', overflow: 'hidden', background: dest.gradient }}>
                                    <img
                                        src={dest.photo}
                                        alt={dest.name}
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,.72) 100%)' }} />
                                    <div style={{ position: 'absolute', inset: 0, padding: '1.1rem 1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 1 }}>
                                        <div style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 700, fontSize: '1.15rem', color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.5)' }}>{dest.emoji} {dest.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,.8)', marginTop: 2 }}>{dest.region}</div>
                                    </div>
                                </div>
                                {/* Body */}
                                <div style={{ padding: '1.1rem 1.4rem' }}>
                                    <p style={{ fontSize: '.88rem', color: 'var(--ink-3)', fontStyle: 'italic', marginBottom: '.75rem' }}>{dest.tagline}</p>
                                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: '.9rem' }}>
                                        {dest.tags.map(t => (
                                            <span key={t} style={{ background: 'var(--sky-l)', color: 'var(--sky-mid)', fontSize: '.72rem', fontWeight: 600, padding: '3px 9px', borderRadius: 100 }}>{t}</span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.8rem', color: 'var(--ink-3)', marginBottom: '1rem' }}>
                                        <span>📅 {dest.days} days</span>
                                        <span>💰 {dest.budget}</span>
                                    </div>
                                    <button className="btn btn-outline-sky btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => planTrip(dest)}>
                                        Plan this trip →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}