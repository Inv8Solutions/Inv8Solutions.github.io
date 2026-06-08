import uiuxImage from '@/assets/UI_UX.png'
import mvpImage from '@/assets/MVP_Dev.png'
import innovImage from '@/assets/Innov_SME.png'
import strategyImage from '@/assets/Pitchdeck.png'
import acornImg from '@/assets/Acorn.png'
import retasifyImg from '@/assets/Retasify.png'
import webMobileAppImg from '@/assets/Web_MobileApp.png'
import pitchdeckImg from '@/assets/Pitchdeck.png'
import landingPageImg from '@/assets/landing_page.png'
import businessInnovationImg from '@/assets/Business_Innovation.png'
import websiteRedesignImg from '@/assets/Website_redesign.png'
import digitalPresenceImg from '@/assets/DigitalPresence.png'
import businessModelImg from '@/assets/business_model.png'
import pitchProposalImg from '@/assets/pitch_proposal_design.png'
import artistHubImg from '@/assets/ArtistHub.png'
import bentoBasketImg from '@/assets/BentoBasket.png'
import forensicLensImg from '@/assets/ForensicLens.png'
import trapiHausImg from '@/assets/TrapiHaus.png'

export type Service = {
  title: string
  description: string
  bestFor: string
  image: string
}

export type Audience = {
  id: string
  label: string
  icon: string
  sectionHeader: string
  sectionTagline: string
  sectionIntro: string
  services: Service[]
}

