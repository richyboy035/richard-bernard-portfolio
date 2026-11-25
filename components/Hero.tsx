
'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';

const projects = [
  {
    name: 'RentDirect',
    category: 'PROPERTY MANAGEMENT',
    image: '/images/projects/rentdirect/screen-01.jpeg',
    accent: '#c5ff36',
  },
  {
    name: 'PocketPlan',
    category: 'PERSONAL FINANCE',
    image: '/images/projects/pocket-plan.png',
    accent: '#9be7b2',
  },
  {
    name: 'Ajo Circle',
    category: 'GROUP SAVINGS',
    image: '/images/projects/ajo-circles.png',
    accent: '#f4bd76',
  },
  {
    name: 'Border Cash',
    category: 'FINANCE & PAYMENTS',
    image: '/images/projects/border-cash.png',
    accent: '#65d9b2',
  },
  {
    name: 'PowerWatch',
    category: 'POWER MONITORING',
    image: '/images/projects/powerwatch.png',
    accent: '#c5ff36',
  }
];

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <div className="relative h-[145px] w-[230px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#151915] shadow-2xl sm:h-[175px] sm:w-[285px]">
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="285px"
          className="object-cover opacity-80"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-[#20271e] to-[#090c09] p-4">
          <div className="flex items-center justify-between">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            {project.inDevelopment && (
              <span className="rounded-full border border-white/15 bg-black/30 px-2 py-1 text-[8px] tracking-wider text-white/65">
                IN DEVELOPMENT
              </span>
            )}
          </div>
          <div>
            <p className="text-[9px] tracking-[.2em] text-white/45">
              {project.category}
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              {project.name}
            </h3>
          </div>
        </div>
      )}

      {project.image && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />
          <div className="absolute bottom-3 left-4">
            <p className="text-[8px] tracking-[.2em] text-white/55">
              {project.category}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              {project.name}
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

function ProjectMarquee({
  reverse = false,
  reduceMotion,
}: {
  reverse?: boolean;
  reduceMotion: boolean;
}) {
  const items = [...projects, ...projects];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-4"
        animate={
          reduceMotion
            ? { x: 0 }
            : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 48,
                ease: 'linear',
                repeat: Infinity,
              }
        }
      >
        {items.map((project, index) => (
          <ProjectCard
            key={`${project.name}-${index}`}
            project={project}
          />
        ))}
      </motion.div>
    </div>
  );
}

function PhoneShowcase({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className="relative z-20 mx-auto w-[220px] sm:w-[245px] lg:w-[255px] xl:w-[275px]"
      animate={
        reduceMotion
          ? { y: 0, rotate: 0 }
          : {
              y: [0, -12, 0],
              rotate: [-1, 1, -1],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    >
      <div className="relative rounded-[42px] border-[5px] border-[#454a45] bg-[#080a08] p-[7px] shadow-[0_30px_100px_rgba(0,0,0,.8),0_0_70px_rgba(197,255,54,.12)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[33px] bg-[#10251a]">
          <Image
            src="/images/projects/rentdirect/screen-01.jpeg"
            alt="RentDirect app interface displayed in the phone mockup"
            fill
            priority
            sizes="275px"
            className="object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

          <div className="absolute left-1/2 top-2 z-10 h-[17px] w-[65px] -translate-x-1/2 rounded-full bg-black" />
        </div>

        <div className="absolute -right-[7px] top-28 h-12 w-[3px] rounded-r-full bg-[#777d74]" />
        <div className="absolute -left-[7px] top-24 h-9 w-[3px] rounded-l-full bg-[#777d74]" />
      </div>

      <div className="absolute -bottom-7 left-1/2 -z-10 h-16 w-[80%] -translate-x-1/2 rounded-full bg-lime/20 blur-3xl" />

      <div className="absolute -right-12 top-16 hidden rounded-2xl border border-white/10 bg-[#151815]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-lime" />
          <span className="text-[10px] font-medium text-white/80">
            Product design
          </span>
        </div>
      </div>

      <div className="absolute -left-12 bottom-24 hidden rounded-2xl border border-white/10 bg-[#151815]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-lime" />
          <span className="text-[10px] font-medium text-white/80">
            Built with purpose
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const reveal = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      className="grid-noise relative isolate min-h-screen overflow-hidden pb-16 pt-28 md:pt-32"
    >
      {/* Background atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#090a09]" />

        <motion.div
          className="absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-lime/[.09] blur-[150px]"
          animate={
            shouldReduceMotion
              ? { opacity: 0.4 }
              : { opacity: [0.25, 0.5, 0.25], scale: [1, 1.12, 1] }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
          }
        />

        {/* Upper project lane: left to right */}
        <div className="absolute left-0 right-0 top-[12%] opacity-35">
          <ProjectMarquee reduceMotion={shouldReduceMotion} reverse />
        </div>

        {/* Lower project lane: right to left */}
        <div className="absolute bottom-[7%] left-0 right-0 opacity-30">
          <ProjectMarquee reduceMotion={shouldReduceMotion} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#090a09]/35 via-[#090a09]/60 to-[#090a09]/90" />
      </div>

      {/* Main hero content */}
      <div className="container relative z-10 mx-auto grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-8 xl:gap-14">
        <motion.div
          className="relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.12,
              },
            },
          }}
        >
          <motion.p
            variants={reveal}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="eyebrow mb-7 flex items-center gap-4 text-white/60"
          >
            <span>Richard Bernard</span>
            <span className="h-px w-20 bg-white/25" />
          </motion.p>

          <motion.h1
            variants={reveal}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="display max-w-[760px] text-[clamp(2.7rem,6.2vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.055em]"
          >
            <span className="block">I design &amp; build</span>
            <span className="block">digital products</span>
            <span className="block font-serif font-medium italic tracking-[-0.04em] text-lime">
              that matter.
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="mt-7 max-w-lg text-base leading-relaxed text-white/65 md:text-lg"
          >
            Product Designer &amp; Frontend Developer. I combine thoughtful
            design with frontend development to create useful, engaging
            digital experiences.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-lime px-6 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(200,255,69,0.2)]"
            >
              Explore My Work
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="#about"
              className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-black/20 px-5 py-4 text-sm text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/[0.04]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/30 transition-all duration-300 group-hover:border-lime group-hover:text-lime">
                <Play size={11} fill="currentColor" />
              </span>
              A little about me
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="mt-10 flex items-center gap-2 text-xs text-white/55"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-40 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Open to opportunities &amp; collaborations
          </motion.div>
        </motion.div>

        {/* Foreground phone mockup */}
        <div className="relative z-20 flex min-h-[420px] items-center justify-center lg:min-h-[580px]">
          <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.06] sm:h-[430px] sm:w-[430px]">
            <div className="absolute inset-8 rounded-full border border-white/[.05]" />
          </div>

          <PhoneShowcase reduceMotion={shouldReduceMotion} />
        </div>
      </div>
    </section>
  );
}
