import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SAMPLE_TRIPS } from './Shared.jsx';
import { useTrips } from './App.jsx';

export default function TripsPage() {
  const { setPreloadTrip } = useTrips();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const budgets = ['All', 'Budget', 'Mid-range', 'Luxury'];
  const filtered = filter === 'All' ? SAMPLE_TRIPS : SAMPLE_TRIPS.filter(t => t.budget === filter);

  const openTrip = (trip) => { setPreloadTrip(trip); navigate('/planner'); };

  return (
    <div>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#1A3D5C 0%,#0D1E2D 100%)', padding: 'clamp(50px,7vw,80px) 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="fade-up" style={{ display: 'inline-block', background: 'rgba(196,83,42,.2)', border: '1px solid rgba(196,83,42,.4)', color: '#E8A07A', fontSize: '.8rem', fontWeight: 700, padding: '5px 16px', borderRadius: 100, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '.05em' }}>
          Curated itineraries
        </div>
        <h1 className="fade-up fade-up-d1" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 14, position: 'relative' }}>
          6 expert-crafted trip itineraries
        </h1>
        <p className="fade-up fade-up-d2" style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto', position: 'relative' }}>
          Each itinerary is written by seasoned travellers with local knowledge. Click any trip, customise it, and save it to your account.
        </p>
      </div>

      {/* Sticky filter bar */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--sand-3)', padding: '1rem 2rem', position: 'sticky', top: 64, zIndex: 90 }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--ink-3)', marginRight: 4 }}>Filter by budget:</span>
          {budgets.map(b => (
            <button key={b} onClick={() => setFilter(b)}
              style={{ background: filter === b ? 'var(--sky)' : 'var(--sand)', color: filter === b ? '#fff' : 'var(--ink-2)', border: `1.5px solid ${filter === b ? 'var(--sky)' : 'var(--sand-3)'}`, borderRadius: 100, padding: '5px 16px', fontSize: '.83rem', fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}>
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.5rem' }}>
          {filtered.map((trip, i) => (
            <div key={trip.id}
              className={`fade-up fade-up-d${(i % 3) + 1}`}
              style={{ background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--sand-3)', overflow: 'hidden', transition: 'transform .2s,box-shadow .2s', cursor: 'pointer' }}
              onClick={() => openTrip(trip)}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ height: 150, position: 'relative', overflow: 'hidden', background: trip.gradient }}>
                {trip.photo && (
                  <img src={trip.photo} alt={trip.title} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, display: 'block' }}
                    onError={e => { e.currentTarget.style.display = 'none'; }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 20%,rgba(0,0,0,.72) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 1 }}>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.2rem', fontWeight: 700, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.5)' }}>{trip.emoji} {trip.title}</div>
                  <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.82)', marginTop: 3 }}>{trip.tagline}</div>
                </div>
              </div>
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: '.9rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-sky">📅 {trip.days} Days</span>
                  <span className="badge badge-terra">💰 {trip.budget}</span>
                </div>
                <p style={{ fontSize: '.87rem', color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: '1.1rem' }}>{trip.preferences}</p>
                <div style={{ background: 'var(--sand)', borderRadius: 10, padding: '.75rem 1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 6 }}>Highlights</div>
                  {trip.itinerary.split('\n').filter(l => l.startsWith('## Day')).slice(0, 3).map((day, di) => (
                    <div key={di} style={{ fontSize: '.83rem', color: 'var(--sky-mid)', fontWeight: 500, marginBottom: 2 }}>
                      {day.replace(/^#+\s*/, '')}
                    </div>
                  ))}
                  {parseInt(trip.days) > 3 && <div style={{ fontSize: '.78rem', color: 'var(--ink-3)', marginTop: 3 }}>+ {parseInt(trip.days) - 3} more days…</div>}
                </div>
                <button className="btn btn-outline-sky btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  Open Full Itinerary →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--ink-3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ fontWeight: 500 }}>No trips match this filter.</p>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg,var(--sky) 0%,var(--sky-d) 100%)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '.75rem' }}>✦</div>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 10 }}>Don't see your destination?</h3>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '.95rem', marginBottom: '1.5rem', maxWidth: 400, margin: '0 auto 1.5rem' }}>
            Use the AI Planner to generate a custom itinerary for any destination in the world.
          </p>
          <Link to="/planner">
            <button className="btn btn-terra btn-md">Plan a Custom Trip →</button>
          </Link>
        </div>
      </div>
    </div>
  );
}