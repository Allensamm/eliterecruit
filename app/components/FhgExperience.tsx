'use client';
import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const TRANSITION_MS = 600;
const STORAGE_KEY = 'fhg-current-scene';
const scenes = [
  { title: 'Your future should not depend on one option', eyebrow: 'Opening Hook', type: 'hero' },
  { title: 'Having ambition is good. Having a system is better.', eyebrow: 'The Reality', type: 'statement' },
  { title: 'What Is FHG?', eyebrow: 'The foundation', type: 'definition' },
  { title: 'The Two-Part System', eyebrow: 'A balanced approach', type: 'split' },
  { title: 'How It Works', eyebrow: 'A simple path', type: 'steps' },
  { title: 'What Members Develop', eyebrow: 'Practical growth', type: 'cards' },
  { title: 'Who It May Suit', eyebrow: 'Consider the fit', type: 'profile' },
  { title: 'Transparency', eyebrow: 'Clarity matters', type: 'transparency' },
  { title: 'Real Experience and Proof', eyebrow: 'Evidence over promises', type: 'proof' },
  { title: 'Frequently Asked Questions', eyebrow: 'Useful answers', type: 'faq' },
  { title: 'Lead Capture', eyebrow: 'Your next step', type: 'form' },
] as const;

function SceneFrame({ index, eyebrow, title, children }: { index: number; eyebrow: string; title: string; children: ReactNode }) {
  return <section className="scene" aria-label={`Scene ${index + 1}: ${title}`}><div className="scene-content" data-scroll-region><div className="scene-grid"><div className="scene-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div><div className="scene-main"><p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1>{children}</div></div></div></section>;
}

function Placeholder({ lines = 2 }: { lines?: number }) {
  return <div className="placeholder-copy" aria-label="Content placeholder">{Array.from({ length: lines }, (_, i) => <span key={i} />)}</div>;
}

