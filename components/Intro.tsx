
import { ArrowUpRight } from 'lucide-react';

export default function Intro() {
  return (
    <section
      id="about"
      aria-labelledby="intro-heading"
      className="container scroll-mt-24 border-y border-white/[.08] py-16 md:py-24"
    >
      <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center md:gap-16">
        <div>
          <p className="eyebrow text-white/45">
            A little about me
          </p>

          <h2
            id="intro-heading"
            className="display mt-4 text-4xl font-bold leading-tight md:text-5xl"
          >
            Design-minded.
            <br />
            <span className="text-lime">Build-focused.</span>
          </h2>
        </div>

        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
            I turn ideas into usable, scalable and visually compelling
            digital products—combining design, technology and product
            thinking to solve real problems.
          </p>

          <a
            href="/about"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-lime transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            aria-label="Read more about my background and experience"
          >
            More about me
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
