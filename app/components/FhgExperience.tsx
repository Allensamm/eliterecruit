'use client';
import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const TRANSITION_MS = 600;
const STORAGE_KEY = 'fhg-current-scene';
const scenes = [
  { title: 'Your future should not depend on one option', eyebrow: '', type: 'hero' },
  { title: 'Having ambition is good. Having a system is better.', eyebrow: 'The Reality', type: 'statement' },
  { title: 'So, what exactly is FHG?', eyebrow: 'What Is FHG?', type: 'definition' },
  { title: 'One community. Two development paths.', eyebrow: 'The Two-Part System', type: 'split' },
  { title: 'What happens when someone decides to learn more?', eyebrow: 'How the Journey Works', type: 'steps' },
  { title: 'More than joining. It is about becoming capable.', eyebrow: 'What Members May Develop', type: 'cards' },
  { title: 'Is this the right direction for you?', eyebrow: 'Who This May Suit', type: 'profile' },
  { title: 'What we will never promise you', eyebrow: 'Transparency', type: 'transparency' },
  { title: 'Do not take the message on faith. Review the evidence.', eyebrow: 'Real Experience and Proof', type: 'proof' },
  { title: 'Frequently Asked Questions', eyebrow: 'Clear answers before you decide', type: 'faq' },
  { title: 'Ready to understand the next step?', eyebrow: 'Lead Capture', type: 'form' },
] as const;

