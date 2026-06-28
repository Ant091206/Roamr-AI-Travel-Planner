import React from 'react';

// ─── GLOBAL CSS ──────────────────────────────────────────────────────────────
export const GLOBAL_CSS = `
  /*
   * ROAMR v3 Design System
   * Emil Kowalski  → spring physics, layered shadows, obsessive micro-states
   * IMPECCABLE     → strict 4pt grid, optical sizing, zero ambiguity
   * Taste Skill    → DM Serif Display, noise grain, editorial boldness
   */

  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital,wght@0,400;1,400&family=Geist:wght@300;400;500;600;700;800&display=swap');

  :root {
    --terra:#C0522A; --terra-h:#A8421E; --terra-l:#F6EDE7; --terra-m:#E09070;
    --sky:#152D44;   --sky-m:#245076;   --sky-l:#E6F1FA;   --sky-d:#091520;
    --sand:#F8F4EE;  --sand-2:#F0E9DF;  --sand-3:#E6DDD1;
    --ink:#16100C;   --ink-2:#3B342E;   --ink-3:#7A6E67;   --ink-4:#BDB4AC;
    --white:#FDFAF6;
    --gold:#C47A08;  --gold-l:#FDF2D8;
    --green:#15602F; --green-l:#D6F5E3;
    --red:#921B1B;   --red-l:#FEF0F0;
    --coral:#F4845F;
    --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s5:20px;
    --s6:24px; --s8:32px; --s10:40px; --s12:48px; --s16:64px; --s20:80px; --s24:96px;
    --r2:4px; --r3:6px; --r4:8px; --r5:10px; --r6:12px; --r8:16px; --r10:20px; --r12:24px; --rf:9999px;
    --sh-xs:0 1px 2px rgba(0,0,0,.05),0 1px 4px rgba(0,0,0,.04);
    --sh-sm:0 1px 3px rgba(0,0,0,.07),0 4px 12px rgba(0,0,0,.05);
    --sh-md:0 2px 4px rgba(0,0,0,.06),0 8px 24px rgba(21,45,68,.09),0 1px 0 rgba(255,255,255,.6) inset;
    --sh-lg:0 4px 8px rgba(0,0,0,.07),0 20px 48px rgba(21,45,68,.13);
    --sh-xl:0 8px 16px rgba(0,0,0,.08),0 32px 80px rgba(21,45,68,.18);
    --spring:cubic-bezier(.34,1.56,.64,1);
    --ease-out:cubic-bezier(.16,1,.3,1);
    --d1:80ms; --d2:150ms; --d3:220ms; --d4:350ms; --d5:500ms;
    /* backwards compat */
    --terra-dark:var(--terra-h); --terra-light:var(--terra-l); --terra-mid:var(--terra-m);
    --sky-mid:var(--sky-m); --sky-light:var(--sky-l); --sky-dark:var(--sky-d);
    --sand-dark:var(--sand-3); --sand-mid:var(--sand-2);
    --ink-mid:var(--ink-2); --ink-soft:var(--ink-3); --ink-ghost:var(--ink-4);
    --success:var(--green); --success-light:var(--green-l);
    --gold-light:var(--gold-l); --danger:var(--red); --danger-light:var(--red-l);
    --radius:var(--r6); --radius-sm:var(--r4); --radius-lg:var(--r10);
    --shadow-sm:var(--sh-sm); --shadow-md:var(--sh-md); --shadow-lg:var(--sh-lg);
    --sp-1:var(--s1); --sp-2:var(--s2); --sp-3:var(--s3); --sp-4:var(--s4);
    --sp-5:var(--s6); --sp-6:var(--s8); --sp-7:var(--s12); --sp-8:var(--s16); --sp-9:var(--s24);
    --r-sm:var(--r4); --r-md:var(--r6); --r-lg:var(--r10); --r-xl:var(--r12); --r-full:var(--rf);
    --text-xs:0.6875rem; --text-sm:0.8125rem; --text-base:0.9375rem; --text-lg:1.125rem;
    --ease-spring:var(--spring); --t-fast:var(--d2); --t-base:var(--d3); --t-slow:var(--d4); --t-slower:var(--d5);
  }

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;}
  body,#root{font-family:'Geist',system-ui,sans-serif;background:var(--sand);color:var(--ink);font-size:0.9375rem;line-height:1.6;}
  img{max-width:100%;display:block;}
  a{color:inherit;text-decoration:none;}
  button{font-family:'Geist',system-ui,sans-serif;cursor:pointer;}
  ::selection{background:rgba(192,82,42,.15);color:var(--terra-h);}

  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
  @keyframes shimmer{0%{background-position:-700px 0}100%{background-position:700px 0}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes imgAppear{from{opacity:0}to{opacity:1}}
  @keyframes chatPulse{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.25);opacity:0}}
  @keyframes typingDot{0%,80%,100%{transform:translateY(0);opacity:.3}40%{transform:translateY(-5px);opacity:1}}
  @keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-2%,-3%)}30%{transform:translate(3%,2%)}50%{transform:translate(-1%,4%)}70%{transform:translate(2%,-1%)}90%{transform:translate(-3%,1%)}}

  .fade-up{animation:fadeUp var(--d5) var(--ease-out) both;}
  .fade-in{animation:fadeIn var(--d4) var(--ease-out) both;}
  .scale-in{animation:scaleIn var(--d4) var(--ease-out) both;}
  .fade-up-d1{animation-delay:.07s} .fade-up-d2{animation-delay:.14s}
  .fade-up-d3{animation-delay:.21s} .fade-up-d4{animation-delay:.28s}
  .fade-up-d5{animation-delay:.35s} .fade-up-d6{animation-delay:.42s}

  /* GRAIN TEXTURE — Taste Skill atmosphere */
  .grain{position:relative;overflow:hidden;}
  .grain::after{
    content:'';position:absolute;inset:-60%;width:220%;height:220%;
    pointer-events:none;z-index:1;opacity:.03;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    animation:grain 12s steps(8) infinite;
  }
  .grain>*{position:relative;z-index:2;}

  /* NAV */
  .nav{
    position:sticky;top:0;z-index:200;height:60px;
    display:flex;align-items:center;justify-content:space-between;
    padding:0 var(--s12);
    background:rgba(9,21,32,.96);
    border-bottom:1px solid rgba(255,255,255,.07);
    backdrop-filter:blur(20px) saturate(180%);
    -webkit-backdrop-filter:blur(20px) saturate(180%);
    box-shadow:0 1px 0 rgba(255,255,255,.04),0 4px 32px rgba(0,0,0,.28);
  }
  .nav-logo{display:flex;align-items:center;gap:var(--s3);background:none;border:none;cursor:pointer;padding:var(--s2) 0;}
  .nav-logo-text{font-weight:700;font-size:1.15rem;color:#fff;letter-spacing:-.04em;}
  .nav-logo-text span{color:var(--coral);}
  .nav-links{display:flex;align-items:center;gap:2px;}
  .nav-link{
    background:none;border:none;cursor:pointer;
    font-size:0.8125rem;font-weight:500;color:rgba(255,255,255,.5);
    padding:6px var(--s3);border-radius:var(--r3);
    transition:color var(--d3) var(--ease-out),background var(--d3) var(--ease-out);
    position:relative;white-space:nowrap;
  }
  .nav-link::before{
    content:'';position:absolute;bottom:2px;left:50%;
    transform:translateX(-50%) scaleX(0);transform-origin:center;
    width:16px;height:1.5px;background:var(--coral);border-radius:2px;
    transition:transform var(--d3) var(--spring),opacity var(--d3);
    opacity:0;
  }
  .nav-link:hover{color:rgba(255,255,255,.85);background:rgba(255,255,255,.06);}
  .nav-link.active{color:#fff;background:rgba(255,255,255,.09);}
  .nav-link.active::before{transform:translateX(-50%) scaleX(1);opacity:1;}
  .nav-divider{width:1px;height:16px;background:rgba(255,255,255,.1);margin:0 var(--s2);}
  .nav-btn-outline{
    background:transparent;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.8);
    cursor:pointer;font-size:0.8125rem;font-weight:500;
    padding:6px var(--s4);border-radius:var(--r3);white-space:nowrap;
    transition:border-color var(--d3),background var(--d3),transform var(--d2) var(--spring);
  }
  .nav-btn-outline:hover{border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.07);transform:translateY(-1px);}
  .nav-btn-solid{
    background:var(--terra);border:none;color:#fff;
    cursor:pointer;font-size:0.8125rem;font-weight:600;
    padding:7px 16px;border-radius:var(--r3);white-space:nowrap;
    box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 2px 8px rgba(192,82,42,.4);
    transition:background var(--d3),transform var(--d2) var(--spring),box-shadow var(--d3);
  }
  .nav-btn-solid:hover{background:var(--terra-h);transform:translateY(-1.5px);box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 4px 16px rgba(192,82,42,.45);}
  .nav-user-chip{
    display:flex;align-items:center;gap:var(--s2);
    background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);
    border-radius:var(--rf);padding:3px 12px 3px 3px;
    transition:background var(--d3);
  }
  .nav-user-chip:hover{background:rgba(255,255,255,.11);}
  .nav-avatar{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--terra),var(--terra-h));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.625rem;color:#fff;}
  .nav-hamburger{display:none!important;background:none;border:none;color:#fff;font-size:1.35rem;padding:var(--s2);}
  @media(max-width:768px){.nav-links{display:none!important}.nav-hamburger{display:flex!important}.nav{padding:0 var(--s6)}}

  /* FOOTER */
  .footer{background:var(--sky-d);color:rgba(255,255,255,.45);}
  .footer-main{max-width:1120px;margin:0 auto;padding:var(--s20) var(--s8) var(--s8);display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr;gap:var(--s12);}
  .footer-brand-logo{display:flex;align-items:center;gap:var(--s3);margin-bottom:var(--s4);}
  .footer-brand-logo span{font-weight:700;font-size:1rem;color:#fff;letter-spacing:-.04em;}
  .footer-brand-logo span em{color:var(--coral);font-style:normal;}
  .footer-brand p{font-size:0.8125rem;line-height:1.8;max-width:210px;margin-bottom:var(--s6);opacity:.55;}
  .footer-socials{display:flex;gap:var(--s2);}
  .footer-social-btn{width:30px;height:30px;border-radius:var(--r3);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.35);cursor:pointer;font-size:.8rem;display:flex;align-items:center;justify-content:center;transition:background var(--d3),color var(--d3),transform var(--d2) var(--spring),border-color var(--d3);}
  .footer-social-btn:hover{background:var(--terra);border-color:var(--terra);color:#fff;transform:translateY(-2px);}
  .footer-col h4{font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.65);margin-bottom:var(--s4);}
  .footer-col a{display:block;font-size:0.8125rem;color:rgba(255,255,255,.3);cursor:pointer;margin-bottom:6px;transition:color var(--d3);}
  .footer-col a:hover{color:#fff;}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.06);padding:var(--s4) var(--s8);max-width:1120px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;font-size:0.6875rem;color:rgba(255,255,255,.22);gap:var(--s2);flex-wrap:wrap;}
  .footer-bottom strong{color:var(--coral);}
  @media(max-width:900px){.footer-main{grid-template-columns:1fr 1fr;gap:var(--s8)}}
  @media(max-width:600px){.footer-main{grid-template-columns:1fr}.footer-bottom{flex-direction:column;text-align:center}}

  /* BUTTONS — Emil: spring, tactile, layered */
  .btn{
    cursor:pointer;border:none;font-family:'Geist',sans-serif;font-weight:600;
    border-radius:var(--r4);letter-spacing:-.015em;
    display:inline-flex;align-items:center;justify-content:center;gap:var(--s2);
    position:relative;white-space:nowrap;user-select:none;
    transition:background var(--d3) var(--ease-out),box-shadow var(--d3) var(--ease-out),transform var(--d2) var(--spring),border-color var(--d3) var(--ease-out),color var(--d3) var(--ease-out);
  }
  .btn:disabled{opacity:.4;cursor:not-allowed;pointer-events:none;}
  .btn:active:not(:disabled){transform:scale(.96)!important;transition-duration:var(--d1);}
  .btn-primary{background:var(--sky-m);color:#fff;box-shadow:0 1px 0 rgba(255,255,255,.1) inset,0 -1px 0 rgba(0,0,0,.12) inset,0 1px 3px rgba(0,0,0,.1),0 4px 12px rgba(21,45,68,.2);}
  .btn-primary:hover:not(:disabled){background:var(--sky);transform:translateY(-1.5px);box-shadow:0 1px 0 rgba(255,255,255,.1) inset,0 -1px 0 rgba(0,0,0,.15) inset,0 2px 4px rgba(0,0,0,.1),0 8px 20px rgba(21,45,68,.28);}
  .btn-terra{background:var(--terra);color:#fff;box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 -1px 0 rgba(0,0,0,.15) inset,0 1px 3px rgba(0,0,0,.1),0 4px 14px rgba(192,82,42,.3);}
  .btn-terra:hover:not(:disabled){background:var(--terra-h);transform:translateY(-1.5px);box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 -1px 0 rgba(0,0,0,.15) inset,0 2px 4px rgba(0,0,0,.1),0 8px 22px rgba(192,82,42,.38);}
  .btn-outline-sky{background:transparent;border:1.5px solid var(--sky-m);color:var(--sky-m);box-shadow:var(--sh-xs);}
  .btn-outline-sky:hover:not(:disabled){background:var(--sky-m);color:#fff;transform:translateY(-1.5px);box-shadow:var(--sh-sm);}
  .btn-outline-terra{background:transparent;border:1.5px solid var(--terra);color:var(--terra);box-shadow:var(--sh-xs);}
  .btn-outline-terra:hover:not(:disabled){background:var(--terra);color:#fff;transform:translateY(-1.5px);box-shadow:var(--sh-sm);}
  .btn-ghost{background:var(--sand-2);border:1px solid var(--sand-3);color:var(--ink-3);}
  .btn-ghost:hover:not(:disabled){background:var(--sand-3);color:var(--ink);transform:translateY(-1px);}
  .btn-sm{font-size:0.75rem;padding:6px var(--s4);height:32px;}
  .btn-md{font-size:0.875rem;padding:9px var(--s6);height:38px;}
  .btn-lg{font-size:0.9375rem;padding:11px var(--s8);height:44px;border-radius:var(--r5);}
  .btn-xl{font-size:1rem;padding:14px var(--s10);height:52px;border-radius:var(--r6);}

  /* CARDS — IMPECCABLE: precise, intentional */
  .card{background:var(--white);border-radius:var(--r8);border:1px solid var(--sand-3);box-shadow:var(--sh-sm);transition:box-shadow var(--d4) var(--ease-out),transform var(--d4) var(--ease-out),border-color var(--d3);}
  .card-p{padding:var(--s8);}
  .card-header{display:flex;align-items:center;gap:var(--s3);padding-bottom:var(--s4);margin-bottom:var(--s6);border-bottom:1px solid var(--sand-3);}
  .card-icon{width:36px;height:36px;border-radius:var(--r4);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
  .card-icon-terra{background:var(--terra-l);}
  .card-icon-sky{background:var(--sky-l);}
  /* Taste: DM Serif Display for card titles */
  .card-title{font-family:'DM Serif Display',serif;font-size:1.1rem;color:var(--ink);letter-spacing:-.02em;font-weight:400;font-style:normal;}

  /* Emil hover lift */
  .hover-lift{transition:transform var(--d4) var(--ease-out),box-shadow var(--d4) var(--ease-out),border-color var(--d3);}
  .hover-lift:hover{transform:translateY(-4px);box-shadow:var(--sh-lg);border-color:var(--sand-2);}
  .hover-lift:active{transform:translateY(-1px);box-shadow:var(--sh-md);}

  /* FORM — IMPECCABLE: 44px targets */
  .label{display:block;font-size:0.625rem;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.09em;margin-bottom:var(--s2);}
  .input,.select,.textarea{
    width:100%;font-family:'Geist',sans-serif;font-size:0.875rem;
    color:var(--ink);background:var(--sand-2);
    border:1.5px solid var(--sand-3);border-radius:var(--r4);
    padding:9px var(--s4);outline:none;min-height:44px;
    transition:border-color var(--d3) var(--ease-out),background var(--d3) var(--ease-out),box-shadow var(--d3) var(--ease-out);
    -webkit-appearance:none;appearance:none;
  }
  .input::placeholder,.textarea::placeholder{color:var(--ink-4);}
  .input:hover,.select:hover{border-color:var(--ink-4);}
  .input:focus,.select:focus,.textarea:focus{border-color:var(--sky-m);background:var(--white);box-shadow:0 0 0 3px rgba(36,80,118,.1),0 1px 3px rgba(0,0,0,.06);}
  .input-icon-wrap{position:relative;}
  .input-icon-wrap .input{padding-left:38px;}
  .input-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:14px;color:var(--ink-4);pointer-events:none;}
  .field{margin-bottom:var(--s6);}

  /* TYPOGRAPHY — Taste: editorial contrast */
  .section-label{font-size:0.625rem;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:var(--terra);margin-bottom:var(--s2);display:block;}
  /* THE signature typographic move: DM Serif Display */
  .section-title{font-family:'DM Serif Display',serif;font-style:normal;font-size:clamp(1.85rem,3.6vw,2.8rem);font-weight:400;color:var(--ink);line-height:1.12;letter-spacing:-.025em;margin-bottom:var(--s3);}
  .section-sub{font-size:1.0625rem;color:var(--ink-3);line-height:1.75;max-width:520px;font-weight:300;}

  /* BADGES & TAGS */
  .badge{display:inline-flex;align-items:center;gap:var(--s2);font-size:0.625rem;font-weight:700;letter-spacing:.04em;padding:3px var(--s3);border-radius:var(--rf);}
  .badge-success{background:var(--green-l);color:var(--green);border:1px solid rgba(21,96,47,.15);}
  .badge-terra{background:var(--terra-l);color:var(--terra);border:1px solid rgba(192,82,42,.15);}
  .badge-sky{background:var(--sky-l);color:var(--sky-m);border:1px solid rgba(36,80,118,.15);}
  .tag{font-size:0.625rem;font-weight:600;padding:3px 10px;border-radius:var(--rf);letter-spacing:.03em;}
  .tag-food{background:var(--terra-l);color:var(--terra);}
  .tag-hotel{background:var(--gold-l);color:var(--gold);}
  .tag-tip{background:var(--green-l);color:var(--green);}
  .tag-sight{background:var(--sky-l);color:var(--sky-m);}

  /* LOADING */
  .spinner{width:40px;height:40px;border-radius:50%;border:2.5px solid var(--sand-3);border-top-color:var(--sky-m);animation:spin .7s linear infinite;}
  .shimmer-line{background:linear-gradient(90deg,var(--sand-3) 25%,var(--white) 50%,var(--sand-3) 75%);background-size:700px 100%;animation:shimmer 1.3s ease-in-out infinite;border-radius:var(--rf);height:12px;margin-bottom:var(--s2);}

  /* UTILITIES */
  .error-box{background:var(--red-l);border:1px solid rgba(146,27,27,.15);border-radius:var(--r4);padding:var(--s3) var(--s4);color:var(--red);font-size:0.8125rem;display:flex;gap:var(--s2);align-items:flex-start;}
  .divider{height:1px;background:var(--sand-3);}

  :focus-visible{outline:2px solid var(--sky-m);outline-offset:3px;border-radius:var(--r3);}
  ::-webkit-scrollbar{width:5px;height:5px;}
  ::-webkit-scrollbar-track{background:var(--sand);}
  ::-webkit-scrollbar-thumb{background:var(--sand-3);border-radius:var(--rf);}
  ::-webkit-scrollbar-thumb:hover{background:var(--ink-4);}
  .chat-scroll::-webkit-scrollbar{width:4px;}
  .chat-scroll::-webkit-scrollbar-track{background:transparent;}
  .chat-scroll::-webkit-scrollbar-thumb{background:var(--sand-3);border-radius:var(--rf);}

  @media(max-width:640px){
    .card-p{padding:var(--s6);}
    .btn-xl{font-size:0.9375rem;padding:12px var(--s8);}
    .founder-card{grid-template-columns:1fr!important;}
    .founder-card .photo-col{min-height:280px!important;border-right:none!important;border-bottom:1px solid rgba(255,255,255,.08)!important;}
  }
`

