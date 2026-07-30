/*
 * Agency 1776 — home page content. Every string here is the single source of
 * truth for the on-page copy; sections read from these constants and render
 * verbatim (no rewriting, no summarising, no invented supporting copy).
 */

export const AGENCY = {
  brand: 'Agency 1776',
}

export const HERO = {
  heading:
    'The Campaign Website Builder That Helps America Hear Your Message and Act On It.',
  tagline:
    'Agency 1776 builds campaign websites and digital campaign assets for candidates, political leaders, and movements that need to reach voters, earn support, and build momentum.',
  ctas: [
    { label: 'LAUNCH YOUR SITE', href: '/contact', variant: 'primary' },
    { label: 'BUILD TO WIN', href: '/contact', variant: 'ghost' },
  ],
}

export const FORWARD = {
  heading: 'Move the Campaign Forward.',
  tagline:
    'We build political campaign websites around the sections voters and supporters actually need.',
  items: [
    { label: 'Candidate story', icon: 'scroll' },
    { label: 'Issues and priorities', icon: 'chart' },
    { label: 'Donation path', icon: 'arrow' },
    { label: 'Volunteer signup', icon: 'star' },
    { label: 'Supporter capture', icon: 'pulse' },
    { label: 'Events and updates', icon: 'book' },
    { label: 'Endorsements', icon: 'shield' },
    { label: 'Contact and press information', icon: 'scroll' },
    { label: 'Mobile-ready structure', icon: 'chart' },
  ],
}

export const REALITY = {
  eyebrow: 'THE CAMPAIGN REALITY',
  heading:
    'When People Know What You Stand For, They Know How to Support You.',
  body: 'A campaign website is the first place people go to understand who you are, what you believe, what you are fighting for, and why they should support you. That requires end-to-end digital support. A website and digital presence makes the message clear, the candidate credible, and the next step easy to take.',
  cta: { label: 'VIEW OUR SOLUTIONS', href: '/solutions' },
}

export const SCOPE = {
  eyebrow: 'FOR CAMPAIGNS OF EVERY SIZE',
  heading: 'Agency 1776',
  body:
    'Built for Candidates, Leaders, and Movements. We give your campaign a digital foundation that supports the race whether you are running for local office, organizing a political movement, or building support for a cause. Agency 1776 supports:',
  items: [
    'Local candidates',
    'Down-ballot campaigns',
    'State-level campaigns',
    'Political organizations',
    'Advocacy campaigns',
    'Community movements',
    'Issue-based campaigns',
    'First-time candidates',
    'Campaign teams that need a stronger digital presence',
  ],
}

export const PROCESS = {
  heading: 'Launch Fast',
  steps: [
    {
      num: '1',
      title: 'Share the Campaign',
      body:
        'Send us the candidate details, campaign goals, message, colors, logo, and key priorities.',
    },
    {
      num: '2',
      title: 'Build the Message',
      body:
        'We shape the candidate story, homepage message, issue sections, and calls-to-action.',
    },
    {
      num: '3',
      title: 'Create the Website',
      body:
        'We build the campaign website with the pages and action paths your campaign needs.',
    },
    {
      num: '4',
      title: 'Prepare Campaign Assets',
      body:
        'We create digital content your campaign can use across social media, supporter updates, and promotion.',
    },
    {
      num: '5',
      title: 'Launch and Move',
      body:
        'Your campaign gets a professional digital foundation built to help voters hear the message and act.',
    },
  ],
  cta: { label: 'START THE BUILD', href: '/contact' },
}

export const CONTACT = {
  heading: 'Ready to Put Your Campaign in Motion?',
  cta: { label: 'START THE CONVERSATION', href: '/contact' },
}

/*
 * ABOUT page content. Every string in this block is verbatim from the source
 * copy — sections read from these constants and render them exactly as
 * supplied. Do not rewrite, shorten, expand, or reword any of it.
 */