function SceneFrame({ index, eyebrow, title, children }: { index: number; eyebrow: string; title: string; children: ReactNode }) {
  return <section className="scene" aria-label={`Scene ${index + 1}: ${title}`}><div className="scene-content" data-scroll-region><div className="scene-grid"><div className="scene-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div><div className="scene-main">{eyebrow && <p className="eyebrow"><span />{eyebrow}</p>}<h1 tabIndex={-1}>{title}</h1>{children}</div></div></div></section>;
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
      <img src="/fhg-scene-1.jpg" width="1400" height="933" fetchPriority="high" decoding="async" alt="A young Nigerian professional working from a laptop in a relaxed Lagos workspace" />
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

function SceneThree() {
  return <div className="definition-layout">
    <div className="definition-copy">
      <p><strong>FHG</strong> stands for <strong>Faith Heroic Generation.</strong> It is a Nigerian business and personal-development community that combines digital-skills learning with product-based network marketing.</p>
      <p>Members are introduced to practical online skills, communication, leadership, product education and business-building principles.</p>
      <aside className="definition-clarification"><span>Important clarification</span><p>FHG is not an employer and does not pay salaries. It provides a learning and business-development system. Individual results depend on effort, skills, consistency, customer demand and other circumstances.</p></aside>
    </div>
    <div className="verified-editor-wrap">
      <div className="editor-label"><span>Verified information only</span><b>Editable area</b></div>
      <div className="verified-editor" contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label="Verified FHG history, leadership and official information">INSERT VERIFIED FHG HISTORY, LEADERSHIP AND OFFICIAL INFORMATION HERE.</div>
      <p>Dates, leaders, products, statistics and achievements should only be added after verification.</p>
    </div>
  </div>;
}

const digitalSkills = ['Website design', 'Graphic design', 'Content writing', 'Social media management', 'Digital marketing', 'Other approved FHG skills'];

function SceneFour() {
  return <div className="system-diagram" aria-label="The two connected FHG development paths">
    <article className="path path-skills">
      <div className="path-heading"><span>01</span><h2>Digital skills</h2></div>
      <p>Learn practical skills that may be used to offer legitimate services to clients online or offline.</p>
      <ul>{digitalSkills.map(skill => <li key={skill}>{skill}</li>)}</ul>
      <small>Available training may vary by location, team and programme.</small>
    </article>
    <div className="system-connector" aria-label="Skills plus business plus personal development">
      <i aria-hidden="true" />
      <div><span>Skills</span><b>+</b><span>Business</span><b>+</b><span>Personal development</span></div>
      <i aria-hidden="true" />
    </div>
    <article className="path path-business">
      <div className="path-heading"><span>02</span><h2>Network marketing</h2></div>
      <p>Learn how to understand, use and recommend genuine products, serve customers, communicate professionally and build a team through responsible duplication.</p>
      <div className="earnings-note"><span>Clarity on earnings</span><p>Earnings are not guaranteed. They may depend on genuine product sales, customer activity, team performance and the applicable compensation plan.</p></div>
    </article>
  </div>;
}

const journeySteps = [
  ['Understand', 'Learn what FHG is, what it offers and what it requires.'],
  ['Ask questions', 'Discuss the products, training, responsibilities, costs and compensation structure.'],
  ['Decide', 'Review the information without pressure before making a commitment.'],
  ['Learn', 'Attend approved training and develop practical communication, digital and business skills.'],
  ['Apply', 'Use the training consistently, serve real customers and build responsibly.'],
] as const;

function SceneFive() {
  return <div className="journey-wrap">
    <ol className="journey" aria-label="Five steps in the FHG learning journey">
      {journeySteps.map(([title, description], index) => <li key={title}>
        <div className="journey-point"><span>{String(index + 1).padStart(2, '0')}</span></div>
        <div className="journey-text"><h2>{title}</h2><p>{description}</p></div>
      </li>)}
    </ol>
    <p className="journey-close"><span>Full clarity</span>No step should be hidden. You should understand the complete process before registering or paying.</p>
  </div>;
}

const growthAreas = [
  ['Digital ability', 'Develop practical online skills.'],
  ['Communication', 'Learn how to explain ideas and speak with people confidently.'],
  ['Leadership', 'Learn how to support and guide others responsibly.'],
  ['Product knowledge', 'Understand what you recommend before speaking to customers.'],
  ['Personal development', 'Build discipline, consistency and confidence.'],
  ['Business thinking', 'Understand customers, sales, follow-up and teamwork.'],
] as const;

function SceneSix() {
  return <div className="growth-wrap">
    <div className="growth-orbit" aria-label="Six connected member development areas">
      <div className="growth-centre" aria-hidden="true"><span>FHG</span><strong>Capability</strong><i /></div>
      {growthAreas.map(([title, description], index) => <article className={`growth-node growth-node-${index + 1}`} key={title}>
        <span>{String(index + 1).padStart(2, '0')}</span><div><h2>{title}</h2><p>{description}</p></div>
      </article>)}
    </div>
    <p className="growth-note"><span>i</span>Training content and outcomes vary. Participation does not guarantee income or employment.</p>
  </div>;
}

const maySuit = [
  'You are at least 18 years old.',
  'You are willing to learn.',
  'You can attend training.',
  'You understand that results require effort.',
  'You are comfortable communicating with people.',
  'You want skills, mentorship and business exposure.',
  'You are prepared to ask questions before deciding.',
];
const mayNotSuit = [
  'You want guaranteed or instant income.',
  'You expect to earn without learning or working.',
  'You want a salaried job.',
  'You intend to pressure friends or family.',
  'You are unwilling to understand the products.',
  'You are borrowing money you cannot afford to lose.',
  'You do not want to follow ethical marketing practices.',
];

function FitList({ title, items, tone }: { title: string; items: string[]; tone: 'yes' | 'no' }) {
  return <article className={`fit-column fit-${tone}`}><header><span>{tone === 'yes' ? '✓' : '—'}</span><h2>{title}</h2></header><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>;
}

function SceneSeven({ onNavigate }: { onNavigate: (index: number) => void }) {
  return <div className="fit-wrap">
    <div className="fit-columns"><FitList title="This may suit you if:" items={maySuit} tone="yes" /><FitList title="This may not suit you if:" items={mayNotSuit} tone="no" /></div>
    <div className="fit-decision"><p>Which side describes your expectations more accurately?</p><div><button onClick={() => onNavigate(7)}>This may suit me <span>→</span></button><button onClick={() => onNavigate(9)}>I need more information <span>?</span></button></div></div>
  </div>;
}

const neverPromises = [
  'No guaranteed earnings', 'No overnight success', 'No automatic employment', 'No income without effort',
  'No hidden registration information', 'No pressure to decide immediately', 'No fake testimonials', 'No misleading product claims',
];

function SceneEight() {
  const [reveal, setReveal] = useState(0);
  return <div className="promise-layout">
    <div className="promise-reveal" aria-label="Transparency statements">
      <div className="promise-counter"><span>{String(reveal + 1).padStart(2, '0')}</span><i /><span>08</span></div>
      <div className="promise-statement" role="status" aria-live="polite"><span aria-hidden="true">×</span><strong>{neverPromises[reveal]}</strong></div>
      <div className="promise-controls"><button onClick={() => setReveal(value => Math.max(0, value - 1))} disabled={reveal === 0} aria-label="Previous transparency statement">←</button><div>{neverPromises.map((item, index) => <button key={item} onClick={() => setReveal(index)} className={index === reveal ? 'active' : ''} aria-label={`Reveal: ${item}`} aria-current={index === reveal ? 'step' : undefined} />)}</div><button onClick={() => setReveal(value => Math.min(neverPromises.length - 1, value + 1))} disabled={reveal === neverPromises.length - 1} aria-label="Next transparency statement">→</button></div>
    </div>
    <div className="promise-details">
      <p>Before you register, Allen will explain the current costs, available products, training structure, responsibilities and compensation information.</p>
      <div className="cost-editor-wrap"><div><span>Verified information only</span><b>Editable area</b></div><div className="cost-editor" contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label="Current and verified cost information">INSERT CURRENT AND VERIFIED COST INFORMATION HERE.</div><small>Product, health, cost, compensation and income details must be verified before publication.</small></div>
    </div>
  </div>;
}

const evidenceAreas = [
  'Allen’s genuine personal story', 'Approved training photographs', 'Real member experiences', 'Verifiable digital projects',
  'Product education', 'Community activities', 'Genuine customer stories', 'Approved FHG events',
];

function SceneNine() {
  return <div className="evidence-layout">
    <div className="evidence-intro"><span>Verification first</span><p>Every testimonial must use a real person or approved identifier. Never add fake names, earnings, photographs or success stories.</p></div>
    <div className="evidence-grid" aria-label="Editable areas for verified experience and proof">
      {evidenceAreas.map((area, index) => <div className="evidence-editor" key={area} contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label={`Editable area: ${area}`}><span contentEditable={false} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><strong contentEditable={false}>{area}</strong><p>ADD VERIFIED MATERIAL HERE.</p></div>)}
    </div>
    <div className="evidence-placeholder" contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label="Verified testimonials, photographs and media"><span contentEditable={false}>Editable verified-media area</span><strong>ALLEN WILL ADD VERIFIED TESTIMONIALS, PHOTOGRAPHS AND MEDIA HERE.</strong></div>
  </div>;
}

const faqs = [
  ['Is FHG a job?', 'No. FHG is not a salary-paying employer. It is presented as a skills, personal-development and network-marketing community.'],
  ['Will I start earning immediately?', 'There is no guaranteed earning date or amount. Results depend on what you learn, how you apply it, customer demand, sales activity, team performance and other circumstances.'],
  ['Do I have to recruit people?', 'Team building may be part of network marketing, but the business should also involve genuine products, customer service and responsible sales. Allen will explain the current structure before you decide.'],
  ['Will I receive digital-skills training?', 'FHG is described as combining digital skills with network marketing. The exact skills, schedule and training access should be confirmed with Allen.'],
  ['How much does it cost?', 'Current costs will be explained clearly before registration. You should not make a payment until you understand what the payment covers.'],
  ['Can I participate while studying or working?', 'Many people explore it alongside school, employment or another business, but you should consider whether you have enough time to participate consistently.'],
  ['Is income guaranteed?', 'No. Income is not guaranteed.'],
  ['Can I speak directly with Allen?', 'Yes. You can request a WhatsApp conversation before making any decision.'],
] as const;

function SceneTen() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <div className="faq-accordion">
    {faqs.map(([question, answer], index) => { const open = openIndex === index; const panelId = `faq-panel-${index}`; return <div className={open ? 'open' : ''} key={question}>
      <h2><button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? null : index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{question}</strong><i aria-hidden="true">{open ? '−' : '+'}</i></button></h2>
      <div id={panelId} role="region" aria-label={question} hidden={!open}><p>{answer}</p></div>
    </div>; })}
  </div>;
}

