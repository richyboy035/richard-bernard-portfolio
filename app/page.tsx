
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Intro from '@/components/Intro';
import Footer from '@/components/Footer';
import TechStackMarquee from '@/components/TechStackMarquee';

const stats = [
  { value: '5', label: 'Featured projects' },
  { value: '3+', label: 'Years experience' },
  { value: '2', label: 'Core disciplines' },
];

export default function Home() {
  return (
    <main id="home">
      <NavBar />
      <Hero />

      <section
        className="container border-y border-white/[.08] py-7 md:py-9"
        aria-label="Professional highlights"
      >
        <dl className="grid grid-cols-3 gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                index < stats.length - 1
                  ? 'border-r border-white/10'
                  : '',
                index === 0
                  ? 'pr-3'
                  : index === 1
                    ? 'px-4 md:px-8'
                    : 'pl-4 md:pl-8',
              ].join(' ')}
            >
              <dd className="text-2xl font-bold md:text-3xl">
                {stat.value}
              </dd>
              <dt className="mt-1 text-xs text-white/50 md:text-sm">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <TechStackMarquee />
      <Projects />
      <Intro />
      <Footer />
    </main>
  );
}