export const ABOUT = {
  hero: {
    heading:
      'Agency 1776 Serves Different Missions, Different Audiences, and One Standard: Build Websites That Drive Results.',
  },
  parent: {
    eyebrow: 'PART OF OPS 1776 GROUP',
    heading: 'A Specialized Agency Within a Larger Ecosystem.',
    body: [
      'Agency 1776 operates under Ops 1776 Group of Companies, a parent company built around focused brands serving strategy, e-commerce, news, AI-driven website solutions, and digital execution.',
      'Inside that ecosystem, Agency 1776 has one clear role:',
    ],
    role: 'build websites for organizations that need people to act.',
    close:
      'That focus keeps our work sharp. It keeps the audience clear. It keeps every project tied to a real outcome.',
    /*
     * `EXPLORE OPS 1776 GROUP` — no valid external URL supplied. Left in the
     * constants (verbatim label) but omitted at render time so no dead link
     * appears on the About page. Restore an href here to re-enable.
     */
    cta: { label: 'EXPLORE OPS 1776 GROUP', href: null },
  },
  paths: {
    eyebrow: 'WHO WE SERVE',
    heading: 'Three Paths. One Agency Standard.',
    intro:
      'Agency 1776 was built to serve organizations where communication matters and action matters even more.',
    items: [
      {
        text: 'For businesses, the website has to create confidence and generate leads.',
        icon: 'chart',
      },
      {
        text: 'For political campaigns, it has to communicate priorities, build trust, and move voters and supporters.',
        icon: 'star',
      },
      {
        text: 'For nonprofits, it has to make the mission real, earn donor confidence, and turn support into action.',
        icon: 'shield',
      },
    ],
    standard: [
      'The standard never changes.',
      'The message has to be clear.',
      'The website has to build trust.',
      'The next step has to be obvious',
    ],
  },
  experience: {
    heading: 'THE AGENCY 1776 EXPERIENCE',
    body: 'We bring together strategy, messaging, design, and execution to build websites that support real outcomes: leads, voters, donors, supporters, inquiries, and momentum.',
    lines: [
      'Not every organization needs the same website.',
      'But every serious organization needs a website with purpose.',
    ],
  },
  values: {
    heading: 'OUR VALUES',
    items: [
      {
        title: 'Clarity',
        body:
          'Confusion kills action. We build websites that make the message easy to understand and the next step easy to take.',
      },
      {
        title: 'Discipline',
        body:
          'Strong websites are not built from random ideas. They are built through structure, focus, and decisions that support the goal.',
      },
      {
        title: 'Trust',
        body:
          'People act when they believe. Every website needs to create confidence through message, proof, design, and experience.',
      },
      {
        title: 'Execution',
        body:
          'Strategy only matters if it gets built. We turn ideas into pages, sections, copy, design, and launch-ready websites.',
      },
      {
        title: 'Purpose',
        body:
          'Nothing goes on the page just to fill space. Every section should help the visitor understand, trust, or act.',
      },
      {
        title: 'America First Standard',
        body:
          'Agency 1776 carries a strong America First identity rooted in responsibility, work ethic, leadership, discipline, and results.',
      },
    ],
  },
  closer: {
    heading: 'Let’s Build the Website Your Mission Deserves.',
    ctas: [{ label: 'CONTACT US', href: '/contact', variant: 'primary' }],
  },
}

/*
 * SOLUTIONS (Campaign Solutions) page content. Verbatim from the source copy.
 * The `audiences[*].intro` line appears only where the client's brief called
 * for one (Advocacy section); other audiences render just the description.
 */