function SceneBody({ type, onNavigate }: { type: typeof scenes[number]['type']; onNavigate: (index: number) => void }) {
  if (type === 'hero') return <SceneOne onContinue={() => onNavigate(1)} />;
  if (type === 'statement') return <SceneTwo />;
  if (type === 'definition') return <SceneThree />;
  if (type === 'split') return <SceneFour />;
  if (type === 'steps') return <SceneFive />;
  if (type === 'cards') return <SceneSix />;
  if (type === 'profile') return <SceneSeven onNavigate={onNavigate} />;
  if (type === 'transparency') return <SceneEight />;
  if (type === 'proof') return <SceneNine />;
  if (type === 'faq') return <SceneTen />;
  if (type === 'form') return <LeadForm />;
  return <><p className="intro small">This scene is ready for the final educational content.</p><Placeholder lines={3} /></>;
}

function LeadForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ name: string; method: string } | null>(null);
  const [status, setStatus] = useState('');
  const [interest, setInterest] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const startedAt = useRef(0);
  const submitted = useRef(false);
  useEffect(() => { startedAt.current = Date.now(); }, []);
  const whatsappNumber = process.env.NEXT_PUBLIC_ALLEN_WHATSAPP_NUMBER?.replace(/\D/g, '') || '';
  const whatsappMessage = `Hello Allen, I have reviewed the FHG explainer website. I am interested in learning more about ${interest || '[selected interest]'}. My current status is ${status || '[selected status]'}.`;
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}` : '';

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || submitted.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const required = ['firstName', 'whatsapp', 'status', 'interest', 'contactMethod', 'bestTime'];
    required.forEach(name => { if (!String(data.get(name) || '').trim()) nextErrors[name] = 'Please complete this field.'; });
    if (!data.get('ageConfirmed')) nextErrors.ageConfirmed = 'Please confirm that you are at least 18 years old.';
    if (!data.get('consent')) nextErrors.consent = 'Consent is required before Allen can contact you.';
    const email = String(data.get('email') || '').trim();
    if (contactMethod === 'Email' && !email) nextErrors.email = 'Please enter the email address Allen should use.';
    else if (contactMethod === 'Email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email address.';
    const phone = String(data.get('whatsapp') || '').replace(/[\s()-]/g, '');
    if (phone && !/^\+?[0-9]{10,15}$/.test(phone)) nextErrors.whatsapp = 'Enter a valid WhatsApp number, including the country code.';
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    setErrors({}); setSubmitting(true);
    const payload = Object.fromEntries(data.entries());
    payload.formStartedAt = String(startedAt.current);
    payload.submissionId = crypto.randomUUID();
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'We could not send your request. Please try again.');
      submitted.current = true;
      setSuccess({ name: String(data.get('firstName')), method: String(data.get('contactMethod')) });
    } catch (error) { setErrors({ form: error instanceof Error ? error.message : 'We could not send your request. Please try again.' }); }
    finally { setSubmitting(false); }
  }

  if (success) return <div className="form-success" role="status"><span>✓</span><h2>Thank you, {success.name}.</h2><p>Your request has been received. Allen will contact you through your selected method: <strong>{success.method}</strong>.</p><p>Before making any decision, make sure you understand the costs, products, responsibilities and compensation structure.</p></div>;
  const fieldError = (name: string) => errors[name] ? <small className="field-error" id={`${name}-error`}>{errors[name]}</small> : null;
  return <div className="lead-capture-layout">
    <div className="lead-intro"><p>Complete this short form to receive the introductory information or request a direct conversation with Allen. Submitting this form does not register you or require payment.</p><aside><span>Privacy</span><p>Your details are used only to respond to this enquiry. You will not be added to a WhatsApp group or sent marketing messages without consent. Never submit bank details, identity numbers or card information.</p></aside></div>
    <form className="lead-form complete" onSubmit={submit} noValidate>
      <label><span>First name *</span><input name="firstName" autoComplete="given-name" aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? 'firstName-error' : undefined} />{fieldError('firstName')}</label>
      <label><span>WhatsApp number *</span><input name="whatsapp" type="tel" autoComplete="tel" placeholder="+234…" aria-invalid={!!errors.whatsapp} aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined} />{fieldError('whatsapp')}</label>
      <label><span>Current status *</span><select name="status" value={status} onChange={e => setStatus(e.target.value)} aria-invalid={!!errors.status} aria-describedby={errors.status ? 'status-error' : undefined}><option value="">Select one</option>{['Student','NYSC member','Graduate','Employee','Freelancer','Business owner','Other'].map(x => <option key={x}>{x}</option>)}</select>{fieldError('status')}</label>
      <label><span>Primary interest *</span><select name="interest" value={interest} onChange={e => setInterest(e.target.value)} aria-invalid={!!errors.interest} aria-describedby={errors.interest ? 'interest-error' : undefined}><option value="">Select one</option>{['Digital skills','Personal development','Additional income opportunity','Product information','Network marketing','I am still exploring'].map(x => <option key={x}>{x}</option>)}</select>{fieldError('interest')}</label>
      <label><span>Preferred contact method *</span><select name="contactMethod" value={contactMethod} onChange={e => setContactMethod(e.target.value)} aria-invalid={!!errors.contactMethod} aria-describedby={errors.contactMethod ? 'contactMethod-error' : undefined}><option value="">Select one</option>{['WhatsApp message','WhatsApp call','Email'].map(x => <option key={x}>{x}</option>)}</select>{fieldError('contactMethod')}</label>
      <label><span>Best time to contact *</span><input name="bestTime" placeholder="e.g. Weekdays after 6pm" aria-invalid={!!errors.bestTime} aria-describedby={errors.bestTime ? 'bestTime-error' : undefined} />{fieldError('bestTime')}</label>
      {contactMethod === 'Email' && <label><span>Email address *</span><input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />{fieldError('email')}</label>}
      <label className="question-field"><span>Optional question</span><textarea name="question" rows={2} maxLength={600} placeholder="What would you like Allen to clarify?" /></label>
      <label className="check-field"><input type="checkbox" name="ageConfirmed" value="yes" aria-invalid={!!errors.ageConfirmed} aria-describedby={errors.ageConfirmed ? 'ageConfirmed-error' : undefined} /><span>I confirm that I am 18 years old or older.</span>{fieldError('ageConfirmed')}</label>
      <label className="check-field"><input type="checkbox" name="consent" value="yes" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} /><span>I agree to be contacted about this enquiry. I understand that this is not a job offer or guaranteed-income programme.</span>{fieldError('consent')}</label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" hidden />
      {errors.form && <p className="form-error" role="alert">{errors.form}</p>}
      <div className="lead-actions"><button type="submit" disabled={submitting}>{submitting ? 'Sending request…' : 'Request the introduction'} <span>→</span></button>{whatsappHref ? <a href={whatsappHref} data-message={whatsappMessage} target="_blank" rel="noreferrer">Chat with Allen on WhatsApp <span>↗</span></a> : <button type="button" data-message={whatsappMessage} className="whatsapp-unconfigured" disabled title="Allen’s WhatsApp number must be configured">Chat with Allen on WhatsApp <span>↗</span></button>}</div>
    </form>
  </div>;
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
  const go = useCallback((next: number) => { const bounded = Math.max(0, Math.min(scenes.length - 1, next)); if (locked.current || bounded === currentRef.current) return; locked.current = true; currentRef.current = bounded; setCurrent(bounded); sessionStorage.setItem(STORAGE_KEY, String(bounded)); const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : TRANSITION_MS; window.setTimeout(() => { locked.current = false; wheelTotal.current = 0; const strandedFocus = document.activeElement instanceof HTMLElement && document.activeElement.closest('.scene-slot[aria-hidden="true"]'); if (strandedFocus) document.querySelector<HTMLElement>(`#scene-${bounded + 1} h1`)?.focus({ preventScroll: true }); }, delay); }, []);
  useEffect(() => {
    const onWheel = (event: WheelEvent) => { if (canScrollInside(event.target, event.deltaY)) return; event.preventDefault(); if (locked.current) return; wheelTotal.current += event.deltaY; if (wheelTimer.current) clearTimeout(wheelTimer.current); wheelTimer.current = setTimeout(() => { wheelTotal.current = 0; }, 140); if (Math.abs(wheelTotal.current) >= 34) go(currentRef.current + (wheelTotal.current > 0 ? 1 : -1)); };
    const onKey = (event: KeyboardEvent) => { if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes((event.target as HTMLElement)?.tagName)) return; if (event.key === 'ArrowDown') { event.preventDefault(); go(currentRef.current + 1); } if (event.key === 'ArrowUp') { event.preventDefault(); go(currentRef.current - 1); } };
    window.addEventListener('wheel', onWheel, { passive: false }); window.addEventListener('keydown', onKey); return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey); if (wheelTimer.current) clearTimeout(wheelTimer.current); };
  }, [canScrollInside, go]);
  function onTouchStart(event: React.TouchEvent) { touchStart.current = { y: event.touches[0].clientY, target: event.target }; }
  function onTouchEnd(event: React.TouchEvent) { if (!touchStart.current) return; const distance = touchStart.current.y - event.changedTouches[0].clientY; if (Math.abs(distance) > 48 && !canScrollInside(touchStart.current.target, distance)) go(currentRef.current + (distance > 0 ? 1 : -1)); touchStart.current = null; }
  return <main className="experience" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Scene {current + 1} of {scenes.length}: {scenes[current].title}</p><header className="topbar"><a className="brand" href="#scene-1" onClick={(e) => { e.preventDefault(); go(0); }} aria-label="Allen Samuel home"><span>AS</span><div><b>Allen Samuel</b><small>FHG Explainer</small></div></a><button className="skip" onClick={() => go(10)}>Skip to Application <span>↘</span></button></header><div className="scene-stage" style={{ transform: `translate3d(0, -${current * 100}%, 0)` }}>{scenes.map((scene, index) => <div id={`scene-${index + 1}`} className="scene-slot" key={scene.title} aria-hidden={index !== current} inert={index !== current}><SceneFrame index={index} eyebrow={scene.eyebrow} title={scene.title}><SceneBody type={scene.type} onNavigate={go} /></SceneFrame></div>)}</div><Progress current={current} onSelect={go} /><Navigation current={current} go={go} /><p className="scroll-hint" aria-hidden="true"><span /> Scroll to explore</p><div className="ambient ambient-one" /><div className="ambient ambient-two" /></main>;
}
