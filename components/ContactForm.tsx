'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, Send } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Your message could not be sent.');
      }

      form.reset();
      setStatus('success');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Something went wrong. Please try again.'
      );
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-9 grid w-full max-w-3xl gap-4 rounded-2xl border border-white/10 bg-white/[.025] p-5 sm:p-7"
    >
      <div>
        <p className="eyebrow text-lime">Send a message</p>
        <h3 className="mt-2 text-xl font-semibold">Tell me what you have in mind.</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/65">
          Your name
          <input name="name" required minLength={2} maxLength={100} autoComplete="name"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-lime/60"
            placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm text-white/65">
          Email address
          <input name="email" type="email" required maxLength={254} autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-lime/60"
            placeholder="you@example.com" />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-white/65">
        Subject <span className="text-white/35">(optional)</span>
        <input name="subject" maxLength={150}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-lime/60"
          placeholder="Project enquiry, role, collaboration..." />
      </label>

      <label className="grid gap-2 text-sm text-white/65">
        Message
        <textarea name="message" required minLength={10} maxLength={5000} rows={5}
          className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-lime/60"
          placeholder="A little about what you need..." />
      </label>

      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60">
          {status === 'sending' ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={15} />}
          {status === 'sending' ? 'Sending...' : 'Send message'}
          <ArrowUpRight size={15} />
        </button>
        {status === 'success' && (
          <span role="status" className="inline-flex items-center gap-2 text-sm text-lime">
            <CheckCircle2 size={16} /> Message sent. Thanks for reaching out.
          </span>
        )}
        {status === 'error' && <span role="alert" className="text-sm text-red-300">{error}</span>}
      </div>
    </form>
  );
}
