// HR.com 2026 Education Redesign — Executive Critique Data
// Strictly using plain-English conversion & behavioral insights (no academic law names).

export const globalCritique = {
  title: "The 7-Page Fragmentation Problem",
  subtitle: "Why forcing users across 7 separate pages destroys buying momentum and kills conversion rates",
  overviewMetrics: [
    { label: "Current Pages", value: "7 Siloed URLs", note: "Users lose context with each click" },
    { label: "Decision Friction", value: "Severe", note: "Too many separate steps to find basic answers" },
    { label: "Trust Placement", value: "Misplaced", note: "Reviews & guarantees are separated from pricing" },
    { label: "Mobile Experience", value: "Cluttered", note: "Dense desktop layouts shrink poorly on phones" }
  ],
  coreProblems: [
    {
      id: "friction",
      icon: "🚪",
      headline: "Forcing users to jump between 7 separate pages creates drop-off at every click",
      explanation: "When someone wants to get certified, they shouldn't have to visit Page 1 to understand the exam, Page 2 to see the price, Page 3 to check the guarantee, Page 6 to read reviews, and Page 7 to ask their boss. Every time a user has to load a new page, 20% to 40% of them drop off and leave forever.",
      businessImpact: "Massive drop-off before reaching the enrollment button."
    },
    {
      id: "choice-paralysis",
      icon: "🤯",
      headline: "Too many unguided choices cause decision paralysis and delay purchases",
      explanation: "When users are confronted with dozens of dates, textbooks, and ambiguous course formats without a simple guided recommendation, their brain gets overwhelmed. When people feel overwhelmed, they don't buy — they tell themselves 'I'll look at this later tonight' and never come back.",
      businessImpact: "Prospects delay enrollment or abandon the purchase entirely."
    },
    {
      id: "separated-trust",
      icon: "🛡️",
      headline: "Trust elements are hidden away from where users actually hesitate",
      explanation: "We have an incredible 93% pass rate, a 100% money-back guarantee, and 49+ authentic student reviews with photos. But they are locked away on subpages! When a candidate looks at the $1,065 course price, they are nervous about failing. That is the exact moment they need to see the guarantee and reviews right in front of their eyes.",
      businessImpact: "High price hesitation without instant reassurance."
    },
    {
      id: "weak-value",
      icon: "💰",
      headline: "We sell the course as an expensive cost rather than a high-paying career investment",
      explanation: "Our current copy presents $1,065 as tuition fee. In reality, certified HR professionals earn $10,000 to $20,000 more per year, get promoted faster, and protect their companies from multi-million-dollar labor lawsuits. We fail to highlight the career return on investment and fail to show how easy it is to get their employer to pay for it.",
      businessImpact: "Tuition feels like an out-of-pocket expense rather than an essential career milestone."
    }
  ],
  consolidationBlueprint: {
    headline: "The Solution: Consolidate 7 Confusing Pages into 3 High-Converting Hubs",
    hubs: [
      {
        tag: "Hub 1 (Primary Consumer Funnel)",
        name: "The Master Certification & Prep Hub",
        replaces: "Merges Page 1 (Understanding), Page 2 (Prep Options), Page 3 (Guarantee), and Page 6 (Reviews)",
        howItWorks: "A single, seamless page where candidates match their experience in 1 click, see tailored course options, view the 100% guarantee right next to pricing, and read real graduate reviews at the exact point of hesitation."
      },
      {
        tag: "Hub 2 (B2B & Employer Funding)",
        name: "Employer Reimbursement & Team Training Hub",
        replaces: "Merges Page 4 (Group Certification) & Page 7 (Ask My Employer)",
        howItWorks: "Empowers solo candidates to download 1-click boss pitch decks while offering team leaders an instant volume discount calculator for cohorts of 5+ HR professionals."
      },
      {
        tag: "Hub 3 (Member Retention)",
        name: "HR Recertification & Credits Engine",
        replaces: "Page 5 (HR Recertification)",
        howItWorks: "Dedicated to already-certified professionals who need 60 credits every 3 years. Focuses on effortless automated credit tracking, ethics courses, and annual webcast passes."
      }
    ]
  }
};

