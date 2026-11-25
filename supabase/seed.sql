-- Initial published portfolio projects.
-- Run after the initial schema migration. Safe to re-run by slug.

insert into public.projects (
  slug, name, type, desc, tags, visual, featured,
  prototype_url, behance_url, category, role, year,
  overview, challenge, approach, solution, highlights,
  key_decision, outcome, technologies, status, sort_order
)
values
(
  'rentdirect', 'RentDirect', 'Property technology · Product concept',
  'A rental management platform for landlords and tenants.',
  array['Product Design', 'UX'], 'rent', true,
  'https://www.figma.com/proto/r6UqljhCgzP8LzJdxJFi2M/Untitled?node-id=322-1207&p=f&t=7UxA4ZdhB97FrySi-0&scaling=scale-down&content-scaling=fixed&page-id=98%3A20&starting-point-node-id=315%3A404',
  null, 'Product Design', 'Product Designer', '2026',
  'RentDirect explores a more transparent relationship between landlords and tenants through digital rent management.',
  'Renters and property owners often deal with fragmented communication, payment tracking, rental agreements, and uncertainty around rental transactions.',
  'I explored the needs of both sides of the rental relationship and organized the experience around the tasks they need to complete and the information they need to trust.',
  'A digital experience that brings rental information, payment tracking, tenant-landlord communication, and documentation into one platform.',
  array['Landlord and tenant-focused experiences', 'Rent tracking and payment visibility', 'Rental information and documentation', 'A more transparent rental workflow'],
  'Separate landlord and tenant task paths while keeping rent status, communication and rental records easy to find.',
  'Produced a clickable rental-management concept that brings rent tracking, communication and records into one workflow; no live deployment or measured user impact is claimed.',
  array['Figma', 'Product Strategy', 'UX Research', 'UI Design'], 'published', 1
),
(
  'pocketplan', 'PocketPlan', 'Personal finance · Product concept',
  'A personal finance app for smarter money management.',
  array['Product Design', 'Fintech'], 'pocket', false,
  'https://www.figma.com/proto/zvizPqRuzBwDaUNRnryZ64/Untitled?t=7UxA4ZdhB97FrySi-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=99-780&starting-point-node-id=1%3A2',
  'https://www.behance.net/gallery/258898333/POCKET-PLAN',
  'Product Design', 'Product Designer', '2026',
  'PocketPlan is a personal finance product concept designed to help people better understand and manage their finances.',
  'Making financial information easier to understand while helping users build healthier money-management habits.',
  'I focused on simplifying the financial overview, prioritizing the information users need most, and making planning actions feel approachable rather than overwhelming.',
  'A dashboard-led experience with financial overviews, planning tools, and approachable visual feedback.',
  array['At-a-glance financial overview', 'Planning and budgeting concepts', 'Clear information hierarchy', 'Approachable visual feedback'],
  'Lead with a scannable financial overview and make planning actions approachable before exposing deeper detail.',
  'Produced a personal-finance concept and linked prototype to demonstrate the dashboard and planning direction; no launch or performance metrics are claimed.',
  array['Figma', 'Product Design', 'Prototyping', 'UX/UI'], 'published', 2
),
(
  'border-cash', 'Border Cash', 'Finance application · Product concept',
  'A finance application concept. Explore the original project on Behance.',
  array['Product Design', 'Fintech', 'Mobile UI'], 'border', false,
  null, 'https://www.behance.net/gallery/258677609/FINACE-APPLICATION',
  'Product Design', 'Product Designer', '2026',
  'A finance application product concept documented through the linked Behance presentation.',
  'The concept explores how a finance application can present core money-related tasks in a clear mobile interface.',
  'I developed a visual and interaction direction for a focused finance experience, using the linked presentation as the public project record.',
  'A mobile finance application interface concept with a clear visual direction.',
  array['Finance-focused interface direction', 'Mobile UI exploration', 'Visual hierarchy', 'Portfolio presentation'],
  'Keep the interface focused on the primary finance experience and present its visual direction as a concise mobile concept.',
  'Documented the finance-application concept in a Behance presentation; no live deployment, adoption or performance metrics are claimed.',
  array['Figma', 'Product Design', 'UI Design'], 'published', 3
),
(
  'ajo-circle', 'Ajo Circle', 'Group savings · Product concept',
  'A digital group-savings product concept.',
  array['Product Design', 'Fintech', 'Mobile UI'], 'ajo', false,
  'https://www.figma.com/proto/JtyYWZw07pP35zCG1ajcyG/Ajo-Circles-%E2%80%94-Savings-App?node-id=2-38&t=7UxA4ZdhB97FrySi-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A106&show-proto-sidebar=1',
  'https://www.behance.net/gallery/257685169/Ajo-circle',
  'Product Design', 'Product Designer', '2026',
  'A group-savings product concept supported by a linked Figma prototype and Behance presentation.',
  'Group savings needs clear contribution expectations, visibility and trust between members of a savings circle.',
  'I explored a circle-based experience that makes the shared nature of saving central to the product.',
  'A group-savings interface concept for organizing contributions and shared saving activity.',
  array['Circle-based savings model', 'Group contribution concepts', 'Mobile interface direction', 'Interactive Figma prototype'],
  'Make the savings circle the organizing idea so members can understand the shared goal and their contributions.',
  'Created a group-savings product concept with a linked Figma prototype and Behance presentation; no live deployment or measured impact is claimed.',
  array['Figma', 'Product Design', 'UI Design'], 'published', 4
),
(
  'powerwatch', 'PowerWatch', 'Power monitoring · Product concept',
  'A power-monitoring product concept.',
  array['Product Design', 'Monitoring', 'Mobile UI'], 'power', false,
  'https://www.figma.com/proto/bTjRgxXR9df2ScuL1kANPm/Power-Monitor-App---Login---Home?t=7UxA4ZdhB97FrySi-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=2-2&starting-point-node-id=1%3A2',
  'https://www.behance.net/gallery/257610769/Power-Monitor',
  'Product Design', 'Product Designer', '2026',
  'A power-monitoring app concept documented through a linked Figma prototype and Behance presentation.',
  'People need a clear way to understand power usage and monitor important status information.',
  'I explored a focused app interface that makes essential monitoring information easier to scan.',
  'A power-monitoring interface concept with a dashboard-led direction.',
  array['At-a-glance monitoring concept', 'Dashboard interface direction', 'Mobile UI exploration', 'Interactive Figma prototype'],
  'Prioritize essential usage and monitoring information in a focused dashboard rather than crowding the interface.',
  'Created a power-monitoring app concept with a linked Figma prototype and Behance presentation; no live deployment or measured impact is claimed.',
  array['Figma', 'Product Design', 'UI Design'], 'published', 5
)
on conflict (slug) do nothing;
