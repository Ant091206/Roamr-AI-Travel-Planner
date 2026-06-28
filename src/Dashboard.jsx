import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GRADIENTS } from './Shared.jsx';
import { useTrips } from './App.jsx';

export default function Dashboard() {
    const { savedTrips, handleDeleteTrip, setPreloadTrip } = useTrips();
    const navigate = useNavigate();

    const totalDays = savedTrips.reduce((a, t) => a + (parseInt(t.days) || 0), 0);
    const uniqueDests = new Set(savedTrips.map(t => t.title)).size;
    const thisMonth = savedTrips.filter(t =>
        t.savedAt?.includes(new Date().toLocaleString('en-IN', { month: 'short' }))
    ).length;

    const stats = [
        { label: 'Saved Trips', value: savedTrips.length, col: 'var(--sky-mid)' },
        { label: 'Days Planned', value: totalDays, col: 'var(--green)' },
        { label: 'Destinations', value: uniqueDests, col: 'var(--gold)' },
        { label: 'This Month', value: thisMonth, col: 'var(--terra)' },
    ];

    const loadTrip = (trip) => { setPreloadTrip(trip); navigate('/planner'); };

    return (
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.9rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>My Trips</h2>
                    <p style={{ color: 'var(--ink-3)', fontSize: '.9rem' }}>Your saved itineraries — ready to open any time.</p>
                </div>
                <Link to="/planner">
                    <button className="btn btn-terra btn-sm">+ Plan New Trip</button>
                </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                {stats.map(s => (
                    <div key={s.label} style={{ background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--sand-3)', padding: '1.25rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: '4px 0 0 4px', background: s.col }} />
                        <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>{s.label}</div>
                        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '2rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {savedTrips.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--sand-3)' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🧭</div>
                    <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>No saved trips yet</h3>
                    <p style={{ color: 'var(--ink-3)', fontSize: '.9rem', marginBottom: '1.5rem' }}>Generate an itinerary in the Planner and click "Save This Trip".</p>
                    <Link to="/planner">
                        <button className="btn btn-primary btn-md">Plan your first trip →</button>
                    </Link>
                </div>
            ) : (
                <>
                    <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink-2)', marginBottom: '1.1rem' }}>
                        Saved Itineraries
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
                        {savedTrips.map((trip, i) => (
                            <div key={trip.id}
                                style={{ background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--sand-3)', overflow: 'hidden', transition: 'transform .2s,box-shadow .2s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                            >
                                <div style={{ height: 80, background: trip.gradient || GRADIENTS[i % GRADIENTS.length], padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                    <span style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{trip.title}</span>
                                    <span style={{ background: 'rgba(255,255,255,.25)', color: '#fff', fontSize: '.75rem', fontWeight: 600, padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(255,255,255,.3)' }}>{trip.days} Days</span>
                                </div>
                                <div style={{ padding: '1.25rem 1.5rem' }}>
                                    <div style={{ fontSize: '.82rem', color: 'var(--ink-3)', marginBottom: 8 }}>🗓 {trip.savedAt} · {trip.budget}</div>
                                    {trip.preferences && (
                                        <p style={{ fontSize: '.87rem', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '1rem' }}>
                                            {trip.preferences.slice(0, 90)}{trip.preferences.length > 90 ? '…' : ''}
                                        </p>
                                    )}
                                    <button className="btn btn-outline-sky btn-sm"
                                        style={{ width: '100%', justifyContent: 'center', marginBottom: 6 }}
                                        onClick={() => loadTrip(trip)}>
                                        Open Itinerary →
                                    </button>
                                    <button onClick={() => handleDeleteTrip(trip.id)}
                                        style={{ width: '100%', padding: '7px', background: 'transparent', border: '1.5px solid #FECACA', color: '#991B1B', fontFamily: "'DM Sans',sans-serif", fontSize: '.82rem', fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'background .2s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >🗑 Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}