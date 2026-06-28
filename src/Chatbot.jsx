import React, { useState, useRef, useEffect } from 'react';

// ── FAQ seeds — shown as quick chips before user types ───────────────────────
const FAQS = [
  "How does Roamr generate itineraries?",
  "Is Roamr free to use?",
  "How do I save a trip?",
  "Can I plan international trips?",
  "What is the Custom budget option?",
  "How many days can I plan for?",
  "What are Sample Trips?",
  "How do I add my own preferences?",
  "Can I edit a generated itinerary?",
  "Why are images not loading sometimes?",
];

// ── Pre-written answers for FAQ chips ────────────────────────────────────────
const FAQ_ANSWERS = {
  "How does Roamr generate itineraries?": "Roamr's engine crafts detailed day-by-day itineraries in seconds. Just enter your destination, budget, number of days and preferences — and watch a full plan come together with attractions, food spots, hotels and a budget breakdown.",
  "Is Roamr free to use?": "Yes! Roamr is completely **free to use**. You can generate unlimited itineraries without a credit card. Create a free account to save your trips to your personal dashboard.",
  "How do I save a trip?": "After generating an itinerary, click the **✓ Save This Trip** button that appears below the Generate button. You need to be logged in — if you're not, you'll be redirected to the login page and sent back after signing in.",
  "Can I plan international trips?": "Absolutely! Roamr works for **any destination worldwide** — from Goa and Kashmir to Paris, Tokyo or New York. Just type the city or region in the destination field.",
  "What is the Custom budget option?": "Select **✏️ Custom** in the budget dropdown and a text field appears where you can type your exact budget — for example *₹20,000 for 2 people* or *$500 total*. Roamr tailors the entire itinerary to fit your specific amount.",
  "How many days can I plan for?": "You can plan trips from **1 to 14 days** using the Days field. For longer trips, you can generate multiple itineraries and combine them.",
  "What are Sample Trips?": "Sample Trips are **6 expert-crafted itineraries** for popular destinations — Goa, Rajasthan, Sasan Gir, Kashmir, Manali and Kerala. Each has a full day-by-day plan you can open, customise and save as your own.",
  "How do I add my own preferences?": "Use the **Preferences** field to describe your travel style — e.g. *street food, trekking, photography spots*. You can also click the **Quick Preference tags** (Beach & Relax, Heritage, Foodie, etc.) to fill it instantly.",
  "Can I edit a generated itinerary?": "Currently Roamr doesn't have inline editing — but you can **regenerate** with updated preferences anytime. Just tweak the settings and hit Generate again. Saved trips can be reopened and the plan viewed in full.",
  "Why are images not loading sometimes?": "Place images are fetched from **Wikipedia's free API**. If a place is very obscure or the Wikipedia article has no photo, the card shows an emoji placeholder instead. This is normal and doesn't affect the itinerary quality.",
};

// ── Live chat for questions not in FAQ ─────────────────────────────────
async function askAssistant(question) {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: question,
    config: {
      systemInstruction: `You are a friendly and helpful assistant for Roamr — an AI travel planning website. 
Roamr lets users generate detailed day-by-day trip itineraries instantly.
Features: AI Planner, Sample Trips (Goa, Rajasthan, Kashmir, Manali, Sasan Gir, Kerala), Save trips to dashboard, Custom budget, Quick preference tags.
Answer questions about travel planning and Roamr concisely in 2-4 sentences. Be warm and enthusiastic.`,
      temperature: 0.7,
      maxOutputTokens: 200,
    },
  });
  return response.text || "I'm not sure about that — try asking something else!";
}

// ── Format bold **text** in messages ─────────────────────────────────────────
function formatMessage(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: 'var(--ink)', fontWeight: 700 }}>{part}</strong>
      : part
  );
}