// ─── BRAND CONSTANTS ─────────────────────────────────────────────────────────
export const BRAND = {
  name: 'Roamr',
  tagline: 'Wander smarter.',
  // accent colour used in logo wordmark
  accent: '#F4845F',          // warm coral
  accentDark: '#C4532A',
};

// ─── LOGO ─────────────────────────────────────────────────────────────────────
// A globe arc with a paper-plane trail — clean, modern, travel-forward.
export function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background pill */}
      <rect width="40" height="40" rx="12" fill="url(#roamr-grad)" />
      <defs>
        <linearGradient id="roamr-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A3D5C" />
          <stop offset="100%" stopColor="#0D1E2D" />
        </linearGradient>
      </defs>

      {/* Globe arc — latitude ring */}
      <ellipse cx="20" cy="20" rx="11" ry="11" stroke="rgba(255,255,255,0.25)" strokeWidth="1.3" fill="none" />
      {/* Globe arc — equator */}
      <path d="M9 20 Q20 14 31 20" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1" fill="none" />
      {/* Globe arc — meridian */}
      <path d="M20 9 Q14 20 20 31" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1" fill="none" />

      {/* Paper-plane */}
      <g transform="translate(13,12) rotate(-30 7 7)">
        <path d="M0 7 L14 0 L10 14 L6 9 Z" fill="white" fillOpacity="0.95" />
        <path d="M6 9 L10 14 L8 10 Z" fill="rgba(244,132,95,0.9)" />
      </g>

      {/* Dotted trail */}
      <circle cx="9" cy="27" r="1.1" fill="#F4845F" fillOpacity="0.85" />
      <circle cx="13" cy="29" r="0.85" fill="#F4845F" fillOpacity="0.6" />
      <circle cx="17" cy="30" r="0.65" fill="#F4845F" fillOpacity="0.4" />
    </svg>
  );
}

