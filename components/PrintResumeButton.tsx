
'use client';

import { Printer } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function PrintResumeButton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={() => window.print()}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      aria-label="Print résumé or save it as a PDF"
      className="resume-print-button inline-flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-4 text-sm font-semibold text-ink transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
    >
      <Printer size={16} aria-hidden="true" />
      Print / Save as PDF
    </motion.button>
  );
}
