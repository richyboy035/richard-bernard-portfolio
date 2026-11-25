import { createClient } from '@supabase/supabase-js';
import type { Project } from '@/data/projects';
import type { Database, ProjectRow } from '@/lib/supabase/database.types';

function toProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    name: row.name,
    type: row.type,
    desc: row.desc,
    tags: row.tags ?? [],
    visual: row.visual,
    featured: row.featured,
    liveUrl: row.live_url ?? undefined,
    prototypeUrl: row.prototype_url ?? undefined,
    behanceUrl: row.behance_url ?? undefined,
    category: row.category,
    role: row.role,
    year: row.year,
    overview: row.overview,
    challenge: row.challenge,
    approach: row.approach,
    solution: row.solution,
    highlights: row.highlights ?? [],
    keyDecision: row.key_decision,
    outcome: row.outcome,
    technologies: row.technologies ?? [],
    coverImage: row.cover_image ?? undefined,
  };
}

/**
 * Returns null when Supabase is not configured or temporarily unavailable.
 * Callers can then keep rendering the existing local project data.
 */
export async function getPublishedProjects(): Promise<Project[] | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) return null;

  try {
    const supabase = createClient<Database>(url, publishableKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Unable to load published projects from Supabase:', error.message);
      return null;
    }

    return (data ?? []).map(toProject);
  } catch (error) {
    console.error('Supabase project query failed:', error);
    return null;
  }
}
