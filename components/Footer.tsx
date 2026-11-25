
import {
  ArrowUpRight,
  Linkedin,
  MessageCircle,
  Mail,
} from 'lucide-react';

import { contactEmail, contactLinkedIn } from '@/data/contact';

export default function Footer({
  invitation,
}: {
  invitation?: string;
} = {}) {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="container scroll-mt-24 py-20 md:py-28"
    >
      <p className="eyebrow text-white/45">
        Have a project in mind?
      </p>

      <h2
        id="contact-heading"
        className="display mt-5 max-w-4xl text-5xl font-extrabold leading-[.95] md:text-8xl"
      >
        Let's make
        <br />
        <span className="text-lime">something great.</span>
      </h2>

      {invitation && (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
          {invitation}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {/* Email */}
        <a
          href={`mailto:${contactEmail}`}
          aria-label={`Send an email to ${contactEmail}`}
          className="inline-flex items-center gap-2 rounded-full border border-lime/60 px-5 py-3 text-sm transition-all duration-300 hover:bg-lime hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <Mail size={16} aria-hidden="true" />
          Email me
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        {/* LinkedIn */}
        <a
          href={contactLinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Richard Bernard's LinkedIn profile (opens in a new tab)"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm transition-all duration-300 hover:border-lime/60 hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <Linkedin size={16} aria-hidden="true" />
          LinkedIn
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/2349163630330?text=Hi%20Richard%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Richard Bernard on WhatsApp (opens in a new tab)"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm transition-all duration-300 hover:border-lime/60 hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        {/* Visible email address */}
        <a
          href={`mailto:${contactEmail}`}
          className="basis-full break-all text-sm text-white/50 transition-colors duration-300 hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime sm:basis-auto"
        >
          {contactEmail}
        </a>
      </div>

      {/* Footer bottom */}
      <div className="mt-20 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center">
        <span>
          © {new Date().getFullYear()} Richard Bernard. All rights reserved.
        </span>

        <span>
          Designed with intent. Built with care.
        </span>

        <a
          href="#home"
          aria-label="Back to top of page"
          className="inline-flex items-center gap-2 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Back to top
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
