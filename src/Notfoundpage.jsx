import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem 2rem', background: 'var(--sand)' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🗺️</div>
            <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                Page Not Found
            </h1>
            <p style={{ color: 'var(--ink-3)', fontSize: '1.05rem', maxWidth: 400, lineHeight: 1.7, marginBottom: '2rem' }}>
                Looks like this destination doesn't exist on Roamr's map. Let's get you back on route.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/">
                    <button className="btn btn-primary btn-md">← Back to Home</button>
                </Link>
                <Link to="/planner">
                    <button className="btn btn-terra btn-md">Plan a Trip Instead</button>
                </Link>
            </div>
        </div>
    );
}