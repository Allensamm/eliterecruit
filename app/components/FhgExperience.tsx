'use client';
import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const TRANSITION_MS = 600;
const STORAGE_KEY = 'fhg-current-scene';
const scenes = [
  { title: 'Your future should not depend on one option', eyebrow: '', type: 'hero' },
  { title: 'Having ambition is good. Having a system is better.', eyebrow: 'The Reality', type: 'statement' },
  { title: 'Why do some people choose network marketing?', eyebrow: 'A Practical Business Model', type: 'network-model' },
  { title: 'Understanding how people earn and build', eyebrow: 'The Wealth Quadrant', type: 'wealth-quadrant' },
  { title: 'Why combine digital skills with network marketing?', eyebrow: 'The FHG Starting Approach', type: 'skills-bridge' },
  { title: 'So, what exactly is FHG?', eyebrow: 'What Is FHG?', type: 'definition' },
  { title: 'One community. Two development paths.', eyebrow: 'The Two-Part System', type: 'split' },
  { title: 'What happens when someone decides to learn more?', eyebrow: 'How the Journey Works', type: 'steps' },
  { title: 'More than joining. It is about becoming capable.', eyebrow: 'What Members May Develop', type: 'cards' },
  { title: 'Is this the right direction for you?', eyebrow: 'Who This May Suit', type: 'profile' },
  { title: 'What we will never promise you', eyebrow: 'Transparency', type: 'transparency' },
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

const networkParts = [
  ['Products', 'Understand and recommend genuine products that provide value to customers.'],
  ['Customers', 'Build trust, serve people properly and encourage repeat business.'],
  ['Team', 'Train interested adults who choose to build their own independent businesses.'],
  ['Duplication', 'Teach a clear system that responsible team members can understand and repeat.'],
] as const;

function NetworkModelScene() {
  const [active, setActive] = useState(0);
  return <div className="network-model-layout">
    <div className="chapter-opening"><p>As the cost of food, transportation, accommodation, education and everyday responsibilities continues to place pressure on many Nigerians, depending on only one source of income can feel limiting.</p><p>People are therefore exploring practical skills, businesses and additional income opportunities. Network marketing is <strong>one</strong> of the business models they may consider.</p></div>
    <div className="network-model-main"><div className="network-visual"><figure>
      {/* Local optimised documentary-style asset. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/fhg-scene-1.jpg" width="1400" height="933" loading="lazy" decoding="async" alt="A Nigerian adult learning and working with a laptop in a realistic environment" />
    </figure><div className="network-flow" role="tablist" aria-label="Products, customers, team and duplication">{networkParts.map(([label], index) => <button key={label} role="tab" aria-selected={active === index} aria-controls="network-part-detail" className={active === index ? 'active' : ''} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, '0')}</span>{label}</button>)}</div></div><div className="network-explanation"><p className="mini-heading">A business built through products, people and duplication</p><p>Network marketing is a business model in which independent distributors introduce genuine products to customers and may also build teams of other distributors.</p><p>Instead of spending heavily on a physical shop, large advertising campaigns or numerous employees, the business often grows through customer relationships, product recommendations, training and the duplication of a working system.</p><div id="network-part-detail" className="active-detail" role="tabpanel" aria-live="polite"><span>{networkParts[active][0]}</span><p>{networkParts[active][1]}</p></div></div></div>
    <aside className="chapter-warning"><strong>Important clarification</strong><p>Network marketing is not automatic wealth. A legitimate business must involve real products, informed customers, responsible sales and transparent compensation. Results are not guaranteed.</p></aside>
    <section className="accessibility-explainer"><div><p className="mini-heading">Why can the model be accessible?</p><p>Compared with some traditional businesses, network marketing may require less infrastructure. A distributor may not need to rent a shop, manufacture products, employ a large team or create an entire distribution system from the beginning.</p></div><div><p>FHG onboarding and its learning pathway are free. Members can first learn practical skills, look for genuine client work and develop their ability before deciding whether to build a network-marketing business.</p><strong>The value is not that it requires no work. The value is that an individual can learn within an existing training system instead of trying to build every capability alone.</strong></div></section>
  </div>;
}

const quadrants = [
  { key: 'E', title: 'Employee', body: 'An employee exchanges time, knowledge and responsibilities for wages or salary from an organisation.', idea: 'You work within someone else’s system.' },
  { key: 'B', title: 'Business Owner', body: 'A business owner builds a system through which products, services, people and processes can continue operating beyond the owner’s individual labour.', idea: 'You build and improve a system that other people can follow.' },
  { key: 'S', title: 'Self-Employed', body: 'A self-employed person earns directly from personal skills, services or professional work.', examples: 'Freelancer, designer, developer, consultant, photographer or independent service provider.', idea: 'You own the work, but income may still depend heavily on your personal time and effort.' },
  { key: 'I', title: 'Investor', body: 'An investor commits capital to assets or businesses with the aim of earning a return while accepting the possibility of loss.', idea: 'Money is placed into assets or opportunities that may produce returns.' },
] as const;

function WealthQuadrantScene() {
  const [active, setActive] = useState(0); const selected = quadrants[active];
  return <div className="quadrant-layout">
    <p className="chapter-lead">One useful way to understand income is to divide economic activity into four broad positions: Employee, Self-Employed, Business Owner and Investor.</p>
    <div className="quadrant-main"><div className="quadrant-board" role="tablist" aria-label="Four broad income positions">{quadrants.map((item, index) => <button key={item.key} role="tab" aria-selected={active === index} aria-controls="quadrant-detail" className={active === index ? 'active' : ''} onClick={() => setActive(index)}><span>{item.key}</span><strong>{item.title}</strong></button>)}<i className="quadrant-axis-x" aria-hidden="true" /><i className="quadrant-axis-y" aria-hidden="true" /></div><article id="quadrant-detail" className="quadrant-detail" role="tabpanel" aria-live="polite"><span>{selected.key}: {selected.title}</span><p>{selected.body}</p>{'examples' in selected && <small>{selected.examples}</small>}<strong>{selected.idea}</strong></article></div>
    <p className="quadrant-clarification">These categories are educational descriptions, not guarantees. A person may operate in more than one quadrant, and every path involves different skills, risks, responsibilities and financial circumstances.</p>
    <section className="quadrant-fit"><p className="mini-heading">Where do freelancing and network marketing fit?</p><div><p><strong>Freelancing</strong> usually begins in the Self-Employed quadrant because a person earns by applying a skill directly for clients.</p><p>A well-developed network-marketing operation may have some characteristics of the Business Owner quadrant because it involves products, customers, training, leadership and a system that a team can learn.</p><p>Joining a network does not automatically make someone a successful business owner. The person must still develop customers, understand the products, learn the system and work consistently.</p></div></section>
    <div className="skill-system-path" aria-label="A possible progression from skill to service to system"><span>Skill</span><i>→</i><span>Service</span><i>→</i><span>System</span></div>
    <div className="quadrant-closing"><p>Skills can help you generate active income.</p><p>A responsible business system may help you build something less dependent on completing every task alone.</p><p>Investment can come later when someone has sufficient knowledge, appropriate capital and an understanding of risk.</p></div>
  </div>;
}

const bridgeStages = [
  ['Learn', 'Develop a practical and marketable digital skill.'], ['Practise', 'Build competence through projects, feedback and consistent improvement.'], ['Serve clients', 'Offer useful services to real customers at clearly agreed prices.'], ['Manage income', 'Separate personal needs, savings and affordable business expenses.'], ['Build', 'Use available resources responsibly to develop a genuine product and customer-based network-marketing business.'],
] as const;
const nigeriaReasons = [
  ['Lower infrastructure barrier', 'A person may begin learning and offering digital services without first renting a physical shop or employing a large workforce.'], ['Local and international clients', 'Competent freelancers may serve clients within and outside Nigeria, subject to platform access, competition and payment availability.'], ['Multiple capabilities', 'The person develops skills, customer service, communication, sales and leadership—not recruitment alone.'], ['Existing business system', 'Network marketing may provide established products, training and a compensation structure, reducing the need to create every component from the beginning.'], ['Long-term development', 'The combination encourages skills, customers, leadership and responsible business habits beyond immediate income.'],
] as const;

function SkillsBridgeScene({ onNavigate }: { onNavigate: (index: number) => void }) {
  const [active, setActive] = useState(0); const [reason, setReason] = useState(0); const [questionOpen, setQuestionOpen] = useState(false); const definitionIndex = scenes.findIndex(scene => scene.type === 'definition');
  return <div className="skills-bridge-layout">
    <div className="bridge-opening"><p>FHG is free to join. The starting approach is to learn a useful digital skill, practise it and seek genuine client work before deciding whether to build a network-marketing business.</p><div className="approach-strip" aria-label="The FHG starting approach">{['Learn a skill','Use the skill','Earn from real client work','Plan responsibly','Build responsibly'].map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</span>)}</div></div>
    <section className="bridge-explanation"><div><p className="mini-heading">A different starting approach</p><p>Instead of depending immediately on savings or money intended for essential needs, the FHG system introduces practical digital skills that may be offered to real clients.</p><p>These may include website design, graphic design, content creation, social media management, digital marketing and other approved skills.</p><p>When a member becomes competent and secures paying clients, the income <strong>may</strong> help meet personal needs, improve tools and gradually cover legitimate business expenses.</p></div><aside><strong>Freelancing income is not guaranteed.</strong><p>Success requires competence, a portfolio, prospecting, communication, delivery and consistent improvement. Never use rent, school fees, borrowed money or funds you cannot afford to lose.</p></aside></section>
    <section className="bridge-journey"><p className="mini-heading">Active income can support long-term business building</p><div className="bridge-stage-tabs" role="tablist" aria-label="Five stages from skill to business">{bridgeStages.map(([label], index) => <button key={label} role="tab" aria-selected={active === index} aria-controls="bridge-stage-detail" onClick={() => setActive(index)} className={active === index ? 'active' : ''}><span>{index + 1}</span>{label}</button>)}</div><div id="bridge-stage-detail" className="bridge-stage-detail" role="tabpanel" aria-live="polite"><strong>Stage {active + 1}: {bridgeStages[active][0]}</strong><p>{bridgeStages[active][1]}</p></div><p>The aim is to develop a genuine skill, seek real client work and use any income responsibly while learning how to build a customer-focused business. Freelancing income is not guaranteed.</p></section>
    <section className="nigeria-relevance"><p className="mini-heading">Why may this approach be relevant in Nigeria?</p><div className="reason-tabs" role="tablist" aria-label="Five reasons this approach may be relevant in Nigeria">{nigeriaReasons.map(([label], index) => <button key={label} role="tab" aria-selected={reason === index} aria-controls="reason-detail" onClick={() => setReason(index)} className={reason === index ? 'active' : ''}>{label}</button>)}</div><div id="reason-detail" className="reason-detail" role="tabpanel" aria-live="polite"><strong>{nigeriaReasons[reason][0]}</strong><p>{nigeriaReasons[reason][1]}</p></div></section>
    <aside className="chapter-warning"><strong>Balanced view</strong><p>FHG does not remove the challenges of freelancing or network marketing. Members may still face competition, limited client access, product costs, rejection, inconsistent sales and changing economic conditions. Neither freelancing nor network-marketing income is guaranteed. Results depend on skills, effort, customers, sales, consistency, team activity and other circumstances.</p></aside>
    <div className="bridge-close"><div><p className="mini-heading">The skill can help you start. The system can help you build.</p><p>FHG combines both paths because digital skills may help members create active income, while responsible network marketing provides an opportunity to develop a product-based business over time. The strength is learning, creating genuine value, managing money responsibly and building with a long-term mindset.</p><p><strong>For adults aged 18 and above.</strong> Understand the products, responsibilities and compensation plan before starting a network-marketing business.</p></div><div className="bridge-actions"><button onClick={() => onNavigate(definitionIndex)}>Now show me what FHG is <span>→</span></button><button className="secondary" onClick={() => setQuestionOpen(value => !value)} aria-expanded={questionOpen} aria-controls="chapter-question">I have a question</button></div></div>
    {questionOpen && <label id="chapter-question" className="chapter-question"><span>What would you like someone to clarify?</span><textarea rows={2} maxLength={600} autoFocus placeholder="Type your question here. You can submit it in the application scene." /></label>}
  </div>;
}

function SceneThree() {
  return <div className="definition-layout definition-layout-single">
    <div className="definition-copy">
      <p><strong>FHG</strong> stands for <strong>Faith Heroic Generation.</strong> It is a Nigerian business and personal-development community that combines digital-skills learning with product-based network marketing.</p>
      <p>Members are introduced to practical online skills, communication, leadership, product education and business-building principles.</p>
      <aside className="definition-clarification"><span>Important clarification</span><p>FHG is not an employer and does not pay salaries. It provides a learning and business-development system. Individual results depend on effort, skills, consistency, customer demand and other circumstances.</p></aside>
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
  ['Ask questions', 'Discuss the products, training, responsibilities and compensation structure.'],
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
    <p className="journey-close"><span>Full clarity</span>No step should be hidden. You should understand the complete process before starting a network-marketing business.</p>
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
  const transparencyIndex = scenes.findIndex(scene => scene.type === 'transparency');
  const faqIndex = scenes.findIndex(scene => scene.type === 'faq');
  return <div className="fit-wrap">
    <div className="fit-columns"><FitList title="This may suit you if:" items={maySuit} tone="yes" /><FitList title="This may not suit you if:" items={mayNotSuit} tone="no" /></div>
    <div className="fit-decision"><p>Which side describes your expectations more accurately?</p><div><button onClick={() => onNavigate(transparencyIndex)}>This may suit me <span>→</span></button><button onClick={() => onNavigate(faqIndex)}>I need more information <span>?</span></button></div></div>
  </div>;
}

const neverPromises = [
  'No guaranteed earnings', 'No overnight success', 'No automatic employment', 'No income without effort',
  'No hidden conditions', 'No pressure to decide immediately', 'No fake testimonials', 'No misleading product claims',
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
      <p>Before you begin, someone will explain the available products, training structure, responsibilities and compensation information. FHG onboarding and its learning pathway are free.</p>
    </div>
  </div>;
}

const faqs = [
  ['Is FHG a job?', 'No. FHG is not a salary-paying employer. It is presented as a skills, personal-development and network-marketing community.'],
  ['Will I start earning immediately?', 'There is no guaranteed earning date or amount. Results depend on what you learn, how you apply it, customer demand, sales activity, team performance and other circumstances.'],
  ['Do I have to recruit people?', 'Team building may be part of network marketing, but the business should also involve genuine products, customer service and responsible sales. Allen will explain the current structure before you decide.'],
  ['Will I receive digital-skills training?', 'FHG is described as combining digital skills with network marketing. The exact skills, schedule and training access should be confirmed with Allen.'],
  ['How much does it cost?', 'It does not cost anything to join FHG or begin its learning pathway.'],
  ['Can I participate while studying or working?', 'Many people explore it alongside school, employment or another business, but you should consider whether you have enough time to participate consistently.'],
  ['Is income guaranteed?', 'No. Income is not guaranteed.'],
  ['Can I speak directly with someone?', 'Yes. You can request a WhatsApp conversation with someone before making any decision.'],
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
  if (type === 'network-model') return <NetworkModelScene />;
  if (type === 'wealth-quadrant') return <WealthQuadrantScene />;
  if (type === 'skills-bridge') return <SkillsBridgeScene onNavigate={onNavigate} />;
  if (type === 'definition') return <SceneThree />;
  if (type === 'split') return <SceneFour />;
  if (type === 'steps') return <SceneFive />;
  if (type === 'cards') return <SceneSix />;
  if (type === 'profile') return <SceneSeven onNavigate={onNavigate} />;
  if (type === 'transparency') return <SceneEight />;
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

  if (success) return <div className="form-success" role="status"><span>✓</span><h2>Thank you, {success.name}.</h2><p>Your request has been received. Allen will contact you through your selected method: <strong>{success.method}</strong>.</p><p>FHG onboarding is free. Before starting a network-marketing business, make sure you understand the products, responsibilities and compensation structure.</p></div>;
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
  return <aside className="progress" aria-label="Scene progress"><div className="progress-count"><strong>{String(current + 1).padStart(2, '0')}</strong><span>/</span><span>{String(scenes.length).padStart(2, '0')}</span></div><div className="progress-track">{scenes.map((scene, index) => <button key={scene.title} onClick={() => onSelect(index)} className={index === current ? 'active' : ''} aria-label={`Go to ${scene.title}`} aria-current={index === current ? 'step' : undefined}><span /></button>)}</div></aside>;
}
function Navigation({ current, go }: { current: number; go: (index: number) => void }) {
  return <nav className="nav-controls" aria-label="Scene navigation"><button onClick={() => go(current - 1)} disabled={current === 0} aria-label="Previous scene"><span>↑</span><b>Back</b></button><button onClick={() => go(current + 1)} disabled={current === scenes.length - 1} aria-label="Next scene"><b>Next</b><span>↓</span></button></nav>;
}

function EntryGate({ onExplain }: { onExplain: () => void }) {
  const [mode, setMode] = useState<'choice' | 'register'>('choice');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAt = useRef(0);
  const submitted = useRef(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_ALLEN_WHATSAPP_NUMBER?.replace(/\D/g, '') || '';
  useEffect(() => { startedAt.current = Date.now(); }, []);

  function beginExplainer() {
    onExplain();
  }

  function continueToWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current) return;
    const data = new FormData(event.currentTarget);
    if (String(data.get('website') || '').trim()) return;
    const nextErrors: Record<string, string> = {};
    const firstName = String(data.get('firstName') || '').trim();
    const whatsapp = String(data.get('whatsapp') || '').trim();
    const status = String(data.get('status') || '').trim();
    const question = String(data.get('question') || '').trim().slice(0, 400);
    if (!firstName) nextErrors.firstName = 'Please enter your first name.';
    if (!/^\+?[0-9]{10,15}$/.test(whatsapp.replace(/[\s()-]/g, ''))) nextErrors.whatsapp = 'Enter a valid WhatsApp number, including the country code.';
    if (!status) nextErrors.status = 'Please select your current status.';
    if (!data.get('ageConfirmed')) nextErrors.ageConfirmed = 'You must confirm that you are at least 18.';
    if (!data.get('consent')) nextErrors.consent = 'Please agree before continuing to WhatsApp.';
    if (Date.now() - startedAt.current < 1500) nextErrors.form = 'Please take a moment to review your details.';
    if (!whatsappNumber) nextErrors.form = 'Allen’s WhatsApp number has not been configured yet.';
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    setErrors({}); submitted.current = true;
    const message = [`Hello Allen, my name is ${firstName}.`, 'I came from the FHG explainer advert and I already understand network marketing.', 'I would like to join the free FHG learning pathway and discuss how to begin.', `My current status is ${status}.`, `My WhatsApp number is ${whatsapp}.`, question ? `My question is: ${question}` : '', 'I understand that this is not a job offer or guaranteed-income programme. Please explain the products, responsibilities and compensation plan for the network-marketing business before I decide.'].filter(Boolean).join('\n\n');
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  return <main className="entry-gate">
    <header className="entry-brand"><span>AS</span><div><b>Allen Samuel</b><small>FHG Explainer</small></div></header>
    <div className="entry-orbit entry-orbit-one" aria-hidden="true" /><div className="entry-orbit entry-orbit-two" aria-hidden="true" />
    {mode === 'choice' ? <section className="entry-choice" aria-labelledby="entry-title">
      <p className="eyebrow"><span />Before we continue</p>
      <h1 id="entry-title">What would you like to do next?</h1>
      <p className="entry-lead">Choose the path that best matches what you understood from the advert. You can review the full explanation before making any decision.</p>
      <div className="entry-options">
        <button className="entry-option entry-ready" onClick={() => { startedAt.current = Date.now(); setMode('register'); }}><span>01</span><div><strong>I understand network marketing</strong><p>I have seen the advert, understand the basic model and would like to discuss registration with Allen.</p></div><i>→</i></button>
        <button className="entry-option entry-learn" onClick={beginExplainer}><span>02</span><div><strong>I need more explanation</strong><p>Take me through the complete FHG explainer, including the skills, business model and responsibilities.</p></div><i>↓</i></button>
      </div>
      <p className="entry-disclaimer">For adults aged 18 and above. FHG is not an employer or guaranteed-income programme. Choosing the registration path does not require payment or complete registration.</p>
    </section> : <section className="entry-registration" aria-labelledby="register-title">
      <button className="entry-back" type="button" onClick={() => { setErrors({}); setMode('choice'); }}>← Back to choices</button>
      <div className="entry-form-intro"><p className="eyebrow"><span />Registration interest</p><h1 id="register-title">Connect with Allen on WhatsApp</h1><p>Share a few details and we will prepare a WhatsApp message for Allen. You will review it and tap <strong>Send</strong> inside WhatsApp. FHG onboarding is free.</p><aside><strong>Before deciding</strong><p>Ask someone to explain the products, responsibilities and compensation plan for the network-marketing business.</p></aside></div>
      <form className="entry-form" onSubmit={continueToWhatsApp} noValidate>
        <label><span>First name *</span><input name="firstName" autoComplete="given-name" aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? 'entry-firstName-error' : undefined} />{errors.firstName && <small id="entry-firstName-error">{errors.firstName}</small>}</label>
        <label><span>Your WhatsApp number *</span><input name="whatsapp" type="tel" autoComplete="tel" placeholder="+234…" aria-invalid={!!errors.whatsapp} aria-describedby={errors.whatsapp ? 'entry-whatsapp-error' : undefined} />{errors.whatsapp && <small id="entry-whatsapp-error">{errors.whatsapp}</small>}</label>
        <label className="entry-wide"><span>Current status *</span><select name="status" defaultValue="" aria-invalid={!!errors.status} aria-describedby={errors.status ? 'entry-status-error' : undefined}><option value="" disabled>Select one</option>{['Student','NYSC member','Graduate','Employee','Freelancer','Business owner','Other'].map(item => <option key={item}>{item}</option>)}</select>{errors.status && <small id="entry-status-error">{errors.status}</small>}</label>
        <label className="entry-wide"><span>Optional question</span><textarea name="question" rows={3} maxLength={400} placeholder="What would you like Allen to clarify before you decide?" /></label>
        <label className="entry-check entry-wide"><input type="checkbox" name="ageConfirmed" value="yes" /><span>I confirm that I am 18 years old or older.</span>{errors.ageConfirmed && <small>{errors.ageConfirmed}</small>}</label>
        <label className="entry-check entry-wide"><input type="checkbox" name="consent" value="yes" /><span>I agree to contact Allen about this enquiry. I understand this is not a job offer or guaranteed-income programme.</span>{errors.consent && <small>{errors.consent}</small>}</label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" hidden />
        {errors.form && <p className="entry-form-error entry-wide" role="alert">{errors.form}</p>}
        <button className="entry-submit entry-wide" type="submit">Continue to WhatsApp <span>↗</span></button>
        <button className="entry-explain-link entry-wide" type="button" onClick={beginExplainer}>I would rather review the full explanation</button>
        <p className="entry-privacy entry-wide">Your details are placed only in the WhatsApp message you review. You will not be added to a group automatically. Do not include bank details, identity numbers or card information.</p>
      </form>
    </section>}
  </main>;
}

export default function FhgExperience() {
  const [entry, setEntry] = useState<'gate' | 'explainer'>('gate');
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
  if (entry === 'gate') return <EntryGate onExplain={() => setEntry('explainer')} />;
  return <main className="experience" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Scene {current + 1} of {scenes.length}: {scenes[current].title}</p><header className="topbar"><a className="brand" href="#scene-1" onClick={(e) => { e.preventDefault(); go(0); }} aria-label="Allen Samuel home"><span>AS</span><div><b>Allen Samuel</b><small>FHG Explainer</small></div></a><button className="skip" onClick={() => go(scenes.length - 1)}>Skip to Application <span>↘</span></button></header><div className="scene-stage" style={{ transform: `translate3d(0, -${current * 100}%, 0)` }}>{scenes.map((scene, index) => <div id={`scene-${index + 1}`} className="scene-slot" key={scene.title} aria-hidden={index !== current} inert={index !== current}><SceneFrame index={index} eyebrow={scene.eyebrow} title={scene.title}><SceneBody type={scene.type} onNavigate={go} /></SceneFrame></div>)}</div><Progress current={current} onSelect={go} /><Navigation current={current} go={go} /><p className="scroll-hint" aria-hidden="true"><span /> Scroll to explore</p><div className="ambient ambient-one" /><div className="ambient ambient-two" /></main>;
}