export const audiences: Audience[] = [
  {
    id: 'founders',
    label: 'Founders & Startups',
    icon: 'fa-solid fa-rocket',
    sectionHeader: 'For Founders & Startups',
    sectionTagline: 'You have an idea. Let\'s figure out what to build first.',
    sectionIntro:
      'Starting is hard. We help early-stage founders focus on what matters most, move faster, and show up prepared in front of the people who can help them grow.',
    services: [
      {
        title: 'MVP Development',
        description:
          'Your first product should answer one question: do real people want this? We build simple, working web apps that you can put in front of actual users and learn from. No overbuilding. No wasted months. Just something real you can test.',
        bestFor: 'First-time founders, hackathon winners, grant recipients who need to show progress',
        image: mvpImage,
      },
      {
        title: 'Product Design (UI/UX)',
        description:
          'Before we design a single screen, we talk to your users. We map how they think, what they need, and where they get stuck. Then we design something that actually works for them. From sketches to interactive prototypes, ready to test or present.',
        bestFor: 'Founders preparing for launch or investor presentations',
        image: uiuxImage,
      },
      {
        title: 'Web and Mobile App Design',
        description:
          'Whether you need a customer-facing web platform or a mobile app your users will actually enjoy using, we design it from the ground up. We focus on clarity, ease of use, and experiences that keep people coming back.',
        bestFor: 'Founders and early-stage teams ready to build their core product',
        image: webMobileAppImg,
      },
      {
        title: 'Pitch Deck Design',
        description:
          'A good pitch tells a clear story. We help you figure out what that story is, then design a deck that communicates it simply and confidently. Structure, visuals, and flow that keeps people engaged from the first slide to the last.',
        bestFor: 'Founders applying to accelerators, government grants, or angel investors',
        image: pitchdeckImg,
      },
      {
        title: 'Landing Page',
        description:
          'Test your idea before you build the full product. We design and build a simple, focused page that explains what you do, who it is for, and what people should do next. A good landing page can save you months of building the wrong thing.',
        bestFor: 'Founders still validating their idea, early marketing, pre-launch signups',
        image: landingPageImg,
      },
    ],
  },
  {
    id: 'organizations',
    label: 'Organizations & LGUs',
    icon: 'fa-solid fa-building-columns',
    sectionHeader: 'For Organizations & LGUs',
    sectionTagline: 'You want to support innovation in your community. We help you do it well.',
    sectionIntro:
      'Running an innovation program takes more than good intentions. It takes the right structure, the right facilitation, and a clear plan. We have designed and operated programs from scratch and we bring that experience to your team.',
    services: [
      {
        title: 'Incubation Program Design',
        description:
          'A well-designed program changes the direction of every participant who goes through it. We help you build the right structure, set meaningful milestones, connect founders with the right mentors, and define what success actually looks like for your community.',
        bestFor: 'State universities, LGUs, technology business incubators setting up or improving programs',
        image: innovImage,
      },
      {
        title: 'Innovation Workshops and Facilitation',
        description:
          'The best ideas come from people who feel heard. We design and facilitate workshops that help your team or community understand a problem, explore solutions, and walk away with something they can act on. No lectures. Real conversations.',
        bestFor: 'Organizations starting a new initiative, community problem-solving sessions, pre-program discovery',
        image: strategyImage,
      },
      {
        title: 'Startup Competition Design',
        description:
          'A competition is only as good as what it produces. We design the full experience from concept to mechanics to judging, so your event creates real momentum for participants and real value for your organization.',
        bestFor: 'LGUs, universities, corporate programs, government agencies',
        image: acornImg,
      },
      {
        title: 'Capacity Building',
        description:
          'When we leave, the knowledge should stay. We train your internal team on the tools and methods they need to run innovation programs confidently on their own. Practical, hands-on, built around how your team actually works.',
        bestFor: 'TBI staff, LGU innovation officers, university faculty running startup programs',
        image: innovImage,
      },
      {
        title: 'Program Documentation and Reporting',
        description:
          'Good programs deserve good documentation. We produce reports, playbooks, monitoring and evaluation frameworks, and impact stories that satisfy funder requirements and communicate your program\'s value clearly to partners and stakeholders.',
        bestFor: 'Organizations reporting to DOST, DICT, or international development partners',
        image: strategyImage,
      },
    ],
  },
  {
    id: 'msmes',
    label: 'MSMEs & Social Enterprises',
    icon: 'fa-solid fa-store',
    sectionHeader: 'For MSMEs and Social Enterprises',
    sectionTagline: 'You have built something real. Let us help you take it further.',
    sectionIntro:
      'You do not need to be the biggest business in the room to operate like one. You need a digital presence that works, a website people trust, and a clear picture of where your business is going. We work with small businesses and mission-driven organizations who are ready to grow with intention.',
    services: [
      {
        title: 'Business Innovation Discovery',
        description:
          'Before you invest in anything new, understand what is actually holding you back. We run a structured discovery process that looks at your business model, your customers, and your operations, then surfaces the most important opportunities for growth and innovation. You walk away with a clear picture of what to fix, what to double down on, and what to do next.',
        bestFor: 'MSMEs and social enterprises ready to grow but unsure where to start, organizations wanting to innovate but needing a grounded starting point',
        image: businessInnovationImg,
      },
      {
        title: 'Website Redesign',
        description:
          'Your website should work as hard as you do. We redesign sites that are slow, confusing, or hard to find into something clean, fast, and easy to navigate, so visitors understand what you offer and know how to reach you.',
        bestFor: 'Businesses with outdated or underperforming websites',
        image: websiteRedesignImg,
      },
      {
        title: 'Digital Presence Setup',
        description:
          'If people cannot find you online, they will find someone else. We set up and organize your Google Business Profile, social media pages, and basic digital presence so you show up where your customers are already looking.',
        bestFor: 'Businesses stepping into online channels for the first time',
        image: digitalPresenceImg,
      },
      {
        title: 'Business Model Design',
        description:
          'Sometimes the product is not the problem. Sometimes it is the model. We sit with you, map out how your business creates and delivers value, and help you find the changes that will make the biggest difference.',
        bestFor: 'Social enterprises working on long-term sustainability, MSMEs ready to grow but unsure how',
        image: businessModelImg,
      },
      {
        title: 'Pitch and Proposal Design',
        description:
          'Whether you are applying for a grant, building a partnership, or presenting your work to funders, how you tell your story matters. We help you shape that story and design materials that are clear, compelling, and easy to act on.',
        bestFor: 'Social enterprises applying to foundations, MSMEs seeking government or LGU partnerships',
        image: pitchProposalImg,
      },
    ],
  },
]

export const DEFAULT_AUDIENCE_ID = audiences[0]?.id ?? 'founders'

// Legacy exports kept for any components that still reference them
export type OfferDetail = {
  id: string
  label: string
  title: string
  headline: string
  heroIcon: string
  blurb: string
  deliverables: string[]
  capabilities: { title: string; description: string }[]
  whatWeBuild: { icon: string; title: string; description: string; image?: string }[]
  benefits: { icon: string; iconColor: string; title: string; description: string }[]
  examples: { image: string; title: string; description: string }[]
  image?: string
}

export const offerDetails: OfferDetail[] = []
export const DEFAULT_SERVICE_ID = DEFAULT_AUDIENCE_ID