export const SOLUTIONS = {
  hero: {
    heading: 'Run Your Campaign With Right Solutions',
    tagline:
      'From website strategy and campaign messaging to social assets, landing pages, and supporter action paths, we build the tools that help your campaign move.',
    /*
     * Label preserved verbatim. `scrollTo` handles same-page navigation via
     * an onClick handler in the hero section so no hash `href` ever ships.
     */
    cta: { label: 'VIEW CAMPAIGN WEBSITE OPTIONS', scrollTo: 'solutions-packages' },
  },
  audiences: {
    eyebrow: 'WHO WE SUPPORT',
    heading: 'Built for Campaigns at Every Level.',
    intro:
      'Agency 1776 supports candidates, political teams, and advocacy organizations that need a stronger website and digital presence.',
    items: [
      {
        title: 'State and Local Campaigns',
        description:
          'For candidates running at the state, county, city, municipal, or local district level.',
        items: [
          'Governor',
          'Attorney General',
          'Secretary of State',
          'State Senate',
          'State House',
          'Mayor',
          'City Council',
          'County Commission',
          'County Clerk',
          'Sheriff',
          'County Treasurer',
          'School Board',
          'Community College Board',
          'Special Districts',
          'Local ballot initiatives',
        ],
      },
      {
        title: 'Federal Campaigns',
        description:
          'For campaigns running for federal office and building a larger public-facing digital presence.',
        items: [
          'U.S. House of Representatives',
          'U.S. Senate',
          'Presidential campaign teams',
          'Federal political committees',
        ],
      },
      {
        title: 'Political Organizations',
        description:
          'For political groups, committees, PACs, coalitions, and organizations that need a serious digital presence to communicate, organize, and move supporters.',
        items: [
          'Political committees',
          'PACs',
          'Party organizations',
          'Grassroots groups',
          'Advocacy coalitions',
          'Issue-based organizations',
          'Political movements',
        ],
      },
      {
        title: 'Advocacy and Issue Campaigns',
        description:
          'For campaigns built around a specific cause, policy, public issue, or community movement.',
        intro: 'Examples include:',
        items: [
          'Ballot initiatives',
          'Public awareness campaigns',
          'Policy campaigns',
          'Community advocacy efforts',
          'Voter education campaigns',
          'Supporter mobilization campaigns',
        ],
      },
    ],
  },
  capabilities: {
    heading: 'What We Build for Political Campaigns.',
    items: [
      {
        title: 'Campaign Website Strategy',
        body:
          'We map the website structure, audience paths, campaign goals, key pages, supporter actions, and launch priorities.',
      },
      {
        title: 'Candidate Messaging',
        body:
          'We shape the candidate story, homepage message, issue language, and core campaign positioning so voters understand the message faster.',
      },
      {
        title: 'Political Website Design',
        body:
          'We design campaign websites that feel credible, organized, urgent, and easy to use.',
      },
      {
        title: 'Website Development',
        body:
          'We build mobile-ready campaign websites with the pages, forms, CTAs, and structure needed to support the race.',
      },
      {
        title: 'Issue and Platform Pages',
        body:
          'We create pages that explain campaign priorities in clear language voters can understand.',
      },
      {
        title: 'Donation and Volunteer Paths',
        body:
          'We structure donation prompts, supporter CTAs, volunteer forms, and campaign action sections so people know how to help.',
      },
      {
        title: 'Campaign Landing Pages',
        body:
          'We build focused pages for fundraising pushes, event promotion, voter outreach, volunteer drives, announcements, and issue campaigns.',
      },
      {
        title: 'Social Media Campaign Assets',
        body:
          'We create campaign-ready graphics and captions that help promote your message across digital platforms.',
      },
      {
        title: 'Email and Supporter Copy',
        body:
          'We prepare supporter updates, fundraising messages, campaign announcements, and action-focused email copy.',
      },
      {
        title: 'Press and Contact Sections',
        body:
          'We help organize the information media, voters, and partners need to contact the campaign or understand the official position.',
      },
    ],
  },
  packages: {
    heading: 'Choose the Support That Matches the Campaign.',
    items: [
      {
        title: 'Campaign Website Build',
        body:
          'For campaigns that need a professional website with the core pages, message, action paths, and launch structure.',
      },
      {
        title: 'Campaign Website + Assets',
        body:
          'For campaigns that need the website plus social posts, supporter content, fundraising graphics, and launch materials.',
      },
      {
        title: 'Campaign Landing Page Build',
        body:
          'For campaigns that need focused pages for donations, events, volunteers, announcements, or issue-based pushes.',
      },
      {
        title: 'Full Digital Campaign Support',
        body:
          'For teams that need the website, message, landing pages, social assets, and supporter communication built together.',
      },
    ],
    cta: { label: 'CALCULATE YOUR CAMPAIGN BUILD', href: '/pricing' },
  },
  outcomes: {
    eyebrow: 'HOW THE WORK HELPS',
    heading:
      'Your Campaign Gets a Digital Foundation That Can Be Used Every Day.',
    intro: 'After the build, your campaign should have:',
    items: [
      'A clearer message',
      'A stronger campaign home',
      'A better voter information path',
      'A smoother donation path',
      'A direct volunteer signup path',
      'A consistent visual presence',
      'Campaign assets ready to publish',
      'A website that supports events and updates',
      'A digital system the team can point supporters toward',
    ],
  },
  closer: {
    heading:
      'Need the Website, the Assets, or the Whole Digital Build?',
    body:
      'Tell us where your campaign stands and what needs to launch. Agency 1776 will help identify the right build path for your race.',
    ctas: [
      { label: 'START THE BUILD', href: '/contact', variant: 'primary' },
      { label: 'CONTACT US', href: '/contact', variant: 'ghost' },
    ],
  },
}

/*
 * WORK (Campaigns Built) page content. The showcase now carries real client
 * projects — each entry pairs the client name with the live campaign site and
 * a screenshot captured from that site (stored in /public/work). The `role`
 * line is taken directly from each site's own hero (race / office / district)
 * so nothing here is invented. Cards link out to the live site in a new tab.
 */
