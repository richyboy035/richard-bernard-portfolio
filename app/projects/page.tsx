import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Projects — Richard Bernard',
  description: 'Selected product design and development projects by Richard Bernard.',
};

export default function ProjectsPage() {
  return (
    <main id="home" className="min-h-screen pt-20">
      <NavBar />
      <header className="container border-b border-white/[.08] py-16 md:py-24">
        <p className="eyebrow text-lime">Portfolio / Projects</p>
        <h1 className="display mt-5 text-5xl font-extrabold tracking-tight md:text-7xl">
          Selected <span className="text-lime">projects.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
          A collection of product design explorations and digital experiences.
          Concept work is identified as such; project details are presented
          only where supporting information is available.
        </p>
      </header>
      <Projects />
      <Footer />
    </main>
  );
}
