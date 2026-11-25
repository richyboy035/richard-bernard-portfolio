
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navigation = [
  { label: 'Home', href: '/#home' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) => {
    if (href === '/about') return pathname === '/about';
    if (href === '/resume') return pathname === '/resume';
    return pathname === '/' && window.location.hash === href.replace('/', '');
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[.08] bg-[#080908]/90 shadow-lg shadow-black/10 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="container flex h-20 items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/#home"
          onClick={closeMenu}
          className="group flex items-center gap-2"
          aria-label="Richard Bernard home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime text-lg font-black text-ink transition-transform duration-300 group-hover:rotate-[-6deg]">
            R.
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">
            Richard Bernard
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors duration-200 hover:text-lime ${
                (item.href === '/about' && pathname === '/about') ||
                (item.href === '/resume' && pathname === '/resume')
                  ? 'text-lime'
                  : 'text-white/65'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(197,255,54,.2)]"
          >
            Let's talk <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.04] text-white transition hover:border-lime/40 hover:text-lime md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="border-t border-white/10 bg-[#080908]/[.98] px-6 pb-7 pt-4 backdrop-blur-xl md:hidden"
          >
            <div className="container flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-base text-white/75 transition hover:bg-white/[.05] hover:text-lime"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/#contact"
                onClick={closeMenu}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink"
              >
                Let's talk <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
