'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import type { ContactMessageRow, ProjectRow, ProjectStatus } from '@/lib/supabase/database.types';

type Draft = {
  name: string; slug: string; type: string; desc: string; tags: string;
  visual: string; featured: boolean; live_url: string; prototype_url: string;
  behance_url: string; category: string; role: string; year: string;
  overview: string; challenge: string; approach: string; solution: string;
  highlights: string; key_decision: string; outcome: string;
  technologies: string; cover_image: string; status: ProjectStatus; sort_order: number;
};

const emptyDraft: Draft = {
  name: '', slug: '', type: 'Product concept', desc: '', tags: 'Product Design',
  visual: 'pocket', featured: false, live_url: '', prototype_url: '', behance_url: '',
  category: 'Product Design', role: 'Product Designer', year: String(new Date().getFullYear()),
  overview: '', challenge: '', approach: '', solution: '', highlights: '',
  key_decision: '', outcome: '', technologies: 'Figma, Product Design',
  cover_image: '', status: 'draft', sort_order: 0,
};

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const splitList = (value: string) => value.split(',').map((part) => part.trim()).filter(Boolean);

function toDraft(project: ProjectRow): Draft {
  return {
    name: project.name, slug: project.slug, type: project.type, desc: project.desc,
    tags: (project.tags ?? []).join(', '), visual: project.visual, featured: project.featured,
    live_url: project.live_url ?? '', prototype_url: project.prototype_url ?? '',
    behance_url: project.behance_url ?? '', category: project.category, role: project.role,
    year: project.year, overview: project.overview, challenge: project.challenge,
    approach: project.approach, solution: project.solution,
    highlights: (project.highlights ?? []).join('\n'), key_decision: project.key_decision,
    outcome: project.outcome, technologies: (project.technologies ?? []).join(', '),
    cover_image: project.cover_image ?? '', status: project.status, sort_order: project.sort_order,
  };
}

