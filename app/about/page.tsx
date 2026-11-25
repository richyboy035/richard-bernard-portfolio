
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  Code2,
  LayoutTemplate,
  MousePointer2,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Projects from '@/components/Projects';
import Reveal from '@/components/Reveal';
import TechStackMarquee from '@/components/TechStackMarquee';
import { experience } from '@/data/experience';

export const metadata: Metadata = {
  title: 'About — Richard Bernard',
  description:
    'Get to know Richard Bernard, a product designer and frontend developer combining design, technology and product thinking.',
};

const capabilities = [
  {
    title: 'Product Design & UI/UX',
    icon: LayoutTemplate,
    description:
      'Thoughtful interfaces shaped around real people, user needs and clear product goals.',
  },
  {
    title: 'Frontend Development',
    icon: Code2,
    description:
      'Responsive, accessible interfaces that bring design concepts to life in the browser.',
  },
  {
    title: 'Website Development',
    icon: Boxes,
    description:
      'Modern websites that balance visual clarity, usability and practical functionality.',
  },
  {
    title: 'Ecommerce Development',
    icon: ShoppingBag,
    description:
      'Digital shopping experiences designed to make browsing, product discovery and buying intuitive.',
  },
  {
    title: 'Prototyping & Interaction Design',
    icon: MousePointer2,
    description:
      'Interactive concepts that make ideas tangible and easier to understand, test and refine.',
  },
  {
    title: 'Digital Product Building',
    icon: Sparkles,
    description:
      'Connecting product thinking, design and development to create cohesive digital experiences.',
  },
];

const process = [
  'Understand',
  'Research',
  'Define',
  'Design',
  'Prototype',
  'Build',
  'Test',
  'Refine',
];

type Contribution = {
  company: string;
  role: string;
  location?: string;
  detail?: string;
  type?: string;
};

const contributions: Contribution[] = [
  ...experience,
  {
    company: 'SellerAfrica',
    role: 'Frontend Development / E-commerce',
    type: 'Project contribution',
    detail:
      'Contributed to improving the SellerAfrica marketplace experience, working on storefront interfaces, responsive layouts, product browsing experiences, homepage components and interactive UI improvements.',
  },
];

export default function AboutPage() {
  return (
    <main id="home">
      <NavBar />

      {/* Introduction */}
      <section className="grid-noise overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-lime">A little about me</p>

            <h1 className="display mt-6 max-w-3xl text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
              Thoughtful design.
              <br />
              <span className="text-lime">Made to work.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">
              I&apos;m Richard Bernard, a Product Designer, Frontend
              Developer and Digital Product Builder. I bring design
              and technology together to create useful, compelling
              digital experiences.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-4 text-sm font-semibold text-ink transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                Explore my work
                <ArrowDownRight size={16} aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm transition-colors hover:border-lime/60 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                Get in touch
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal className="relative mx-auto w-full max-w-md">
            <div
              className="absolute inset-8 rounded-full bg-lime/10 blur-[80px]"
              aria-hidden="true"
            />

            <div className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-panel p-7 md:p-9">
              <Image
                src="/images/richard-bernard-profile.png"
                alt="Portrait of Richard Bernard"
                fill
                priority
                sizes="(max-width: 768px) calc(100vw - 32px), 448px"
                className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent"
                aria-hidden="true"
              />

              <div className="relative flex items-end justify-between border-t border-white/20 pt-5">
                <p className="text-sm font-medium">
                  Richard Bernard
                  <br />
                  <span className="text-white/70">
                    Design-minded. Build-focused.
                  </span>
                </p>

                <span
                  className="h-2 w-2 rounded-full bg-lime"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Professional story */}
      <section className="container border-t border-white/[.08] py-20 md:py-28">
        <Reveal className="grid gap-8 md:grid-cols-[.7fr_1.3fr] md:gap-16">
          <div>
            <p className="eyebrow text-white/45">My story</p>

            <h2 className="display mt-4 text-4xl font-bold md:text-5xl">
              From idea
              <br />
              <span className="text-lime">to interface.</span>
            </h2>
          </div>

          <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-white/65">
            <p>
              My journey from product design and UI/UX into frontend
              development has brought me closer to the full process
              of building digital products. I&apos;m interested in
              the path from understanding a problem to creating an
              experience people can use.
            </p>

            <p>
              Design helps me see the human side of a problem;
              engineering turns those ideas into something tangible.
              Working across both disciplines helps me think about
              the details, interactions and practical decisions that
              make a product feel cohesive.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Capabilities */}
      <section className="container border-t border-white/[.08] py-20 md:py-28">
        <Reveal>
          <p className="eyebrow text-white/45">What I do</p>

          <h2 className="display mt-4 text-4xl font-bold md:text-5xl">
            Built around{' '}
            <span className="text-lime">the experience.</span>
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ title, icon: Icon, description }) => (
              <article
                key={title}
                className="project-card rounded-2xl border border-white/[.08] bg-panel p-6 md:p-8"
              >
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl border border-lime/20 bg-lime/[.06] text-lime"
                  aria-hidden="true"
                >
                  <Icon size={20} />
                </div>

                <h3 className="mt-7 text-xl font-semibold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Working process */}
      <section className="container border-t border-white/[.08] py-20 md:py-28">
        <Reveal>
          <p className="eyebrow text-white/45">My process</p>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <h2 className="display text-4xl font-bold md:text-5xl">
              A path from{' '}
              <span className="text-lime">problem to product.</span>
            </h2>

            <p className="max-w-xs text-sm leading-6 text-white/50">
              An iterative process, shaped around the needs of each project.
            </p>
          </div>

          <ol className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-4">
            {process.map((step, index) => (
              <li
                key={step}
                className="border-b border-r border-white/[.08] bg-panel p-5 md:p-6"
              >
                <span className="text-xs text-lime/70">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <p className="mt-5 text-base font-semibold md:text-lg">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Technology stack */}
      <div className="container border-t border-white/[.08]" />
      <TechStackMarquee />

      {/* Experience */}
      <section className="container mt-20 border-t border-white/[.08] py-20 md:mt-28 md:py-28">
        <Reveal className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-16">
          <div>
            <p className="eyebrow text-white/45">Experience</p>

            <h2 className="display mt-4 text-4xl font-bold md:text-5xl">
              Where I&apos;ve{' '}
              <span className="text-lime">contributed.</span>
            </h2>
          </div>

          <ol className="border-l border-white/15">
            {contributions.map((item, index) => (
              <li
                key={`${item.company}-${item.role}-${index}`}
                className="relative pb-10 pl-8 last:pb-0"
              >
                <span
                  className="absolute -left-[5px] top-7 h-[9px] w-[9px] rounded-full bg-lime"
                  aria-hidden="true"
                />

                <article className="rounded-2xl border border-white/[.08] bg-panel p-6">
                  <p className="text-sm text-lime">
                    {item.role}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    {item.company}
                  </h3>

                  {item.location && (
                    <p className="mt-1 text-sm text-white/45">
                      {item.location}
                    </p>
                  )}

                  {item.type && (
                    <p className="mt-1 text-xs font-medium text-white/40">
                      {item.type}
                    </p>
                  )}

                  {item.detail && (
                    <p className="mt-3 text-sm leading-7 text-white/60">
                      {item.detail}
                    </p>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Selected projects */}
      <div className="container border-t border-white/[.08]" />
      <Projects />

      <div className="container border-t border-white/[.08]" />

      {/* Contact */}
      <Footer
        invitation="Whether you're a recruiter, company, founder or collaborator, I'd love to hear what you're working on."
      />
    </main>
  );
}
