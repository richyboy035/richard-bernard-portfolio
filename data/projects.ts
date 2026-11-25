export type Project = {
  name: string;
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
    outcome:
      'The concept brings key rental tasks into one place and explores how clearer information can reduce friction between tenants and landlords.',
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
    outcome:
      'The concept demonstrates a simpler way to present personal finance information and encourage more intentional money management.',
    technologies: ['Figma', 'Product Design', 'Prototyping', 'UX/UI'],
  },

  {
    name: 'Border Cash', type: 'Finance application · Product concept', desc: 'A finance application concept. Explore the original project on Behance.',
    tags: ['Product Design', 'Fintech', 'Mobile UI'], visual: 'border', category: 'Product Design', role: 'Product Designer', year: '2026',
    behanceUrl: 'https://www.behance.net/gallery/258677609/FINACE-APPLICATION',
    overview: 'Project details will be developed from the original Behance presentation.',
    challenge: 'The original project brief and design context will be added after reviewing the project visuals.',
    approach: 'The case study will be expanded using the original screens and design process.',
    solution: 'The product experience will be documented from the original project materials.',
    highlights: ['Original project visuals', 'Product flow', 'Interface design', 'Design decisions'],
    outcome: 'Case study details are being prepared.', technologies: ['Figma', 'Product Design', 'UI Design'],
  },
  {
    name: 'Ajo Circle', type: 'Group savings · Product concept', desc: 'A digital product concept. Explore the original project on Behance.',
    tags: ['Product Design', 'Fintech', 'Mobile UI'], visual: 'ajo', prototypeUrl: 'https://www.figma.com/proto/JtyYWZw07pP35zCG1ajcyG/Ajo-Circles-%E2%80%94-Savings-App?node-id=2-38&t=7UxA4ZdhB97FrySi-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A106&show-proto-sidebar=1', category: 'Product Design', role: 'Product Designer', year: '2026',
    behanceUrl: 'https://www.behance.net/gallery/257685169/Ajo-circle',
    overview: 'Project details will be developed from the original Behance presentation.',
    challenge: 'The original project brief and design context will be added after reviewing the project visuals.',
    approach: 'The case study will be expanded using the original screens and design process.',
    solution: 'The product experience will be documented from the original project materials.',
    highlights: ['Original project visuals', 'Product flow', 'Interface design', 'Design decisions'],
    outcome: 'Case study details are being prepared.', technologies: ['Figma', 'Product Design', 'UI Design'],
  },
  {
    name: 'PowerWatch', type: 'Power monitoring · Product concept', desc: 'A power-monitoring product concept. Explore the original project on Behance.',
    tags: ['Product Design', 'Monitoring', 'Mobile UI'], visual: 'power', prototypeUrl: 'https://www.figma.com/proto/bTjRgxXR9df2ScuL1kANPm/Power-Monitor-App---Login---Home?t=7UxA4ZdhB97FrySi-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=2-2&starting-point-node-id=1%3A2', category: 'Product Design', role: 'Product Designer', year: '2026',
    behanceUrl: 'https://www.behance.net/gallery/257610769/Power-Monitor',
    overview: 'Project details will be developed from the original Behance presentation.',
    challenge: 'The original project brief and design context will be added after reviewing the project visuals.',
    approach: 'The case study will be expanded using the original screens and design process.',
    solution: 'The product experience will be documented from the original project materials.',
    highlights: ['Original project visuals', 'Product flow', 'Interface design', 'Design decisions'],
    outcome: 'Case study details are being prepared.', technologies: ['Figma', 'Product Design', 'UI Design'],
  },
];

