import uiuxImage from '@/assets/UI_UX.png'
import mvpImage from '@/assets/MVP_Dev.png'
import innovImage from '@/assets/Innov_SME.png'
import strategyImage from '@/assets/Pitchdeck.png'
import acornImg from '@/assets/Acorn.png'
import retasifyImg from '@/assets/Retasify.png'
import artistHubImg from '@/assets/ArtistHub.png'
import bentoBasketImg from '@/assets/BentoBasket.png'
import forensicLensImg from '@/assets/ForensicLens.png'
import trapiHausImg from '@/assets/TrapiHaus.png'

export type Capability = {
  title: string
  description: string
}

export type WhatWeBuild = {
  icon: string
  title: string
  description: string
  image?: string
}

export type Benefit = {
  icon: string
  iconColor: string
  title: string
  description: string
}

export type Example = {
  image: string
  title: string
  description: string
}

export type OfferDetail = {
  id: string
  label: string
  title: string
  headline: string
  heroIcon: string
  blurb: string
  deliverables: string[]
  capabilities: Capability[]
  whatWeBuild: WhatWeBuild[]
  benefits: Benefit[]
  examples: Example[]
  image?: string
}

export const offerDetails: OfferDetail[] = [
  {
    id: 'webdev',
    label: 'Web & App Development',
    title: 'Web & App Development',
    headline: 'Build digital products\nthat people actually use.',
    heroIcon: 'fa-solid fa-code',
    blurb:
      'Whether you\'re launching a startup, modernizing a business, or creating a new digital service, we help turn ideas into products that are simple, scalable, and ready for the real world.',
    image: mvpImage,
    deliverables: [
      'Prioritized feature roadmap',
      'Technical architecture & stack selection',
      'Clickable prototypes for stakeholder buy-in',
      'Production-ready build with QA',
      'Launch support & post-deploy monitoring',
    ],
    capabilities: [
      { title: 'Product Strategy Sprint', description: 'Align business goals with user needs to define the right scope before we write a line of code.' },
      { title: 'Full-Stack Engineering', description: 'Ship reliable web or mobile builds using modern frameworks and cloud infrastructure.' },
      { title: 'Experience Design', description: 'Map user journeys, stories, and UI flows to ensure the product feels complete from day one.' },
      { title: 'QA & Release Prep', description: 'Automated and manual testing ensure stability and confidence before every launch.' },
      { title: 'Analytics & Instrumentation', description: 'Implement product analytics so you capture the right learning signals post-launch.' },
      { title: 'Ongoing Support', description: 'We help deploy, monitor, and iterate through the first user feedback cycles.' },
    ],
    whatWeBuild: [
      { icon: 'fa-solid fa-rocket', title: 'Startup MVPs', description: 'Launch your idea without spending months or building unnecessary features.', image: retasifyImg },
      { icon: 'fa-solid fa-users', title: 'Customer Portals', description: 'Give customers a better way to interact with your business online.', image: acornImg },
      { icon: 'fa-solid fa-briefcase', title: 'Internal Business Systems', description: 'Replace spreadsheets and manual processes with tools designed around your workflow.', image: forensicLensImg },
      { icon: 'fa-solid fa-mobile-screen', title: 'Web & Mobile Apps', description: 'Create digital experiences customers can access anywhere.', image: bentoBasketImg },
    ],
    benefits: [
      { icon: 'fa-solid fa-rocket', iconColor: 'text-green-400 bg-green-400/15', title: 'Launch Faster', description: 'Turn ideas into working products in weeks, not months.' },
      { icon: 'fa-solid fa-shield-halved', iconColor: 'text-blue-400 bg-blue-400/15', title: 'Reduce Risk', description: 'Validate assumptions before investing heavily.' },
      { icon: 'fa-solid fa-star', iconColor: 'text-yellow-400 bg-yellow-400/15', title: 'Improve Customer Experience', description: 'Create intuitive digital experiences people enjoy using.' },
      { icon: 'fa-solid fa-chart-line', iconColor: 'text-purple-400 bg-purple-400/15', title: 'Scale Efficiently', description: 'Build systems that support growth without increasing complexity.' },
    ],
    examples: [
      { image: retasifyImg, title: 'Retasify', description: 'A task and project management platform built for growing teams.' },
      { image: acornImg, title: 'Acorn Brands Academy', description: 'An online learning and booking system for a growing brand education platform.' },
      { image: forensicLensImg, title: 'Forensic Lens', description: 'A mobile-first case management system for forensic professionals.' },
      { image: bentoBasketImg, title: 'BentoBasket', description: 'A marketplace platform that connects buyers and sellers of curated products.' },
    ],
  },
  {
    id: 'uiux',
    label: 'UI/UX Design',
    title: 'UI/UX Design',
    headline: 'Design experiences\npeople love to use.',
    heroIcon: 'fa-solid fa-pen-nib',
    blurb:
      'User-centered interfaces designed to improve usability, adoption, and business outcomes. We turn complex ideas into clear, engaging experiences that feel natural from the very first use.',
    image: uiuxImage,
    deliverables: [
      'A clear, validated user flow',
      'A complete, modern UI design system',
      'Interactive prototypes for testing and pitching',
      'High-fidelity screens ready for development',
    ],
    capabilities: [
      { title: 'User Research & Insights', description: 'We understand user needs, behaviors, and pain points to guide design decisions with clarity.' },
      { title: 'Information Architecture', description: 'We organize content and flows to create intuitive structures that feel effortless to navigate.' },
      { title: 'Wireframing & Prototyping', description: 'We turn ideas into interactive prototypes that visualize the experience before development begins.' },
      { title: 'High-Fidelity UI Design', description: 'We craft clean, modern interfaces built for usability and aesthetic precision.' },
      { title: 'Design Systems & Components', description: 'We build scalable systems that keep your product consistent and easy to grow.' },
      { title: 'Usability Testing & Refinement', description: 'We validate designs with real users and refine them for clarity and performance.' },
    ],
    whatWeBuild: [
      { icon: 'fa-solid fa-mobile-screen', title: 'Mobile App Designs', description: 'Native-feeling mobile experiences that users actually want to open every day.', image: forensicLensImg },
      { icon: 'fa-solid fa-desktop', title: 'Web App & Dashboard UI', description: 'Clean, data-rich interfaces that make complex systems easy to understand.', image: retasifyImg },
      { icon: 'fa-solid fa-swatchbook', title: 'Design Systems', description: 'Scalable component libraries that keep your product consistent as it grows.', image: artistHubImg },
      { icon: 'fa-solid fa-object-group', title: 'Prototypes & Concepts', description: 'Clickable prototypes to validate ideas before a single line of code is written.', image: trapiHausImg },
    ],
    benefits: [
      { icon: 'fa-solid fa-users', iconColor: 'text-blue-400 bg-blue-400/15', title: 'Higher Adoption', description: 'Intuitive designs reduce friction and increase product engagement.' },
      { icon: 'fa-solid fa-bolt', iconColor: 'text-yellow-400 bg-yellow-400/15', title: 'Faster Development', description: 'Detailed specs and design systems reduce back-and-forth with engineers.' },
      { icon: 'fa-solid fa-heart', iconColor: 'text-pink-400 bg-pink-400/15', title: 'Better Retention', description: 'Great UX turns first-time users into loyal, returning customers.' },
      { icon: 'fa-solid fa-chart-line', iconColor: 'text-green-400 bg-green-400/15', title: 'Stronger Conversions', description: 'Well-designed flows guide users toward the actions that matter.' },
    ],
    examples: [
      { image: retasifyImg, title: 'Retasify Dashboard', description: 'A clean project management UI built for clarity and fast navigation.' },
      { image: forensicLensImg, title: 'Forensic Lens App', description: 'A mobile UI designed for professionals working in demanding field conditions.' },
      { image: acornImg, title: 'Acorn Academy Portal', description: 'An e-learning portal designed for intuitive course discovery and enrollment.' },
      { image: artistHubImg, title: 'ArtistHub Platform', description: 'A community platform UI connecting artists and collaborators.' },
    ],
  },
  {
    id: 'bizsolutions',
    label: 'Business Innovation Solutions',
    title: 'Business Innovation Solutions',
    headline: 'Streamline operations,\ndrive real business growth.',
    heroIcon: 'fa-solid fa-chart-bar',
    blurb:
      'Streamline operations through automation, internal tools, and digital transformation initiatives. We help businesses replace manual processes with systems that scale.',
    image: innovImage,
    deliverables: [
      'Innovation roadmap & success metrics',
      'System architecture & integrations plan',
      'Custom tooling prototypes',
      'Implementation support & team enablement',
    ],
    capabilities: [
      { title: 'Stakeholder Discovery', description: 'We uncover constraints and opportunities across teams and existing systems.' },
      { title: 'Process Mapping & Redesign', description: 'We redesign workflows for automation, visibility, and better decision-making.' },
      { title: 'Solution Prototyping', description: 'We demo concepts quickly to align leadership around the right initiatives.' },
      { title: 'Systems Integration', description: 'We connect ERPs, CRMs, and bespoke tools with secure, scalable interfaces.' },
      { title: 'Change Enablement', description: 'We train teams and create documentation to accelerate adoption.' },
      { title: 'Performance Measurement', description: 'We implement dashboards and KPIs to track impact post-launch.' },
    ],
    whatWeBuild: [
      { icon: 'fa-solid fa-gears', title: 'Workflow Automation', description: 'Replace manual, error-prone tasks with automated systems that run 24/7.', image: acornImg },
      { icon: 'fa-solid fa-chart-pie', title: 'Business Dashboards', description: 'Real-time visibility into operations, sales, and performance metrics.', image: retasifyImg },
      { icon: 'fa-solid fa-plug', title: 'System Integrations', description: 'Connect your CRM, ERP, and tools so your data flows where it needs to go.', image: bentoBasketImg },
      { icon: 'fa-solid fa-toolbox', title: 'Internal Tools', description: 'Custom-built tools designed around how your team actually works.', image: artistHubImg },
    ],
    benefits: [
      { icon: 'fa-solid fa-clock', iconColor: 'text-blue-400 bg-blue-400/15', title: 'Save Time', description: 'Eliminate repetitive manual work so your team focuses on what matters.' },
      { icon: 'fa-solid fa-shield-halved', iconColor: 'text-green-400 bg-green-400/15', title: 'Reduce Errors', description: 'Automated systems minimize human error and improve data accuracy.' },
      { icon: 'fa-solid fa-eye', iconColor: 'text-yellow-400 bg-yellow-400/15', title: 'Full Visibility', description: 'See exactly what\'s happening in your business at any given moment.' },
      { icon: 'fa-solid fa-chart-line', iconColor: 'text-purple-400 bg-purple-400/15', title: 'Scale Operations', description: 'Build systems that grow with your business without adding headcount.' },
    ],
    examples: [
      { image: retasifyImg, title: 'Operations Dashboard', description: 'A real-time dashboard that gave management full visibility into daily operations.' },
      { image: acornImg, title: 'Booking & Scheduling System', description: 'An automated booking system that eliminated manual scheduling for a service business.' },
      { image: bentoBasketImg, title: 'Inventory Management', description: 'A simple inventory and stock management system built for SMEs.' },
      { image: artistHubImg, title: 'Community Platform', description: 'A platform that brought people together and automated member management.' },
    ],
  },
  {
    id: 'strategy',
    label: 'Innovation & Product Strategy',
    title: 'Innovation & Product Strategy',
    headline: 'Turn your ideas into\nan actionable product plan.',
    heroIcon: 'fa-solid fa-lightbulb',
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
      { title: 'Opportunity Discovery', description: 'We research markets, users, and competitors to identify where real value can be created.' },
      { title: 'Problem Validation', description: 'We run structured interviews and experiments to confirm the problem is worth solving.' },
      { title: 'Product Roadmapping', description: 'We translate insights into a prioritized roadmap that balances impact and feasibility.' },
      { title: 'Story Strategy', description: 'We align market context, traction, and vision into a compelling product narrative.' },
      { title: 'Go-to-Market Planning', description: 'We define the channels, positioning, and launch sequence to reach early customers.' },
      { title: 'Investor Readiness', description: 'We help founders pressure-test their strategy and present it with confidence.' },
    ],
    whatWeBuild: [
      { icon: 'fa-solid fa-map', title: 'Product Roadmaps', description: 'A prioritized plan that shows what to build, when, and why — with full stakeholder alignment.', image: trapiHausImg },
      { icon: 'fa-solid fa-magnifying-glass-chart', title: 'Market Research', description: 'Deep-dive into your market to understand competitors, trends, and real opportunities.', image: acornImg },
      { icon: 'fa-solid fa-rectangle-list', title: 'Pitch Decks & Narratives', description: 'Investor-ready decks that communicate your vision clearly and compellingly.', image: forensicLensImg },
      { icon: 'fa-solid fa-bullseye', title: 'Go-to-Market Strategy', description: 'A clear launch plan covering channels, positioning, and early customer acquisition.', image: artistHubImg },
    ],
    benefits: [
      { icon: 'fa-solid fa-compass', iconColor: 'text-blue-400 bg-blue-400/15', title: 'Clarity Before Code', description: 'Define what to build before spending on development.' },
      { icon: 'fa-solid fa-shield-halved', iconColor: 'text-green-400 bg-green-400/15', title: 'Reduce Costly Pivots', description: 'Validate your assumptions early to avoid building the wrong thing.' },
      { icon: 'fa-solid fa-handshake', iconColor: 'text-yellow-400 bg-yellow-400/15', title: 'Investor Confidence', description: 'Walk into any room with a story that\'s clear, credible, and compelling.' },
      { icon: 'fa-solid fa-rocket', iconColor: 'text-purple-400 bg-purple-400/15', title: 'Faster Execution', description: 'A solid strategy means your team moves faster with less back-and-forth.' },
    ],
    examples: [
      { image: forensicLensImg, title: 'Forensic Lens Strategy', description: 'Defined the product vision, roadmap, and pitch narrative for a forensic tech startup.' },
      { image: bentoBasketImg, title: 'BentoBasket GTM', description: 'Developed the go-to-market strategy and early acquisition playbook for a new marketplace.' },
      { image: trapiHausImg, title: 'TrapiHaus Roadmap', description: 'Created a product roadmap and investor narrative from an early-stage idea.' },
      { image: acornImg, title: 'Acorn Brand Strategy', description: 'Shaped the product positioning and pitch deck for an Amazon brand education platform.' },
    ],
  },
]

export const DEFAULT_SERVICE_ID = offerDetails[0]?.id ?? 'webdev'
