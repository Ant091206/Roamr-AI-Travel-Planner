import React, { useState, useEffect } from 'react';

// ── Image cache ───────────────────────────────────────────────────────────────
const IMG_CACHE = {};

// ── Serial queue — 1 at a time, 350ms apart ──────────────────────────────────
const queue = [];
let queueRunning = false;
function enqueue(fn) {
    return new Promise((resolve, reject) => {
        queue.push({ fn, resolve, reject });
        if (!queueRunning) runQueue();
    });
}
async function runQueue() {
    queueRunning = true;
    while (queue.length > 0) {
        const { fn, resolve, reject } = queue.shift();
        try { resolve(await fn()); } catch (e) { reject(e); }
        if (queue.length > 0) await new Promise(r => setTimeout(r, 350));
    }
    queueRunning = false;
}

// ── Curated fallback images — multiple per category for variety ───────────────
// Each category has 4 photos so same-category cards on the same day look different
const CATEGORY_PHOTOS_POOL = {
    beach: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=75', 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=75', 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=75'],
    temple: ['https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=75', 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=75', 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&q=75', 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=600&q=75'],
    palace: ['https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=75', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=75', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=75', 'https://images.unsplash.com/photo-1585136917228-c9f1fb4db8a5?w=600&q=75'],
    fort: ['https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=75', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=75', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=75', 'https://images.unsplash.com/photo-1585136917228-c9f1fb4db8a5?w=600&q=75'],
    wildlife: ['https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=75', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=75', 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&q=75', 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=75'],
    mountain: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=75', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=75', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=75'],
    lake: ['https://images.unsplash.com/photo-1605649461784-edc3c4bce182?w=600&q=75', 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=75', 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&q=75', 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=75'],
    waterfall: ['https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=75', 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=75', 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&q=75', 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=75'],
    food: ['https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=75', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=75', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=75', 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=75'],
    hotel: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=75', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=75', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=75', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=75'],
    market: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=75', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=75', 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=600&q=75'],
    museum: ['https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=75', 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&q=75', 'https://images.unsplash.com/photo-1575223970966-76ae61ee7838?w=600&q=75', 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=600&q=75'],
    garden: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=75', 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=75', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75', 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=600&q=75'],
    sunset: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=75', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75', 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=600&q=75', 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=75'],
    backwaters: ['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=75', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=75', 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&q=75', 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=600&q=75'],
    default: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=75', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=75', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=75'],
};

// Pick from pool using place name as seed — consistent but varied
function getCategoryPhoto(category, placeName) {
    const pool = CATEGORY_PHOTOS_POOL[category] || CATEGORY_PHOTOS_POOL.default;
    // Hash place name to always get the same image for the same place, but different from others
    let hash = 0;
    for (let i = 0; i < placeName.length; i++) hash = ((hash << 5) - hash + placeName.charCodeAt(i)) | 0;
    return pool[Math.abs(hash) % pool.length];
}

// Keep single-value alias for backwards compat
const CATEGORY_PHOTOS = Object.fromEntries(
    Object.entries(CATEGORY_PHOTOS_POOL).map(([k, v]) => [k, v[0]])
);

// ── Destination-level curated photos ─────────────────────────────────────────
const DESTINATION_PHOTOS = {
    goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=75',
    manali: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=75',
    kashmir: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=75',
    kerala: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=75',
    rajasthan: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=75',
    udaipur: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=75',
    jaipur: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=75',
    varanasi: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&q=75',
    ladakh: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75',
    rishikesh: 'https://images.unsplash.com/photo-1502519144081-acca18599776?w=600&q=75',
    coorg: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=75',
    andaman: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75',
    'sasan gir': 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=75',
    mumbai: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=75',
    delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=75',
    agra: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=75',
    bangalore: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=75',
    paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=75',
    dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=75',
    singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=75',
    tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=75',
    bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=75',
    london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=75',
    maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=75',
};

// ── Detect place category from name ─────────────────────────────────────────
function detectCategory(name, destination) {
    const n = (name + ' ' + destination).toLowerCase();
    if (/beach|coast|sea|shore|baga|calangute|varca/.test(n)) return 'beach';
    if (/temple|mandir|shrine|masjid|church|basilica|gurudwara/.test(n)) return 'temple';
    if (/palace|mahal|haveli/.test(n)) return 'palace';
    if (/fort|qila|kila|citadel/.test(n)) return 'fort';
    if (/safari|wildlife|national park|tiger|lion|jungle|gir/.test(n)) return 'wildlife';
    if (/mountain|hill|peak|trek|pass|himalayas|snow/.test(n)) return 'mountain';
    if (/lake|dal|nagin|pond|reservoir/.test(n)) return 'lake';
    if (/waterfall|falls|cascade/.test(n)) return 'waterfall';
    if (/restaurant|café|cafe|food|dhaba|eat|dine|shack/.test(n)) return 'food';
    if (/hotel|resort|hostel|lodge|inn|stay/.test(n)) return 'hotel';
    if (/market|bazaar|bazar|shopping/.test(n)) return 'market';
    if (/museum|gallery|heritage site/.test(n)) return 'museum';
    if (/garden|park|botanical/.test(n)) return 'garden';
    if (/sunset|sunrise|viewpoint|view point/.test(n)) return 'sunset';
    if (/backwater|houseboat|alleppey/.test(n)) return 'backwaters';
    return 'default';
}

// ── Try Wikipedia for specific named places ───────────────────────────────────
async function tryWikipediaImage(placeName) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(placeName)}&prop=pageimages&format=json&pithumbsize=600&origin=*`;
        const r = await fetch(url, { signal: AbortSignal.timeout(5000) });
        const d = await r.json();
        const pg = Object.values(d?.query?.pages || {})[0];
        const src = pg?.thumbnail?.source;
        // Reject maps, flags, logos, SVGs and very small images
        if (src
            && !src.includes('Flag_of')
            && !src.includes('flag_of')
            && !src.includes('.svg')
            && !src.includes('Logo')
            && !src.includes('logo')
            && !src.includes('Map_of')
            && !src.includes('map_of')
            && !src.includes('Symbol')
            && !src.includes('location_map')
        ) return src;
    } catch { /* timeout or network error */ }
    return null;
}

// ── Main image fetch logic ────────────────────────────────────────────────────
async function fetchImage(placeName, destination) {
    const destKey = destination.toLowerCase();
    const category = detectCategory(placeName, destination);

    // 1. Try Wikipedia for specific named landmark
    const wikiImg = await tryWikipediaImage(placeName);
    if (wikiImg) return wikiImg;

    // 2. Category pool — hashes place name for variety (food ≠ hotel ≠ temple, and same
    //    category picks different images based on place name)
    return getCategoryPhoto(category, placeName);
}

// ── PlaceImage component ──────────────────────────────────────────────────────
function PlaceImage({ placeName, destination, emoji }) {
    const [imgUrl, setImgUrl] = useState(null);
    const [status, setStatus] = useState('loading');
    const [imgError, setImgError] = useState(false);
    const key = `${placeName}__${destination}`;

    useEffect(() => {
        let cancelled = false;
        if (key in IMG_CACHE) {
            const cached = IMG_CACHE[key];
            setImgUrl(cached || null);
            setStatus(cached ? 'loaded' : 'failed');
            return;
        }
        setStatus('loading');
        enqueue(() => fetchImage(placeName, destination))
            .then(url => {
                if (cancelled) return;
                IMG_CACHE[key] = url || '';
                setImgUrl(url || null);
                setStatus(url ? 'loaded' : 'failed');
            })
            .catch(() => {
                if (cancelled) return;
                IMG_CACHE[key] = '';
                setStatus('failed');
            });
        return () => { cancelled = true; };
    }, [key]);

    return (
        <div style={{ height: 170, overflow: 'hidden', background: 'var(--sand-3)', flexShrink: 0, position: 'relative' }}>
            {status === 'loading' && !imgError && (
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg,var(--sand-3) 25%,var(--sand) 50%,var(--sand-3) 75%)', backgroundSize: '600px 100%', animation: 'shimmer 1.4s infinite' }} />
            )}
            {(status === 'failed' || imgError) && (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', background: 'linear-gradient(135deg,var(--sand-3),var(--sand-2))' }}>
                    {emoji || '📍'}
                </div>
            )}
            {status === 'loaded' && imgUrl && !imgError && (
                <img
                    src={imgUrl}
                    alt={placeName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'imgAppear .4s ease' }}
                    onError={() => { IMG_CACHE[key] = ''; setImgError(true); }}
                />
            )}
        </div>
    );
}

// ── Markdown parser ───────────────────────────────────────────────────────────
function parseItinerary(raw) {
    const lines = raw.split('\n');
    const days = [];
    let currentDay = null;
    let currentPlace = null;

    for (const line of lines) {
        const t = line.trim();
        if (!t) continue;
        if (/^##\s+/.test(t)) {
            if (currentPlace && currentDay) currentDay.places.push(currentPlace);
            currentPlace = null;
            currentDay = { heading: t.replace(/^##\s+/, '').replace(/\*\*/g, ''), places: [] };
            days.push(currentDay);
        } else if (/^###\s+/.test(t)) {
            if (currentPlace && currentDay) currentDay.places.push(currentPlace);
            currentPlace = { name: t.replace(/^###\s+/, '').replace(/\*\*/g, ''), bullets: [] };
        } else if (/^[-*•]\s+/.test(t) && currentPlace) {
            currentPlace.bullets.push(t.replace(/^[-*•]\s+/, '').replace(/\*\*/g, ''));
        } else if (currentPlace) {
            currentPlace.bullets.push(t.replace(/\*\*/g, ''));
        }
    }
    if (currentPlace && currentDay) currentDay.places.push(currentPlace);
    return days;
}

function detectTag(name) {
    const n = name.toLowerCase();
    if (/restaurant|café|cafe|food|dhaba|eat|dine|shack|kitchen/.test(n)) return { label: 'Food', cls: 'tag-food' };
    if (/hotel|resort|hostel|stay|lodge|inn|accommodation/.test(n)) return { label: 'Stay', cls: 'tag-hotel' };
    if (/museum|gallery|fort|palace|temple|church|heritage/.test(n)) return { label: 'Sight', cls: 'tag-sight' };
    if (/tip|note|transport|bus|train|taxi|auto/.test(n)) return { label: 'Tip', cls: 'tag-tip' };
    return null;
}

function BudgetSection({ raw, places }) {
    // Only keep lines that look like actual cost estimates (contain ₹, $, /night, /day, per, etc.)
    const isCostLine = (text) => {
        return /₹|\$|usd|inr|\/night|\/day|\/person|per person|per day|approximately|approx|budget|total|free|entry|ticket|cost|price|fare|around|~/.test(text.toLowerCase());
    };

    const items = [];

    // From parsed ### place names + bullets — only keep cost-looking lines
    places.forEach(p => {
        if (p.name && isCostLine(p.name)) items.push(p.name);
        p.bullets.forEach(b => { if (b && isCostLine(b)) items.push(b); });
    });

    // Fallback: parse raw section text for bullet lines that look like costs
    if (items.length === 0 && raw) {
        raw.split('\n').forEach(line => {
            const t = line.trim().replace(/^[-*•#]+\s*/, '').replace(/\*\*/g, '').trim();
            if (t && isCostLine(t) && t.length > 4 && t.length < 120) items.push(t);
        });
    }

    if (items.length === 0) return null;

    const icons = {
        accommodation: '🏨', hotel: '🏨', hostel: '🏨', resort: '🏨', stay: '🏨',
        food: '🍽', meal: '🍽', restaurant: '🍽', breakfast: '🍽', lunch: '🍽', dinner: '🍽', street: '🍽',
        transport: '🚌', taxi: '🚕', auto: '🚕', flight: '✈️', train: '🚂', bus: '🚌', travel: '🚌',
        activity: '🎯', adventure: '🎯', trek: '🎯', rafting: '🎯',
        entrance: '🎫', ticket: '🎫', entry: '🎫', museum: '🎫',
        total: '💎', overall: '💎', daily: '📊', 'per day': '📊',
    };
    const getIcon = (text) => {
        const t = text.toLowerCase();
        return Object.entries(icons).find(([k]) => t.includes(k))?.[1] || '💰';
    };

    return (
        <div style={{ background: 'linear-gradient(135deg,#EAF2FB,#F0F7FF)', border: '1px solid rgba(36,80,118,.18)', borderRadius: 'var(--r8)', padding: '1.5rem 1.75rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.1rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: 'var(--r4)', background: 'var(--sky-l)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>💰</div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.15rem', color: 'var(--sky)', fontWeight: 400 }}>Budget Breakdown</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '0.5rem' }}>
                {items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: 'rgba(255,255,255,.75)', borderRadius: 'var(--r3)', padding: '7px 11px', border: '1px solid rgba(36,80,118,.08)' }}>
                        <span style={{ fontSize: '0.9rem', flexShrink: 0, marginTop: 1 }}>{getIcon(item)}</span>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ItineraryDisplay({ raw, destination }) {
    const days = parseItinerary(raw);
    if (!days.length) return <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem', color: 'var(--ink-3)' }}>{raw}</pre>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {days.map((day, di) => {
                const isBudget = /budget|cost|expense|price|breakdown|₹|spend/i.test(day.heading);
                if (isBudget) return <BudgetSection key={di} raw={raw} places={day.places} />;

                return (
                    <div key={di}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.1rem' }}>
                            <div style={{ background: 'linear-gradient(135deg,var(--sky),var(--sky-m))', color: '#fff', fontFamily: "'DM Serif Display',serif", fontSize: '0.8125rem', fontWeight: 400, padding: '4px 14px', borderRadius: 'var(--rf)', flexShrink: 0 }}>
                                Day {di + 1}
                            </div>
                            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.25rem', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-.01em' }}>
                                {day.heading.replace(/^Day\s+\d+[:\s-]*/i, '')}
                            </h2>
                            <div style={{ flex: 1, height: 1, background: 'var(--sand-3)' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1rem' }}>
                            {day.places.map((place, pi) => {
                                const tag = detectTag(place.name);
                                const emoji = tag?.label === 'Food' ? '🍽' : tag?.label === 'Stay' ? '🏨' : tag?.label === 'Sight' ? '🏛' : '📍';
                                return (
                                    <div key={pi}
                                        style={{ background: 'var(--white)', border: '1px solid var(--sand-3)', borderRadius: 'var(--r8)', overflow: 'hidden', boxShadow: 'var(--sh-xs)', transition: 'transform var(--d4) var(--ease-out),box-shadow var(--d4) var(--ease-out)' }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                                    >
                                        <PlaceImage placeName={place.name} destination={destination} emoji={emoji} />
                                        <div style={{ padding: '0.85rem 1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                                                {tag && <span className={`tag ${tag.cls}`}>{tag.label}</span>}
                                                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '0.9375rem', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.3, letterSpacing: '-.01em' }}>
                                                    {place.name}
                                                </h3>
                                            </div>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {place.bullets.map((b, bi) => (
                                                    <li key={bi} style={{ fontSize: '0.8125rem', color: 'var(--ink-3)', lineHeight: 1.65, paddingLeft: 12, position: 'relative', marginBottom: 3 }}>
                                                        <span style={{ position: 'absolute', left: 0, color: 'var(--terra)', fontWeight: 700 }}>·</span>
                                                        {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}