export default function AdminDashboard({
  initialProjects, initialMessages, adminEmail,
}: {
  initialProjects: ProjectRow[];
  initialMessages: ContactMessageRow[];
  adminEmail: string;
}) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tab, setTab] = useState<'projects' | 'messages'>('projects');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const newCount = useMemo(() => messages.filter((message) => message.status === 'new').length, [messages]);

  function setField<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function editProject(project: ProjectRow) {
    setEditingId(project.id);
    setDraft(toDraft(project));
    setNotice('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function newProject() {
    setEditingId(null);
    setDraft(emptyDraft);
    setNotice('');
    setError('');
  }

  async function saveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setNotice(''); setError('');
    try {
      const supabase = createSupabaseBrowserClient();
      const payload = {
        name: draft.name.trim(),
        slug: draft.slug.trim() || slugify(draft.name),
        type: draft.type.trim(),
        desc: draft.desc.trim(),
        tags: splitList(draft.tags),
        visual: draft.visual.trim() || 'pocket',
        featured: draft.featured,
        live_url: draft.live_url.trim() || null,
        prototype_url: draft.prototype_url.trim() || null,
        behance_url: draft.behance_url.trim() || null,
        category: draft.category.trim(),
        role: draft.role.trim(),
        year: draft.year.trim(),
        overview: draft.overview.trim(),
        challenge: draft.challenge.trim(),
        approach: draft.approach.trim(),
        solution: draft.solution.trim(),
        highlights: draft.highlights.split('\n').map((item) => item.trim()).filter(Boolean),
        key_decision: draft.key_decision.trim(),
        outcome: draft.outcome.trim(),
        technologies: splitList(draft.technologies),
        cover_image: draft.cover_image.trim() || null,
        status: draft.status,
        sort_order: Number(draft.sort_order) || 0,
      };

      if (!payload.name || !payload.desc || !payload.category) {
        throw new Error('Project name, description and category are required.');
      }

      const result = editingId
        ? await supabase.from('projects').update(payload).eq('id', editingId).select('*').single()
        : await supabase.from('projects').insert(payload).select('*').single();

      if (result.error) throw result.error;
      const saved = result.data;

      setProjects((current) => editingId
        ? current.map((item) => item.id === editingId ? saved : item)
        : [...current, saved].sort((a, b) => a.sort_order - b.sort_order)
      );
      setEditingId(saved.id);
      setDraft(toDraft(saved));
      setNotice(saved.status === 'published' ? 'Project saved and published.' : 'Draft saved.');
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save project.');
    } finally {
      setBusy(false);
    }
  }

  async function uploadCover(file?: File) {
    if (!file) return;
    setBusy(true); setError(''); setNotice('');
    try {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Use a JPG, PNG or WebP image.');
      if (file.size > 8 * 1024 * 1024) throw new Error('Image must be 8 MB or smaller.');
      const supabase = createSupabaseBrowserClient();
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-');
      const path = `${slugify(draft.name || 'project')}/${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from('project-media')
        .upload(path, file, { upsert: true, contentType: file.type });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('project-media').getPublicUrl(path);
      setField('cover_image', data.publicUrl);
      setNotice('Cover image uploaded. Save the project to store its URL.');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Image upload failed.');
    } finally {
      setBusy(false);
    }
  }

  async function deleteProject(project: ProjectRow) {
    if (!window.confirm(`Delete ${project.name}? This cannot be undone.`)) return;
    setBusy(true); setError(''); setNotice('');
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: deleteError } = await supabase.from('projects').delete().eq('id', project.id);
      if (deleteError) throw deleteError;
      setProjects((current) => current.filter((item) => item.id !== project.id));
      if (editingId === project.id) newProject();
      setNotice('Project deleted.');
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete project.');
    } finally {
      setBusy(false);
    }
  }

  async function setMessageStatus(message: ContactMessageRow, status: ContactMessageRow['status']) {
    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.from('contact_messages').update({ status }).eq('id', message.id);
    if (updateError) { setError(updateError.message); return; }
    setMessages((current) => current.map((item) => item.id === message.id ? { ...item, status } : item));
  }

  async function signOut() {
    await createSupabaseBrowserClient().auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  }

  const inputClass = 'w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-lime/50';
  const labelClass = 'grid gap-1.5 text-xs text-white/60';

  return (
    <main className="min-h-screen bg-[#090a09] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="eyebrow text-lime">Portfolio CMS</p>
            <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
            <p className="mt-1 text-xs text-white/45">Signed in as {adminEmail}</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-white/60 hover:text-lime">View site ↗</a>
            <button onClick={signOut} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 hover:border-lime/50 hover:text-lime">Sign out</button>
          </div>
        </header>

        <div className="mt-7 flex flex-wrap gap-3">
          <button onClick={() => setTab('projects')} className={`rounded-full px-5 py-2.5 text-sm ${tab === 'projects' ? 'bg-lime font-semibold text-ink' : 'border border-white/15 text-white/65'}`}>Projects · {projects.length}</button>
          <button onClick={() => setTab('messages')} className={`rounded-full px-5 py-2.5 text-sm ${tab === 'messages' ? 'bg-lime font-semibold text-ink' : 'border border-white/15 text-white/65'}`}>Inbox · {messages.length} {newCount ? `(${newCount} new)` : ''}</button>
        </div>

        {notice && <p role="status" className="mt-5 rounded-xl border border-lime/20 bg-lime/5 p-3 text-sm text-lime">{notice}</p>}
        {error && <p role="alert" className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-300">{error}</p>}

        {tab === 'projects' ? (
          <div className="mt-7 grid items-start gap-7 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,.9fr)]">
            <section className="rounded-2xl border border-white/10 bg-[#111411] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow text-lime">{editingId ? 'Edit project' : 'New project'}</p>
                  <h2 className="mt-2 text-xl font-semibold">Project details</h2>
                </div>
                <button type="button" onClick={newProject} className="text-sm text-white/55 hover:text-lime">Clear form</button>
              </div>

              <form onSubmit={saveProject} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>Project name<input required value={draft.name} onChange={(e) => setField('name', e.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>Slug<input value={draft.slug} onChange={(e) => setField('slug', e.target.value)} placeholder="generated-from-name" className={inputClass} /></label>
                </div>
                <label className={labelClass}>Card description<textarea required rows={2} value={draft.desc} onChange={(e) => setField('desc', e.target.value)} className={inputClass} /></label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>Project type<input value={draft.type} onChange={(e) => setField('type', e.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>Category<input value={draft.category} onChange={(e) => setField('category', e.target.value)} className={inputClass} /></label>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className={labelClass}>Role<input value={draft.role} onChange={(e) => setField('role', e.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>Year<input value={draft.year} onChange={(e) => setField('year', e.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>Visual key<select value={draft.visual} onChange={(e) => setField('visual', e.target.value)} className={inputClass}>{['rent','pocket','border','ajo','power','seller','club'].map((item) => <option key={item}>{item}</option>)}</select></label>
                </div>
                <label className={labelClass}>Tags (comma separated)<input value={draft.tags} onChange={(e) => setField('tags', e.target.value)} className={inputClass} /></label>
                <label className={labelClass}>Technologies (comma separated)<input value={draft.technologies} onChange={(e) => setField('technologies', e.target.value)} className={inputClass} /></label>
                <label className={labelClass}>Cover image URL<input value={draft.cover_image} onChange={(e) => setField('cover_image', e.target.value)} className={inputClass} /></label>
                <label className={labelClass}>Upload cover (JPG, PNG, WebP · max 8 MB)<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(e) => uploadCover(e.target.files?.[0])} className="text-sm text-white/60 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:text-white" /></label>
                {draft.cover_image && <img src={draft.cover_image} alt="Project cover preview" className="max-h-48 w-full rounded-xl border border-white/10 object-contain object-left" />}
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className={labelClass}>Live URL<input value={draft.live_url} onChange={(e) => setField('live_url', e.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>Prototype URL<input value={draft.prototype_url} onChange={(e) => setField('prototype_url', e.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>Behance URL<input value={draft.behance_url} onChange={(e) => setField('behance_url', e.target.value)} className={inputClass} /></label>
                </div>
                {([
                  ['overview','Overview'], ['challenge','Problem / challenge'], ['approach','Approach'],
                  ['solution','Solution'], ['highlights','Highlights (one per line)'],
                  ['key_decision','Key decision'], ['outcome','Result / outcome'],
                ] as const).map(([key, title]) => (
                  <label key={key} className={labelClass}>{title}<textarea rows={key === 'highlights' ? 4 : 3} value={draft[key]} onChange={(e) => setField(key, e.target.value)} className={inputClass} /></label>
                ))}
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className={labelClass}>Visibility<select value={draft.status} onChange={(e) => setField('status', e.target.value as ProjectStatus)} className={inputClass}><option value="draft">Draft (hidden)</option><option value="published">Published</option></select></label>
                  <label className={labelClass}>Sort order<input type="number" value={draft.sort_order} onChange={(e) => setField('sort_order', Number(e.target.value))} className={inputClass} /></label>
                  <label className="flex items-center gap-2 pt-5 text-sm text-white/65"><input type="checkbox" checked={draft.featured} onChange={(e) => setField('featured', e.target.checked)} className="accent-lime" />Featured</label>
                </div>
                <button type="submit" disabled={busy} className="mt-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink disabled:opacity-60">{busy ? 'Saving...' : editingId ? 'Update project' : 'Create project'}</button>
              </form>
            </section>

            <section className="grid gap-3">
              <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Your projects</h2><span className="text-xs text-white/40">{projects.length} total</span></div>
              {projects.map((project) => (
                <article key={project.id} className="rounded-2xl border border-white/10 bg-[#111411] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0"><h3 className="font-semibold">{project.name}</h3><p className="mt-1 text-xs text-white/45">{project.type} · order {project.sort_order}</p></div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] ${project.status === 'published' ? 'bg-lime/10 text-lime' : 'bg-white/10 text-white/55'}`}>{project.status}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => editProject(project)} className="rounded-full border border-white/15 px-3 py-2 text-xs text-white/70 hover:border-lime/50 hover:text-lime">Edit</button>
                    <button onClick={() => deleteProject(project)} disabled={busy} className="rounded-full border border-red-400/20 px-3 py-2 text-xs text-red-300 hover:border-red-400/50">Delete</button>
                  </div>
                </article>
              ))}
            </section>
          </div>
        ) : (
          <section className="mt-7">
            <div className="mb-5"><p className="eyebrow text-lime">Contact inbox</p><h2 className="mt-2 text-2xl font-semibold">Portfolio messages</h2></div>
            {messages.length === 0 ? <p className="rounded-2xl border border-white/10 bg-[#111411] p-6 text-sm text-white/50">No messages yet.</p> : (
              <div className="grid gap-3">
                {messages.map((message) => (
                  <article key={message.id} className="rounded-2xl border border-white/10 bg-[#111411] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div><h3 className="font-semibold">{message.subject || 'Website enquiry'}</h3><p className="mt-1 text-sm text-white/65">{message.name} · <a className="text-lime hover:underline" href={`mailto:${message.email}`}>{message.email}</a></p><p className="mt-1 text-xs text-white/35">{new Date(message.created_at).toLocaleString()}</p></div>
                      <select aria-label={`Message status for ${message.name}`} value={message.status} onChange={(e) => setMessageStatus(message, e.target.value as ContactMessageRow['status'])} className={inputClass + ' w-auto'}>
                        {['new','read','replied','archived'].map((status) => <option key={status} value={status}>{status}</option>)}
                      </select>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-white/65">{message.message}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <footer className="mt-16 border-t border-white/10 pt-5 text-xs text-white/35">
          Private CMS · Draft projects are hidden from public visitors.
        </footer>
      </div>
    </main>
  );
}
