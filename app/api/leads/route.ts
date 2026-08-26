const requiredFields = ['firstName', 'whatsapp', 'status', 'interest', 'contactMethod', 'bestTime', 'ageConfirmed', 'consent'] as const;
const recentSubmissions = new Map<string, number>();
const recentRequests = new Map<string, number[]>();

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return Response.json({ error: 'Unsupported submission format.' }, { status: 415 });
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 20_000) return Response.json({ error: 'Submission is too large.' }, { status: 413 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: 'Invalid submission.' }, { status: 400 }); }

  if (String(body.website || '').trim()) return Response.json({ ok: true });
  const startedAt = Number(body.formStartedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2_000 || Date.now() - startedAt > 7_200_000) return Response.json({ error: 'Please take a moment to review the form and try again.' }, { status: 400 });
  const missing = requiredFields.filter(field => !String(body[field] || '').trim());
  if (missing.length || body.ageConfirmed !== 'yes' || body.consent !== 'yes') return Response.json({ error: 'Please complete all required fields and confirmations.' }, { status: 400 });
  if (!/^\+?[0-9]{10,15}$/.test(String(body.whatsapp).replace(/[\s()-]/g, ''))) return Response.json({ error: 'Please enter a valid WhatsApp number.' }, { status: 400 });
  if (body.contactMethod === 'Email' && !String(body.email || '').includes('@')) return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });

  const submissionId = String(body.submissionId || '');
  if (!submissionId) return Response.json({ error: 'Submission identifier is missing.' }, { status: 400 });
  if (recentSubmissions.has(submissionId)) return Response.json({ ok: true, duplicate: true });
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const now = Date.now();
  const active = (recentRequests.get(ip) || []).filter(time => now - time < 900_000);
  if (active.length >= 5) return Response.json({ error: 'Too many requests. Please wait before trying again.' }, { status: 429 });
  recentRequests.set(ip, [...active, now]);

  const destination = process.env.LEAD_CAPTURE_ENDPOINT;
  if (!destination) {
    if (process.env.NODE_ENV !== 'production') { recentSubmissions.set(submissionId, now); return Response.json({ ok: true, testMode: true }); }
    return Response.json({ error: 'Online requests are not configured yet. Please use the WhatsApp option or try again later.' }, { status: 503 });
  }
  try {
    const response = await fetch(destination, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': submissionId, ...(process.env.LEAD_CAPTURE_API_KEY ? { Authorization: `Bearer ${process.env.LEAD_CAPTURE_API_KEY}` } : {}) },
      body: JSON.stringify({ firstName: body.firstName, whatsapp: body.whatsapp, status: body.status, interest: body.interest, contactMethod: body.contactMethod, bestTime: body.bestTime, email: body.email || '', question: String(body.question || '').slice(0, 600), consent: true, source: 'FHG explainer website' }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error('Destination rejected request');
    recentSubmissions.set(submissionId, now);
    return Response.json({ ok: true });
  } catch { return Response.json({ error: 'We could not send your request securely. Please try again or use WhatsApp.' }, { status: 502 }); }
}
