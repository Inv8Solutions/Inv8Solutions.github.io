export type Capability = {
  title: string
  description: string
}

export type OfferDetail = {
  id: string
  label: string
  badge: string
  title: string
  blurb: string
  deliverables: string[]
  capabilities: Capability[]
  image?: string
}

export const offerDetails: OfferDetail[] = [
  {
    id: 'uiux',
    label: 'UI/UX Design',
    badge: 'From concept to validated prototype in 2-4 weeks',
    title: 'UI/UX Design Services',
    blurb:
      'We create user-centered interfaces that turn complex ideas into clear, usable, and engaging experiences. Our design process focuses on understanding real needs, simplifying interactions, and crafting products that feel natural from the very first use.',
    image: '/src/assets/UI_UX.png',
    deliverables: [
      'A clear, validated user flow',
      'A complete, modern UI design system',
      'Interactive prototypes for testing and pitching',
      'High-fidelity screens ready for development',
    ],
    capabilities: [
      {
        title: 'User Research & Insights',
        description:
          'We understand user needs, behaviors, and pain points to guide design decisions with clarity.',
      },
      {
        title: 'Information Architecture',
        description:
          'We organize content and flows to create intuitive structures that feel effortless to navigate.',
      },
      {
        title: 'Wireframing & Prototyping',
        description:
          'We turn ideas into interactive prototypes that visualize how the experience works before development begins.',
      },
      {
        title: 'High-Fidelity UI Design',
        description:
          'We craft clean, modern interfaces built for usability and aesthetic precision.',
      },
      {
        title: 'Design Systems & Components',
        description:
          'We build scalable systems that keep your product consistent and easy to grow.',
      },
      {
        title: 'Usability Testing & Refinement',
        description:
          'We validate designs with real users and refine them for clarity and performance.',
      },
    ],
  },
  {
    id: 'mvp',
    label: 'MVP Development',
    badge: 'Launch a product-ready MVP in 6-10 weeks',
    title: 'MVP Development Services',
    blurb:
      'We partner with founders to scope, design, and build lean MVPs that validate your product vision quickly. Our process balances speed and quality so you can learn faster and raise with confidence.',
    image: '/src/assets/MVP_Dev.png',
    deliverables: [
      'Prioritized feature roadmap',
      'Technical architecture & stack selection',
      'Clickable prototypes for stakeholder buy-in',
      'Production-ready MVP build with QA',
    ],
    capabilities: [
      {
        title: 'Product Strategy Sprint',
        description: 'Align business goals with user needs to define the MVP scope.',
      },
      {
        title: 'Experience Design',
        description: 'Map journeys, user stories, and UI flows to ensure the MVP feels complete.',
      },
      {
        title: 'Full-Stack Engineering',
        description: 'Ship reliable web or mobile builds using modern frameworks and cloud infra.',
      },
      {
        title: 'QA & Release Prep',
        description: 'Automated and manual testing ensure stability before launch.',
      },
      {
        title: 'Analytics & Instrumentation',
        description: 'Implement product analytics so you capture the right learning signals.',
      },
      {
        title: 'Launch Support',
        description: 'We help deploy, monitor, and iterate through the first user feedback cycles.',
      },
    ],
  },
  {
    id: 'innovation',
    label: 'Innovation for SMEs',
    badge: 'Digitize operations with modern systems',
    title: 'Innovation Programs for SMEs',
    blurb:
      'We modernize legacy workflows, connect data silos, and deliver tools that help SMEs operate with the speed of startups. From discovery to rollout, we guide teams through every phase.',
    image: '/src/assets/Innov_SME.png',
    deliverables: [
      'Innovation roadmap & success metrics',
      'System architecture & integrations plan',
      'Custom tooling prototypes',
      'Implementation support & enablement',
    ],
    capabilities: [
      {
        title: 'Stakeholder Discovery',
        description: 'We uncover constraints and opportunities across teams and existing systems.',
      },
      {
        title: 'Process Mapping',
        description:
          'We redesign workflows for automation, visibility, and better decision-making.',
      },
      {
        title: 'Solution Prototyping',
        description: 'We demo concepts quickly to align leadership around the right initiatives.',
      },
      {
        title: 'Systems Integration',
        description: 'We connect ERPs, CRMs, and bespoke tools with secure, scalable interfaces.',
      },
      {
        title: 'Change Enablement',
        description: 'We train teams and create documentation to accelerate adoption.',
      },
      {
        title: 'Performance Measurement',
        description: 'We implement dashboards and KPIs to track impact post-launch.',
      },
    ],
  },
  {
    id: 'iot',
    label: 'IoT Development',
    badge: 'Connect devices to insight-driven platforms',
    title: 'IoT Product Development',
    blurb:
      'We design embedded experiences, real-time dashboards, and secure cloud infrastructure so your devices deliver continuous value. Our team bridges hardware realities with elegant digital layers.',
    image: '/src/assets/IoT_Dev.png',
    deliverables: [
      'Hardware-to-cloud architecture',
      'Device companion app UI/UX',
      'Telemetry & alerting dashboards',
      'Security & compliance checklist',
    ],
    capabilities: [
      {
        title: 'Embedded UX',
        description: 'We shape on-device interactions that feel effortless in the field.',
      },
      {
        title: 'Cloud Platform Design',
        description: 'We architect resilient APIs and data models for scalable device fleets.',
      },
      {
        title: 'Data Visualization',
        description: 'We craft dashboards that surface the right telemetry for each persona.',
      },
      {
        title: 'Automation & Alerts',
        description: 'We build rule engines that turn signals into smart automations.',
      },
      {
        title: 'Security & Compliance',
        description: 'We bake in encryption, device auth, and audit trails from day one.',
      },
      {
        title: 'Lifecycle Support',
        description: 'We plan for over-the-air updates, monitoring, and operational tooling.',
      },
    ],
  },
  {
    id: 'pitchdeck',
    label: 'Pitchdeck Design',
    badge: 'Tell a sharper story to investors',
    title: 'Pitchdeck & Narrative Design',
    blurb:
      'We craft decks that communicate your vision with precision—combining story structure, data visualization, and refined visuals that resonate with investors, partners, and customers.',
    image: '/src/assets/Pitchdeck.png',
    deliverables: [
      'Narrative arc & messaging hierarchy',
      'Custom slide design system',
      'Data visualizations & illustrations',
      'Presentation coaching & rehearsal',
    ],
    capabilities: [
      {
        title: 'Story Strategy',
        description: 'We align market context, traction, and vision into a compelling arc.',
      },
      {
        title: 'Slide Design',
        description: 'We design clean, premium slides that emphasize clarity over clutter.',
      },
      {
        title: 'Investor Narrative Review',
        description: 'We stress-test the story for common questions and objections.',
      },
      {
        title: 'Data & Financial Visualization',
        description: 'We turn complex data into simple, persuasive visuals.',
      },
      {
        title: 'Speaker Coaching',
        description: 'We help founders present with confidence through rehearsal sessions.',
      },
      {
        title: 'Delivery Kit',
        description: 'We package editable files, exports, and talking points for future updates.',
      },
    ],
  },
]

export const DEFAULT_SERVICE_ID = offerDetails[0]?.id ?? 'uiux'
