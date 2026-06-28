import { Link, useNavigate } from 'react-router-dom';
import { Wordmark } from './shared.jsx';
import React from 'react';
import aryanPhoto from './assets/Aryan photo professional.png';

const TEAM = [
  {
    name: 'Aryan Thakkar',
    role: 'Founder & Full-Stack Developer',
    bio: 'Built Roamr from scratch — AI integration, itinerary parser, UI/UX design and branding. Passionate about travel, clean code and making AI genuinely useful.',
    photo: aryanPhoto,
    bg: 'linear-gradient(135deg,#1A3D5C 0%,#C4532A 100%)',
    skills: ['⚛️ React', '✦ Built to Wander', '🛣️ React Router', '🎨 UI/UX'],
    location: 'Gujarat, India', // kept for reference
    tagline: 'Building tools that make people want to explore the world.',
  },
];

const VALUES = [
  { icon: '🌍', title: 'Travel for everyone', desc: 'Whether you have ₹10,000 or ₹10 lakh, Roamr helps you make the most of your trip. Great travel is about curiosity, not budget.' },
  { icon: '⚡', title: 'Radical simplicity', desc: 'We believe planning a trip should take minutes, not days. Every feature we build is tested against: does this make planning simpler?' },
  { icon: '🔬', title: 'AI with local knowledge', desc: 'Our prompts are crafted by real travellers and locals. We don\'t just surface tourist traps — we help you find the places that matter.' },
  { icon: '🌱', title: 'Responsible travel', desc: 'We partner with sustainable tourism initiatives and encourage travellers to support local businesses, respect local cultures and minimise impact.' },
];

const MILESTONES = [
  { year: '2023', title: 'Founded', desc: 'Roamr was founded in Bengaluru by two former Google engineers frustrated by how hard it was to plan a good trip.' },
  { year: '2024', title: 'AI Integration', desc: 'Integrated AI-powered generation to create real-time itineraries. First 10,000 trips planned in the first month.' },
  { year: '2025', title: '50K Travellers', desc: 'Crossed 50,000 active users across India. Launched sample trip library and dashboard features.' },
  { year: '2026', title: 'Image Generation', desc: 'Added AI-powered place photography. Expanded destination coverage to 120+ cities worldwide.' },
];

