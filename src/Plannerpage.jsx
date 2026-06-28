import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItineraryDisplay from './Itinerarydisplay.jsx';
import { useAuth, useTrips } from './App.jsx';
import WeatherWidget from './Weatherwidget.jsx';

// ── PDF Download — opens a beautifully styled print window ───────────────────
function downloadPDF(raw, destination, days, budget) {
    const lines = raw.split('\n');
    let htmlContent = '';
    let inList = false;

    lines.forEach(line => {
        const t = line.trim();
        if (!t) { if (inList) { htmlContent += '</ul>'; inList = false; } return; }
        if (/^##\s+/.test(t)) {
            if (inList) { htmlContent += '</ul>'; inList = false; }
            htmlContent += `<h2>${t.replace(/^##\s+/, '').replace(/\*\*/g, '')}</h2>`;
        } else if (/^###\s+/.test(t)) {
            if (inList) { htmlContent += '</ul>'; inList = false; }
            htmlContent += `<h3>${t.replace(/^###\s+/, '').replace(/\*\*/g, '')}</h3>`;
        } else if (/^[-*•]\s+/.test(t)) {
            if (!inList) { htmlContent += '<ul>'; inList = true; }
            htmlContent += `<li>${t.replace(/^[-*•]\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
        } else {
            if (inList) { htmlContent += '</ul>'; inList = false; }
            htmlContent += `<p>${t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
        }
    });
    if (inList) htmlContent += '</ul>';

    const win = window.open('', '_blank', 'width=900,height=700');
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<title>${destination} — Roamr Itinerary</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;color:#1C1917;background:#fff;}
.cover{background:linear-gradient(135deg,#1A3D5C 0%,#0D1E2D 100%);color:#fff;padding:48px 56px 40px;position:relative;overflow:hidden;}
.cover::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:24px 24px;}
.brand{display:flex;align-items:center;gap:8px;margin-bottom:28px;position:relative;}
.brand-dot{width:10px;height:10px;border-radius:50%;background:#F4845F;}
.brand-name{font-family:'DM Sans',sans-serif;font-weight:700;font-size:18px;letter-spacing:-.02em;color:#fff;}
.brand-name span{color:#F4845F;}
.cover h1{font-family:'DM Serif Display',serif;font-size:38px;font-weight:700;line-height:1.1;position:relative;letter-spacing:-.02em;margin-bottom:20px;}
.chips{display:flex;gap:10px;flex-wrap:wrap;position:relative;}
.chip{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:100px;padding:5px 14px;font-size:12px;font-weight:600;color:rgba(255,255,255,.85);}
.body{padding:40px 56px 80px;}
h2{font-family:'DM Serif Display',serif;font-size:19px;font-weight:700;color:#1A3D5C;margin:36px 0 14px;padding:10px 16px;background:#EAF2FA;border-left:4px solid #1A3D5C;border-radius:0 8px 8px 0;page-break-after:avoid;}
h2:first-of-type{margin-top:0;}
h3{font-family:'DM Serif Display',serif;font-size:14px;font-weight:700;color:#C4532A;margin:18px 0 7px;page-break-after:avoid;}
h3::before{content:'📍 ';font-size:12px;}
ul{margin:4px 0 14px 22px;}
li{font-size:13px;line-height:1.78;color:#44403C;margin-bottom:3px;}
p{font-size:13px;line-height:1.78;color:#44403C;margin-bottom:8px;}
strong{font-weight:600;color:#1C1917;}
.footer-bar{position:fixed;bottom:0;left:0;right:0;background:#F7F2EC;border-top:1px solid #E8DDD0;padding:8px 56px;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#78716C;}
.footer-bar strong{color:#C4532A;}
.print-btn{position:fixed;top:20px;right:20px;z-index:999;background:linear-gradient(135deg,#C4532A,#8B3418);color:#fff;border:none;border-radius:10px;padding:12px 24px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(196,83,42,.4);display:flex;align-items:center;gap:8px;}
@media print{
  .no-print{display:none!important;}
  body,h2,.cover{print-color-adjust:exact;-webkit-print-color-adjust:exact;}
  .footer-bar{position:fixed;}
}
</style></head><body>
<button class="print-btn no-print" onclick="window.print()">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  Save as PDF
</button>
<div class="cover">
  <div class="brand"><div class="brand-dot"></div><div class="brand-name">roam<span>r</span></div></div>
  <h1>${destination}<br/>Travel Itinerary</h1>
  <div class="chips">
    <span class="chip">📅 ${days} Day${parseInt(days) > 1 ? 's' : ''}</span>
    <span class="chip">💰 ${budget}</span>
    <span class="chip">📆 ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
    <span class="chip">✦ Roamr AI</span>
  </div>
</div>
<div class="body">${htmlContent}</div>
<div class="footer-bar">
  <span>Generated by <strong>Roamr</strong></span>
  <span>${destination} · ${days} Days · ${budget}</span>
</div>
<script>window.onload=function(){setTimeout(()=>window.print(),800);};<\/script>
</body></html>`);
    win.document.close();
}

const QUICK_TAGS = [
    { label: '🦁 Gujarat Culture', prefs: 'Jungle Safari, authentic Gujarati food, folk dance, Rann of Kutch, Somnath temple' },
    { label: '🏖 Beach & Relax', prefs: 'Beach relaxation, water sports, seafood, sunset views, coastal walks' },
    { label: '🎒 Backpacker', prefs: 'Budget stays, street food, local transport, hidden gems, hostels' },
    { label: '🏰 Heritage', prefs: 'Forts, palaces, UNESCO sites, museum visits, heritage walks, local history' },
    { label: '🌿 Nature & Trek', prefs: 'Trekking, national parks, wildlife, waterfalls, camping, bird watching' },
    { label: '🍽 Foodie', prefs: 'Local cuisine, cooking classes, food markets, restaurant tours, street food' },
];

export default function PlannerPage() {
    const { isLoggedIn } = useAuth();
    const { handleSaveTrip, preloadTrip, setPreloadTrip } = useTrips();
    const navigate = useNavigate();
    const outputRef = useRef(null);

    const [destination, setDestination] = useState('');
    const [budgetType, setBudgetType] = useState('Budget');
    const [customBudget, setCustomBudget] = useState('');
    const [days, setDays] = useState('3');
    const [preferences, setPreferences] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [itinerary, setItinerary] = useState('');
    const [itinDest, setItinDest] = useState('');
    const [saved, setSaved] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [showPackingModal, setShowPackingModal] = useState(false);
    const [packingItems, setPackingItems] = useState(null);
    const [packingLoading, setPackingLoading] = useState(false);
    const [checkedPacking, setCheckedPacking] = useState({});
    const [useCustomDates, setUseCustomDates] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Load preloaded trip from sample trips / dashboard
    useEffect(() => {
        if (preloadTrip) {
            setDestination(preloadTrip.title || '');
            setDays(preloadTrip.days || '3');
            setPreferences(preloadTrip.preferences || '');
            setItinerary(preloadTrip.itinerary || '');
            setItinDest(preloadTrip.title || '');
            setBudgetType(preloadTrip.budget || 'Budget');
            setPreloadTrip(null); // consume
        }
    }, []);

    // Compute days from date range when custom dates are used
    const today = new Date().toISOString().split('T')[0];
    const computedDays = (startDate && endDate)
        ? Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1)
        : parseInt(days) || 3;

    const effectiveDays = useCustomDates ? String(computedDays) : days;

    const formatDateRange = () => {
        if (!startDate || !endDate) return '';
        const opts = { day: 'numeric', month: 'short', year: 'numeric' };
        return `${new Date(startDate).toLocaleDateString('en-IN', opts)} – ${new Date(endDate).toLocaleDateString('en-IN', opts)}`;
    };

    const effectiveBudget = budgetType === 'Custom'
        ? `Custom budget: ${customBudget || 'flexible'}`
        : budgetType;

    // ── Generate packing list using trip details already filled in ──────────────
    const generatePackingList = async () => {
        if (!destination.trim()) return;
        setPackingLoading(true); setPackingItems(null); setCheckedPacking({});

        try {
            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

            const prompt = `Generate a packing list for a ${effectiveDays}-day trip to ${destination}.
Budget: ${effectiveBudget}
Preferences: ${preferences || 'general sightseeing'}
Return ONLY valid JSON, no markdown, no backticks:
{"👔 Clothing":["item1","item2"],"🧴 Toiletries":["item1"],"💊 Health & Safety":["item1"],"📱 Electronics":["item1"],"📄 Documents":["item1"],"🎒 Gear":["item1"],"🍎 Snacks & Misc":["item1"]}
Each category 4-7 items specific to ${destination}.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { temperature: 0.4 },
            });

            const text = response.text.replace(/```json|```/g, '').trim();
            const data = JSON.parse(text);
            const formatted = {};
            Object.entries(data).forEach(([cat, items]) => {
                formatted[cat] = (Array.isArray(items) ? items : []).map((item, idx) => ({ item: String(item), id: `${cat}-${idx}` }));
            });
            setPackingItems(formatted);
        } catch (err) {
            console.error(err);
        } finally {
            setPackingLoading(false);
        }
    };

    const togglePack = (id) => setCheckedPacking(prev => ({ ...prev, [id]: !prev[id] }));
    const totalPackItems = packingItems ? Object.values(packingItems).flat().length : 0;
    const packedCount = Object.values(checkedPacking).filter(Boolean).length;

    const generate = async (e) => {
        e.preventDefault();
        if (!destination.trim()) { setError('Please enter a destination.'); return; }
        if (useCustomDates && (!startDate || !endDate)) { setError('Please select both start and end dates.'); return; }
        if (useCustomDates && endDate < startDate) { setError('End date must be after start date.'); return; }
        setLoading(true); setError(''); setItinerary(''); setSaved(false);
        setItinDest(destination);

        try {
            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

            const dateInfo = useCustomDates && startDate && endDate
                ? `\nTravel Dates: ${formatDateRange()} (${computedDays} days)`
                : '';

            const prompt = `Create a detailed ${effectiveDays}-day travel itinerary for ${destination}.${dateInfo}

Budget: ${effectiveBudget}
Preferences: ${preferences || 'General sightseeing and local experiences'}

STRICT FORMATTING RULES:
1. Day headings: "## Day 1: [Theme Name]" — exactly this format (include actual date if travel dates provided)
2. Each attraction/stop: "### [Place or Activity Name]" — short title only
3. Under each ###: write 3 plain bullet points (- ) with plain text. NO asterisks ** anywhere in bullets.
4. End with "## Budget Breakdown" section with line items like "- Accommodation: ₹800-1500/night"
5. Give each day EXACTLY 5 places/stops spread across morning, afternoon and evening
6. Include a mix per day: 2 sightseeing, 1 food spot, 1 activity/experience, 1 hotel recommendation
7. NEVER use ** bold anywhere in bullet text — plain prose only`;

            // ── STREAMING: show text word-by-word as it's written ──────────────
            const stream = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: 'Expert local travel guide. Use clean markdown: ## day headings, ### place names, - bullet points. No ** asterisks inside descriptions. Be specific, local and detailed.',
                    temperature: 0.7,
                },
            });

            let full = '';
            setLoading(false); // hide loading spinner — text starts appearing immediately
            setStreaming(true);

            for await (const chunk of stream) {
                const text = chunk.text ?? '';
                if (text) {
                    full += text;
                    setItinerary(full); // update state on every chunk → real-time streaming UI
                }
            }

            setStreaming(false);
            setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        } catch (err) {
            console.error(err);
            setLoading(false); setStreaming(false);
            setError('Failed to generate itinerary. Please check your API key and try again.');
        }
    };

    const handleSave = () => {
        if (!itinerary || !destination || saved) return;
        if (!isLoggedIn) { navigate('/login', { state: { from: { pathname: '/planner' } } }); return; }
        handleSaveTrip({ destination, days: effectiveDays, budget: effectiveBudget, preferences, itinerary, dateRange: useCustomDates && startDate && endDate ? formatDateRange() : '' });
        setSaved(true);
    };

    return (
        <div>
            {/* Hero bar */}
            <div style={{ background: 'linear-gradient(135deg,var(--sky) 0%,var(--sky-d) 100%)', padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
                <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(196,83,42,.2)', border: '1px solid rgba(196,83,42,.4)', color: '#E8A07A', fontSize: '.78rem', fontWeight: 700, padding: '4px 14px', borderRadius: 100, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                        ✦ AI Planner
                    </div>
                    <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-.02em' }}>
                        AI Trip Planner
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1rem', maxWidth: 520 }}>
                        Enter your destination and preferences — we'll build a complete day-by-day itinerary with photos, food, hotels and transport. No tabs, no guesswork.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 2rem 4rem' }}>
                {/* Settings card */}
                <div className="card card-p" style={{ marginBottom: '1.5rem' }}>
                    <div className="card-header">
                        <div className="card-icon card-icon-terra">🗺️</div>
                        <span className="card-title">Trip Settings</span>
                    </div>
                    <form onSubmit={generate}>
                        {/* Row 1 — Destination + Budget + Generate */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1.1fr auto', gap: '1rem', alignItems: 'end', marginBottom: '1rem' }}>
                            <div>
                                <label className="label">Destination</label>
                                <div className="input-icon-wrap">
                                    <span className="input-icon">📍</span>
                                    <input className="input" type="text" placeholder="e.g. Sasan Gir, Paris, Goa, Manali…"
                                        value={destination} onChange={e => setDestination(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="label">Budget</label>
                                <select className="select" value={budgetType} onChange={e => setBudgetType(e.target.value)}>
                                    <option value="Budget">🎒 Backpacker</option>
                                    <option value="Mid-range">😊 Mid-Range</option>
                                    <option value="Luxury">✨ Luxury</option>
                                    <option value="Custom">✏️ Custom</option>
                                </select>
                            </div>
                            <div>
                                <label className="label" style={{ visibility: 'hidden' }}>_</label>
                                <button type="submit" className="btn btn-primary" style={{ padding: '10px 22px', height: 44, whiteSpace: 'nowrap', width: '100%' }} disabled={loading || streaming}>
                                    {loading
                                        ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .8s linear infinite', display: 'inline-block' }} /> Wait…</>
                                        : streaming ? '⏳ Writing…' : '✦ Generate'
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Row 2 — Duration: toggle between Days number OR Custom date range */}
                        <div style={{ marginBottom: '1rem' }}>
                            {/* Toggle row */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.6rem' }}>
                                <label className="label" style={{ margin: 0 }}>
                                    {useCustomDates ? '📅 Travel Dates' : '📅 Duration'}
                                </label>
                                <button
                                    type="button"
                                    onClick={() => { setUseCustomDates(d => !d); setError(''); }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        background: useCustomDates ? 'var(--sky-l)' : 'var(--sand)',
                                        border: `1.5px solid ${useCustomDates ? 'var(--sky-mid)' : 'var(--sand-3)'}`,
                                        color: useCustomDates ? 'var(--sky-mid)' : 'var(--ink-3)',
                                        borderRadius: 100, padding: '4px 12px',
                                        fontSize: '.78rem', fontWeight: 700,
                                        cursor: 'pointer', transition: 'all .2s',
                                    }}
                                >
                                    <span style={{ fontSize: '.9rem' }}>{useCustomDates ? '📅' : '🔢'}</span>
                                    {useCustomDates ? 'Using custom dates' : 'Pick exact dates'}
                                </button>
                            </div>

                            {/* Number of days (default) */}
                            {!useCustomDates && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <input
                                        className="input" type="number" min="1" max="30"
                                        value={days} onChange={e => setDays(e.target.value)}
                                        style={{ maxWidth: 120 }}
                                    />
                                    <span style={{ fontSize: '.88rem', color: 'var(--ink-3)' }}>
                                        day{parseInt(days) !== 1 ? 's' : ''} trip
                                    </span>
                                </div>
                            )}

                            {/* Custom date range */}
                            {useCustomDates && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.75rem', alignItems: 'end' }}>
                                    <div>
                                        <label className="label" style={{ fontSize: '.72rem', marginBottom: 4 }}>Start Date</label>
                                        <input
                                            className="input" type="date"
                                            min={today}
                                            value={startDate}
                                            onChange={e => {
                                                setStartDate(e.target.value);
                                                // Auto-push end date if it's before new start
                                                if (endDate && e.target.value > endDate) setEndDate('');
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="label" style={{ fontSize: '.72rem', marginBottom: 4 }}>End Date</label>
                                        <input
                                            className="input" type="date"
                                            min={startDate || today}
                                            value={endDate}
                                            onChange={e => setEndDate(e.target.value)}
                                        />
                                    </div>
                                    {/* Duration pill — shows computed days */}
                                    <div style={{ paddingBottom: 1 }}>
                                        <div style={{
                                            background: startDate && endDate
                                                ? 'linear-gradient(135deg,var(--sky),var(--sky-mid))'
                                                : 'var(--sand-3)',
                                            color: startDate && endDate ? '#fff' : 'var(--ink-3)',
                                            borderRadius: 10, padding: '10px 14px',
                                            textAlign: 'center', minWidth: 80,
                                            transition: 'all .3s',
                                        }}>
                                            {startDate && endDate ? (
                                                <>
                                                    <div style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 700, fontSize: '1.3rem', lineHeight: 1 }}>{computedDays}</div>
                                                    <div style={{ fontSize: '.68rem', marginTop: 2, opacity: .85 }}>day{computedDays !== 1 ? 's' : ''}</div>
                                                </>
                                            ) : (
                                                <div style={{ fontSize: '.75rem' }}>— days</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Date range summary */}
                            {useCustomDates && startDate && endDate && (
                                <div style={{ marginTop: '.6rem', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--sky-l)', border: '1px solid rgba(46,107,158,.2)', borderRadius: 10, padding: '.6rem 1rem' }}>
                                    <span style={{ fontSize: '1rem' }}>📅</span>
                                    <span style={{ fontSize: '.85rem', color: 'var(--sky)', fontWeight: 600 }}>{formatDateRange()}</span>
                                    <span style={{ fontSize: '.82rem', color: 'var(--ink-3)', marginLeft: 2 }}>({computedDays} day{computedDays !== 1 ? 's' : ''})</span>
                                </div>
                            )}
                        </div>

                        {budgetType === 'Custom' && (
                            <div className="field">
                                <label className="label">Your Budget (e.g. ₹20,000 for 2 people · $500 total)</label>
                                <input className="input" type="text" placeholder="Type your exact budget…" value={customBudget} onChange={e => setCustomBudget(e.target.value)} />
                            </div>
                        )}

                        {/* Quick tags */}
                        <div style={{ marginBottom: '.85rem' }}>
                            <label className="label" style={{ marginBottom: 8 }}>Quick Preferences</label>
                            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                                {QUICK_TAGS.map(tag => (
                                    <button key={tag.label} type="button"
                                        style={{ background: preferences === tag.prefs ? 'var(--terra)' : 'none', color: preferences === tag.prefs ? '#fff' : 'var(--terra)', border: '1.5px solid var(--terra)', fontSize: '.8rem', fontWeight: 600, padding: '4px 12px', borderRadius: 100, cursor: 'pointer', transition: 'all .2s' }}
                                        onClick={() => setPreferences(p => p === tag.prefs ? '' : tag.prefs)}>
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="label">Custom Preferences</label>
                            <textarea className="textarea" rows={2}
                                placeholder="e.g. historic monuments, street food, nature hikes, photography spots, water sports…"
                                value={preferences} onChange={e => setPreferences(e.target.value)} />
                        </div>
                    </form>
                </div>

                {error && <div className="error-box" style={{ marginBottom: '1rem' }}><span>⚠️</span><span>{error}</span></div>}

                {loading && (
                    <div className="card card-p" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                        <div className="spinner" style={{ margin: '0 auto 1.5rem' }} />
                        <p style={{ color: 'var(--ink-3)', fontWeight: 500, marginBottom: '1.25rem' }}>Consulting local experts &amp; mapping your journey…</p>
                        <div style={{ width: '60%', margin: '0 auto' }}>
                            {[100, 75, 88, 60, 92].map((w, i) => (
                                <div key={i} className="shimmer-line" style={{ width: `${w}%`, animationDelay: `${i * .12}s` }} />
                            ))}
                        </div>
                    </div>
                )}

                {!itinerary && !loading && !error && (
                    <div className="card card-p" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: .35 }}>🧭</div>
                        <strong style={{ display: 'block', color: 'var(--ink)', fontSize: '1.05rem', marginBottom: 8 }}>Your itinerary will appear here</strong>
                        <p style={{ color: 'var(--ink-3)', fontSize: '.9rem', maxWidth: 380, margin: '0 auto' }}>
                            Fill in the settings above and hit Generate to get a full day-by-day plan with AI-generated photos, food spots, hotels and a budget breakdown.
                        </p>
                    </div>
                )}

                {itinerary && !loading && (
                    <div ref={outputRef}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '.75rem' }}>
                            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)' }}>
                                Your Itinerary — <span style={{ color: 'var(--terra)', fontStyle: 'italic' }}>{itinDest}</span>
                            </h2>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                                <span className="badge badge-success">
                                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                                    {streaming ? 'Writing…' : 'Ready'}
                                </span>
                                {streaming && (
                                    <span style={{ fontSize: '.8rem', color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 500 }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--terra)', display: 'inline-block', animation: 'chatPulse 1s ease-in-out infinite' }} />
                                        Generating…
                                    </span>
                                )}
                                <button className="btn btn-sm" onClick={() => { setShowPackingModal(true); if (!packingItems) generatePackingList(); }}
                                    style={{ background: 'linear-gradient(135deg,#245076,#152D44)', color: '#fff', border: 'none', fontWeight: 600, boxShadow: '0 2px 8px rgba(21,45,68,.3)' }}>
                                    🎒 Packing List
                                </button>
                                <button className="btn btn-sm" onClick={handleSave} disabled={saved}
                                    style={{ background: saved ? 'var(--green-l)' : 'transparent', border: `1.5px solid ${saved ? 'rgba(21,128,61,.3)' : 'var(--green)'}`, color: 'var(--green)', fontWeight: 600 }}>
                                    {saved ? '✓ Saved!' : '✓ Save This Trip'}
                                </button>
                                <button className="btn btn-sm" onClick={() => downloadPDF(itinerary, itinDest, effectiveDays, effectiveBudget, useCustomDates && startDate && endDate ? formatDateRange() : '')}
                                    style={{ background: 'linear-gradient(135deg,var(--terra),#8B3418)', color: '#fff', border: 'none', fontWeight: 600, boxShadow: '0 2px 8px rgba(196,83,42,.3)' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    Download PDF
                                </button>
                            </div>
                        </div>
                        <ItineraryDisplay raw={itinerary} destination={itinDest} />

                        {/* Weather widget */}
                        <div style={{ marginTop: '1.5rem' }}>
                            <WeatherWidget destination={itinDest} />
                        </div>

                        {/* ── INLINE PACKING LIST PANEL ── */}
                        {showPackingModal && (
                            <div style={{ marginTop: '1.5rem', background: 'var(--white)', border: '1px solid var(--sand-3)', borderRadius: 'var(--r8)', overflow: 'hidden', boxShadow: 'var(--sh-md)', animation: 'fadeUp var(--d5) var(--ease-out) both' }}>
                                {/* Header */}
                                <div style={{ background: 'linear-gradient(135deg,#152D44,#245076)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: '1.3rem' }}>🎒</span>
                                        <div>
                                            <div style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 400, fontSize: '1.05rem', color: '#fff' }}>Packing List — {itinDest}</div>
                                            {packingItems && <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,.55)', marginTop: 2 }}>{packedCount}/{totalPackItems} items packed</div>}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        {packingItems && (
                                            <button onClick={generatePackingList} className="btn btn-sm"
                                                style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', fontSize: '0.6875rem' }}>
                                                ↻ Regenerate
                                            </button>
                                        )}
                                        <button onClick={() => setShowPackingModal(false)}
                                            style={{ background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: 6, color: 'rgba(255,255,255,.7)', cursor: 'pointer', padding: '4px 8px', fontSize: '.8rem', transition: 'background .2s' }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
                                        >✕</button>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                {packingItems && totalPackItems > 0 && (
                                    <div style={{ height: 4, background: 'var(--sand-3)' }}>
                                        <div style={{ height: '100%', width: `${Math.round((packedCount / totalPackItems) * 100)}%`, background: packedCount === totalPackItems ? 'var(--green)' : 'linear-gradient(90deg,var(--sky-m),var(--terra))', borderRadius: '0 4px 4px 0', transition: 'width .4s var(--ease-out)' }} />
                                    </div>
                                )}

                                {/* Loading */}
                                {packingLoading && (
                                    <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                                        <div className="spinner" style={{ margin: '0 auto .75rem' }} />
                                        <p style={{ color: 'var(--ink-3)', fontSize: '0.875rem' }}>Building your packing list for {itinDest}…</p>
                                    </div>
                                )}

                                {/* Items grid */}
                                {packingItems && !packingLoading && (
                                    <div style={{ padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
                                        {Object.entries(packingItems).map(([cat, items]) => items.length > 0 && (
                                            <div key={cat} style={{ background: 'var(--sand)', borderRadius: 'var(--r6)', padding: '1rem 1.1rem', border: '1px solid var(--sand-3)' }}>
                                                <div style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 400, fontSize: '0.9375rem', color: 'var(--sky-m)', marginBottom: '0.6rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--sand-3)' }}>
                                                    {cat}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                    {items.map(({ item, id }) => (
                                                        <label key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px', cursor: 'pointer', borderRadius: 6, transition: 'background .15s' }}
                                                            onMouseEnter={e => e.currentTarget.style.background = 'var(--white)'}
                                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                            <input type="checkbox" checked={!!checkedPacking[id]} onChange={() => togglePack(id)}
                                                                style={{ width: 15, height: 15, accentColor: 'var(--terra)', cursor: 'pointer', flexShrink: 0 }} />
                                                            <span style={{ fontSize: '0.8125rem', color: checkedPacking[id] ? 'var(--ink-4)' : 'var(--ink-2)', textDecoration: checkedPacking[id] ? 'line-through' : 'none', lineHeight: 1.5, transition: 'all .2s' }}>
                                                                {item}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* All packed celebration */}
                                {packingItems && packedCount === totalPackItems && totalPackItems > 0 && (
                                    <div style={{ margin: '0 1.5rem 1.25rem', background: 'var(--green-l)', border: '1px solid rgba(21,96,47,.2)', borderRadius: 'var(--r5)', padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--green)', fontWeight: 600 }}>
                                        🎉 All packed! Have an amazing trip to {itinDest}!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}