export const pagesCritique = [
  {
    id: "page-1",
    num: "01",
    name: "Understanding HR Certification",
    url: "/en/certifications/understanding_certification/",
    screenshot: "screenshots/01-understanding-hr-certification.jpeg",
    executiveSummary: "This page is supposed to guide beginners, but it opens with outdated confetti graphics, presents an ambiguous experience quiz, and uses a confusing 6-box flowchart that looks like generic clip art.",
    hotspots: [
      {
        id: "p1-h1",
        top: 6,
        left: 22,
        title: "Outdated Confetti Hero Graphic",
        whatIsWrong: "The hero uses an old-fashioned confetti explosion with a leaning woman cutout and a generic slogan ('Your Ticket to Success!').",
        whyUsersBounce: "For an expensive $1,000+ professional credential, outdated graphics make the institution look untrustworthy and behind the times. Users immediately question if the course materials are modern.",
        theFix: "Replace with Eric's high-curiosity headline: 'HR Certification: What You NEED to Know' with a sharp, professional photography style and clear salary boost subhead."
      },
      {
        id: "p1-h2",
        top: 24,
        left: 25,
        title: "Ambiguous Quiz Without Instant Guidance",
        whatIsWrong: "The experience selector chips ('0-1 yr', '1-2 yr', '2-4 yr') require a submit button and don't provide instant visual feedback on what exam fits the user.",
        whyUsersBounce: "Requiring slow form submissions creates unnecessary friction. Users want immediate clarity on whether they qualify for aPHR, PHR, or SPHR without waiting.",
        theFix: "Turn this into a frictionless 1-click interactive matcher that instantly reveals recommended exam paths and salary outcomes without page reloads."
      },
      {
        id: "p1-h3",
        top: 48,
        left: 28,
        title: "Confusing 6-Box Process Flowchart",
        whatIsWrong: "The 6-step pathway graphic uses cartoon illustrations and dense text blocks that are hard to scan on desktop and impossible to read on mobile.",
        whyUsersBounce: "Visual clutter forces the user's brain to work too hard to understand basic steps, causing them to skim past it without taking action.",
        theFix: "Replace the 6 cartoon boxes with Eric's structured '7 Certification Best Practices' roadmap, including direct guidance on when to schedule the exam."
      },
      {
        id: "p1-h4",
        top: 72,
        left: 25,
        title: "Resource Center Lacks Clear Articles",
        whatIsWrong: "The bottom of the page has generic links without high-value articles to answer common candidate fears (e.g. HRCI vs SHRM differences).",
        whyUsersBounce: "Uncertain users leave the site to search Google for answers, and end up buying prep materials from competitors.",
        theFix: "Add Shelley's 5 Certification Authority Article Cards directly into the resource section to answer exam secrets and boost authority."
      }
    ]
  },
  {
    id: "page-2",
    num: "02",
    name: "Preparation Options",
    url: "/en/certifications/preparation_options/",
    screenshot: "screenshots/02-preparation-options.jpeg",
    executiveSummary: "The master catalog page overwhelms visitors with a wall of course dates, tabs, and textbook options. There is no clear recommendation, causing severe choice paralysis.",
    hotspots: [
      {
        id: "p2-h1",
        top: 10,
        left: 25,
        title: "Catalog Overload & Choice Paralysis",
        whatIsWrong: "Dumping 16-week, 8-week, self-paced, and materials-only formats all at once without a clear recommended option.",
        whyUsersBounce: "When presented with too many complex choices, users feel overwhelmed. They delay their decision, close the tab, and plan to 'decide later'.",
        theFix: "Group formats into 3 clear cards: 1) Live Instructor-Led (Highlighted as 'Recommended - 93% Pass Rate'), 2) Self-Paced eLearning, and 3) Study Materials Only."
      },
      {
        id: "p2-h2",
        top: 35,
        left: 30,
        title: "Dense Text Walls of Class Schedules",
        whatIsWrong: "Dates and times are presented in long, un-scannable text blocks rather than clean calendar cards with remaining seat badges.",
        whyUsersBounce: "Busy HR professionals cannot quickly tell which class fits their evening or weekend schedule.",
        theFix: "Implement a clean schedule selector with filters for 'Evenings', 'Saturdays', and 'Accelerated' with clear start date pills."
      },
      {
        id: "p2-h3",
        top: 60,
        left: 25,
        title: "Missing Direct Link to Employer Budget",
        whatIsWrong: "The page asks for $1,065 out-of-pocket without reminding candidates that 70%+ of HR professionals get their company to pay for tuition.",
        whyUsersBounce: "Price-sensitive candidates bounce because they assume they must pay out of their own personal savings.",
        theFix: "Add a prominent callout right under the price: 'Get Your Employer to Cover 100% Tuition' with a 1-click pitch deck trigger."
      }
    ]
  },
  {
    id: "page-3",
    num: "03",
    name: "Pass Assurance Program",
    url: "/en/certifications/pass_assurance_program/",
    screenshot: "screenshots/03-pass-assurance-program.jpeg",
    executiveSummary: "Our most powerful conversion weapon — the 100% Money-Back Guarantee — is stranded on a lonely island page where most buyers will never even see it.",
    hotspots: [
      {
        id: "p3-h1",
        top: 18,
        left: 25,
        title: "Stranded on an Isolated Subpage",
        whatIsWrong: "Having a dedicated standalone page for the guarantee forces users to leave the checkout flow just to verify our refund policy.",
        whyUsersBounce: "Users don't explore subpages. If they are on the pricing page and don't see the guarantee immediately, they assume there is no safety net.",
        theFix: "Embed the 100% Money-Back Pass Assurance badge and terms directly on the main catalog and checkout cards as an interactive popover."
      },
      {
        id: "p3-h2",
        top: 50,
        left: 28,
        title: "Eligibility Rules Look Like Legal Fine Print",
        whatIsWrong: "The 3 simple requirements (attend 80% classes, take practice tests, take official exam within 90 days) look like dense legal disclaimers.",
        whyUsersBounce: "Legal-looking text creates skepticism. Users worry about hidden catches or tricks in the refund policy.",
        theFix: "Reformat into 3 clean, reassuring checkmark steps: 1. Attend your live classes, 2. Complete practice exams, 3. Pass or get 100% refunded."
      }
    ]
  },
  {
    id: "page-4",
    num: "04",
    name: "HR Group Certification",
    url: "/en/certifications/hr_group_certification/",
    screenshot: "screenshots/04-hr-group-certification.jpeg",
    executiveSummary: "The B2B group training page looks like a generic contact form with no instant volume pricing, no team ROI calculator, and weak enterprise credibility.",
    hotspots: [
      {
        id: "p4-h1",
        top: 20,
        left: 25,
        title: "No Instant Team Pricing or Discount Tiers",
        whatIsWrong: "HR Directors with 5 to 15 team members see no transparent pricing tiers or savings estimates — only a vague lead form.",
        whyUsersBounce: "Busy executive buyers hate submitting forms just to see basic pricing. If they can't get an instant estimate, they abandon.",
        theFix: "Add an interactive Team Savings Calculator where managers can slide their team size (e.g. 5, 10, 20 people) and instantly see volume savings."
      },
      {
        id: "p4-h2",
        top: 65,
        left: 30,
        title: "Weak Enterprise Proof & Case Studies",
        whatIsWrong: "Lacks logos of reputable companies whose HR teams we have trained, making the enterprise offering look unproven.",
        whyUsersBounce: "Corporate decision-makers require social validation before approving multi-thousand-dollar departmental budgets.",
        theFix: "Add enterprise client logos, corporate testimonials, and metrics on team compliance risk reduction."
      }
    ]
  },
  {
    id: "page-5",
    num: "05",
    name: "HR Recertification",
    url: "/en/certifications/hr_recertification/",
    screenshot: "screenshots/05-hr-recertification.jpeg",
    executiveSummary: "Recertification is a completely different audience (already certified pros), but the page is text-heavy and fails to showcase how effortless our automated credit tracker is.",
    hotspots: [
      {
        id: "p5-h1",
        top: 22,
        left: 25,
        title: "High Mental Effort to Understand Credit Rules",
        whatIsWrong: "Explaining the 60-credit requirement across HRCI and SHRM using long, dense paragraphs.",
        whyUsersBounce: "Already-certified HR pros are stressed about upcoming renewal deadlines. Reading text walls increases their frustration.",
        theFix: "Use clean visual progress meters showing how watching HR.com webcasts automatically fills up their 60 HRCI & SHRM credits."
      },
      {
        id: "p5-h2",
        top: 55,
        left: 28,
        title: "Pricing Comparison Bar is Hard to Scan",
        whatIsWrong: "The $250 1-year pass vs $500 3-year pass options are presented in a flat banner without strong value contrast.",
        whyUsersBounce: "Users don't immediately realize that the 3-Year Pass ($500) covers their entire recertification cycle for 33% less money.",
        theFix: "Feature the 3-Year All-Inclusive Pass as the 'Most Popular / Best Value' card with an explicit '$250 Savings' ribbon."
      }
    ]
  },
  {
    id: "page-6",
    num: "06",
    name: "Testimonials & Reviews",
    url: "/en/certifications/testimonials/",
    screenshot: "screenshots/06-testimonials.jpeg",
    executiveSummary: "We have 49+ authentic 5-star reviews with real photos of students holding certificates, but locking them on an isolated page renders them almost useless for conversion.",
    hotspots: [
      {
        id: "p6-h1",
        top: 15,
        left: 25,
        title: "The Goldmine is Hidden Away",
        whatIsWrong: "90% of prospective students never click into the 'Testimonials' tab on the navigation menu, so they never see this incredible proof.",
        whyUsersBounce: "Candidates browsing the course catalog don't know that thousands of real people have passed before them.",
        theFix: "Pull these 49 reviews and graduate photos into high-impact testimonial marquees and review carousels directly on the main catalog and quiz pages."
      },
      {
        id: "p6-h2",
        top: 45,
        left: 28,
        title: "Static Listing Lacks Interactive Credential Filters",
        whatIsWrong: "Reviews are displayed in a long single column without quick filters for specific exams (e.g. 'Show me only SPHR reviews').",
        whyUsersBounce: "A candidate studying for the difficult SPHR exam wants to hear specifically from other senior leaders who passed SPHR.",
        theFix: "Add instant filter pills: All Reviews, aPHR, PHR, SPHR, SHRM-CP, and SHRM-SCP."
      }
    ]
  },
  {
    id: "page-7",
    num: "07",
    name: "Ask My Employer",
    url: "/en/certifications/ask_my_employer/",
    screenshot: "screenshots/07-ask-my-employer.jpeg",
    executiveSummary: "This page contains high-value justification scripts and ROI arguments, but it is treated as an afterthought instead of a primary conversion catalyst.",
    hotspots: [
      {
        id: "p7-h1",
        top: 20,
        left: 25,
        title: "Treated as a Hidden Subpage Instead of an Action Tool",
        whatIsWrong: "Hiding the manager pitch kit on page 7 means 85%+ of hesitant buyers never discover that their boss could pay for their course.",
        whyUsersBounce: "Candidates who want to enroll but can't afford $1,065 leave the site without realizing their company has dedicated L&D budget.",
        theFix: "Turn this into a 1-click 'Get Boss Approval' modal trigger accessible right next to every 'Enroll Now' button across the entire site."
      },
      {
        id: "p7-h2",
        top: 60,
        left: 30,
        title: "Lack of 1-Click Copy-Paste Email Templates",
        whatIsWrong: "The ROI points are written in long prose rather than providing a pre-formatted, copy-paste email ready to send to a manager in 30 seconds.",
        whyUsersBounce: "Writing an email to a boss is intimidating. If we make candidates write it themselves, they procrastinate.",
        theFix: "Provide a 1-click 'Copy Manager Approval Email' tool with pre-written fields and customizable company names."
      }
    ]
  }
];
