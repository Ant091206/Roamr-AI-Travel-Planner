import React, { useState, useEffect, useCallback } from 'react';

const WMO_ICONS = {
    0: '☀️', 1: '🌤', 2: '⛅', 3: '☁️',
    45: '🌫', 48: '🌫',
    51: '🌦', 53: '🌦', 55: '🌧',
    61: '🌧', 63: '🌧', 65: '🌧',
    71: '🌨', 73: '🌨', 75: '❄️',
    80: '🌦', 81: '🌧', 82: '⛈',
    95: '⛈', 96: '⛈', 99: '⛈',
};
const WMO_DESC = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Foggy', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
    61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
    71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
    80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers',
    95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Heavy thunderstorm',
};
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function WeatherWidget({ destination }) {
    const [weather, setWeather] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | loaded | error
    const [query, setQuery] = useState(destination || '');

    const fetchWeather = useCallback(async (place) => {
        if (!place?.trim()) return;
        setStatus('loading'); setWeather(null);

        try {
            // Step 1: Geocode using OpenWeatherMap geo API
            const geoRes = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(place)}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
            );
            const geoData = await geoRes.json();
            if (!geoData?.length) throw new Error('Location not found');

            const { lat, lon, name, country } = geoData[0];

            // Step 2: Current + 7-day forecast from Open-Meteo (free, no key needed)
            const wxRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,relative_humidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=7`
            );
            const wx = await wxRes.json();

            setWeather({
                city: name,
                country,
                current: {
                    temp: Math.round(wx.current.temperature_2m),
                    feels: Math.round(wx.current.apparent_temperature),
                    code: wx.current.weathercode,
                    wind: Math.round(wx.current.windspeed_10m),
                    humidity: wx.current.relative_humidity_2m,
                },
                daily: wx.daily.time.map((date, i) => ({
                    date,
                    day: DAYS_SHORT[new Date(date).getDay()],
                    code: wx.daily.weathercode[i],
                    max: Math.round(wx.daily.temperature_2m_max[i]),
                    min: Math.round(wx.daily.temperature_2m_min[i]),
                    rain: wx.daily.precipitation_sum[i],
                })),
            });
            setStatus('loaded');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    }, []);

    // Auto-fetch when destination prop changes
    useEffect(() => {
        if (destination) { setQuery(destination); fetchWeather(destination); }
    }, [destination]);

    return (
        <div style={{ background: 'var(--white)', border: '1px solid var(--sand-3)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,#1A3D5C,#2E6B9E)', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.3rem' }}>🌤</span>
                <span style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 700, color: '#fff', fontSize: '1rem' }}>Weather Forecast</span>
            </div>

            {/* Search */}
            <div style={{ padding: '.9rem 1.1rem', borderBottom: '1px solid var(--sand-3)', display: 'flex', gap: 8 }}>
                <div className="input-icon-wrap" style={{ flex: 1 }}>
                    <span className="input-icon">📍</span>
                    <input className="input" style={{ paddingLeft: 36 }} placeholder="Enter destination…" value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && fetchWeather(query)} />
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => fetchWeather(query)} disabled={status === 'loading'} style={{ flexShrink: 0 }}>
                    {status === 'loading' ? '…' : 'Search'}
                </button>
            </div>

            {/* Loading */}
            {status === 'loading' && (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <div className="spinner" style={{ margin: '0 auto .75rem' }} />
                    <p style={{ color: 'var(--ink-3)', fontSize: '.88rem' }}>Fetching weather…</p>
                </div>
            )}

            {/* Error */}
            {status === 'error' && (
                <div className="error-box" style={{ margin: '1rem' }}>⚠️ Location not found. Try a different city name.</div>
            )}

            {/* Weather data */}
            {status === 'loaded' && weather && (
                <div style={{ padding: '1.1rem 1.25rem' }}>
                    {/* Current weather */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div>
                            <div style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>{weather.city}, {weather.country}</div>
                            <div style={{ fontSize: '.82rem', color: 'var(--ink-3)', marginTop: 2 }}>{WMO_DESC[weather.current.code] || 'Clear'}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '2.6rem', lineHeight: 1 }}>{WMO_ICONS[weather.current.code] || '🌡'}</div>
                            <div style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 700, fontSize: '1.8rem', color: 'var(--ink)', lineHeight: 1.1 }}>{weather.current.temp}°C</div>
                        </div>
                    </div>

                    {/* Extra stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '.6rem', marginBottom: '1rem' }}>
                        {[
                            { icon: '🌡', label: 'Feels like', value: `${weather.current.feels}°C` },
                            { icon: '💧', label: 'Humidity', value: `${weather.current.humidity}%` },
                            { icon: '💨', label: 'Wind', value: `${weather.current.wind} km/h` },
                        ].map(s => (
                            <div key={s.label} style={{ background: 'var(--sky-l)', borderRadius: 10, padding: '.6rem .75rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.1rem', marginBottom: 3 }}>{s.icon}</div>
                                <div style={{ fontSize: '.68rem', color: 'var(--ink-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em' }}>{s.label}</div>
                                <div style={{ fontSize: '.88rem', fontWeight: 700, color: 'var(--sky)' }}>{s.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* 7-day forecast */}
                    <div style={{ borderTop: '1px solid var(--sand-3)', paddingTop: '1rem' }}>
                        <div style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.65rem' }}>7-Day Forecast</div>
                        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 4 }}>
                            {weather.daily.map((d, i) => (
                                <div key={d.date} style={{
                                    background: i === 0 ? 'linear-gradient(135deg,var(--sky),var(--sky-mid))' : 'var(--sand)',
                                    borderRadius: 12, padding: '.65rem .6rem', textAlign: 'center',
                                    minWidth: 58, flexShrink: 0,
                                    border: `1px solid ${i === 0 ? 'transparent' : 'var(--sand-3)'}`,
                                }}>
                                    <div style={{ fontSize: '.7rem', fontWeight: 700, color: i === 0 ? 'rgba(255,255,255,.8)' : 'var(--ink-3)', marginBottom: 4 }}>{i === 0 ? 'Today' : d.day}</div>
                                    <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{WMO_ICONS[d.code] || '🌡'}</div>
                                    <div style={{ fontSize: '.8rem', fontWeight: 700, color: i === 0 ? '#fff' : 'var(--ink)' }}>{d.max}°</div>
                                    <div style={{ fontSize: '.72rem', color: i === 0 ? 'rgba(255,255,255,.6)' : 'var(--ink-3)' }}>{d.min}°</div>
                                    {d.rain > 0 && <div style={{ fontSize: '.65rem', color: i === 0 ? 'rgba(255,255,255,.7)' : '#3498db', marginTop: 2 }}>💧{d.rain}mm</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Idle */}
            {status === 'idle' && (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--ink-3)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 8, opacity: .5 }}>🌤</div>
                    <p style={{ fontSize: '.88rem' }}>Enter a destination to see the weather forecast</p>
                </div>
            )}
        </div>
    );
}