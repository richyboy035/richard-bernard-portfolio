import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Admin dashboard — Richard Bernard',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    redirect('/admin/login?setup=required');
  }

  const supabase = await createSupabaseServerClient();
  const { data, error: claimsError } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (claimsError || typeof userId !== 'string') redirect('/admin/login');

  const { data: admin } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle();

  if (!admin) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#090a09] px-5 text-white">
        <section className="max-w-lg rounded-3xl border border-white/10 bg-[#111411] p-8">
          <p className="eyebrow text-lime">Access restricted</p>
          <h1 className="mt-3 text-3xl font-bold">This account is not an admin.</h1>
          <p className="mt-4 text-sm leading-7 text-white/55">
            Add this authenticated user's UUID to the Supabase public.admin_users table,
            then sign in again.
          </p>
          <a href="/admin/login" className="mt-6 inline-block text-sm text-lime">Return to sign in →</a>
        </section>
      </main>
    );
  }

  const [{ data: projects }, { data: messages }] = await Promise.all([
    supabase.from('projects').select('*').order('sort_order', { ascending: true }),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(100),
  ]);

  return (
    <AdminDashboard
      initialProjects={projects ?? []}
      initialMessages={messages ?? []}
      adminEmail={typeof data.claims.email === 'string' ? data.claims.email : 'Administrator'}
    />
  );
}
