
'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react';

import { projects } from '@/data/projects';

type ProjectItem = (typeof projects)[number];

const filters = ['All', 'Product Design', 'Development'];

function ProjectVisual({
  kind,
  fitContent = false,
}: {
  kind: string;
  fitContent?: boolean;
}) {
  const visuals: Record<
    string,
    {
      image?: string;
      width?: number;
      height?: number;
      title: string;
      subtitle: string;
      accent: string;
      palette: string;
    }
  > = {
    rent: {
      image: '/images/projects/rentdirect/screen-02.jpeg',
      width: 1080,
      height: 810,
      title: 'RentDirect',
      subtitle: 'PROPERTY · RENT MANAGEMENT',
      accent: '#c5ff36',
      palette: 'from-[#09251a] to-[#06110c]',
    },
    pocket: {
      image: '/images/projects/pocket-plan.png',
      width: 1440,
      height: 965,
      title: 'PocketPlan',
      subtitle: 'PERSONAL FINANCE',
      accent: '#9be7b2',
      palette: 'from-[#18382b] via-[#10231b] to-[#080c09]',
    },
    border: {
      image: '/images/projects/border-cash.png',
      width: 932,
      height: 655,
      title: 'Border Cash',
      subtitle: 'FINANCE · PAYMENTS',
      accent: '#65d9b2',
      palette: 'from-[#17304b] via-[#101d30] to-[#080b12]',
    },
    ajo: {
      image: '/images/projects/ajo-circles.png',
      width: 853,
      height: 544,
      title: 'Ajo Circle',
      subtitle: 'SAVE · TOGETHER',
      accent: '#f4bd76',
      palette: 'from-[#3b2419] via-[#21150f] to-[#0b0908]',
    },
    power: {
      image: '/images/projects/powerwatch.png',
      width: 933,
      height: 612,
      title: 'PowerWatch',
      subtitle: 'POWER · MONITORING',
      accent: '#c5ff36',
      palette: 'from-[#273b21] via-[#172319] to-[#080c09]',
    },
    seller: {
      title: 'SellerAfrica',
      subtitle: 'MARKETPLACE · E-COMMERCE',
      accent: '#c5ff36',
      palette: 'from-[#25241e] via-[#111] to-[#090a09]',
    },
    club: {
      title: 'Club Connect',
      subtitle: 'DATA · UTILITIES · BILLS',
      accent: '#c5a3ff',
      palette: 'from-[#2a1b3a] to-[#111]',
    },
  };

  const item = visuals[kind] ?? visuals.pocket;

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br ${
        item.palette
      } ${fitContent && item.image ? 'h-auto' : 'h-full'}`}
    >
      {!fitContent && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 20%, rgba(255,255,255,.16), transparent 42%)',
          }}
        />
      )}

      {item.image ? (
        <Image
          src={item.image}
          alt={`${item.title} project screens`}
          width={item.width ?? 1200}
          height={item.height ?? 800}
          sizes={
            fitContent
              ? '(max-width: 768px) 100vw, 50vw'
              : '(max-width: 768px) 100vw, 1200px'
          }
          className={
            fitContent
              ? 'relative block h-auto w-full object-contain object-center'
              : 'absolute inset-0 h-full w-full object-contain object-center p-3 sm:p-5'
          }
          loading="lazy"
        />
      ) : (
        <div className="relative flex h-full w-full flex-col justify-between p-5 sm:p-7 md:p-8">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold tracking-[.24em] text-white/50 sm:text-[10px]">
              {item.subtitle}
            </span>
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: item.accent,
                boxShadow: `0 0 18px ${item.accent}`,
              }}
            />
          </div>

          <div className="relative">
            <div
              className="mb-3 h-px w-12"
              style={{ backgroundColor: item.accent }}
            />
            <h3 className="display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              {item.title}
            </h3>
            <p className="mt-3 text-xs text-white/45">
              Project cover · Screenshot pending
            </p>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-[10px] uppercase tracking-[.2em] text-white/35">
              Selected work
            </span>
            <span className="text-xl" style={{ color: item.accent }}>
              ↗
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function CaseStudySection({
  title,
  children,
  index,
  reduceMotion,
}: {
  title: string;
  children: ReactNode;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: reduceMotion ? 0 : index * 0.04,
      }}
      className="mt-10 border-t border-white/10 pt-7"
    >
      <p className="mb-3 text-xs uppercase tracking-[.18em] text-lime/70">
        0{index + 1}
      </p>
      <h3 className="text-2xl font-semibold md:text-3xl">{title}</h3>
      <div className="mt-4 max-w-3xl text-base leading-8 text-white/60">
        {children}
      </div>
    </motion.section>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const shouldReduceMotion = useReducedMotion() ?? false;
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const filteredProjects = projects.filter(
    (project) =>
      activeFilter === 'All' || project.category === activeFilter
  );

  const selectedIndex = selectedProject
    ? projects.findIndex((project) => project.name === selectedProject.name)
    : -1;

  const openProject = (project: ProjectItem) => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setSelectedProject(project);
  };

  const closeCaseStudy = () => setSelectedProject(null);

  const goToProject = (direction: -1 | 1) => {
    if (selectedIndex < 0) return;

    setSelectedProject(
      projects[
        (selectedIndex + direction + projects.length) % projects.length
      ]
    );
  };

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeCaseStudy();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToProject(1);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToProject(-1);
        return;
      }

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable?.length) {
          event.preventDefault();
          dialogRef.current?.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);

      if (!selectedProject || selectedIndex === -1) {
        previousFocusRef.current?.focus();
        previousFocusRef.current = null;
      }
    };
  }, [selectedProject, selectedIndex]);

  return (
    <section id="work" className="container py-24 md:py-32">
      <div className="mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-white/50">Selected work</p>
          <h2 className="display mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Things I've <span className="text-lime">made.</span>
          </h2>
        </div>

        <a
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-lime transition hover:gap-3"
        >
          View all projects <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
              activeFilter === filter
                ? 'border-lime bg-lime text-ink'
                : 'border-white/10 bg-white/[.03] text-white/60 hover:border-white/30 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-4 md:auto-rows-fr md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.name}
              layout
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 25 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }
              }
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : index * 0.05,
              }}
              className={`project-card group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[.08] bg-[#111211] p-3 transition-colors duration-300 hover:border-lime/30 ${
                project.featured ? 'lg:row-span-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => openProject(project)}
                className="relative block w-full shrink-0 overflow-hidden rounded-xl bg-black/20 text-left"
                aria-label={`Open ${project.name} case study`}
              >
                <ProjectVisual kind={project.visual} fitContent />
              </button>

              <div className="relative flex flex-1 p-4">
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="pr-12 text-xs text-white/45">
                    {project.type}
                  </p>

                  <h3 className="mt-1 pr-12 text-xl font-semibold md:text-2xl">
                    {project.name}
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/55">
                    {project.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/[.06] px-3 py-1.5 text-[10px] text-white/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
                    <button
                      type="button"
                      onClick={() => openProject(project)}
                      className="inline-flex items-center gap-2 text-sm text-lime opacity-80 transition hover:opacity-100"
                    >
                      View case study <ArrowUpRight size={15} />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-white/70 transition hover:border-lime/50 hover:text-lime"
                      >
                        View live site <ArrowUpRight size={14} />
                      </a>
                    )}

                    {project.prototypeUrl && (
                      <a
                        href={project.prototypeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-white/70 transition hover:border-lime/50 hover:text-lime"
                      >
                        Explore prototype <ArrowUpRight size={14} />
                      </a>
                    )}

                    {project.behanceUrl && (
                      <a
                        href={project.behanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-white/70 transition hover:border-lime/50 hover:text-lime"
                      >
                        View on Behance <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <motion.span
                  className="project-arrow absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/[.06]"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { rotate: 45, backgroundColor: '#c5ff36' }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.25,
                  }}
                  aria-hidden="true"
                >
                  <ArrowRight size={17} />
                </motion.span>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-2 backdrop-blur-xl sm:p-4"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            onClick={closeCaseStudy}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              aria-describedby="project-modal-description"
              tabIndex={-1}
              className="relative max-h-[96vh] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#0d0e0d] shadow-[0_30px_120px_rgba(0,0,0,.7)] outline-none sm:rounded-3xl"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 50, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, y: 35, scale: 0.97 }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.35,
                ease: 'easeOut',
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[.06] bg-[#0d0e0d]/85 px-4 py-3 backdrop-blur-xl md:px-6">
                <span className="text-xs tracking-widest text-white/45">
                  CASE STUDY <span className="text-lime">/</span>{' '}
                  {String(selectedIndex + 1).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  onClick={closeCaseStudy}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.04] transition hover:border-lime/50 hover:bg-lime hover:text-ink"
                  aria-label="Close project details"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-3 pt-3 sm:px-5 sm:pt-5">
                <div
                  className={`relative h-[300px] overflow-hidden rounded-xl sm:h-[400px] md:h-[500px] md:rounded-2xl ${
                    selectedProject.name === 'RentDirect'
                      ? 'bg-[#10251a]'
                      : ''
                  }`}
                >
                  <ProjectVisual kind={selectedProject.visual} />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8">
                    <p className="text-xs uppercase tracking-[.2em] text-white/60">
                      {selectedProject.type} · {selectedProject.year}
                    </p>

                    <h2
                      id="project-modal-title"
                      className="display mt-2 text-4xl font-extrabold md:text-7xl"
                    >
                      {selectedProject.name}
                    </h2>

                    <p
                      id="project-modal-description"
                      className="mt-3 max-w-2xl text-sm text-white/70 md:text-base"
                    >
                      {selectedProject.desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-8 pt-7 sm:px-8 md:px-12 md:pb-12 md:pt-10">
                <div className="grid gap-7 border-b border-white/10 pb-8 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[.18em] text-white/35">
                      My role
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      {selectedProject.role}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[.18em] text-white/35">
                      Project type
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      {selectedProject.type}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[.18em] text-white/35">
                      Year
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      {selectedProject.year}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[.18em] text-white/35">
                      Tools &amp; skills
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white/[.06] px-2 py-1 text-[10px] text-white/65"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <CaseStudySection
                  title="Project overview"
                  index={0}
                  reduceMotion={shouldReduceMotion}
                >
                  {selectedProject.overview}
                </CaseStudySection>

                <CaseStudySection
                  title="The challenge"
                  index={1}
                  reduceMotion={shouldReduceMotion}
                >
                  {selectedProject.challenge}
                </CaseStudySection>

                <CaseStudySection
                  title="My approach"
                  index={2}
                  reduceMotion={shouldReduceMotion}
                >
                  {selectedProject.approach}
                </CaseStudySection>

                <CaseStudySection
                  title="The solution"
                  index={3}
                  reduceMotion={shouldReduceMotion}
                >
                  {selectedProject.solution}
                </CaseStudySection>

                <CaseStudySection
                  title="Key features & focus"
                  index={4}
                  reduceMotion={shouldReduceMotion}
                >
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {selectedProject.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 rounded-xl border border-white/[.07] bg-white/[.025] p-4 text-sm leading-6 text-white/65"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CaseStudySection>

                <CaseStudySection
                  title="Outcome & reflection"
                  index={5}
                  reduceMotion={shouldReduceMotion}
                >
                  {selectedProject.outcome}
                </CaseStudySection>

                <div className="mt-10 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm text-white/75 transition hover:border-lime/50 hover:text-lime"
                    >
                      View live site <ArrowUpRight size={15} />
                    </a>
                  )}

                  {selectedProject.prototypeUrl && (
                    <a
                      href={selectedProject.prototypeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm text-white/75 transition hover:border-lime/50 hover:text-lime"
                    >
                      Explore prototype <ArrowUpRight size={15} />
                    </a>
                  )}

                  {selectedProject.behanceUrl && (
                    <a
                      href={selectedProject.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm text-white/75 transition hover:border-lime/50 hover:text-lime"
                    >
                      View on Behance <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={closeCaseStudy}
                    className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
                  >
                    <ArrowLeft size={16} />
                    Back to all projects
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToProject(-1)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/70 transition hover:border-lime/40 hover:text-lime"
                    >
                      <ArrowLeft size={15} />
                      Previous
                    </button>

                    <button
                      type="button"
                      onClick={() => goToProject(1)}
                      className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2.5 text-sm font-semibold text-ink transition hover:scale-[1.02]"
                    >
                      Next project
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
