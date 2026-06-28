import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['👔 Clothing', '🧴 Toiletries', '💊 Health & Safety', '📱 Electronics', '📄 Documents', '🎒 Gear', '🍎 Food & Snacks', '🎭 Activities'];

export default function PackingList() {
    const [destination, setDestination] = useState('');
    const [days, setDays] = useState('3');
    const [climate, setClimate] = useState('Tropical');
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [packing, setPacking] = useState(null); // { category: [{ item, checked }] }
    const [checkedItems, setCheckedItems] = useState({});
    const navigate = useNavigate();

    const ACTIVITY_OPTIONS = ['🏖 Beach', '🏔 Trekking', '🏛 Sightseeing', '🍽 Food Tour', '🦁 Safari', '⛷ Winter Sports', '🤿 Water Sports', '🎭 Cultural'];

    const toggleActivity = (a) => setActivities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

    const generateList = async () => {
        if (!destination.trim()) { setError('Please enter a destination.'); return; }
        setLoading(true); setError(''); setPacking(null); setCheckedItems({});

        try {
            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

            const prompt = `Generate a detailed packing list for a ${days}-day trip to ${destination}.
Climate: ${climate}
Activities planned: ${activities.length ? activities.join(', ') : 'General sightseeing'}

Return ONLY a valid JSON object (no markdown, no backticks) in this exact format:
{
  "👔 Clothing": ["item1", "item2", ...],
  "🧴 Toiletries": ["item1", ...],
  "💊 Health & Safety": ["item1", ...],
  "📱 Electronics": ["item1", ...],
  "📄 Documents": ["item1", ...],
  "🎒 Gear": ["item1", ...],
  "🍎 Food & Snacks": ["item1", ...],
  "🎭 Activities": ["item1", ...]
}
Each category should have 4-8 specific, practical items tailored to the destination and activities.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { temperature: 0.5 },
            });

            const text = response.text.replace(/```json|```/g, '').trim();
            const data = JSON.parse(text);

            // Convert to { category: [{item, checked: false}] }
            const formatted = {};
            Object.entries(data).forEach(([cat, items]) => {
                formatted[cat] = (Array.isArray(items) ? items : []).map(item => ({ item: String(item), id: `${cat}-${item}` }));
            });
            setPacking(formatted);
        } catch (err) {
            console.error(err);
            setError('Failed to generate packing list. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleCheck = (id) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));

    const totalItems = packing ? Object.values(packing).flat().length : 0;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const progress = totalItems ? Math.round((checkedCount / totalItems) * 100) : 0;

    const downloadPackingPDF = () => {
        if (!packing) return;
        const win = window.open('', '_blank', 'width=800,height=600');
        let html = `<h1 style="font-family:serif;color:#1A3D5C">📦 Packing List — ${destination}</h1>
<p style="color:#78716C;font-family:sans-serif;margin-bottom:24px">${days} days · ${climate} · ${new Date().toLocaleDateString()}</p>`;
        Object.entries(packing).forEach(([cat, items]) => {
            html += `<h3 style="font-family:serif;color:#C4532A;margin:20px 0 8px">${cat}</h3><ul style="font-family:sans-serif;font-size:14px;line-height:1.8;color:#44403C">`;
            items.forEach(({ item }) => { html += `<li>☐ ${item}</li>`; });
            html += '</ul>';
        });
        win.document.write(`<!DOCTYPE html><html><head><title>Packing List - ${destination}</title></head><body style="padding:40px;max-width:700px;margin:0 auto">${html}<script>window.onload=()=>setTimeout(()=>window.print(),500)<\/script></body></html>`);
        win.document.close();
    };

    return (
        <div>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,#1A3D5C 0%,#0D1E2D 100%)', padding: 'clamp(50px,7vw,80px) 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
                <div style={{ position: 'relative' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(196,83,42,.2)', border: '1px solid rgba(196,83,42,.4)', color: '#E8A07A', fontSize: '.78rem', fontWeight: 700, padding: '5px 16px', borderRadius: 100, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                        ✦ AI Powered
                    </div>
                    <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 10 }}>Packing List Generator</h1>
                    <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>Tell us where you're going — we'll build your perfect packing checklist before you can say "did I forget my charger?"</p>
                </div>
            </div>

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 2rem 4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: packing ? '1fr 1.6fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>

                    {/* Settings card */}
                    <div className="card card-p">
                        <div className="card-header">
                            <div className="card-icon card-icon-terra">🎒</div>
                            <span className="card-title">Trip Details</span>
                        </div>

                        <div className="field">
                            <label className="label">Destination</label>
                            <div className="input-icon-wrap">
                                <span className="input-icon">📍</span>
                                <input className="input" type="text" placeholder="e.g. Goa, Manali, Paris…" value={destination} onChange={e => setDestination(e.target.value)} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="field">
                                <label className="label">Duration</label>
                                <input className="input" type="number" min="1" max="30" value={days} onChange={e => setDays(e.target.value)} />
                            </div>
                            <div className="field">
                                <label className="label">Climate</label>
                                <select className="select" value={climate} onChange={e => setClimate(e.target.value)}>
                                    {['Tropical', 'Cold/Snow', 'Desert/Hot', 'Mild/Rainy', 'Moderate'].map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Activities</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {ACTIVITY_OPTIONS.map(a => (
                                    <button key={a} type="button" onClick={() => toggleActivity(a)}
                                        style={{ background: activities.includes(a) ? 'var(--terra)' : 'var(--sand)', color: activities.includes(a) ? '#fff' : 'var(--ink-2)', border: `1.5px solid ${activities.includes(a) ? 'var(--terra)' : 'var(--sand-3)'}`, borderRadius: 100, padding: '5px 12px', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}>
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {error && <div className="error-box" style={{ marginBottom: '1rem' }}><span>⚠️</span><span>{error}</span></div>}

                        <button className="btn btn-primary btn-md" style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}
                            onClick={generateList} disabled={loading}>
                            {loading ? <><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Generating…</> : '✦ Generate Packing List'}
                        </button>
                    </div>

                    {/* Packing list output */}
                    {packing && (
                        <div>
                            {/* Progress bar */}
                            <div className="card" style={{ padding: '1.1rem 1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--ink)' }}>Packed: {checkedCount}/{totalItems} items</span>
                                        <span style={{ fontSize: '.85rem', fontWeight: 700, color: progress === 100 ? 'var(--green)' : 'var(--sky-mid)' }}>{progress}%</span>
                                    </div>
                                    <div style={{ height: 8, background: 'var(--sand-3)', borderRadius: 100, overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${progress}%`, background: progress === 100 ? 'var(--green)' : 'linear-gradient(90deg,var(--sky-mid),var(--terra))', borderRadius: 100, transition: 'width .4s ease' }} />
                                    </div>
                                </div>
                                <button className="btn btn-sm" onClick={downloadPackingPDF}
                                    style={{ background: 'linear-gradient(135deg,var(--terra),#8B3418)', color: '#fff', border: 'none', flexShrink: 0 }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                    PDF
                                </button>
                            </div>

                            {/* Categories */}
                            {Object.entries(packing).map(([cat, items]) => items.length > 0 && (
                                <div key={cat} className="card" style={{ padding: '1rem 1.25rem', marginBottom: '.75rem' }}>
                                    <div style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 700, fontSize: '.95rem', color: 'var(--sky)', marginBottom: '.75rem', borderBottom: '1px solid var(--sand-3)', paddingBottom: '.5rem' }}>
                                        {cat}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
                                        {items.map(({ item, id }) => (
                                            <label key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 4px', cursor: 'pointer', borderRadius: 6, transition: 'background .15s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'var(--sand)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <input type="checkbox" checked={!!checkedItems[id]} onChange={() => toggleCheck(id)}
                                                    style={{ width: 16, height: 16, accentColor: 'var(--terra)', cursor: 'pointer', flexShrink: 0 }} />
                                                <span style={{ fontSize: '.85rem', color: checkedItems[id] ? 'var(--ink-3)' : 'var(--ink-2)', textDecoration: checkedItems[id] ? 'line-through' : 'none', lineHeight: 1.4, transition: 'all .2s' }}>
                                                    {item}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Loading state */}
                    {loading && (
                        <div className="card card-p" style={{ textAlign: 'center', padding: '3rem' }}>
                            <div className="spinner" style={{ margin: '0 auto 1rem' }} />
                            <p style={{ color: 'var(--ink-3)', fontWeight: 500 }}>Building your personalised packing list…</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}