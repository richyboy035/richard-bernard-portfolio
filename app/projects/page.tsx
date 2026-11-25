import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import { projects as fallbackProjects } from '@/data/projects';
import { getPublishedProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects — Richard Bernard',
  description: 'Selected product design and development projects by Richard Bernard.',
};

export default async function ProjectsPage() {
  const publishedProjects = await getPublishedProjects();
  return (
    <main id="home" className="min-h-screen pt-20">
      <NavBar />
      <header className="container border-b border-white/[.08] py-16 md:py-24">
        <p className="eyebrow text-lime">Portfolio / Projects</p>
        <h1 className="display mt-5 text-5xl font-extrabold tracking-tight md:text-7xl">
          Selected <span className="text-lime">projects.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
          A collection of independent product concepts, prototypes and documented professional experience.
          Concept work is identified as such; project details are presented
          only where supporting information is available.
        </p>
      </header>
      <Projects showAllLink={false} projects={publishedProjects ?? fallbackProjects} />
      <section className="container border-t border-white/[.08] py-20 md:py-28" aria-labelledby="real-world-work">
        <p className="eyebrow text-white/45">Professional and client work</p>
        <h2 id="real-world-work" className="display mt-4 text-4xl font-bold md:text-5xl">
          Real-world <span className="text-lime">contributions.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
          This section is separate from independent product concepts and reflects professional team experience.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/[.08] bg-panel p-6 md:p-8">
            <p className="text-xs uppercase tracking-[.18em] text-lime/70">Data Analyst · 2020-2024</p>
            <h3 className="mt-3 text-xl font-semibold">Brandworx · South Africa</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Worked with the Amazon Africa product team, supporting analysis, reporting and data quality to inform business decisions.
            </p>
          </article>
          <article className="rounded-2xl border border-white/[.08] bg-panel p-6 md:p-8">
            <p className="text-xs uppercase tracking-[.18em] text-lime/70">Product Designer</p>
            <h3 className="mt-3 text-xl font-semibold">Smartmedia Solutions Technologies</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Designed user-centered digital product experiences, created wireframes and prototypes, and collaborated with stakeholders on interface decisions.
            </p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
