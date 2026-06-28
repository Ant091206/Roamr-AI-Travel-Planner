import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SAMPLE_TRIPS } from './Shared.jsx';
import { useTrips } from './App.jsx';

const STATS = [
  { value: '50,000+', label: 'Trips Planned' },
  { value: '120+', label: 'Destinations' },
  { value: '4.9★', label: 'User Rating' },
  { value: '2 min', label: 'Avg. Plan Time' },
];

const HOW_STEPS = [
  { icon: '📍', title: 'Choose your destination', desc: 'Any city, region or country — from hidden gems to iconic capitals.' },
  { icon: '⚙️', title: 'Set your preferences', desc: 'Budget tier, duration, travel style — adventure, culture, food or relaxation.' },
  { icon: '✦', title: 'AI crafts your plan', desc: 'A detailed day-by-day itinerary comes together — places, food, hotels and transport, all sorted.' },
  { icon: '✈️', title: 'Pack your bags', desc: 'Save your plan, share it and travel with total confidence.' },
];

const FEATURES = [
  { icon: '🗺', title: 'Day-by-Day Itineraries', desc: 'Structured morning to evening plans for every day of your trip.' },
  { icon: '🍽', title: 'Food & Restaurant Picks', desc: 'Local specialities, iconic restaurants and street food gems.' },
  { icon: '🏨', title: 'Hotel Recommendations', desc: 'Curated stays matched to your budget — hostels to heritage hotels.' },
  { icon: '💰', title: 'Budget Breakdowns', desc: 'Realistic cost estimates for accommodation, food, transport and activities.' },
  { icon: '🌿', title: 'Hidden Gems', desc: 'Off-the-beaten-path experiences the guidebooks miss.' },
  { icon: '📱', title: 'Save & Access Anywhere', desc: 'Save unlimited trips and access them from any device.' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', location: 'Mumbai', text: 'Planned our 7-day Rajasthan trip in 3 minutes. The itinerary was so detailed we barely needed to look anything up.', avatar: 'PS' },
  { name: 'Rohan Mehta', location: 'Bangalore', text: 'The local food recommendations were spot-on. Found restaurants we\'d never have discovered otherwise.', avatar: 'RM' },
  { name: 'Aisha Patel', location: 'Delhi', text: 'As a solo female traveller, the safety tips and neighbourhood guides were incredibly helpful.', avatar: 'AP' },
  { name: 'Vikram Nair', location: 'Kochi', text: 'The budget breakdown was realistic — we actually came in under estimate. Impressive.', avatar: 'VN' },
];

export default function LandingPage() {
  const { setPreloadTrip } = useTrips();
  const navigate = useNavigate();
  const featuredTrips = SAMPLE_TRIPS.slice(0, 3);
  const openTrip = (trip) => { setPreloadTrip(trip); navigate('/planner'); };

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section className="grain" style={{
        background: 'linear-gradient(152deg, #0C1B2A 0%, #091420 55%, #0F1A26 100%)',
        padding: 'clamp(80px,11vw,148px) 2rem clamp(88px,12vw,168px)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: 'radial-gradient(ellipse 55% 45% at 18% 55%, rgba(192,82,42,.14) 0%, transparent 70%), radial-gradient(ellipse 45% 55% at 82% 28%, rgba(36,80,118,.16) 0%, transparent 70%)'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto' }}>
          <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(244,132,95,.1)', border: '1px solid rgba(244,132,95,.22)', color: 'rgba(244,132,95,.9)', fontSize: '0.625rem', fontWeight: 700, padding: '5px 14px', borderRadius: 9999, marginBottom: 28, letterSpacing: '.12em', textTransform: 'uppercase' }}>
            ✦ Your next trip, already planned
          </div>

          {/* Taste Skill: oversized italic serif */}
          <h1 className="fade-up fade-up-d1" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.8rem,7.5vw,5.4rem)', fontWeight: 400, color: '#fff', lineHeight: 1.06, letterSpacing: '-.03em', marginBottom: 24 }}>
            Wander further.<br />
            <span style={{ color: '#F4845F', fontStyle: 'normal' }}>Plan smarter.</span>
          </h1>

          <p className="fade-up fade-up-d2" style={{ color: 'rgba(255,255,255,.48)', fontSize: 'clamp(1rem,2vw,1.2rem)', lineHeight: 1.75, marginBottom: 44, maxWidth: 480, margin: '0 auto 44px', fontWeight: 300 }}>
            Tell us where you're headed. Roamr builds a complete day-by-day itinerary — hotels, food, attractions, transport and budget — in under 2 minutes.
          </p>

          <div className="fade-up fade-up-d3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/planner">
              <button className="btn btn-terra btn-xl">✦ Plan My Trip Free</button>
            </Link>
            <Link to="/trips">
              <button className="btn btn-xl" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.85)', backdropFilter: 'blur(8px)' }}>
                Browse Sample Trips →
              </button>
            </Link>
          </div>

          <p className="fade-up fade-up-d4" style={{ color: 'rgba(255,255,255,.22)', fontSize: '0.75rem', marginTop: 24 }}>
            Free forever · No credit card · Just go
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ background: 'var(--terra)', padding: '22px 2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(255,255,255,.04) 0%,transparent 50%,rgba(0,0,0,.06) 100%)' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', textAlign: 'center', position: 'relative' }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-.02em' }}>{s.value}</div>
              <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,.62)', fontWeight: 500, marginTop: 3, letterSpacing: '.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: 'var(--white)', padding: 'clamp(64px,9vw,112px) 2rem' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <span className="section-label fade-up">How it works</span>
            <h2 className="section-title fade-up fade-up-d1" style={{ margin: '0 auto 12px' }}>From idea to itinerary<br />in 4 steps</h2>
            <p className="section-sub fade-up fade-up-d2" style={{ margin: '0 auto' }}>No sign-up required. Type a destination and watch Roamr do the rest.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.25rem' }}>
            {HOW_STEPS.map((step, i) => (
              <div key={i} className={`fade-up fade-up-d${i + 1}`} style={{
                background: 'var(--sand)', border: '1px solid var(--sand-3)',
                borderRadius: 'var(--r8)', padding: '2rem', position: 'relative', overflow: 'hidden',
                transition: 'transform var(--d4) var(--ease-out), box-shadow var(--d4) var(--ease-out), background var(--d3)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; e.currentTarget.style.background = 'var(--white)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.background = ''; }}
              >
                <div style={{ position: 'absolute', top: 14, right: 20, fontFamily: "'DM Serif Display',serif", fontSize: '4.5rem', fontWeight: 400, color: 'rgba(192,82,42,.07)', lineHeight: 1, pointerEvents: 'none' }}>{i + 1}</div>
                <div style={{ fontSize: '1.85rem', marginBottom: 16 }}>{step.icon}</div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.05rem', fontWeight: 400, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-.01em' }}>{step.title}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--ink-3)', lineHeight: 1.72 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TRIPS ── */}
      <section style={{ background: 'var(--sand)', padding: 'clamp(64px,9vw,112px) 2rem' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(32px,5vw,52px)', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-label">Ready-made trips</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Start with a curated itinerary</h2>
            </div>
            <Link to="/trips"><button className="btn btn-outline-sky btn-sm">View all 6 trips →</button></Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem' }}>
            {featuredTrips.map((trip, i) => (
              <div key={trip.id} className={`fade-up fade-up-d${i + 1}`}
                style={{ background: 'var(--white)', borderRadius: 'var(--r8)', border: '1px solid var(--sand-3)', overflow: 'hidden', cursor: 'pointer', transition: 'transform var(--d4) var(--ease-out), box-shadow var(--d4) var(--ease-out), border-color var(--d3)' }}
                onClick={() => openTrip(trip)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; e.currentTarget.style.borderColor = 'var(--sand-2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = ''; }}
              >
                <div style={{ height: 130, position: 'relative', overflow: 'hidden', background: trip.gradient }}>
                  {trip.photo && (
                    <img src={trip.photo} alt={trip.title} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, display: 'block' }}
                      onError={e => { e.currentTarget.style.display = 'none'; }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 20%,rgba(0,0,0,.68) 100%)' }} />
                  <div style={{ position: 'absolute', inset: 0, padding: '1.1rem 1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 1 }}>
                    <div style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 700, fontSize: '1.1rem', color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.5)' }}>{trip.emoji} {trip.title}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,.82)', marginTop: 2 }}>{trip.tagline}</div>
                  </div>
                </div>
                <div style={{ padding: '1.1rem 1.4rem' }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span className="badge badge-sky">{trip.days} Days</span>
                    <span className="badge badge-terra">{trip.budget}</span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: 14 }}>{trip.preferences.slice(0, 80)}…</p>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--sky-m)' }}>Open itinerary →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: 'var(--white)', padding: 'clamp(64px,9vw,112px) 2rem' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', textAlign: 'center' }}>
          <span className="section-label fade-up">Everything included</span>
          <h2 className="section-title fade-up fade-up-d1" style={{ margin: '0 auto 12px' }}>Not just a list of attractions</h2>
          <p className="section-sub fade-up fade-up-d2" style={{ margin: '0 auto clamp(36px,5vw,56px)' }}>Every Roamr itinerary has everything you need to travel with confidence.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem' }}>
            {FEATURES.map((f, i) => (
              <div key={i} className={`fade-up fade-up-d${(i % 4) + 1}`} style={{
                textAlign: 'left', padding: '1.75rem', background: 'var(--sand)',
                borderRadius: 'var(--r8)', border: '1px solid var(--sand-3)',
                transition: 'transform var(--d4) var(--ease-out), box-shadow var(--d4) var(--ease-out), background var(--d3)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; e.currentTarget.style.background = 'var(--white)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.background = ''; }}
              >
                <div style={{ fontSize: '1.7rem', marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1rem', fontWeight: 400, color: 'var(--ink)', marginBottom: 6, letterSpacing: '-.01em' }}>{f.title}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--ink-3)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: 'var(--sand)', padding: 'clamp(64px,9vw,112px) 2rem' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', textAlign: 'center' }}>
          <span className="section-label fade-up">Traveller stories</span>
          <h2 className="section-title fade-up fade-up-d1" style={{ margin: '0 auto clamp(36px,5vw,56px)' }}>Loved by explorers across India</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.25rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`fade-up fade-up-d${i + 1}`} style={{
                background: 'var(--white)', border: '1px solid var(--sand-3)', borderRadius: 'var(--r8)', padding: '1.75rem',
                textAlign: 'left', transition: 'transform var(--d4) var(--ease-out), box-shadow var(--d4) var(--ease-out)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ color: '#E8A020', fontSize: '0.875rem', marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
                {/* Taste: large opening quote */}
                <div style={{ position: 'relative', paddingLeft: 20, marginBottom: 16 }}>
                  <span style={{ position: 'absolute', left: 0, top: -8, fontFamily: "'DM Serif Display',serif", fontSize: '2.2rem', color: 'var(--terra)', lineHeight: 1, opacity: .55 }}>"</span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.75, fontStyle: 'italic' }}>{t.text}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--ink)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--ink-3)' }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="grain" style={{
        background: 'linear-gradient(152deg, var(--sky) 0%, var(--sky-d) 100%)',
        padding: 'clamp(72px,10vw,128px) 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 600, margin: '0 auto' }}>
          <h2 className="fade-up" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(1.9rem,4.5vw,3.2rem)', fontWeight: 400, color: '#fff', marginBottom: 16, letterSpacing: '-.025em', lineHeight: 1.12 }}>
            Ready to plan your next adventure?
          </h2>
          <p className="fade-up fade-up-d1" style={{ color: 'rgba(255,255,255,.5)', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
            Join 50,000+ travellers who roam smarter. Free to start, no credit card required.
          </p>
          <div className="fade-up fade-up-d2" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/planner"><button className="btn btn-terra btn-lg">Start Planning Free →</button></Link>
            <Link to="/about"><button className="btn btn-lg" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.8)' }}>Learn about us</button></Link>
          </div>
        </div>
      </section>

    </div>
  );
}