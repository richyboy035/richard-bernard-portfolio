
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import PrintResumeButton from '@/components/PrintResumeButton';

import { contactEmail } from '@/data/contact';
import { experience } from '@/data/experience';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Resume — Richard Bernard',
  description:
    'Professional experience, technical skills, education and selected projects of Richard Bernard, Product Designer and Frontend Developer.',
};

const skills = [
  {
    category: 'Product & Design',
    items:
      'Product Design, UI/UX Design, User Research, Wireframing, Prototyping, Design Systems',
  },
  {
    category: 'Frontend Development',
    items:
      'React, Next.js, JavaScript, TypeScript, HTML, CSS, Tailwind CSS',
  },
  {
    category: 'Development & Platforms',
    items:
      'PHP, Node.js, Git, GitHub, WordPress, Shopify',
  },
  {
    category: 'Design Tools',
    items: 'Figma, Framer',
  },
];

export default function ResumePage() {
  return (
    <main id="home" className="resume-shell">
      <div className="resume-chrome">
        <NavBar />
      </div>

      <article className="resume-document container max-w-5xl pb-20 pt-36 md:pb-28 md:pt-44">

        {/* Resume Header */}
        <header className="resume-header border-b border-white/10 pb-10">
          <p className="eyebrow text-lime">
            Resume / Portfolio
          </p>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-7">
            <div>
              <h1 className="display text-5xl font-extrabold md:text-7xl">
                Richard <span className="text-lime">Bernard.</span>
              </h1>

              <p className="mt-4 text-lg text-white/70">
                Product Designer &amp; Frontend Developer
              </p>
            </div>

            <PrintResumeButton />
          </div>

          <div className="resume-contact mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60">
            <a
              href={`mailto:${contactEmail}`}
              aria-label="Send Richard an email"
              className="transition-colors hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
            >
              Email
            </a>

            <a
              href="https://www.linkedin.com/in/richardbernard10/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Richard's LinkedIn profile"
              className="transition-colors hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
            >
              LinkedIn
            </a>

            <a
              href="https://wa.me/2349163630330?text=Hi%20Richard%2C%20I%20came%20across%20your%20resume%20and%20would%20like%20to%20discuss%20an%20opportunity."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Richard on WhatsApp"
              className="transition-colors hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
            >
              WhatsApp
            </a>

            <a
              href="/#work"
              className="inline-flex items-center gap-1 transition-colors hover:text-lime"
            >
              Selected work
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <a
              href="/about"
              className="inline-flex items-center gap-1 transition-colors hover:text-lime"
            >
              About me
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </header>

        {/* Resume Content */}
        <div className="resume-content grid gap-12 pt-12 md:grid-cols-[1fr_2fr] md:gap-16">

          {/* Sidebar */}
          <aside className="resume-sidebar space-y-10">

            {/* Skills */}
            <section className="resume-section" aria-labelledby="resume-skills">
              <h2 id="resume-skills" className="eyebrow text-lime">
                Skills &amp; tools
              </h2>

              <div className="mt-5 space-y-5">
                {skills.map((group) => (
                  <div key={group.category} className="resume-item">
                    <h3 className="text-sm font-semibold">
                      {group.category}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-white/60">
                      {group.items}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="resume-section" aria-labelledby="resume-education">
              <h2 id="resume-education" className="eyebrow text-lime">
                Education
              </h2>

              <div className="resume-item mt-5">
                <h3 className="text-base font-semibold">
                  Yaba College of Technology
                </h3>

                <p className="mt-2 text-sm text-white/70">
                  Ordinary National Diploma (OND)
                </p>

                <p className="mt-1 text-sm text-white/50">
                  Computer Science · 2015–2017
                </p>
              </div>
            </section>
          </aside>

          {/* Main Content */}
          <div className="resume-main space-y-12">

            {/* Professional Summary */}
            <section className="resume-section" aria-labelledby="resume-summary">
              <h2 id="resume-summary" className="eyebrow text-lime">
                Professional summary
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70">
                Product Designer and Frontend Developer focused on
                creating useful, intuitive and visually compelling
                digital experiences. Experienced in product design,
                UI/UX, interface development, responsive websites
                and ecommerce experiences. Combines product thinking,
                visual design and frontend technologies to turn ideas
                into practical digital solutions.
              </p>
            </section>

            {/* Professional Experience */}
            <section className="resume-section" aria-labelledby="resume-experience">
              <h2 id="resume-experience" className="eyebrow text-lime">
                Professional experience
              </h2>

              <div className="mt-5 space-y-7">
                {experience.map((item, index) => (
                  <div
                    key={`${item.company}-${item.role}-${index}`}
                    className="resume-item border-l border-white/15 pl-5"
                  >
                    <h3 className="text-lg font-semibold">
                      {item.role}
                    </h3>

                    <p className="mt-1 text-sm text-white/70">
                      {item.company}
                      {item.location ? ` · ${item.location}` : ''}
                    </p>

                    {item.detail && (
                      <p className="mt-3 text-sm leading-7 text-white/60">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Selected Projects */}
            <section className="resume-section" aria-labelledby="resume-projects">
              <h2 id="resume-projects" className="eyebrow text-lime">
                Selected projects
              </h2>

              <div className="mt-5 space-y-6">
                {projects.map((project) => {
                  const projectUrl =
                    project.prototypeUrl ??
                    project.behanceUrl ??
                    '/#work';

                  return (
                    <div key={project.name} className="resume-item">
                      <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-semibold">
                        <a
                          href={projectUrl}
                          className="transition-colors hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
                        >
                          {project.name}
                        </a>

                        <span className="text-xs font-normal text-white/45">
                          {project.type}
                        </span>
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {project.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </article>

      <div className="resume-chrome">
        <Footer />
      </div>
    </main>
  );
}
