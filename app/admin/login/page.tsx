import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Admin sign in — Richard Bernard',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#090a09] px-5 py-16 text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111411] p-7 sm:p-9">
        <Link href="/" className="text-sm text-white/50 transition hover:text-lime">← Back to portfolio</Link>
        <p className="eyebrow mt-10 text-lime">Private workspace</p>
        <h1 className="display mt-3 text-4xl font-extrabold">Admin sign in.</h1>
        <p className="mt-3 text-sm leading-7 text-white/55">
          Sign in with the administrator account created in your Supabase project.
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
