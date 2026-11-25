import { createClient } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/lib/supabase/database.types';

export const runtime = 'nodejs';

const recentSubmissions = new Map<string, { count: number; startedAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS = 5;

function tooManyRequests(key: string) {
  const now = Date.now();
  const current = recentSubmissions.get(key);

  if (!current || now - current.startedAt > WINDOW_MS) {
    recentSubmissions.set(key, { count: 1, startedAt: now });
    return false;
  }

  current.count += 1;
  return current.count > MAX_SUBMISSIONS;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Please send a valid message.' }, { status: 400 });
  }

  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientKey = forwardedFor?.split(',')[0]?.trim() || 'unknown';

  if (tooManyRequests(clientKey)) {
    return NextResponse.json(
      { error: 'Too many messages from this connection. Please try again later.' },
      { status: 429 }
    );
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (
    name.length < 2 ||
    name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    subject.length > 150 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: 'Please check the name, email and message fields.' },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    return NextResponse.json(
      { error: 'The message service is not connected yet. Please email directly instead.' },
      { status: 503 }
    );
  }

  const supabase = createClient<Database>(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    subject: subject || null,
    message,
  });

  if (error) {
    console.error('Contact message could not be saved:', error.message);
    return NextResponse.json(
      { error: 'Your message could not be saved. Please try again or email directly.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
