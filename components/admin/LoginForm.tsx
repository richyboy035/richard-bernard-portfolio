'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured yet. Add the project URL and publishable key to your environment variables.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) throw signInError;
      router.replace('/admin');
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <label className="grid gap-2 text-sm text-white/65">
        Email address
        <input type="email" required autoComplete="username" value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-lime/60"
          placeholder="admin@example.com" />
      </label>
      <label className="grid gap-2 text-sm text-white/65">
        Password
        <input type="password" required autoComplete="current-password" value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-lime/60"
          placeholder="Your password" />
      </label>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <button type="submit" disabled={loading}
        className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink disabled:opacity-60">
        {loading ? 'Signing in...' : 'Sign in to dashboard'}
      </button>
    </form>
  );
}
