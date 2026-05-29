import uiuxImage from '@/assets/UI_UX.png'
import mvpImage from '@/assets/MVP_Dev.png'
import innovImage from '@/assets/Innov_SME.png'
import strategyImage from '@/assets/Pitchdeck.png'

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
    id: 'webdev',
    label: 'Web & App Development',
    badge: 'Launch a production-ready product in 6-10 weeks',
    title: 'Web & App Development',
    blurb:
      'Web applications, mobile apps, MVPs, and custom platforms built for real-world growth. We balance speed and quality so you can ship fast and scale with confidence.',
    image: mvpImage,
    deliverables: [
      'Prioritized feature roadmap',
      'Technical architecture & stack selection',
      'Clickable prototypes for stakeholder buy-in',
      'Production-ready build with QA',
      'Launch support & post-deploy monitoring',
    ],
    capabilities: [
      {
        title: 'Product Strategy Sprint',
        description: 'Align business goals with user needs to define the right scope before we write a line of code.',
      },
      {
        title: 'Full-Stack Engineering',
        description: 'Ship reliable web or mobile builds using modern frameworks and cloud infrastructure.',
      },
      {
        title: 'Experience Design',
        description: 'Map user journeys, stories, and UI flows to ensure the product feels complete from day one.',
      },
      {
        title: 'QA & Release Prep',
        description: 'Automated and manual testing ensure stability and confidence before every launch.',
      },
      {
        title: 'Analytics & Instrumentation',
        description: 'Implement product analytics so you capture the right learning signals post-launch.',
      },
      {
        title: 'Ongoing Support',
        description: 'We help deploy, monitor, and iterate through the first user feedback cycles.',
      },
    ],
  },
  {
    id: 'uiux',
    label: 'UI/UX Design',
    badge: 'From concept to validated prototype in 2-4 weeks',
    title: 'UI/UX Design',
    blurb:
      'User-centered interfaces designed to improve usability, adoption, and business outcomes. We turn complex ideas into clear, engaging experiences that feel natural from the first use.',
    image: uiuxImage,
    deliverables: [
      'A clear, validated user flow',
      'A complete, modern UI design system',
      'Interactive prototypes for testing and pitching',
      'High-fidelity screens ready for development',
    ],
    capabilities: [
      {
        title: 'User Research & Insights',
        description: 'We understand user needs, behaviors, and pain points to guide design decisions with clarity.',
      },
      {
        title: 'Information Architecture',
        description: 'We organize content and flows to create intuitive structures that feel effortless to navigate.',
      },
      {
        title: 'Wireframing & Prototyping',
        description: 'We turn ideas into interactive prototypes that visualize the experience before development begins.',
      },
      {
        title: 'High-Fidelity UI Design',
        description: 'We craft clean, modern interfaces built for usability and aesthetic precision.',
      },
      {
        title: 'Design Systems & Components',
        description: 'We build scalable systems that keep your product consistent and easy to grow.',
      },
      {
        title: 'Usability Testing & Refinement',
        description: 'We validate designs with real users and refine them for clarity and performance.',
      },
    ],
  },
  {
    id: 'bizsolutions',
    label: 'Business Innovation Solutions',
    badge: 'Streamline operations through automation and digital tools',
    title: 'Business Innovation Solutions',
    blurb:
      'Streamline operations through automation, internal tools, and digital transformation initiatives. We help SMEs modernize legacy workflows and deliver systems that operate at startup speed.',
    image: innovImage,
    deliverables: [
      'Innovation roadmap & success metrics',
      'System architecture & integrations plan',
      'Custom tooling prototypes',
      'Implementation support & team enablement',
    ],
    capabilities: [
      {
        title: 'Stakeholder Discovery',
        description: 'We uncover constraints and opportunities across teams and existing systems.',
      },
      {
        title: 'Process Mapping & Redesign',
        description: 'We redesign workflows for automation, visibility, and better decision-making.',
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
    id: 'strategy',
    label: 'Innovation & Product Strategy',
    badge: 'Turn ideas into actionable product plans',
    title: 'Innovation & Product Strategy',
    blurb:
      'Turn ideas into actionable product plans through research, validation, and strategic direction. We help founders and teams move from uncertainty to a clear, funded, executable roadmap.',
    image: strategyImage,
    deliverables: [
      'Validated problem-solution fit',
      'Opportunity sizing & market framing',
      'Product roadmap & prioritization framework',
      'Go-to-market strategy outline',
      'Investor-ready narrative and deck',
    ],
    capabilities: [
      {
        title: 'Opportunity Discovery',
        description: 'We research markets, users, and competitors to identify where real value can be created.',
      },
      {
        title: 'Problem Validation',
        description: 'We run structured interviews and experiments to confirm the problem is worth solving.',
      },
      {
        title: 'Product Roadmapping',
        description: 'We translate insights into a prioritized roadmap that balances impact and feasibility.',
      },
      {
        title: 'Story Strategy',
        description: 'We align market context, traction, and vision into a compelling product narrative.',
      },
      {
        title: 'Go-to-Market Planning',
        description: 'We define the channels, positioning, and launch sequence to reach early customers.',
      },
      {
        title: 'Investor Readiness',
        description: 'We help founders pressure-test their strategy and present it with confidence.',
      },
    ],
  },
]

export const DEFAULT_SERVICE_ID = offerDetails[0]?.id ?? 'webdev'
