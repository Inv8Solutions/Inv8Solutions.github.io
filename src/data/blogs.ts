export type BlogPost = {
  id: string
  slug: string
  category: string
  categoryColor: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  author: string
  authorRole: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'from-idea-to-mvp-in-6-weeks',
    category: 'Product Development',
    categoryColor: 'text-blue-400 bg-blue-400/10',
    title: 'From Idea to MVP in 6 Weeks: What We Learned Building Retasify',
    excerpt: 'Building a product fast doesn\'t mean cutting corners. Here\'s the exact process we used to ship Retasify from a napkin sketch to a working product in under two months.',
    date: 'May 20, 2026',
    readTime: '6 min read',
    author: 'Leandro Gepilano',
    authorRole: 'Founder, inv8 Studio',
    content: `
      <p>Every founder has a moment of clarity — that instant when the idea feels so obvious you wonder why nobody built it yet. The tricky part isn't the idea. It's moving from that moment of clarity to something real that people can actually use.</p>

      <p>When we started Retasify, we gave ourselves a hard constraint: six weeks, no exceptions. Here's what we learned.</p>

      <h2>Week 1–2: Define before you design</h2>
      <p>The biggest mistake teams make is jumping straight into Figma. Before any wireframe was drawn, we ran a two-day product sprint to answer three questions:</p>
      <ul>
        <li>Who is the primary user and what is the one thing they struggle with most?</li>
        <li>What does success look like at the end of week six?</li>
        <li>What are we explicitly NOT building in this version?</li>
      </ul>
      <p>That third question is the most important. A good MVP scope document is mostly a list of things you're deferring, not building.</p>

      <h2>Week 3–4: Build the core loop first</h2>
      <p>Every product has a core loop — the single thing users come back to do. For Retasify, that was task creation → assignment → status update. Everything else — notifications, integrations, analytics — was deferred.</p>
      <p>We built the core loop end-to-end before touching any secondary feature. This forced us to validate the most important assumption early: would users actually complete the loop?</p>

      <h2>Week 5: Test with real users, not colleagues</h2>
      <p>Friends and colleagues will always find something nice to say. Real users will tell you the truth with their behavior. We put Retasify in front of five people outside our network and watched them use it without any guidance.</p>
      <p>Two of them couldn't figure out how to create their first task. That told us more than a hundred survey responses would have.</p>

      <h2>Week 6: Polish the first impression</h2>
      <p>The last week was entirely focused on the first five minutes of the user experience. Onboarding, empty states, and the first action a new user takes. These moments define whether someone gives your product a second chance.</p>

      <h2>The real lesson</h2>
      <p>Speed isn't about working faster. It's about deciding what not to do, and having the discipline to hold that line when the feature requests start coming in. The constraint of six weeks forced better decisions than unlimited time ever would have.</p>
    `,
  },
  {
    id: '2',
    slug: 'why-most-msme-digital-projects-fail',
    category: 'Business Innovation',
    categoryColor: 'text-green-400 bg-green-400/10',
    title: 'Why Most MSME Digital Projects Fail (And How to Fix It)',
    excerpt: 'Nine out of ten digital transformation projects in small businesses don\'t deliver what was promised. The cause is almost never the technology.',
    date: 'May 12, 2026',
    readTime: '5 min read',
    author: 'Leandro Gepilano',
    authorRole: 'Founder, inv8 Studio',
    content: `
      <p>We've worked with dozens of small and medium businesses on digital projects. And we've noticed a consistent pattern in the ones that fail: the problem was diagnosed incorrectly from the start.</p>

      <h2>The symptom vs. the problem</h2>
      <p>A business owner sees their team spending hours on manual data entry. They conclude: "We need a better system." They buy software or hire someone to build it. Six months later, the team is still doing manual data entry — now they're just doing it in a new system.</p>
      <p>The real problem was never the tool. It was the process design, the data structure, or sometimes just a missing policy about who owns what information.</p>

      <h2>Technology amplifies what's already there</h2>
      <p>If your process is broken, digitizing it just makes it break faster. We've seen companies spend ₱300,000 on a custom system that made things worse because nobody mapped the actual workflow before building.</p>
      <p>The most valuable thing we do in our early discovery sessions isn't asking "what should the system do?" It's asking "walk me through exactly what happens when a new order comes in." The gaps reveal themselves quickly.</p>

      <h2>The three root causes</h2>
      <p><strong>1. No process owner.</strong> Every system needs a human who is responsible for it working. If nobody owns it, nobody maintains it, and it slowly becomes a ghost system everyone works around.</p>
      <p><strong>2. Big bang implementation.</strong> Trying to digitize everything at once is a recipe for failure. The best implementations we've seen start with one painful workflow, fix it completely, then expand.</p>
      <p><strong>3. No measurement baseline.</strong> If you don't know how long a process takes today, you can't prove whether the new system made it better. Establish your baseline before you build anything.</p>

      <h2>What actually works</h2>
      <p>Start small. Pick the one workflow that causes the most pain. Map it on paper first. Identify who touches it, when, and why. Then build the simplest possible solution that removes the biggest friction point.</p>
      <p>Digital transformation for MSMEs doesn't have to be a ₱1M project. It can be a ₱50K workflow fix that saves your team 10 hours a week. Start there.</p>
    `,
  },
  {
    id: '3',
    slug: 'design-system-for-early-stage-startups',
    category: 'UI/UX Design',
    categoryColor: 'text-purple-400 bg-purple-400/10',
    title: 'Why Early-Stage Startups Need a Design System (Even a Simple One)',
    excerpt: 'You don\'t need a 500-component library. But you do need a shared language for how your product looks and behaves — before it becomes too expensive to fix.',
    date: 'May 5, 2026',
    readTime: '4 min read',
    author: 'Leandro Gepilano',
    authorRole: 'Founder, inv8 Studio',
    content: `
      <p>When you're moving fast in the early days, a design system feels like a luxury. You're shipping features, talking to users, adjusting the roadmap weekly. Who has time to document button states?</p>
      <p>But there's a point — usually around the time you bring in a second designer or a second developer — where the absence of a system starts costing you more time than building one would have taken.</p>

      <h2>What a "design system" actually means for a startup</h2>
      <p>I'm not talking about a full Figma component library with documentation, tokens, and a dedicated design systems team. For an early-stage product, a design system is just:</p>
      <ul>
        <li>A defined color palette (primary, secondary, grays, semantic colors)</li>
        <li>Typography scale (3–4 sizes, consistent weights)</li>
        <li>Spacing scale (8px grid works well)</li>
        <li>5–10 reusable UI components with documented variants</li>
      </ul>
      <p>That's it. You can build this in a day and it will save weeks of inconsistency downstream.</p>

      <h2>The real cost of not having one</h2>
      <p>Every time a developer has to decide whether a button should be 12px or 14px font, or whether the border radius should be 6px or 8px, that's a decision that should already be made. Small inconsistencies compound into a product that feels unpolished — even if individual screens look fine in isolation.</p>
      <p>More importantly, when you eventually need to do a visual refresh or rebrand, having everything scattered means touching hundreds of places instead of updating a handful of variables.</p>

      <h2>Start with constraints, not components</h2>
      <p>The most useful thing in any design system is its constraints. Decide what your product is NOT allowed to use. Define the boundaries before you define the patterns.</p>
      <p>A startup design system should make it hard to make inconsistent choices — not just document all the consistent ones.</p>
    `,
  },
  {
    id: '4',
    slug: 'pitch-deck-mistakes-founders-make',
    category: 'Product Strategy',
    categoryColor: 'text-yellow-400 bg-yellow-400/10',
    title: '5 Pitch Deck Mistakes That Kill Investor Interest in the First 3 Slides',
    excerpt: 'We\'ve helped founders across Southeast Asia sharpen their investor stories. The same five mistakes appear again and again — and they\'re all fixable.',
    date: 'April 28, 2026',
    readTime: '5 min read',
    author: 'Leandro Gepilano',
    authorRole: 'Founder, inv8 Studio',
    content: `
      <p>An investor sees hundreds of decks a year. The first three slides determine whether they lean forward or start checking their phone. Here are the five mistakes we fix most often when working with founders on their pitch narratives.</p>

      <h2>1. Leading with the solution, not the problem</h2>
      <p>Founders are in love with what they built. Investors need to understand why it matters first. If your deck opens with "We built a platform that..." you've already lost the plot.</p>
      <p>Your first slide should make the problem so obvious and painful that the investor is already thinking "someone needs to fix this." Then your solution lands as the logical response.</p>

      <h2>2. Market size with no context</h2>
      <p>"The market is $4.2 billion" means nothing without context. Where does that number come from? How much of it is actually addressable by your specific product? What's your realistic path to capturing even 1% of it?</p>
      <p>Show your math. A credible $200M TAM with a clear path is more compelling than a vague $10B claim.</p>

      <h2>3. Traction slides with no story</h2>
      <p>A chart going up and to the right is good. A chart going up and to the right with a sentence explaining why it inflected at that point is excellent. Tell the story behind your numbers — what changed, what you learned, what you're doubling down on.</p>

      <h2>4. Team slides that list credentials instead of relevance</h2>
      <p>Investors don't just want to know your background. They want to know why this team is uniquely positioned to win this market. "10 years in enterprise software" is a credential. "Spent 10 years watching this specific problem from the inside, and know exactly what the buyer needs" is a reason to bet on you.</p>

      <h2>5. No clear ask</h2>
      <p>End every deck with a specific ask: the amount you're raising, the key milestones it funds, and what success looks like in 18 months. Vague asks signal unclear thinking. Specific asks signal confidence and preparation.</p>
    `,
  },
  {
    id: '5',
    slug: 'user-research-on-a-budget',
    category: 'UI/UX Design',
    categoryColor: 'text-purple-400 bg-purple-400/10',
    title: 'User Research on a Startup Budget: 4 Methods That Actually Work',
    excerpt: 'You don\'t need a research lab or a six-figure budget to understand your users. These four methods cost almost nothing and deliver insights that change what you build.',
    date: 'April 18, 2026',
    readTime: '4 min read',
    author: 'Leandro Gepilano',
    authorRole: 'Founder, inv8 Studio',
    content: `
      <p>User research has a reputation for being expensive, slow, and the first thing cut when timelines tighten. That reputation is mostly wrong. The best research methods for early-stage products are fast, cheap, and incredibly revealing.</p>

      <h2>1. The 5-user usability test</h2>
      <p>Jakob Nielsen's research showed that five users uncover ~85% of usability problems. You don't need a panel of 50. Find five people who roughly match your target user, give them a specific task to complete in your product, and watch without helping.</p>
      <p>Don't ask "what do you think?" Ask "what are you trying to do right now?" The silence is where the insights live.</p>

      <h2>2. Exit surveys on drop-off pages</h2>
      <p>A one-question survey on your pricing or sign-up page — "What's holding you back?" — consistently reveals objections you'd never think to ask about. We've seen this single question change pricing structures and onboarding flows entirely.</p>

      <h2>3. Sales call recordings</h2>
      <p>Every sales call is a user research session in disguise. The questions prospects ask, the hesitations they voice, the comparisons they make — this is gold. Record your calls (with permission), listen back, and tag recurring themes.</p>

      <h2>4. Competitive teardowns</h2>
      <p>Read every 1-star and 3-star review of your closest competitor on the App Store or G2. Three-star reviews are especially valuable — those users wanted to love the product but couldn't. Their frustrations are your opportunity.</p>

      <h2>The real goal of early research</h2>
      <p>Early research isn't about validation. It's about uncovering the assumptions you didn't know you were making. The best outcome of a user research session isn't "they love it." It's "I was completely wrong about why they'd use this."</p>
    `,
  },
  {
    id: '6',
    slug: 'building-internal-tools-that-teams-actually-use',
    category: 'Business Innovation',
    categoryColor: 'text-green-400 bg-green-400/10',
    title: 'Building Internal Tools That Teams Actually Use',
    excerpt: 'Most internal tools end up as expensive shelf-ware. The difference between a tool people adopt and one they ignore comes down to four principles.',
    date: 'April 8, 2026',
    readTime: '5 min read',
    author: 'Leandro Gepilano',
    authorRole: 'Founder, inv8 Studio',
    content: `
      <p>Internal tools have a graveyard problem. Systems get built, launched with enthusiasm, and quietly abandoned within six months as teams route around them and go back to their spreadsheets and WhatsApp groups.</p>
      <p>We've built internal tools for a dozen businesses and we've figured out what separates the ones that get adopted from the ones that collect dust.</p>

      <h2>Principle 1: Involve the actual users in design, not just their managers</h2>
      <p>The person who approves the budget for an internal tool is almost never the person who has to use it eight hours a day. When you design for the approver, you get a tool that looks good in a demo and fails in daily use.</p>
      <p>Shadow the actual users. Watch what they do today. Ask what takes the longest and what causes the most frustration. Build for them.</p>

      <h2>Principle 2: Reduce steps, not features</h2>
      <p>The value of an internal tool is measured in seconds saved per task, multiplied by how many times a day that task happens. A tool that removes two clicks from a process done 200 times a day saves more than a feature used once a week.</p>
      <p>Count the steps in a user's current workflow. Your goal is to cut that number in half.</p>

      <h2>Principle 3: Launch with a champion, not an announcement</h2>
      <p>Every successful internal tool launch we've seen had one thing in common: a champion inside the team who genuinely believed in it and brought others along. An email announcement from management creates compliance. A colleague saying "this actually saved me two hours yesterday" creates adoption.</p>

      <h2>Principle 4: Make the old way harder</h2>
      <p>This sounds harsh, but it's the most reliable adoption mechanism. If people can easily fall back to the old process, they will — especially under pressure. Make the new tool the path of least resistance.</p>
      <p>This might mean archiving the old spreadsheet, turning off the shared inbox, or removing manual steps from the old workflow. Change requires friction in the wrong direction, not just ease in the right one.</p>
    `,
  },
]

export const categories = ['All', 'Product Development', 'Business Innovation', 'UI/UX Design', 'Product Strategy']
