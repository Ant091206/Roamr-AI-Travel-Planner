import React from 'react';
import { Link } from 'react-router-dom';
import { Wordmark } from './Shared.jsx';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-main">

                {/* Brand column */}
                <div className="footer-brand">
                    <div className="footer-brand-logo" style={{ marginBottom: '1rem' }}>
                        <Wordmark logoSize={30} />
                    </div>
                    <p>AI-powered travel planning for curious explorers. Build personalised day-by-day itineraries in under 2 minutes.</p>
                    <div className="footer-socials">
                        {['𝕏', 'in', 'f', '▶'].map((s, i) => (
                            <button key={i} className="footer-social-btn">{s}</button>
                        ))}
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Explore</h4>
                    <Link to="/planner">AI Trip Planner</Link>
                    <Link to="/explore">Explore Destinations</Link>
                    <Link to="/trips">Sample Trips</Link>
                    <Link to="/packing">Packing List</Link>
                    <Link to="/dashboard">My Dashboard</Link>
                    <Link to="/about">About Us</Link>
                </div>

                <div className="footer-col">
                    <h4>Destinations</h4>
                    <Link to="/planner">Rajasthan</Link>
                    <Link to="/planner">Kerala</Link>
                    <Link to="/planner">Kashmir</Link>
                    <Link to="/planner">Goa</Link>
                    <Link to="/planner">Himachal Pradesh</Link>
                </div>

                <div className="footer-col">
                    <h4>Company</h4>
                    <Link to="/about">Our Story</Link>
                    <Link to="/about">Privacy Policy</Link>
                    <Link to="/about">Terms of Service</Link>
                    <Link to="/about">Contact Us</Link>
                    <Link to="/about">Careers</Link>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© 2026 <strong>Roamr</strong>. Made for wanderers, by wanderers.</span>
                <span style={{ color: 'rgba(255,255,255,.35)' }}>Wander smarter. ✦</span>
            </div>
        </footer>
    );
}