function SceneOne({ onContinue }: { onContinue: () => void }) {
  return <div className="opening-layout">
    <div className="opening-copy">
      <p className="opening-body">Work, school and business can give you a starting point. But learning a practical skill, developing yourself and understanding how to build a real business can give you more options.</p>
      <p className="supporting-line">Discover how FHG combines <strong>digital skills</strong>, <strong>personal development</strong> and <strong>product-based network marketing</strong>.</p>
      <button className="primary-cta" onClick={onContinue}>Show me how it works <span>↓</span></button>
      <p className="honesty-note"><span>i</span>This is not a salaried job, investment scheme or guaranteed-income programme.</p>
    </div>
    <figure className="opening-image">
      {/* Local temporary asset; plain img avoids the Vinext image shim in this client-only scene. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/fhg-scene-1.jpg" alt="A young Nigerian professional working from a laptop in a relaxed Lagos workspace" />
      <figcaption><span>Temporary image</span><a href="https://unsplash.com/photos/a-man-sitting-on-a-couch-using-a-laptop-computer-LE2fKER-4sA" target="_blank" rel="noreferrer">Lagos, Nigeria · Ninthgrid / Unsplash</a></figcaption>
    </figure>
    <p className="scene-swipe-cue"><span>↕</span> Swipe or scroll to continue</p>
  </div>;
}

function SceneTwo() {
  return <div className="reality-layout">
    <div className="reality-copy">
      <p>Many students, graduates and workers want to improve their lives but do not know which skill to learn, how to find guidance or how to start building something of their own.</p>
      <p>The problem is not always a lack of effort. Sometimes, it is a lack of practical training, mentorship, community and a clear system to follow.</p>
    </div>
    <div className="reality-pillars" aria-label="The three parts of a stronger system">{['Skills', 'Mentorship', 'Community'].map((word, index) => <div key={word}><span>0{index + 1}</span><strong>{word}</strong></div>)}</div>
    <p className="closing-question">What could change if you had the right skills, support and environment?</p>
  </div>;
}

function SceneBody({ type, onNavigate }: { type: typeof scenes[number]['type']; onNavigate: (index: number) => void }) {
  if (type === 'hero') return <SceneOne onContinue={() => onNavigate(1)} />;
  if (type === 'statement') return <SceneTwo />;
  if (type === 'split') return <div className="two-up"><article><strong>01</strong><h2>Foundation one</h2><Placeholder /></article><article><strong>02</strong><h2>Foundation two</h2><Placeholder /></article></div>;
  if (type === 'steps') return <div className="steps">{['Discover', 'Understand', 'Decide'].map((x, i) => <article key={x}><span>{i + 1}</span><div><h2>{x}</h2><Placeholder lines={1} /></div></article>)}</div>;
  if (type === 'cards') return <div className="card-grid">{['Capability', 'Confidence', 'Community'].map((x, i) => <article key={x}><span className="mini-icon">{String(i + 1).padStart(2, '0')}</span><h2>{x}</h2><Placeholder lines={2} /></article>)}</div>;
  if (type === 'profile') return <div className="profile-layout"><div className="profile-ring">?</div><div><p className="intro small">A thoughtful fit-check will live here.</p><Placeholder lines={3} /></div></div>;
  if (type === 'transparency') return <div className="transparency-box"><span>Important context</span><p>Clear expectations, responsible language and balanced information will appear here.</p></div>;
  if (type === 'proof') return <div className="proof-layout"><div className="quote-mark">“</div><div><p className="intro small">A grounded space for genuine experience and verifiable proof.</p><Placeholder lines={2} /></div></div>;
  if (type === 'faq') return <div className="faq-list">{['Question placeholder one', 'Question placeholder two', 'Question placeholder three'].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, '0')}</span><h2>{x}</h2><b>+</b></div>)}</div>;
  if (type === 'form') return <LeadForm />;
  return <><p className="intro small">This scene is ready for the final educational content.</p><Placeholder lines={3} /></>;
}

function LeadForm() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent) { event.preventDefault(); setSent(true); }
  if (sent) return <div className="form-success" role="status"><span>✓</span><h2>Structure confirmed</h2><p>The final submission flow will be connected when content is approved.</p></div>;
  return <form className="lead-form" onSubmit={submit}><label><span>Full name</span><input name="name" autoComplete="name" placeholder="Your name" required /></label><label><span>Email address</span><input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label><label><span>Phone number</span><input type="tel" name="phone" autoComplete="tel" placeholder="+234" /></label><button type="submit">Test application flow <span>→</span></button><small>Placeholder form only — no information is sent or stored.</small></form>;
}

function Progress({ current, onSelect }: { current: number; onSelect: (index: number) => void }) {
  return <aside className="progress" aria-label="Scene progress"><div className="progress-count"><strong>{String(current + 1).padStart(2, '0')}</strong><span>/</span><span>11</span></div><div className="progress-track">{scenes.map((scene, index) => <button key={scene.title} onClick={() => onSelect(index)} className={index === current ? 'active' : ''} aria-label={`Go to ${scene.title}`} aria-current={index === current ? 'step' : undefined}><span /></button>)}</div></aside>;
}
function Navigation({ current, go }: { current: number; go: (index: number) => void }) {
  return <nav className="nav-controls" aria-label="Scene navigation"><button onClick={() => go(current - 1)} disabled={current === 0} aria-label="Previous scene"><span>↑</span><b>Back</b></button><button onClick={() => go(current + 1)} disabled={current === scenes.length - 1} aria-label="Next scene"><b>Next</b><span>↓</span></button></nav>;
}

export default function FhgExperience() {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const locked = useRef(false);
  const wheelTotal = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ y: number; target: EventTarget | null } | null>(null);
  useEffect(() => {
    const stored = Number(sessionStorage.getItem(STORAGE_KEY));
    if (!Number.isInteger(stored) || stored < 0 || stored >= scenes.length) return;
    currentRef.current = stored;
    const frame = requestAnimationFrame(() => setCurrent(stored));
    return () => cancelAnimationFrame(frame);
  }, []);
  const canScrollInside = useCallback((target: EventTarget | null, direction: number) => { const element = target instanceof Element ? target.closest('[data-scroll-region]') as HTMLElement | null : null; if (!element || element.scrollHeight <= element.clientHeight + 2) return false; return direction > 0 ? element.scrollTop + element.clientHeight < element.scrollHeight - 2 : element.scrollTop > 2; }, []);
  const go = useCallback((next: number) => { const bounded = Math.max(0, Math.min(scenes.length - 1, next)); if (locked.current || bounded === currentRef.current) return; locked.current = true; currentRef.current = bounded; setCurrent(bounded); sessionStorage.setItem(STORAGE_KEY, String(bounded)); window.setTimeout(() => { locked.current = false; wheelTotal.current = 0; }, TRANSITION_MS); }, []);
  useEffect(() => {
    const onWheel = (event: WheelEvent) => { if (canScrollInside(event.target, event.deltaY)) return; event.preventDefault(); if (locked.current) return; wheelTotal.current += event.deltaY; if (wheelTimer.current) clearTimeout(wheelTimer.current); wheelTimer.current = setTimeout(() => { wheelTotal.current = 0; }, 140); if (Math.abs(wheelTotal.current) >= 34) go(currentRef.current + (wheelTotal.current > 0 ? 1 : -1)); };
    const onKey = (event: KeyboardEvent) => { if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes((event.target as HTMLElement)?.tagName)) return; if (event.key === 'ArrowDown') { event.preventDefault(); go(currentRef.current + 1); } if (event.key === 'ArrowUp') { event.preventDefault(); go(currentRef.current - 1); } };
    window.addEventListener('wheel', onWheel, { passive: false }); window.addEventListener('keydown', onKey); return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey); if (wheelTimer.current) clearTimeout(wheelTimer.current); };
  }, [canScrollInside, go]);
  function onTouchStart(event: React.TouchEvent) { touchStart.current = { y: event.touches[0].clientY, target: event.target }; }
  function onTouchEnd(event: React.TouchEvent) { if (!touchStart.current) return; const distance = touchStart.current.y - event.changedTouches[0].clientY; if (Math.abs(distance) > 48 && !canScrollInside(touchStart.current.target, distance)) go(currentRef.current + (distance > 0 ? 1 : -1)); touchStart.current = null; }
  return <main className="experience" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><header className="topbar"><a className="brand" href="#scene-1" onClick={(e) => { e.preventDefault(); go(0); }} aria-label="Allen Samuel home"><span>AS</span><div><b>Allen Samuel</b><small>FHG Explainer</small></div></a><button className="skip" onClick={() => go(10)}>Skip to Application <span>↘</span></button></header><div className="scene-stage" style={{ transform: `translate3d(0, -${current * 100}%, 0)` }}>{scenes.map((scene, index) => <div id={`scene-${index + 1}`} className="scene-slot" key={scene.title} aria-hidden={index !== current} inert={index !== current}><SceneFrame index={index} eyebrow={scene.eyebrow} title={scene.title}><SceneBody type={scene.type} onNavigate={go} /></SceneFrame></div>)}</div><Progress current={current} onSelect={go} /><Navigation current={current} go={go} /><p className="scroll-hint" aria-hidden="true"><span /> Scroll to explore</p><div className="ambient ambient-one" /><div className="ambient ambient-two" /></main>;
}
