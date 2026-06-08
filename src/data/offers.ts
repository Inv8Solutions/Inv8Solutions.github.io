import uiuxImage from '@/assets/UI_UX.png'
import mvpImage from '@/assets/MVP_Dev.png'
import innovImage from '@/assets/Innov_SME.png'
import strategyImage from '@/assets/Pitchdeck.png'
import acornImg from '@/assets/Acorn.png'
import retasifyImg from '@/assets/Retasify.png'
import webMobileAppImg from '@/assets/Web_MobileApp.png'
import pitchdeckImg from '@/assets/Pitchdeck.png'
import landingPageImg from '@/assets/landing_page.png'
import incubationProgramImg from '@/assets/Incubation_Program.png'
import facilitationImg from '@/assets/facilitation.png'
import pitchImg from '@/assets/Pitch.png'
import capacityImg from '@/assets/capacity.png'
import programDocImg from '@/assets/program_documentation.png'
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
        title: 'Innovation Program Design',
        description:
          'A well-designed program changes the direction of every participant who goes through it. We help you build the right structure, set meaningful milestones, connect founders with the right mentors, and define what success actually looks like for your community.',
        bestFor: 'State universities, LGUs, technology business incubators setting up or improving programs',
        image: incubationProgramImg,
      },
      {
        title: 'Innovation Workshops and Facilitation',
        description:
          'The best ideas come from people who feel heard. We design and facilitate workshops that help your team or community understand a problem, explore solutions, and walk away with something they can act on. No lectures. Real conversations.',
        bestFor: 'Organizations starting a new initiative, community problem-solving sessions, pre-program discovery',
        image: facilitationImg,
      },
      {
        title: 'Startup Competition Design',
        description:
          'A competition is only as good as what it produces. We design the full experience from concept to mechanics to judging, so your event creates real momentum for participants and real value for your organization.',
        bestFor: 'LGUs, universities, corporate programs, government agencies',
        image: pitchImg,
      },
      {
        title: 'Capacity Building',
        description:
          'When we leave, the knowledge should stay. We train your internal team on the tools and methods they need to run innovation programs confidently on their own. Practical, hands-on, built around how your team actually works.',
        bestFor: 'TBI staff, LGU innovation officers, university faculty running startup programs',
        image: capacityImg,
      },
      {
        title: 'Program Documentation and Reporting',
        description:
          'Good programs deserve good documentation. We produce reports, playbooks, monitoring and evaluation frameworks, and impact stories that satisfy funder requirements and communicate your program\'s value clearly to partners and stakeholders.',
        bestFor: 'Organizations reporting to DOST, DICT, or international development partners',
        image: programDocImg,
      },
    ],
  },
]

export const DEFAULT_AUDIENCE_ID = audiences[0]?.id ?? 'founders'