// ── Main ChatBot component ────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! 👋 I'm **Roamr AI**, your travel planning assistant. Ask me anything about planning your trip or how Roamr works!", ts: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [faqsVisible, setFaqsVisible] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (text) => {
    const q = (text || input).trim();
    if (!q) return;
    setInput('');
    setFaqsVisible(false);
    setMessages(prev => [...prev, { role: 'user', text: q, ts: Date.now() }]);
    setLoading(true);

    // Check FAQ answers first
    const faqAnswer = FAQ_ANSWERS[q];
    if (faqAnswer) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: faqAnswer, ts: Date.now() }]);
        setLoading(false);
      }, 500);
    } else {
      try {
        const answer = await askAssistant(q);
        setMessages(prev => [...prev, { role: 'bot', text: answer, ts: Date.now() }]);
      } catch {
        setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I couldn't connect right now. Please try again in a moment!", ts: Date.now() }]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
          width: 60, height: 60, borderRadius: '50%',
          background: open
            ? 'linear-gradient(135deg,#C4532A,#8B3418)'
            : 'linear-gradient(135deg,#1A3D5C,#2E6B9E)',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 6px 28px rgba(26,61,92,.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .3s cubic-bezier(.4,0,.2,1)',
          transform: open ? 'rotate(0deg) scale(1)' : 'scale(1)',
        }}
        aria-label={open ? 'Close chat' : 'Open Roamr AI chat'}
        onMouseEnter={e => { if (!open) e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'; }}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? (
          // X close icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          // Robot / AI chat icon
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Antenna */}
            <line x1="20" y1="6" x2="20" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="20" cy="5" r="2" fill="#F4845F"/>
            {/* Head */}
            <rect x="8" y="11" width="24" height="18" rx="6" fill="white" fillOpacity="0.95"/>
            {/* Eyes */}
            <circle cx="15" cy="19" r="2.5" fill="#1A3D5C"/>
            <circle cx="25" cy="19" r="2.5" fill="#1A3D5C"/>
            <circle cx="16" cy="18" r="0.8" fill="white"/>
            <circle cx="26" cy="18" r="0.8" fill="white"/>
            {/* Smile */}
            <path d="M15 23.5 Q20 27 25 23.5" stroke="#1A3D5C" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            {/* Chat bubble dot */}
            <circle cx="32" cy="10" r="4" fill="#F4845F"/>
            <text x="32" y="13.5" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">AI</text>
          </svg>
        )}

        {/* Pulse ring when closed */}
        {!open && (
          <span style={{
            position: 'absolute', inset: -4, borderRadius: '50%',
            border: '2px solid rgba(46,107,158,.4)',
            animation: 'chatPulse 2s ease-in-out infinite',
          }} />
        )}
      </button>

      {/* ── Chat window ── */}
      <div style={{
        position: 'fixed', bottom: 102, right: 28, zIndex: 999,
        width: 370, maxHeight: 560,
        background: 'var(--white)',
        borderRadius: 20,
        boxShadow: '0 20px 60px rgba(26,61,92,.2), 0 4px 20px rgba(0,0,0,.12)',
        border: '1px solid var(--sand-3)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        transform: open ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(16px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transformOrigin: 'bottom right',
        transition: 'all .3s cubic-bezier(.4,0,.2,1)',
      }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg,#1A3D5C 0%,#2E6B9E 100%)',
          padding: '1rem 1.25rem',
          display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
        }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,.15)', border: '2px solid rgba(255,255,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            🤖
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '.95rem', color: '#fff' }}>Roamr AI Assistant</div>
            <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.65)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
              Always one step ahead
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: 8, color: 'rgba(255,255,255,.7)', cursor: 'pointer', padding: '5px 8px', fontSize: '.8rem', transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
          >✕</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          className="chat-scroll">
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.role === 'bot' && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#1A3D5C,#2E6B9E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.85rem', flexShrink: 0, marginRight: 8, marginTop: 2 }}>
                  🤖
                </div>
              )}
              <div style={{
                maxWidth: '78%', padding: '0.65rem 1rem',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg,#1A3D5C,#2E6B9E)'
                  : 'var(--sand)',
                color: msg.role === 'user' ? '#fff' : 'var(--ink-2)',
                fontSize: '.88rem', lineHeight: 1.65,
                boxShadow: '0 1px 4px rgba(0,0,0,.08)',
              }}>
                {formatMessage(msg.text)}
              </div>
            </div>
          ))}

          {/* Loading dots */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#1A3D5C,#2E6B9E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.85rem', flexShrink: 0 }}>🤖</div>
              <div style={{ background: 'var(--sand)', borderRadius: '18px 18px 18px 4px', padding: '.65rem 1rem', display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0,1,2].map(d => (
                  <span key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sky-mid)', display: 'inline-block', animation: `typingDot 1.2s ease-in-out ${d*0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          {/* FAQ chips */}
          {faqsVisible && (
            <div style={{ marginTop: '.25rem' }}>
              <p style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>Frequently asked</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {FAQS.map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)}
                    style={{ background: 'var(--white)', border: '1.5px solid var(--sand-3)', color: 'var(--sky-mid)', fontSize: '.78rem', fontWeight: 500, padding: '5px 11px', borderRadius: 100, cursor: 'pointer', textAlign: 'left', transition: 'all .2s', lineHeight: 1.4 }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--sky-l)'; e.currentTarget.style.borderColor = 'var(--sky-mid)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--sand-3)'; }}
                  >{q}</button>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '.75rem 1rem', borderTop: '1px solid var(--sand-3)', display: 'flex', gap: 8, flexShrink: 0, background: 'var(--white)' }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask me anything…"
            disabled={loading}
            style={{ flex: 1, background: 'var(--sand)', border: '1.5px solid var(--sand-3)', borderRadius: 100, padding: '8px 16px', fontSize: '.88rem', color: 'var(--ink)', outline: 'none', fontFamily: "'DM Sans',sans-serif", transition: 'border-color .2s' }}
            onFocus={e => e.target.style.borderColor = 'var(--sky-mid)'}
            onBlur={e => e.target.style.borderColor = 'var(--sand-3)'}
          />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
            style={{ width: 38, height: 38, borderRadius: '50%', background: input.trim() && !loading ? 'linear-gradient(135deg,#1A3D5C,#2E6B9E)' : 'var(--sand-3)', border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .2s, transform .15s' }}
            onMouseEnter={e => { if (input.trim() && !loading) e.currentTarget.style.transform='scale(1.1)'; }}
            onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes chatPulse { 0%,100%{transform:scale(1);opacity:.7;} 50%{transform:scale(1.18);opacity:0;} }
        @keyframes typingDot { 0%,80%,100%{transform:scale(0.6);opacity:.4;} 40%{transform:scale(1);opacity:1;} }
        .chat-scroll::-webkit-scrollbar{width:4px;}
        .chat-scroll::-webkit-scrollbar-track{background:transparent;}
        .chat-scroll::-webkit-scrollbar-thumb{background:var(--sand-3);border-radius:4px;}
      `}</style>
    </>
  );
}