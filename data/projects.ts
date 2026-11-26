export type Project = {
  name: string;
  slug?: string;
  coverImage?: string;
  type: string;
  desc: string;
  tags: string[];
  visual: string;
  featured?: boolean;
  liveUrl?: string;
  prototypeUrl?: string;
  behanceUrl?: string;
  category: string;
  role: string;
  year: string;
  overview: string;
  challenge: string;
  approach: string;
  solution: string;
  highlights: string[];
  keyDecision: string;
  outcome: string;
  technologies: string[];
};

export const projects: Project[] = [

  {
    name: 'RentDirect',
    type: 'Property technology · Product concept',
    desc: 'A rental management platform for landlords and tenants.',
    tags: ['Product Design', 'UX'],
    visual: 'rent',
    prototypeUrl: 'https://www.figma.com/proto/r6UqljhCgzP8LzJdxJFi2M/Untitled?node-id=322-1207&p=f&t=7UxA4ZdhB97FrySi-0&scaling=scale-down&content-scaling=fixed&page-id=98%3A20&starting-point-node-id=315%3A404',
    category: 'Product Design',
    role: 'Product Designer',
    year: '2026',
    overview:
      'RentDirect explores a more transparent relationship between landlords and tenants through digital rent management.',
    challenge:
      'Renters and property owners often deal with fragmented communication, payment tracking, rental agreements, and uncertainty around rental transactions.',
    approach:
      'I explored the needs of both sides of the rental relationship and organized the experience around the tasks they need to complete and the information they need to trust.',
    solution:
      'A digital experience that brings rental information, payment tracking, tenant-landlord communication, and documentation into one platform.',
    highlights: [
      'Landlord and tenant-focused experiences',
      'Rent tracking and payment visibility',
      'Rental information and documentation',
      'A more transparent rental workflow',
    ],
    keyDecision:
      'Separate landlord and tenant task paths while keeping rent status, communication and rental records easy to find.',
    outcome:
      'Produced a clickable rental-management concept that brings rent tracking, communication and records into one workflow; no live deployment or measured user impact is claimed.',
    technologies: ['Figma', 'Product Strategy', 'UX Research', 'UI Design'],
  },
  {
    name: 'PocketPlan',
    type: 'Personal finance · Product concept',
    desc: 'A personal finance app for smarter money management.',
    tags: ['Product Design', 'Fintech'],
    visual: 'pocket',
    behanceUrl: 'https://www.behance.net/gallery/258898333/POCKET-PLAN',
    prototypeUrl: 'https://www.figma.com/proto/zvizPqRuzBwDaUNRnryZ64/Untitled?t=7UxA4ZdhB97FrySi-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=99-780&starting-point-node-id=1%3A2',
    category: 'Product Design',
    role: 'Product Designer',
    year: '2026',
    overview:
      'PocketPlan is a personal finance product concept designed to help people better understand and manage their finances.',
    challenge:
      'Making financial information easier to understand while helping users build healthier money-management habits.',
    approach:
      'I focused on simplifying the financial overview, prioritizing the information users need most, and making planning actions feel approachable rather than overwhelming.',
    solution:
      'A dashboard-led experience with financial overviews, planning tools, and approachable visual feedback.',
    highlights: [
      'At-a-glance financial overview',
      'Planning and budgeting concepts',
      'Clear information hierarchy',
      'Approachable visual feedback',
    ],
    keyDecision:
      'Lead with a scannable financial overview and make planning actions approachable before exposing deeper detail.',
    outcome:
      'Produced a personal-finance concept and linked prototype to demonstrate the dashboard and planning direction; no launch or performance metrics are claimed.',
    technologies: ['Figma', 'Product Design', 'Prototyping', 'UX/UI'],
  },

  {
    name: 'Border Cash', type: 'Finance application · Product concept', desc: 'A finance application concept. Explore the original project on Behance.',
    tags: ['Product Design', 'Fintech', 'Mobile UI'], visual: 'border', category: 'Product Design', role: 'Product Designer', year: '2026',
    behanceUrl: 'https://www.behance.net/gallery/258677609/FINACE-APPLICATION',
    overview: 'A finance application product concept documented through the linked Behance presentation.',
    challenge: 'The concept explores how a finance application can present core money-related tasks in a clear mobile interface.',
    approach: 'I developed a visual and interaction direction for a focused finance experience, using the linked presentation as the public project record.',
    solution: 'A mobile finance application interface concept with a clear visual direction.',
    highlights: ['Finance-focused interface direction', 'Mobile UI exploration', 'Visual hierarchy', 'Portfolio presentation'],
    keyDecision: 'Keep the interface focused on the primary finance experience and present its visual direction as a concise mobile concept.',
    outcome: 'Documented the finance-application concept in a Behance presentation; no live deployment, adoption or performance metrics are claimed.', technologies: ['Figma', 'Product Design', 'UI Design'],
  },
  {
    name: 'Ajo Circle', type: 'Group savings · Product concept', desc: 'A digital product concept. Explore the original project on Behance.',
    tags: ['Product Design', 'Fintech', 'Mobile UI'], visual: 'ajo', prototypeUrl: 'https://www.figma.com/proto/JtyYWZw07pP35zCG1ajcyG/Ajo-Circles-%E2%80%94-Savings-App?node-id=2-38&t=7UxA4ZdhB97FrySi-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A106&show-proto-sidebar=1', category: 'Product Design', role: 'Product Designer', year: '2026',
    behanceUrl: 'https://www.behance.net/gallery/257685169/Ajo-circle',
    overview: 'A group-savings product concept supported by a linked Figma prototype and Behance presentation.',
    challenge: 'Group savings needs clear contribution expectations, visibility and trust between members of a savings circle.',
    approach: 'I explored a circle-based experience that makes the shared nature of saving central to the product.',
    solution: 'A group-savings interface concept for organizing contributions and shared saving activity.',
    highlights: ['Circle-based savings model', 'Group contribution concepts', 'Mobile interface direction', 'Interactive Figma prototype'],
    keyDecision: 'Make the savings circle the organizing idea so members can understand the shared goal and their contributions.',
    outcome: 'Created a group-savings product concept with a linked Figma prototype and Behance presentation; no live deployment or measured impact is claimed.', technologies: ['Figma', 'Product Design', 'UI Design'],
  },
  {
    name: 'PowerWatch', type: 'Power monitoring · Product concept', desc: 'A power-monitoring product concept. Explore the original project on Behance.',
    tags: ['Product Design', 'Monitoring', 'Mobile UI'], visual: 'power', prototypeUrl: 'https://www.figma.com/proto/bTjRgxXR9df2ScuL1kANPm/Power-Monitor-App---Login---Home?t=7UxA4ZdhB97FrySi-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=2-2&starting-point-node-id=1%3A2', category: 'Product Design', role: 'Product Designer', year: '2026',
    behanceUrl: 'https://www.behance.net/gallery/257610769/Power-Monitor',
    overview: 'A power-monitoring app concept documented through a linked Figma prototype and Behance presentation.',
    challenge: 'People need a clear way to understand power usage and monitor important status information.',
    approach: 'I explored a focused app interface that makes essential monitoring information easier to scan.',
    solution: 'A power-monitoring interface concept with a dashboard-led direction.',
    highlights: ['At-a-glance monitoring concept', 'Dashboard interface direction', 'Mobile UI exploration', 'Interactive Figma prototype'],
    keyDecision: 'Prioritize essential usage and monitoring information in a focused dashboard rather than crowding the interface.',
    outcome: 'Created a power-monitoring app concept with a linked Figma prototype and Behance presentation; no live deployment or measured impact is claimed.', technologies: ['Figma', 'Product Design', 'UI Design'],
  },
  {
    name: 'Portfolio Platform & CMS',
    slug: 'portfolio-platform-cms',
    type: 'Personal portfolio · Full-stack build',
    desc: 'A live personal portfolio with a private CMS for publishing projects and managing enquiries.',
    tags: ['Full-stack Development', 'Next.js', 'Supabase', 'CMS'],
    visual: 'portfolio',
    liveUrl: 'https://richard-bernard-portfolio.vercel.app/',
    category: 'Development',
    role: 'Product Designer & Full-stack Developer',
    year: '2026',
    overview:
      'A motion-led personal portfolio paired with a private content-management system, built to present selected work and manage portfolio content without editing application code.',
    challenge:
      'The portfolio needed to be more than a static showcase: project updates should be manageable through a secure dashboard, drafts should stay private, images should be easy to upload, and contact enquiries should be handled away from the public site.',
    approach:
      'Built the public experience with Next.js 15, TypeScript, Tailwind CSS and Framer Motion. Integrated Supabase for PostgreSQL project records, Auth, Storage and row-level security. Added a server-side contact endpoint and deployed the application on Vercel.',
    solution:
      'A live public portfolio and a protected /admin workspace where the administrator can create, edit, publish or unpublish projects, upload cover imagery, and review and update contact-message statuses.',
    highlights: [
      'Responsive Next.js portfolio with motion-led project presentation',
      'Supabase PostgreSQL stores project content and publication status',
      'Supabase Auth and an admin allowlist protect the CMS',
      'Row-level security separates public reads from privileged project and message operations',
      'Supabase Storage supports project cover uploads',
      'A server-side contact endpoint feeds a private admin inbox',
      'Production deployment on Vercel',
    ],
    keyDecision:
      'Keep privileged operations behind authenticated admin membership and database row-level security, and keep the Supabase secret key on the server. Public visitors can read published project records only.',
    outcome:
      'Delivered the live portfolio at https://richard-bernard-portfolio.vercel.app/ with an activated administrator account, published project collection, private CMS, cover-image workflow and contact inbox. No analytics, user counts or conversion improvements are claimed.',
    technologies: [
      'Next.js 15',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Supabase',
      'PostgreSQL',
      'Supabase Auth',
      'Supabase Storage',
      'Row Level Security',
      'Vercel',
    ],
  },
];