/** ── Filipino translations of audiences ── */
export const audiencesFil: Audience[] = [
  {
    id: 'founders',
    label: 'Mga Founder at Startup',
    icon: 'fa-solid fa-rocket',
    sectionHeader: 'Para sa mga Founder at Startup',
    sectionTagline: 'May ideya ka. Alamin natin kung ano ang dapat itayo muna.',
    sectionIntro: 'Mahirap magsimula. Tinutulungan namin ang mga bagong founder na makapag-focus sa pinakamahalagang bagay, kumilos nang mas mabilis, at maging handa sa harap ng mga taong makakatulong sa kanilang paglago.',
    services: [
      {
        title: 'MVP Development',
        description: 'Ang iyong unang produkto ay dapat sagutin ang isang tanong: gusto ba talaga ito ng mga tao? Nagtatayo kami ng simpleng, gumaganang web app na maaari mong ilagay sa harap ng mga tunay na gumagamit at matuto. Walang overbuilding. Walang naaksayang buwan. Isang bagay na tunay na maaari mong subukan.',
        bestFor: 'Mga unang beses na founder, mga nanalo sa hackathon, mga tumanggap ng grant na kailangang magpakita ng progreso',
        image: (audiences[0]!.services[0]!.image),
      },
      {
        title: 'Product Design (UI/UX)',
        description: 'Bago kami magdisenyo ng isang screen, nakikipag-usap kami sa iyong mga gumagamit. Kinakatawan namin kung paano sila nag-iisip, ano ang kailangan nila, at saan sila natigil. Pagkatapos ay nagdidisenyo kami ng isang bagay na tunay na gumagana para sa kanila.',
        bestFor: 'Mga founder na naghahanda para sa launch o mga presentasyon sa mamumuhunan',
        image: (audiences[0]!.services[1]!.image),
      },
      {
        title: 'Web at Mobile App Design',
        description: 'Nagdidisenyo kami ng web platform o mobile app mula sa simula. Nakatuon kami sa kalinawan, kadalian ng paggamit, at mga karanasang nagpapabalik ng mga tao.',
        bestFor: 'Mga founder at maagang-yugto na koponan na handang itayo ang kanilang pangunahing produkto',
        image: (audiences[0]!.services[2]!.image),
      },
      {
        title: 'Pitch Deck Design',
        description: 'Ang magandang pitch ay nagsasalaysay ng malinaw na kwento. Tinutulungan ka naming malaman kung ano ang kwentong iyon, pagkatapos ay nagdidisenyo kami ng deck na simpleng nagkukomunika nito. Istruktura, biswal, at daloy na nagpapanatiling engganyo ang mga tao.',
        bestFor: 'Mga founder na nag-aapply sa mga accelerator, government grant, o angel investor',
        image: (audiences[0]!.services[3]!.image),
      },
      {
        title: 'Landing Page',
        description: 'Subukan ang iyong ideya bago itayo ang buong produkto. Nagdidisenyo at nagtatayo kami ng simpleng, nakatutok na pahina na nagpapaliwanag kung ano ang ginagawa mo, para kanino ito, at kung ano ang dapat gawin ng mga tao.',
        bestFor: 'Mga founder na nagpapatunay pa ng kanilang ideya, maagang marketing, pre-launch signup',
        image: (audiences[0]!.services[4]!.image),
      },
    ],
  },
  {
    id: 'msmes',
    label: 'Mga MSME at Social Enterprise',
    icon: 'fa-solid fa-store',
    sectionHeader: 'Para sa mga MSME at Social Enterprise',
    sectionTagline: 'Nagtayo ka ng isang tunay na bagay. Tulungan ka naming dalhin ito nang mas malayo.',
    sectionIntro: 'Hindi mo kailangang maging pinakamalaking negosyo sa silid para gumana nang tulad ng isa. Kailangan mo ng digital na presensya na gumagana, isang website na pinagkakatiwalaan ng mga tao, at isang malinaw na larawan kung saan patutungo ang iyong negosyo.',
    services: [
      {
        title: 'Business Innovation Discovery',
        description: 'Bago ka mag-invest ng kahit anong bago, unawain kung ano talaga ang pumipigil sa iyo. Nagpapatakbo kami ng isang nakabalangkas na proseso ng pagtuklas na tumitingin sa iyong modelo ng negosyo, mga customer, at mga operasyon, pagkatapos ay inilalabas ang pinakamahalagang pagkakataon para sa paglago at inobasyon.',
        bestFor: 'Mga MSME at social enterprise na handang lumago ngunit hindi sigurado kung saan magsisimula',
        image: (audiences[1]!.services[0]!.image),
      },
      {
        title: 'Website Redesign',
        description: 'Ang iyong website ay dapat gumana nang kasingtigas ng iyong pagsisikap. Nagre-redesign kami ng mga site na mabagal, nakakalito, o mahirap hanapin sa isang bagay na malinis, mabilis, at madaling mag-navigate.',
        bestFor: 'Mga negosyong may lumang o hindi gumaganang website',
        image: (audiences[1]!.services[1]!.image),
      },
      {
        title: 'Digital Presence Setup',
        description: 'Kung hindi ka mahahanap ng mga tao online, makikita nila ang ibang tao. Nagse-set up at nag-oorganisa kami ng iyong Google Business Profile, mga social media page, at pangunahing digital na presensya.',
        bestFor: 'Mga negosyong unang sumusubok sa online na channel',
        image: (audiences[1]!.services[2]!.image),
      },
      {
        title: 'Business Model Design',
        description: 'Minsan ang produkto ay hindi ang problema. Minsan ito ay ang modelo. Nakikipag-upo kami sa iyo, kinukuha ang mapa ng iyong negosyo, at tinutulungan kang mahanap ang mga pagbabagong gagawa ng pinakamalaking pagkakaiba.',
        bestFor: 'Mga social enterprise na nagtatrabaho sa pangmatagalang sustainability, mga MSME na handang lumago',
        image: (audiences[1]!.services[3]!.image),
      },
      {
        title: 'Pitch at Proposal Design',
        description: 'Kung nag-aapply ka para sa grant, nagtatayo ng pakikipagtulungan, o nagpapakita ng iyong trabaho sa mga nagpopondo, ang paraan ng pagsasalaysay ng iyong kwento ay mahalaga. Tinutulungan ka naming hubugin ang kwentong iyon at nagdidisenyo ng mga materyales.',
        bestFor: 'Mga social enterprise na nag-aapply sa mga foundation, mga MSME na naghahanap ng partnership sa gobyerno',
        image: (audiences[1]!.services[4]!.image),
      },
    ],
  },
  {
    id: 'organizations',
    label: 'Mga Organisasyon at LGU',
    icon: 'fa-solid fa-building-columns',
    sectionHeader: 'Para sa mga Organisasyon at LGU',
    sectionTagline: 'Nais mong suportahan ang inobasyon sa iyong komunidad. Tinutulungan ka naming gawin ito nang maayos.',
    sectionIntro: 'Ang pagpapatakbo ng isang programa ng inobasyon ay nangangailangan ng higit pa sa magandang intensyon. Nangangailangan ito ng tamang istruktura, tamang facilitation, at malinaw na plano.',
    services: [
      {
        title: 'Innovation Program Design',
        description: 'Isang maayos na dinisenyo na programa ang nagbabago ng direksyon ng bawat kalahok na dumaan dito. Tinutulungan ka naming itayo ang tamang istruktura, magtakda ng makabuluhang milestone, ikonekta ang mga founder sa tamang mentor.',
        bestFor: 'Mga state university, LGU, technology business incubator na nagtatayo o nagpapabuti ng mga programa',
        image: (audiences[2]!.services[0]!.image),
      },
      {
        title: 'Innovation Workshops at Facilitation',
        description: 'Ang pinakamahusay na mga ideya ay nagmumula sa mga taong naramdamang narinig sila. Nagdidisenyo at nagfa-facilitate kami ng mga workshop na tumutulong sa iyong koponan o komunidad na maunawaan ang isang problema at lumabas na may magagawa.',
        bestFor: 'Mga organisasyong nagsisimula ng bagong inisyatibo, community problem-solving, pre-program discovery',
        image: (audiences[2]!.services[1]!.image),
      },
      {
        title: 'Startup Competition Design',
        description: 'Ang isang kumpetisyon ay kasing ganda lamang ng naiprodukto nito. Nagdidisenyo kami ng buong karanasan mula sa konsepto hanggang mekanika hanggang paghuhukom.',
        bestFor: 'Mga LGU, unibersidad, corporate program, ahensya ng gobyerno',
        image: (audiences[2]!.services[2]!.image),
      },
      {
        title: 'Capacity Building',
        description: 'Kapag umalis kami, ang kaalaman ay dapat manatili. Sinasanay namin ang iyong panloob na koponan sa mga kasangkapan at pamamaraan na kailangan nila para mapatakbo ang mga programa ng inobasyon nang may kumpiyansa.',
        bestFor: 'TBI staff, LGU innovation officer, unibersidad na guro na nagpapatakbo ng mga programa ng startup',
        image: (audiences[2]!.services[3]!.image),
      },
      {
        title: 'Program Documentation at Reporting',
        description: 'Ang mga magagandang programa ay nangangailangan ng magandang dokumentasyon. Gumagawa kami ng mga ulat, playbook, monitoring at evaluation framework, at mga kwento ng epekto.',
        bestFor: 'Mga organisasyong nag-uulat sa DOST, DICT, o mga internasyonal na partner sa pag-unlad',
        image: (audiences[2]!.services[4]!.image),
      },
    ],
  },
]

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