export default function AboutPage() {
  return (
    <div>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg,#1A3D5C 0%,#0D1E2D 100%)', padding: 'clamp(60px,8vw,100px) 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <div className="fade-up" style={{ display: 'inline-block', background: 'rgba(196,83,42,.2)', border: '1px solid rgba(196,83,42,.4)', color: '#E8A07A', fontSize: '.8rem', fontWeight: 700, padding: '5px 16px', borderRadius: 100, marginBottom: 24, textTransform: 'uppercase', letterSpacing: '.05em' }}>
            Our Story
          </div>
          <h1 className="fade-up fade-up-d1" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 20, letterSpacing: '-.02em' }}>
            We believe everyone deserves<br /><span style={{ color: '#E8A07A', fontStyle: 'italic' }}>an extraordinary trip</span>
          </h1>
          <p className="fade-up fade-up-d2" style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.08rem', lineHeight: 1.75 }}>
            Roamr was born from a simple frustration: planning a great trip takes too long and relies too much on luck. We're fixing that with AI.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(60px,8vw,100px) 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div className="fade-up">
            <div className="section-label">Our Mission</div>
            <h2 className="section-title">Turn your travel dreams into detailed plans</h2>
            <p style={{ color: 'var(--ink-3)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              We started Roamr because we were tired of spending more time planning trips than taking them. Hours poring over TripAdvisor reviews, cross-referencing blog posts, trying to figure out what was actually open and what had closed down — it was exhausting.
            </p>
            <p style={{ color: 'var(--ink-3)', lineHeight: 1.8 }}>
              With AI, Roamr gives every traveller the equivalent of a local friend who's been everywhere and knows every great restaurant, hidden viewpoint and worthwhile detour. That's Roamr.
            </p>
          </div>

          <div className="fade-up fade-up-d2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { n: '50K+', l: 'Trips Planned' }, { n: '120+', l: 'Destinations' },
              { n: '4.9★', l: 'App Rating' }, { n: '2min', l: 'Avg Plan Time' },
            ].map((s, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? 'var(--sky)' : 'var(--terra)', borderRadius: 'var(--radius)', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.9rem', fontWeight: 700, color: '#fff' }}>{s.n}</div>
                <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.75)', marginTop: 4, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 900, margin: '0 auto' }} />

      {/* VALUES */}
      <section style={{ background: 'var(--white)', padding: 'clamp(60px,8vw,100px) 2rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label fade-up">What we stand for</div>
          <h2 className="section-title fade-up fade-up-d1" style={{ margin: '0 auto 3rem' }}>Our values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.25rem' }}>
            {VALUES.map((v, i) => (
              <div key={i} className={`fade-up fade-up-d${i + 1}`} style={{ background: 'var(--sand)', border: '1px solid var(--sand-3)', borderRadius: 'var(--radius)', padding: '1.75rem', textAlign: 'left' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 700, marginBottom: '.5rem', color: 'var(--ink)' }}>{v.title}</h3>
                <p style={{ fontSize: '.87rem', color: 'var(--ink-3)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 2rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label fade-up">Our journey</div>
          <h2 className="section-title fade-up fade-up-d1" style={{ margin: '0 auto 3rem' }}>How we got here</h2>
          <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
            <div style={{ position: 'absolute', left: 14, top: 0, bottom: 0, width: 2, background: 'var(--sand-3)' }} />
            {MILESTONES.map((m, i) => (
              <div key={i} className={`fade-up fade-up-d${i + 1}`} style={{ position: 'relative', marginBottom: '2.5rem', textAlign: 'left' }}>
                <div style={{ position: 'absolute', left: -32, top: 4, width: 16, height: 16, borderRadius: '50%', background: i % 2 === 0 ? 'var(--terra)' : 'var(--sky)', border: '3px solid var(--white)' }} />
                <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--terra)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>{m.year}</div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{m.title}</h3>
                <p style={{ fontSize: '.9rem', color: 'var(--ink-3)', lineHeight: 1.7 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ background: 'var(--sand)', padding: 'clamp(60px,8vw,100px) 2rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label fade-up">The Builder</div>
          <h2 className="section-title fade-up fade-up-d1" style={{ margin: '0 auto 3rem' }}>Meet the founder</h2>

          {TEAM.map((member, i) => (
            <div key={i} className="fade-up fade-up-d2" style={{
              display: 'grid',
              gridTemplateColumns: '340px 1fr',
              borderRadius: 28,
              overflow: 'hidden',
              boxShadow: 'var(--sh-lg)',
              border: '1px solid var(--sand-3)',
              maxWidth: 860,
              margin: '0 auto',
              textAlign: 'left',
            }}>

              {/* LEFT — photo */}
              <div style={{ position: 'relative', background: 'linear-gradient(160deg,#1A3D5C,#0D1E2D)', minHeight: 480 }}>
                <img
                  src={member.photo}
                  alt={member.name}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 8%',
                    display: 'block',
                    position: 'absolute', inset: 0,
                  }}
                />
                {/* Overlay social buttons */}
                <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 2 }}>
                  <a href="YOUR_GITHUB_URL" target="_blank" rel="noopener noreferrer" title="GitHub"
                    style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,.3)', textDecoration: 'none', transition: 'transform .2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0D1E2D"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                  </a>
                  <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer" title="LinkedIn"
                    style={{ width: 40, height: 40, borderRadius: '50%', background: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,.3)', textDecoration: 'none', transition: 'transform .2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>

              {/* RIGHT — info */}
              <div style={{ background: 'var(--white)', padding: '2.5rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.1rem' }}>

                {/* Role badge */}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--terra-l)', color: 'var(--terra)', fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', padding: '5px 14px', borderRadius: 100, border: '1px solid rgba(196,83,42,.25)', width: 'fit-content' }}>
                  ✦ {member.role}
                </span>

                {/* Name */}
                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(1.7rem,3vw,2.2rem)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.15, margin: 0, letterSpacing: '-.02em' }}>
                  {member.name}
                </h3>

                {/* Tagline */}
                <p style={{ fontSize: '.97rem', fontStyle: 'italic', color: 'var(--sky-mid)', lineHeight: 1.65, margin: 0, borderLeft: '3px solid var(--terra)', paddingLeft: '1rem' }}>
                  "{member.tagline}"
                </p>

                {/* Divider */}
                <div style={{ height: 1, background: 'var(--sand-3)' }} />

                {/* Bio */}
                <p style={{ fontSize: '.92rem', color: 'var(--ink-3)', lineHeight: 1.85, margin: 0 }}>
                  {member.bio}
                </p>

                {/* Skills */}
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  {member.skills.map((s, si) => (
                    <span key={si} style={{ background: 'var(--sand)', border: '1.5px solid var(--sand-3)', color: 'var(--ink-2)', fontSize: '.78rem', fontWeight: 600, padding: '5px 14px', borderRadius: 100 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,var(--terra) 0%,#8B3418 100%)', padding: 'clamp(50px,7vw,90px) 2rem', textAlign: 'center' }}>
        <h2 className="fade-up" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          Let's plan your next adventure
        </h2>
        <p className="fade-up fade-up-d1" style={{ color: 'rgba(255,255,255,.7)', fontSize: '1.05rem', marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
          Join 50,000+ explorers who plan smarter with Roamr.
        </p>
        <Link to="/planner">
          <button className="fade-up fade-up-d2 btn btn-lg" style={{ background: '#fff', color: 'var(--terra)', fontWeight: 700 }}>
            Start Planning Free →
          </button>
        </Link>
      </section>

    </div>
  );
}