// ─── WORDMARK (Logo + name inline) ───────────────────────────────────────────
export function Wordmark({ logoSize = 36, style = {}, darkMode = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, ...style }}>
      <Logo size={logoSize} />
      <span style={{
        fontFamily: "'Geist', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: logoSize * 0.70,
        letterSpacing: '-0.035em',
        color: darkMode ? '#0A1820' : '#ffffff',
        lineHeight: 1,
      }}>
        roam<span style={{ color: '#F4845F' }}>r</span>
      </span>
    </span>
  );
}

// ─── SAMPLE TRIPS ────────────────────────────────────────────────────────────
export const SAMPLE_TRIPS = [
  {
    id: 'sample-1',
    title: 'Goa Beach Escape',
    photo: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
    days: '5',
    budget: 'Mid-range',
    preferences: 'Beach relaxation, seafood, water sports, nightlife, sunset views',
    gradient: 'linear-gradient(135deg,#11998e 0%,#38ef7d 100%)',
    emoji: '🏖',
    tagline: 'Sun, sand & the sea',
    savedAt: 'Sample Trip',
    itinerary: `## Day 1: Arrival & North Goa Vibes
### Dabolim Airport Arrival
- Land at Goa International Airport and take a pre-booked cab to North Goa (45 min).
- Check into your beach resort in Candolim or Calangute area.
- Freshen up and head down to the beach for your first sunset.
### Calangute Beach
- Stroll along the longest beach in Goa — perfect for your first dip.
- Rent a sun lounger and enjoy the golden hour views.
- Watch local fishermen bring in their evening catch.
### Infantaria Cafe
- Stop at this legendary Goan bakery for beef croquettes and cold coffee.
- A Goa institution since 1948 — do not leave without the chocolate croissant.
- Walk along the Baga Creek nearby after your meal.
### Tito's Lane Night Market
- Explore the iconic strip of restaurants, bars and souvenir stalls.
- Try a classic Goan feni (cashew spirit) at a local shack.
- End the night dancing at Tito's Club — Goa's most famous nightclub.
### Hotel: Lemon Tree Amarante Beach Resort
- Check-in and enjoy the pool with direct beach access.
- Book the sea-facing room for panoramic sunset views.
- Complimentary breakfast included at the beach-side restaurant.

## Day 2: Heritage & Spice
### Basilica of Bom Jesus
- UNESCO World Heritage Site housing the mortal remains of St. Francis Xavier.
- Marvel at the baroque architecture dating back to 1605.
- Photography permitted outside — morning light is golden before 9 AM.
### Old Goa Churches Trail
- Walk to Se Cathedral and Church of St. Cajetan — all within 500m.
- Hire a local guide (₹300) for fascinating Portuguese colonial history.
- Pick up handmade lace and azulejo tile souvenirs at stalls nearby.
### Sahakari Spice Farm
- Book the 2-hour guided spice plantation tour in Ponda (30 min drive).
- See cardamom, vanilla, nutmeg, pepper and cinnamon growing live.
- Traditional Goan lunch is included — kokum curry and sol kadhi.
### Shri Mangeshi Temple
- One of Goa's largest and most ornate Hindu temples.
- The white baroque-style tower is unique to Goa's temple architecture.
- Visit during evening aarti (6 PM) for an unforgettable experience.
### The Black Sheep Bistro
- Celebrated farm-to-table Goan restaurant in Panaji.
- Must-try: pork sorpotel bruschetta and prawn balchão risotto.
- Book in advance — tables fill up by 7:30 PM on weekdays.

## Day 3: Beach Hopping & Water Sports
### Baga Beach Water Sports
- Try parasailing (₹700), jet skiing (₹500) or banana boat rides (₹300).
- Best time to go: 9–11 AM before the afternoon crowd arrives.
- All operators are government-licensed with safety equipment provided.
### Anjuna Flea Market (Wednesday only)
- The iconic Wednesday market with 200+ stalls of clothes, jewellery and art.
- Great for handmade leather goods and Tibetan trinkets at bargain prices.
- Grab a fresh coconut and browse at leisure — budget 2 hours.
### Vagator Beach & Chapora Fort
- Hike 15 minutes up to the ruins of the 17th century Chapora Fort.
- The views of the Arabian Sea from the top are spectacular.
- Immortalised in the Bollywood film Dil Chahta Hai — great photos here.
### Curlies Beach Shack
- Legendary cliffside shack on Anjuna Beach with cushion seating.
- Signature Goan fish curry with red rice — ₹350 and absolutely worth it.
- Watch the sunset with a chilled Kingfisher and live acoustic music.
### Yoga & Meditation Session
- Join a sunset yoga class at Arambol (₹300/session, beginners welcome).
- The northern beach is quiet and spiritual in tone.
- Stay for the bonfire gathering that starts post-sunset at the beach.

## Day 4: South Goa Serenity
### Palolem Beach
- Drive 1.5 hrs south for Goa's most photogenic crescent beach.
- Kayak hire (₹400/hr) to paddle around the rocky headlands.
- The calm waters are perfect for swimming compared to North Goa.
### Butterfly Beach
- Hire a fishing boat from Palolem (₹600 return) to reach this hidden cove.
- Completely car-free — only accessible by water or a forest trail.
- Bring a picnic; there are no vendors on the beach itself.
### Cotigao Wildlife Sanctuary
- Spot gaur (Indian bison), spotted deer, pangolins and 150+ bird species.
- Climb the 100-year-old watchtower for treetop views of the canopy.
- Entry ₹30 per person; best wildlife sightings before 8 AM.
### Zuri White Sands Resort
- Splurge on a sunset cocktail at this luxury beachfront property.
- The infinity pool overlooks Varca Beach — worth the visit even as non-guest.
- Try the crab xacuti at their Boquete restaurant.
### Martin's Corner
- Legendary family restaurant in Betalbatim since 1990.
- The prawn rava fry and crab curry are the stuff of legend.
- Live Goan music plays every Friday and Saturday evening.

## Day 5: Shopping & Departure
### Mapusa Friday Market
- The largest local market in Goa, running every Friday morning.
- Stock up on Goan sausages, cashews, bebinca (Goan cake) and feni.
- Best prices on spices, pickles and handloom fabrics.
### Panaji City Walk
- Stroll through the colourful Latin Quarter (Fontainhas) — Goa's heritage precinct.
- The Portuguese-era tiled houses and narrow lanes are extremely photogenic.
- Coffee at Café Bhosle — a 70-year-old institution serving hot choc and toast.
### Caculo Mall
- Last-minute shopping for clothes, swimwear and Goa-branded gifts.
- Decent food court for a quick bite before heading to the airport.
- Hire a prepaid taxi from the mall — fixed fares, no bargaining needed.

## Budget Breakdown
- Accommodation: ₹3,000-5,000/night (mid-range beach resort)
- Food: ₹800-1,500/day per person
- Water sports: ₹1,500-2,000 total
- Transport (cab): ₹2,500 total
- Sightseeing: ₹500 total (entry fees)
- Shopping: ₹2,000-5,000 (your choice)
- Total (2 persons, 5 days): ₹40,000-60,000 excluding flights`,
  },
  {
    id: 'sample-2',
    title: 'Rajasthan Royal Tour',
    photo: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80',
    days: '7',
    budget: 'Luxury',
    preferences: 'Forts, palaces, desert safari, authentic Rajasthani cuisine, royal heritage',
    gradient: 'linear-gradient(135deg,#C4532A 0%,#D97706 100%)',
    emoji: '🏰',
    tagline: 'Land of kings & colour',
    savedAt: 'Sample Trip',
    itinerary: `## Day 1: Jaipur — The Pink City
### Amber Fort
- Arrive early (8 AM) to beat crowds at this UNESCO-listed 16th century fort.
- Take the elephant ride up (₹900) or jeep (₹200) to the main gate.
- The Sheesh Mahal (Hall of Mirrors) must-see — over a million mirror pieces.
### City Palace Museum
- The royal family's ancestral home — still partially inhabited by the royal family.
- See the world's largest silver vessels (Gangajalis) in the Diwan-i-Khas.
- Hire the official audio guide (₹200) — factual and beautifully narrated.
### Hawa Mahal
- The iconic 5-storey façade with 953 small windows — best photographed at sunrise.
- Climb inside for the view looking out over Badi Chopar bazaar.
- The best chai stalls are directly opposite — order a kullad chai (₹20).
### Jantar Mantar
- World's largest stone sundial — accurate to within 2 seconds.
- This 18th century astronomical observatory is a UNESCO World Heritage site.
- The guide's explanation of the instruments is genuinely fascinating.
### Chokhi Dhani Village Resort
- Immersive Rajasthani village experience with folk dances, puppet shows.
- Traditional thali dinner (₹800) with unlimited dal-baati-churma.
- Camel and elephant rides, astrologers, and traditional games included.

## Day 2: Jaipur to Jodhpur
### Nahargarh Fort Sunrise
- 5:30 AM hike to the fort for the most spectacular Jaipur sunrise view.
- The fort walls extend across the Aravalli hills — magical in morning light.
- On-site café opens at 6 AM — tea and parathas with the city waking below.
### Anokhi Museum of Hand Printing
- Located in a 16th century haveli in Amber village.
- See traditional block-printing techniques used for centuries in Rajasthan.
- The museum shop has some of the finest printed textiles in India.
### Drive to Jodhpur (5 hrs)
- Scenic highway through Rajasthani villages and scrubland.
- Stop at Rohet Garh for lunch — heritage fort turned restaurant.
- Check into your hotel in Jodhpur by evening.
### Clocktower (Ghanta Ghar) Market
- The chaotic, colourful heart of old Jodhpur — perfectly chaotic.
- Buy spices, mirchi bada, and Rajasthani mojris (embroidered shoes).
- The view of Mehrangarh Fort glowing at dusk from here is spectacular.
### Hotel: RAAS Jodhpur
- Boutique heritage hotel built into the base of Mehrangarh Fort's ramparts.
- Rooftop terrace with unobstructed fort views — order the evening sundowner.
- Pool is carved from ancient stone — unique and very Instagram-worthy.

## Day 3: Blue City — Jodhpur
### Mehrangarh Fort
- The most dramatic fort in Rajasthan, rising 120 metres above the blue city.
- The audio guide (₹200) narrated by veterans is exceptional.
- The collections of royal palanquins, weapons and paintings are world-class.
### Jaswant Thada
- The white marble cenotaph of Maharaja Jaswant Singh II, built 1899.
- Intricate pierced marble screens glow golden in the afternoon light.
- The royal gardens and lake beside it are peaceful and uncrowded.
### Blue City Walking Tour
- Hire a local guide (₹500) from the fort entrance for the old city walk.
- Wind through indigo-painted Brahmin quarter — see why it's called Blue City.
- Stop at a local home for chai — guides often have family connections.
### Stepwell of Toorji Ka Jhalra
- A recently restored 18th century stepwell — one of Rajasthan's finest.
- Best photographed at golden hour — the geometric steps are extraordinary.
- The surrounding cafes (Cafe Stepwell) are chic and great for a break.
### On the Rocks Restaurant
- Open-air restaurant inside a natural rock face near the fort.
- Try the laal maas (fiery Rajasthani mutton curry) and ker sangri.
- Live folk music with sarangi and dholak every evening after 7 PM.

## Day 4: Jodhpur to Jaisalmer
### Drive to Jaisalmer (5 hrs)
- The Thar Desert landscape shifts dramatically as you drive west.
- Stop at Osian — ancient Jain and Hindu temple complex in the desert.
- Arrive Jaisalmer by early afternoon; check into your haveli hotel.
### Jaisalmer Fort (Sonar Quila)
- The only fully inhabited fort in the world — 3,000 people live inside.
- The golden sandstone literally glows at sunset, giving it the name Sonar Quila.
- Browse Jain temples inside the fort — 12th century and meticulously preserved.
### Patwon Ki Haveli
- The grandest merchant haveli in Jaisalmer — five interlocking mansions.
- Each room has different carved stone lattice screens (jali work).
- Small museum inside showing period furniture and textiles (entry ₹100).
### Desert Cultural Centre
- Excellent museum on Rajasthani folk music, instruments and costumes.
- Evening puppet show (7 PM) with traditional kathputli puppets.
- They sell handmade leather-bound diaries and block-print fabric.
### Sunset at Vyas Chhatri
- Climb to this hilltop Brahmin cenotaph for the best view of the fort.
- Golden hour here as the fort turns from gold to amber to deep red.
- Popular with locals who gather here every evening — lovely community feel.

## Day 5: Desert Safari
### Sam Sand Dunes Morning Walk
- Wake before sunrise for the Thar desert to yourself — eerie and magical.
- Walk the crests of 30-metre sand dunes as the sky shifts colour.
- Carry water, sunscreen and a shawl — temperatures swing wildly.
### Camel Safari (Full Day)
- Book a licensed operator for the full-day desert safari (₹3,500/person).
- 6-hour camel trek through remote desert villages and seasonal lakes.
- Lunch is served in a desert encampment under a shamiana tent.
### Desert Camp Overnight
- Stay in a luxury Swiss tented camp in the dunes (₹8,000-15,000/night).
- Rajasthani cultural evening with Manganiyar folk musicians.
- Sleep under one of the most star-filled skies in India.
### Kuldhara Abandoned Village
- Mysterious village abandoned overnight in 1825 — no one knows exactly why.
- 84 villages were abandoned simultaneously by the Paliwal Brahmin community.
- The empty stone houses, temples and granaries are hauntingly atmospheric.

## Day 6: Udaipur — City of Lakes
### Drive / Fly to Udaipur
- Either take the morning flight (1 hr) or overnight train to Udaipur.
- Check into your hotel with views of Lake Pichola — worth the upgrade.
- Afternoon walk through the old city's colourful bazaars.
### City Palace Udaipur
- The largest palace complex in Rajasthan — built over 400 years by 22 maharanas.
- The Crystal Gallery holds the world's largest private collection of Baccarat crystal.
- Walk to the rooftop terrace for an aerial view of Lake Pichola and Jag Mandir.
### Lake Pichola Boat Ride
- Evening boat ride (₹700) around the lake at sunset is unmissable.
- Pass by the Jag Niwas (Lake Palace Hotel) — one of the world's most romantic hotels.
- The reflections of the City Palace walls in the lake are extraordinary.
### Jagdish Temple
- 17th century temple with a constant stream of devotees and flower sellers.
- The carved elephant pillars and black-stone Vishnu idol are magnificent.
- The steps down to the lake ghat below the temple are extremely picturesque.
### Ambrai Restaurant
- Table right on Lake Pichola — arguably the best view of any restaurant in India.
- Mewa pulao and methi baingan are house specialities.
- Reserve the window table at least 3 days in advance.

## Day 7: Departure Day
### Saheliyon Ki Bari
- 18th century garden built by Maharana Sangram Singh for the royal ladies-in-waiting.
- Marble elephants, lotus pools and marble kiosks make it very photogenic.
- Quiet and peaceful in the early morning before tour groups arrive.
### Shilpgram Crafts Village
- 70-hut village showcasing traditional crafts from Rajasthan, Gujarat, Goa, Maharashtra.
- Watch artisans weave, dye, and embroider using centuries-old techniques.
- Excellent place to buy authentic handicrafts direct from the artisans.
### Last Lunch at Millets of Mewar
- Pioneering healthy restaurant using ancient grain recipes.
- Try the bajra khichdi and ragi roti — hearty, delicious and unique to Rajasthan.
- Great view of the old city from the rooftop.

## Budget Breakdown
- Accommodation: ₹6,000-15,000/night (heritage hotels)
- Food: ₹1,500-3,000/day per person
- Desert safari + camp: ₹12,000-20,000 (2 persons)
- Transport: ₹8,000-12,000 (intercity cabs)
- Entry fees + guides: ₹3,000 total
- Shopping: ₹5,000-15,000
- Total (2 persons, 7 days): ₹1,20,000-2,00,000 excluding flights`,
  },
  {
    id: 'sample-3',
    title: 'Sasan Gir Wildlife Safari',
    photo: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80',
    days: '3',
    budget: 'Mid-range',
    preferences: 'Jungle safari, Asiatic lions, Gujarati culture, folk dance, authentic food',
    gradient: 'linear-gradient(135deg,#134E5E 0%,#71B280 100%)',
    emoji: '🦁',
    tagline: 'Witness the Asiatic lion',
    savedAt: 'Sample Trip',
    itinerary: `## Day 1: Arrival & Orientation
### Arrival at Sasan Gir
- Nearest airport is Rajkot (160 km) or Diu (95 km); take a pre-booked cab.
- The drive through the Gir forest buffer zone is itself a wildlife experience.
- Check into your jungle lodge and get a safari briefing from the naturalist.
### Crocodile Rearing Centre
- Forest Department facility where marsh crocodiles are bred for conservation.
- Walk along the enclosures and learn about the reintroduction programme.
- Entry ₹40; a good warm-up before your big safari tomorrow.
### Gir Interpretation Zone (Devalia Safari Park)
- A 412-hectare enclosed mini-forest with guaranteed lion and leopard sightings.
- Half-day safari in government jeeps — lions, hyenas, nilgai and crocodiles.
- Book 60 days in advance on girlion.gujarat.gov.in — permits are very limited.
### Barad Waterfall
- A short trek through the teak forest to this small but beautiful seasonal waterfall.
- High chance of spotting peacocks, langurs and spotted deer along the trail.
- Best visited in the late afternoon when the forest is most active.
### Gujarati Thali Dinner
- The jungle lodges serve a spectacular 12-dish Gujarati thali.
- Try kadhi, undhiyu, bajra rotla, and the famous Gir cow ghee.
- Traditional garba folk music performed by the lodge staff after dinner.

## Day 2: Main Safari Day
### Gir Forest Dawn Safari
- 5:30 AM jeep safari — the absolute golden time for lion sightings.
- Gir is the only place in the world outside Africa with wild lions.
- Your naturalist will track pugmarks and coordinate with other jeeps by radio.
### Lions & Wildlife Observation
- Asiatic lions live in family prides — you may encounter 3-8 together.
- Also watch for leopards, stripped hyenas, Indian foxes, and 300 bird species.
- The male lion's mane is noticeably shorter than African lions — fascinating difference.
### Gir Forest Nature Walk
- Post-breakfast guided forest walk with a trained naturalist (2 hrs).
- Learn to identify medicinal plants, animal tracks, and bird calls.
- The forest is primarily dry deciduous teak, acacia and tendu.
### Kankeshwari Mata Temple
- Ancient hilltop temple at the forest edge with panoramic views of Gir.
- Sacred to the local Maldhari tribal community who have coexisted with lions for generations.
- The Maldharis still live inside the forest in nesses (traditional encampments).
### Evening Safari
- 3 PM jeep safari — afternoon light is excellent for photography.
- Leopards are most active in the late afternoon near waterholes.
- Sunset views from within the forest are breathtaking.

## Day 3: Culture & Departure
### Jungle Trail Trek
- Morning 3-hour guided trek into the peripheral zone of the forest.
- Guide shows animal signs, explains ecosystem and conservation challenges.
- Excellent bird photography opportunity — Indian pittas, paradise flycatchers.
### Somnath Temple Visit
- Drive 1 hour to the famous Jyotirlinga temple on the Arabian Sea coast.
- One of the 12 most sacred Shiva temples in India — magnificent oceanfront location.
- Evening aarti at 7 PM with the sound of waves — spiritually overwhelming.
### Chorwad Beach
- 30 minutes from Somnath — a quiet beach with a small fishing village.
- Watch the fishing fleet head out at sunset — colourful boats and dramatic sky.
- Fresh seafood at the beach shacks — pomfret fry and prawn curry.
### Gir Farmhouse Cooking Class
- Learn to make undhiyu, dal dhokli, and methi thepla with a local Gujarati family.
- The family serves lunch using their own organic farm produce.
- Take home a packet of Gir cow ghee and freshly ground masalas.

## Budget Breakdown
- Accommodation: ₹2,500-5,000/night (jungle lodge)
- Safari permits: ₹1,500/person/safari
- Food: ₹600-1,000/day per person
- Transport: ₹3,500 (Rajkot-Gir-Somnath)
- Entry fees: ₹500 total
- Total (2 persons, 3 days): ₹22,000-32,000 excluding flights`,
  },
  {
    id: 'sample-4',
    title: 'Kashmir Valley Dream',
    photo: 'https://images.unsplash.com/photo-1605649461784-edc3c4bce182?w=600&q=80',
    days: '6',
    budget: 'Mid-range',
    preferences: 'Dal Lake houseboat, Mughal gardens, shikara rides, Himalayan views, Kashmiri wazwan',
    gradient: 'linear-gradient(135deg,#4776E6 0%,#8E54E9 100%)',
    emoji: '🏔',
    tagline: 'Heaven on earth',
    savedAt: 'Sample Trip',
    itinerary: `## Day 1: Srinagar Arrival & Dal Lake
### Sheikh ul-Alam International Airport
- Land in Srinagar and take a pre-booked cab to your houseboat on Dal Lake.
- The drive through Srinagar city passes by Jhelum River ghats and old mosques.
- Check into your heritage houseboat — cedar-panelled rooms with lake views.
### Dal Lake Shikara Ride
- Take the welcome shikara (traditional wooden boat) ride around the lake.
- Watch the floating vegetable market, lotus gardens and weed harvesting.
- Sunset on Dal Lake with the Zabarwan hills turning pink — ethereal.
### Floating Market at Dawn
- Wake at 5:30 AM for the floating vegetable market on the lake.
- Farmers row their shikara boats loaded with vegetables to sell.
- Breakfast of girda bread and Kashmiri kahwa tea served on the boat deck.
### Hazratbal Shrine
- The holiest shrine in Kashmir, housing the Moi-e-Muqqadas (hair of the Prophet).
- White marble domed mosque directly on the northern shore of Dal Lake.
- Friday prayers here draw thousands — powerful and moving to witness.
### Wazwan Dinner at Ahdoos Restaurant
- Order a traditional wazwan multi-course feast (minimum 2 persons).
- 36 dishes including rogan josh, yakhni, tabak maaz, and gushtaba.
- This is arguably the finest and most complex cuisine in all of India.

## Day 2: Mughal Gardens & Old City
### Shalimar Bagh
- The grandest of the Mughal gardens, built by Emperor Jahangir for Empress Noor Jahan in 1619.
- Four terraced gardens with central channel, fountains and ancient chenar trees.
- Morning visit before 9 AM — the gardens are almost empty and misty.
### Nishat Bagh
- The Garden of Bliss — 12 terraces climbing the Zabarwan hillside above Dal Lake.
- The view down through the garden to the lake below is magnificent.
- Hire a rowboat to cross from the garden landing to your houseboat.
### Shankaracharya Temple
- Climb the 243 stone steps to the 5th century temple on the highest hill.
- Views of the entire Kashmir Valley, Dal Lake and Jhelum River from the summit.
- Early morning fog lying in the valley below creates an otherworldly sight.
### Lal Chowk & Old City Walk
- Srinagar's historic commercial centre — controversial and fascinating.
- Visit the Shah Hamdan mosque — intricate papier-mâché decoration inside.
- The antique bazaar on Residency Road sells Kashmiri coins, thangkas and silverware.
### Rogan Josh Cooking Class
- Join a local family for a 2-hour evening cooking class in their home kitchen.
- Learn the secrets of authentic Kashmiri spice blends (Kashmiri chilli, fennel, ginger).
- Eat what you cook — the best meal you'll have in Kashmir.

## Day 3: Gulmarg — The Meadow of Flowers
### Drive to Gulmarg (60 km)
- 1.5 hour drive through apple orchards, walnut groves and Himalayan pine forest.
- Gulmarg sits at 2,650m altitude — arrive by 9 AM before clouds roll in.
- In winter it becomes one of Asia's top ski resorts; in summer it's a green alpine bowl.
### Gondola Cable Car Phase 1
- Take the world's second highest operating gondola from Gulmarg to Kongdori (3,100m).
- Views of the Himalayan range including Nanga Parbat (8,125m) on clear days.
- Phase 2 goes to Apharwat Peak (3,980m) — only for those acclimatised.
### Alpather Lake
- 5 km trek from Kongdori station to this high-altitude glacial lake.
- The lake remains frozen until June — stark and beautiful in any season.
- Golden eagles and lammergeier vultures circle the ridgeline above.
### Gulmarg Biosphere Reserve Walk
- The meadow itself is a protected biosphere — wildflowers carpet every slope.
- Over 350 species of wildflowers including Himalayan poppies and gentians.
- Small Shiva temple in the meadow centre — picturesque and peaceful.
### St. Mary's Church
- British-era stone church from 1895 at the edge of the meadow.
- One of the best-preserved colonial-era churches in the Himalayas.
- The graveyard beside it tells poignant stories of British soldiers and officers.

## Day 4: Pahalgam — Valley of Shepherds
### Drive to Pahalgam (95 km)
- 3-hour drive along the Lidder River through Awantipora ruins and saffron fields.
- Check into a riverside resort — the sound of the Lidder river is constant.
- Pahalgam is the base for the Amarnath Yatra pilgrimage (July–August).
### Betaab Valley
- Named after the Bollywood film shot here in 1983 — lush green alpine meadow.
- Crystal clear Lidder river flows through the meadow flanked by pine and deodar forest.
- Horse riding available to the upper meadows (₹400/hr).
### Aru Valley
- 11 km from Pahalgam — a quiet alpine valley with excellent trekking.
- Base camp for treks to Kolahoi Glacier and Tarsar-Marsar lakes.
- The valley floor is a flower-filled meadow dotted with Gujjar nomad settlements.
### Chandanwari
- The entry point to the Amarnath pilgrimage trail — 16 km from Pahalgam.
- Snow sledding is available even in summer on the permanent snowfield.
- The snow bridge over the Sheshnag glacier run-off is impressive.
### Wangath Restaurant
- Best riverside dining in Pahalgam — tables literally on the river rocks.
- Try the Kashmiri saag, nadur monje (lotus stem fritters) and kehwa.
- Book the outdoor table — the sound of rushing water accompanies your meal.

## Day 5: Sonamarg — Meadow of Gold
### Drive to Sonamarg (87 km)
- 2.5-hour drive along the Jhelum River, passing through Sindh Valley.
- Sonamarg sits at 2,740m at the base of the Zojila Pass on the Srinagar-Leh highway.
- The meadow turns gold in autumn — hence the name Meadow of Gold.
### Thajiwas Glacier Trek
- 3 km trek from Sonamarg to the Thajiwas Glacier — moderate difficulty.
- Snow persists here year-round — you can walk on glacier ice in summer.
- The glacier tongue is retreating visibly — a sobering climate change indicator.
### Vishansar & Krishansar Lakes
- Full-day pony trek (₹1,800) to these twin high-altitude Himalayan lakes.
- At 3,800m the lakes mirror the surrounding snow peaks.
- Trout fishing is permitted with a forest department licence (₹200/day).
### Nichnai Pass Viewpoint
- Short hike to the 4,100m pass separating Sonamarg from the Kashmir Valley.
- On clear days you can see the Zanskar range in the distance.
- The wildflower meadows here are among the finest in the Himalayas.
### Riverside Camp Dinner
- Stay in a luxury riverside camp tent and dine under the Himalayan stars.
- Camp cook prepares fresh trout, Kashmiri lamb and baked bread.
- Temperature drops to 8°C at night — bring a warm layer.

## Day 6: Final Day & Departure
### Pari Mahal (Fairy Palace) Sunrise
- Drive up to this 7-terraced Mughal garden above Dal Lake for sunrise.
- Built by Dara Shikoh (Mughal prince) in the 17th century as an astrology school.
- The view of Dal Lake and Srinagar waking up below is extraordinary.
### Kashmiri Craft Shopping
- Handicraft Emporium on Residency Road for government fixed-price shopping.
- Buy pashmina shawls, walnut wood furniture, papier-mâché boxes, crewel embroidery.
- Verify pashmina with the AIDC quality stamp — many shops sell synthetic blends.
### Floating Vegetable Market Final Visit
- Buy fresh Kashmiri apples, saffron, walnuts and dried cherries directly from boats.
- Prices are 30-40% cheaper buying from farmers directly versus shops.
- The saffron from Pampore is the world's finest — don't leave without it.
### Kabab Lunch at Mughal Darbar
- Galouti kebabs, seekh kebabs and Kashmiri pulao at this institution.
- The dum aloo here is a revelation — spiced perfectly for the altitude.
- Take a final shikara ride to the airport jetty before departure.

## Budget Breakdown
- Houseboat: ₹4,000-8,000/night (heritage cedar houseboat)
- Hotel/camp: ₹2,500-5,000/night
- Food: ₹1,000-2,000/day per person
- Gondola: ₹900/person (Phase 1+2)
- Pony treks: ₹1,800-3,000 total
- Transport: ₹6,000-8,000 (local cabs 6 days)
- Shopping (pashmina, saffron): ₹3,000-15,000
- Total (2 persons, 6 days): ₹65,000-1,00,000 excluding flights`,
  },
  {
    id: 'sample-5',
    title: 'Manali Adventure',
    photo: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
    days: '5',
    budget: 'Budget',
    preferences: 'Trekking, adventure sports, snow, Rohtang Pass, Himachali culture, budget stays',
    gradient: 'linear-gradient(135deg,#1d2671 0%,#C33764 100%)',
    emoji: '⛷',
    tagline: 'Snow, peaks & adventure',
    savedAt: 'Sample Trip',
    itinerary: `## Day 1: Arrival & Old Manali
### Bhuntar Airport / Volvo Bus Arrival
- Fly into Bhuntar (30 km from Manali) or take the overnight Volvo bus from Delhi (14 hrs, ₹900).
- Check into a guesthouse in Old Manali — ₹500-1,200/night for clean budget rooms.
- Walk along the Manalsu nullah (stream) that runs through Old Manali village.
### Hadimba Devi Temple
- 16th century wooden temple dedicated to the goddess Hadimba — unique pagoda architecture.
- The temple is set within a cedar forest — tranquil and atmospheric.
- Yak rides are available outside the temple (₹200 for 15 minutes).
### Old Manali Village Walk
- The hippie trail neighbourhood still has a Bohemian traveller vibe.
- Cafes like Café 1947, Drifters Inn and Hangout serve excellent Israeli and Himachali food.
- Browse the Tibetan market for prayer flags, incense and warm shawls (₹150-400).
### Manu Temple
- Dedicated to the Hindu sage Manu — believed to be the spot where he meditated.
- Short 1 km uphill walk through cedar forest from Old Manali.
- The views of the Beas River valley from the temple terrace are excellent.
### Bonfire Evening at Guesthouse
- Most Old Manali guesthouses organise evening bonfires in the garden.
- Meet fellow backpackers from across India and around the world.
- Order a traditional Himachali meal: siddu (stuffed bread) with ghee and dal.

## Day 2: Rohtang Pass
### Rohtang Pass (3,978m)
- Book a shared jeep (₹300/person) or private cab (₹2,500) to Rohtang.
- Rohtang Pass is on the main Manali-Leh Highway — spectacular mountain views.
- Snow activities: skiing, snowboarding, snow scooters and tube rides (₹500-1,500).
### Rahala Falls
- Dramatic waterfall cascading down the mountainside on the way to Rohtang.
- The water originates from glacial melt — ice-cold and incredibly powerful.
- Short 200m walk from the highway — easy and very photogenic.
### Solang Valley Snow Point
- 14 km from Manali — the nearest snow point, especially popular in winter.
- Paragliding (₹2,500), zorbing, ropeway and snow tubing available here.
- In summer the valley is green with a ski chairlift and alpine meadows.
### Beas Kund Trek Base
- Short hike to the meadow viewpoint above Solang for Himalayan panoramas.
- Can see Friendship Peak (5,289m) and Shitidhar (4,111m) clearly on good days.
- The meadow has a cluster of shepherd huts still used in summer.
### Keylong Homestay Dinner
- Ask your guesthouse to arrange a traditional Himachali family dinner.
- Dishes include aktori (buckwheat pancakes), chana madra, babru and sepu vadi.
- Local apple wine (₹150/bottle) produced from Kullu Valley orchards.

## Day 3: Spiti Valley Day Trip (Kunzum Pass)
### Drive to Kaza via Kunzum Pass
- Epic mountain drive via the 4,590m Kunzum Pass — one of India's highest motorable roads.
- The landscape transforms from pine forests to high-altitude desert.
- Road only open June-October — check conditions before going.
### Key Monastery
- A 1,000-year-old Tibetan Buddhist monastery perched on a hilltop at 4,166m.
- Home to 300 monks — visitors are welcome to observe morning prayers at 6 AM.
- The collection of ancient thangkas, butter sculptures and manuscripts is extraordinary.
### Kibber Village
- One of the world's highest inhabited villages at 4,270m — 84 households.
- Snow leopards come down to prey on livestock here in winter.
- Walk through the stone village and take tea with a local family.
### Pin Valley National Park Viewpoint
- The Pin River joins the Spiti at a dramatic confluence visible from the road.
- The barren, lunar landscape of Spiti Valley is completely unlike anywhere in India.
- Look for Himalayan marmots sunbathing on rocks throughout this stretch.
### Return to Manali by Evening
- 5-hour drive back through Rohtang — time your return before the 5 PM traffic jam.
- Dinner at Johnson's Café — wood-fired pizza and apple crumble in a garden setting.

## Day 4: Trekking & River Rafting
### Beas River White Water Rafting
- 14 km rafting stretch from Pirdi to Jhiri — Grade III-IV rapids (₹600/person).
- Best rafting months are May-June when the glacier melt swells the river.
- Operator provides helmet, life jacket and briefing — no experience needed.
### Hampta Pass Trek Day 1
- Hampta Pass (4,270m) is one of Manali's best treks — doable in 4 days.
- Day 1: trek from Jobra to Chika meadow (3,100m) — 8 km, 4 hrs, moderate.
- The alpine meadows and first glacier views are reward enough for one day.
### Jogini Waterfall Trek
- Shorter alternative: 3 km trek from Old Manali to the 160-ft Jogini Falls.
- The trail passes through apple orchards, cedar forest and small Himachali villages.
- Swimming in the freezing plunge pool is a rite of passage.
### Manali Sanctuary
- Forest department nature walk through the sanctuary above town.
- Brown bears, Himalayan langurs and musk deer in the forest.
- The rhododendron and oak canopy is beautiful in late April when in bloom.
### Mall Road Evening
- Walk Manali's Mall Road for local shopping, street food and people-watching.
- Try the siddu and chana with imli chutney from the roadside stalls.
- The tim tim (evening lights) of the valley floor from the upper Mall Road are lovely.

## Day 5: Naggar & Kullu Valley
### Naggar Castle
- 15th century castle of Raja Sidh Singh — now a heritage hotel and museum.
- The carved stone and timber architecture is unique to the Western Himalaya.
- Order breakfast at the castle cafe — valley view from the terrace.
### Roerich Art Gallery
- Home of Russian painter Nicholas Roerich who settled in Naggar in 1929.
- His Himalayan paintings are extraordinary — displayed in the original house.
- The estate overlooks the Kullu Valley and Beas River — his inspiration is evident.
### Kullu Valley Drive
- Drive down valley through apple orchards in bloom and terraced paddy fields.
- Stop at Raghunath Temple in Kullu — the valley's presiding deity.
- Buy Kullu shawls (₹500-3,000) directly from weavers at the government emporium.
### Kasol Walk
- Stop at this small Israeli enclave village on the Parvati River (2 hrs from Manali).
- Excellent cafes serving falafel, shakshuka and tahini.
- The Parvati Valley continues deeper to Kheerganga hot springs (12 km trek).

## Budget Breakdown
- Accommodation: ₹600-1,200/night (guesthouse/hostel)
- Food: ₹400-700/day per person
- Rohtang taxi: ₹300-500/person
- Adventure activities: ₹2,000-4,000 total
- Rafting: ₹600/person
- Transport (local taxis): ₹1,500 total
- Shopping: ₹1,000-3,000
- Total (1 person, 5 days): ₹12,000-20,000 excluding travel`,
  },
  {
    id: 'sample-6',
    title: 'Kerala Backwaters & Beaches',
    photo: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80',
    days: '7',
    budget: 'Mid-range',
    preferences: 'Houseboat cruise, Ayurveda, tea plantations, backwaters, seafood, Kerala culture',
    gradient: 'linear-gradient(135deg,#56ab2f 0%,#a8e063 100%)',
    emoji: '🌴',
    tagline: 'God\'s own country',
    savedAt: 'Sample Trip',
    itinerary: `## Day 1: Kochi — Gateway to Kerala
### Arrival at Kochi Airport
- Fly into Cochin International Airport and take the metro to Fort Kochi (₹40).
- Check into a heritage guesthouse in Fort Kochi's colonial quarter.
- Walk along the waterfront promenade as the fishing fleet comes in at sunset.
### Chinese Fishing Nets (Cheena Vala)
- The iconic cantilevered Chinese fishing nets — installed by Chinese traders 500 years ago.
- Still operated by local fishermen at sunrise and sunset — buy the fresh catch.
- The golden hour light on the nets against the Arabian Sea is extraordinary.
### Fort Kochi Heritage Walk
- A compact 2 km walk takes in 500 years of colonial history.
- Dutch Cemetery, Santa Cruz Basilica, St Francis Church (Vasco da Gama was buried here).
- The Jew Town and Mattancherry spice market are 30 minutes walk south.
### Kathakali Performance
- Evening Kathakali performance at Kerala Kathakali Centre (₹350).
- Arrive 1 hour early to watch the elaborate make-up application — an art in itself.
- The performers' eye movements and facial expressions take 10 years to master.
### Kashi Art Cafe
- Art gallery and cafe in a beautifully restored 300-year-old building.
- Order the Kerala-style appam and egg curry for dinner.
- Browse the rotating contemporary art exhibition after your meal.

## Day 2: Munnar — Tea Country
### Drive to Munnar (135 km)
- 4-hour drive climbing from sea level to 1,600m through coconut palms, rubber plantations and waterfalls.
- Stop at Cheeyappara and Valara Waterfalls on the way up — cascading and dramatic.
- Check into a tea estate bungalow — wake up to mist-covered tea rows tomorrow.
### Mattupetty Dam & Lake
- Shola grassland reservoir surrounded by tea estates and eucalyptus forest.
- Boating (₹200/30 min) on the calm lake with views of the Anamudi peak range.
- The Indo-Swiss Livestock Project dairy farm nearby does tours (₹50 entry).
### Tea Museum — Tata Tea Munnar
- Learn the full story of tea: from British planters to Tata's cooperative model.
- Watch the whole processing line: withering, rolling, oxidation, drying, grading.
- Tea tasting session at the end — pair with homemade Kerala tea biscuits.
### Echo Point & Kundala Lake
- The Kundala Lake is still and reflective, ringed by tea estates and shola forest.
- Boating (₹250), horse riding (₹300) and a short forest walk.
- If you call out, the sound echoes clearly back off the horseshoe-shaped hillside.
### Top Station Sunset
- 32 km from Munnar — the highest point in the region (1,700m) on the Tamil Nadu border.
- Sunset view over the Theni Valley below — one of Kerala's most dramatic vistas.
- Neelakurinji (blue Strobilanthes) flowers bloom here every 12 years — check if it's a bloom year.

## Day 3: Periyar Wildlife Sanctuary
### Thekkady & Periyar Lake Boat Safari
- Early morning boat safari on Periyar Lake inside the tiger reserve.
- Elephants, gaur, sambar deer and giant Malabar squirrels come to drink at the lake.
- Otters, kingfishers and oriental darters are seen regularly.
### Bamboo Rafting (Full Day)
- The Forest Department's flagship eco-tourism activity (₹1,400/person).
- 4-hour bamboo raft trip through the core of the forest with a tribal naturalist guide.
- Overnight camping in the forest is also available for the adventurous.
### Spice Garden Tour (Kumily)
- Kumily village is surrounded by cardamom, pepper, cinnamon and clove estates.
- 2-hour guided walk through a working spice plantation (₹300 including lunch).
- Buy spices direct from the farm — 60% cheaper than Kochi tourist shops.
### Mudra Cultural Programme
- Evening Kalaripayattu (Kerala martial arts) and folk art performance.
- Watch the Theyyam and Mohiniyattam dance forms as well.
- Kalaripayattu is an ancient Indian martial art — the precursor of all Southeast Asian martial arts.
### Spice Village Resort Dinner
- The CGH Earth resort sources all ingredients within 5 km.
- Kerala sadya on banana leaf — 26 dishes including olan, avial, inji puli and paayasam.
- The restaurant is in a traditional Kerala village setting — thatched roofs and oil lamps.

## Day 4: Alleppey Houseboat
### Drive to Alleppey (170 km from Munnar)
- 4-hour drive down from the hills through cardamom estates and rubber plantations.
- Arrive Alleppey (Alappuzha) by noon — board your houseboat at the jetty.
- The 900 km network of backwater canals is Kerala's defining natural wonder.
### Kettuvallam Houseboat Cruise
- Traditional rice barge converted to a luxury floating home.
- Cruise through narrow canals, past paddy fields and coconut groves.
- Your private chef onboard serves a different Kerala meal at every mealtime.
### Village Canal Walk
- Moor the boat at a village jetty and walk through a working backwater village.
- Coir rope making, toddy tapping and prawn farming are the livelihoods here.
- Schoolchildren wave from the canals — community life on water is extraordinary.
### Sunset on Vembanad Lake
- The houseboat heads onto the open Vembanad Lake for sunset.
- At 2,033 sq km it's the longest lake in India and the largest in Kerala.
- The sun sets behind the mangrove horizon in a blaze of orange and pink.
### Night Anchored in the Backwaters
- The boat anchors in a quiet canal and the generator shuts off at 10 PM.
- Sleep to the sound of frogs, herons and gentle water lapping.
- Star-gazing from the roof deck — away from city light pollution completely.

## Day 5: Varkala & Kollam
### Varkala Cliff Beach
- Drive 2 hours south — Varkala's dramatic red laterite cliff directly above the beach.
- Papanasam Beach below the cliff is a Hindu pilgrimage site.
- The cliff-top cafes serve fish and chips, fresh juice and chill music all day.
### Janardanaswamy Temple
- 2,000-year-old temple at the cliff top — pilgrims come to immerse ashes in the sea.
- Non-Hindus can visit the outer courtyard and observe the rituals.
- The temple tank is ancient and the carved stone gopuram is beautifully maintained.
### Surf Lessons at Varkala
- Varkala is Kerala's best surf beach — waves are consistent October-March.
- 2-hour lessons available with qualified instructors (₹1,200 including board).
- Stand-up paddleboarding is easier and equally enjoyable for non-surfers.
### Ayurvedic Massage
- Varkala has dozens of qualified Ayurvedic clinics — 90-minute Abhyanga massage (₹1,200).
- The traditional Pizhichil (oil bath) and Shirodhara (oil on forehead) are deeply restorative.
- Book only at clinics with qualified Ayurvedic doctors — ask for their certification.
### Cliff Sunset Dinner
- Reserve the cliffside table at Abba Restaurant — 3 hours before sunset.
- Fresh catch of the day prepared in Kerala, Tamil or Continental style.
- The cliff provides an uninterrupted Arabian Sea horizon — superb sunset views.

## Day 6: Trivandrum & Temple
### Padmanabhaswamy Temple
- One of India's wealthiest temples — estimated assets over $22 billion.
- The presiding deity is a 5-metre reclining Vishnu — only Hindus permitted inside.
- The temple tank (Padmatheertham) and gopuram are open to all visitors.
### Napier Museum
- Kerala government's 19th century natural history and art museum.
- The bronze gallery has extraordinary Chola and Vijayanagara bronzes.
- The Indo-Saracenic building itself — designed by Robert Fellowes Chisholm — is spectacular.
### Shanghumugham Beach
- Trivandrum's city beach — long, clean and with a large sculpture of a reclining woman.
- Seafood stalls along the beach serve local fish curry in clay pots (₹100).
- Evening aerobics classes happen on the beach — locals join in, tourists are welcome.
### Kovalam Beach
- 16 km from Trivandrum — the most famous beach in Kerala.
- Lighthouse Beach is the most active — surfing, parasailing and beach volleyball.
- Hawa Beach nearby is quieter and more suited to swimming.
### The Leela Hotel Dinner
- Splurge on dinner at the Leela Kovalam's cliff-side restaurant.
- The Kerala seafood platter is the dish to order — 12 preparations of the day's catch.
- The view of the lighthouse from the terrace is a perfect final evening.

## Day 7: Departure Day
### Yoga & Meditation at Dawn
- Kerala is the spiritual home of yoga in South India.
- 6 AM sunrise yoga session on the beach (₹500, all levels).
- Pranayama and meditation as the sun rises over the Arabian Sea.
### Chalai Market, Trivandrum
- The oldest and most authentic market in Kerala — since the 17th century.
- Buy Kerala banana chips, coconut oil, handloom kasavu sarees and spice mixes.
- The fresh flower market and fish market are spectacularly vivid.
### Kuthiramalika Palace
- 19th century wooden palace of the Travancore royal family.
- 122 carved wooden horses (kuthira = horse) support the overhanging eaves.
- The royal armoury and portrait gallery are excellent.

## Budget Breakdown
- Accommodation: ₹1,500-4,000/night (guesthouse + tea estate + houseboat)
- Houseboat (1 night): ₹8,000-14,000 (full board, 2 persons)
- Food: ₹700-1,200/day per person
- Boat safaris & activities: ₹4,000 total
- Ayurveda: ₹1,200 per session
- Transport: ₹7,000-10,000 (intercity cabs, 7 days)
- Shopping: ₹2,000-5,000
- Total (2 persons, 7 days): ₹65,000-95,000 excluding flights`,
  },
];

// ─── GRADIENTS ───────────────────────────────────────────────────────────────
export const GRADIENTS = [
  'linear-gradient(135deg,#1d2671 0%,#C33764 100%)',
  'linear-gradient(135deg,#11998e 0%,#38ef7d 100%)',
  'linear-gradient(135deg,#C4532A 0%,#D97706 100%)',
  'linear-gradient(135deg,#1A3D5C 0%,#2E6B9E 100%)',
  'linear-gradient(135deg,#134E5E 0%,#71B280 100%)',
  'linear-gradient(135deg,#4776E6 0%,#8E54E9 100%)',
  'linear-gradient(135deg,#56ab2f 0%,#a8e063 100%)',
];