export const WORK = {
  hero: {
    heading: 'All Campaigns Built to Be Seen, Heard, and Backed.',
    tagline:
      'Agency 1776 supports American candidates, political teams, and movements that need a serious digital presence built around message, trust, and action.',
  },
  showcase: {
    eyebrow: 'THE WORK',
    heading: 'Campaign Work Across Different Races and Movements.',
    body: 'Every campaign has a different race, audience, and path to support.',
    cta: { label: 'CONTACT US ABOUT A CAMPAIGN', href: '/contact' },
    /*
     * Real client projects. `image` points at the Playwright-captured
     * screenshot in /public/work; `href` is the live campaign site (opened in
     * a new tab). `role` is the race/office as stated on each client's site.
     */
    projects: [
      {
        slug: 'mark-norman',
        name: 'Mark Norman',
        role: 'Oregon House District 27',
        href: 'https://www.markfororegon.com/',
        image: '/work/mark-norman.png',
      },
      {
        slug: 'royce-white',
        name: 'Royce White',
        role: 'U.S. Senate — Minnesota',
        href: 'https://roycewhite.vercel.app/',
        image: '/work/royce-white.png',
      },
      {
        slug: 'barbara-kahl',
        name: 'Dr. Barbara Kahl',
        role: 'Oregon’s 1st Congressional District',
        href: 'https://www.drkahlforcongress.com/',
        image: '/work/barbara-kahl.png',
      },
      {
        slug: 'david-morse',
        name: 'David Morse',
        role: 'Fourth District Judge — Idaho',
        href: 'https://morseforidaho.vercel.app/',
        image: '/work/david-morse.png',
      },
      {
        slug: 'jenny-kamprath',
        name: 'Jenny Kamprath',
        role: 'Washington County Chair — Oregon',
        href: 'https://friendsofjennykamprath.vercel.app/',
        image: '/work/jenny-kamprath.png',
      },
      {
        slug: 'randall-fryer',
        name: 'Randall Fryer',
        role: 'Oregon House District 28',
        href: 'https://randallfryer.vercel.app/',
        image: '/work/randall-fryer.png',
      },
      {
        slug: 'coos-county-republicans',
        name: 'Coos County Republicans',
        role: 'Republican Central Committee — Oregon',
        href: 'https://www.coos.gop/',
        image: '/work/coos-county-republicans.png',
      },
    ],
  },
}

/*
 * CONTACT_PAGE — dedicated /contact page copy. Kept separate from the home
 * page `CONTACT` export (which drives the smaller home-section CTA). Every
 * string, label, placeholder, and dropdown option is verbatim from the brief.
 */
export const CONTACT_PAGE = {
  hero: {
    heading: 'Tell Us What Your Campaign Needs.',
    // Paragraph list — rendered as separate `<p>` blocks so the "Start here."
    // beat gets its own visual weight without any extra copy invented around it.
    subtext: [
      'Need a political campaign website, landing pages, social campaign assets, or full digital campaign support?',
      'Start here.',
      'Tell us about the candidate, race, timeline, and what needs to launch. Agency 1776 will help identify the right next step for your campaign.',
    ],
    /*
     * Same-page scroll — the form section sits directly below this hero.
     * Handled via onClick + scrollToId; no hash href ships to the DOM.
     */
    cta: { label: 'SUBMIT CAMPAIGN INQUIRY', scrollTo: 'contact-form' },
  },
  form: {
    heading: 'Start the Conversation.',
    body:
      'Complete the form below so we can understand your campaign, your timeline, and the digital support you need.',
    fields: [
      {
        name: 'fullName',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        type: 'text',
        required: true,
      },
      {
        name: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email address',
        type: 'email',
        required: true,
      },
      {
        name: 'phone',
        label: 'Phone Number',
        placeholder: 'Enter your phone number',
        type: 'tel',
        required: false,
      },
      {
        name: 'organization',
        label: 'Campaign / Organization Name',
        placeholder: 'Enter the campaign or organization name',
        type: 'text',
        required: false,
      },
      {
        name: 'candidate',
        label: 'Candidate Name',
        placeholder: 'Enter the candidate name, if applicable',
        type: 'text',
        required: false,
      },
      {
        name: 'campaignType',
        label: 'Campaign Type',
        type: 'select',
        options: [
          'Local Candidate',
          'County / Municipal Race',
          'State-Level Race',
          'Federal Race',
          'Political Organization',
          'Advocacy / Issue Campaign',
          'Other',
        ],
        required: false,
      },
      {
        name: 'websiteNeed',
        label: 'Campaign Website Need',
        type: 'select',
        options: [
          'Starter Campaign Website',
          'Full Campaign Website',
          'Campaign Website + Social Assets',
          'Campaign Website + Landing Pages',
          'Full Digital Campaign Support',
          'Not sure yet',
        ],
        required: false,
      },
      {
        name: 'timeline',
        label: 'Timeline',
        type: 'select',
        options: [
          'Launch as soon as possible',
          'Launch within 2 weeks',
          'Launch within 30 days',
          'Launch within 60 days',
          'No fixed timeline yet',
        ],
        required: false,
      },
      {
        name: 'branding',
        label: 'Do You Already Have Branding?',
        type: 'select',
        options: [
          'Yes — logo and colors are ready',
          'Partially',
          'No — we need help',
          'Not sure',
        ],
        required: false,
      },
      {
        name: 'message',
        label: 'Message',
        placeholder:
          'Tell us about the race, your message, your goals, and what you need help launching.',
        type: 'textarea',
        required: true,
      },
    ],
    submit: { label: 'SEND CAMPAIGN INQUIRY' },
  },
}
