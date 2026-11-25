
'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useAnimate } from 'framer-motion';
import {
  siFigma,
  siFramer,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siReact,
  siShopify,
  siTailwindcss,
  siTypescript,
  siWordpress,
} from 'simple-icons';

const technologies = [
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs, color: '#ffffff' },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'HTML5', icon: siHtml5 },
  {
    name: 'CSS3',
    icon: {
      hex: '1572B6',
      path: 'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z',
    },
  },
  { name: 'PHP', icon: siPhp },
  { name: 'Figma', icon: siFigma },
  { name: 'Framer', icon: siFramer },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'Git', icon: siGit },
  { name: 'GitHub', icon: siGithub, color: '#ffffff' },
  { name: 'WordPress', icon: siWordpress },
  { name: 'Shopify', icon: siShopify },
];

const motionPreference = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia(motionPreference);

  media.addEventListener('change', callback);

  return () => media.removeEventListener('change', callback);
}

function getMotionPreference() {
  return window.matchMedia(motionPreference).matches;
}

function getServerMotionPreference() {
  return false;
}

export default function TechStackMarquee() {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  const animation = useRef<{
    pause: () => void;
    play: () => void;
    stop: () => void;
  } | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const shouldReduceMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference
  );

  useEffect(() => {
    if (shouldReduceMotion || !scope.current) return;

    const controls = animate(
      scope.current,
      { x: ['0%', '-50%'] },
      {
        duration: 50,
        ease: 'linear',
        repeat: Infinity,
      }
    );

    animation.current = controls;

    return () => {
      controls.stop();
      animation.current = null;
    };
  }, [animate, scope, shouldReduceMotion]);

  useEffect(() => {
    if (!animation.current) return;

    if (isPaused || isHovered) {
      animation.current.pause();
    } else {
      animation.current.play();
    }
  }, [isHovered, isPaused]);

  const renderItems = () =>
    technologies.map(({ name, icon, color }) => (
      <li
        key={name}
        className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-panel px-5 py-3 text-sm font-medium text-white/75 transition-colors duration-300 hover:border-lime/30 hover:bg-[#191c16] hover:text-white"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0"
          fill={color ?? `#${icon.hex}`}
        >
          <path d={icon.path} />
        </svg>

        <span>{name}</span>
      </li>
    ));

  return (
    <section
      className="container pt-12 md:pt-16"
      aria-labelledby="tech-stack-title"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2
          id="tech-stack-title"
          className="eyebrow text-white/45"
        >
          Technologies &amp; tools
        </h2>

        <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-pressed={isPaused}
          className="text-xs text-white/50 transition-colors hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime motion-reduce:hidden"
        >
          {isPaused ? 'Resume animation' : 'Pause animation'}
        </button>
      </div>

      <div
        className="relative overflow-hidden motion-reduce:overflow-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsHovered(true)}
        onBlurCapture={() => setIsHovered(false)}
      >
        <div
          ref={scope}
          className="flex w-max motion-reduce:block motion-reduce:w-auto motion-reduce:!transform-none"
        >
          <ul className="flex shrink-0 gap-3 pr-3 motion-reduce:flex-wrap motion-reduce:pr-0">
            {renderItems()}
          </ul>

          <ul
            aria-hidden="true"
            className="flex shrink-0 gap-3 pr-3 motion-reduce:hidden"
          >
            {renderItems()}
          </ul>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ink to-transparent md:w-16 motion-reduce:hidden"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink to-transparent md:w-16 motion-reduce:hidden"
        />
      </div>
    </section>
  );
}
