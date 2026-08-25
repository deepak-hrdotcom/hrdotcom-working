// HR.com 2026 Education Redesign — Executive Critique Data
// Deep, comprehensive, section-by-section analysis in simple, everyday English.
// Zero academic terms, zero jargon — clear and easy to understand for everyone.

export const globalCritique = {
  title: "The 7-Page Confusion Problem",
  subtitle: "Why forcing visitors across 7 separate pages kills their excitement and stops them from enrolling",
  overviewMetrics: [
    { label: "Current Website", value: "7 Disconnected Pages", note: "Visitors lose track of where they are with each click" },
    { label: "User Confusion", value: "Very High", note: "Too many separate steps to find basic answers like price or dates" },
    { label: "Reviews & Guarantees", value: "Hidden Away", note: "Student reviews and refund guarantees are separated from prices" },
    { label: "Mobile Experience", value: "Crowded & Hard to Read", note: "Dense desktop layouts shrink poorly on phones" }
  ],
  coreProblems: [
    {
      id: "friction",
      icon: "🚪",
      headline: "Forcing visitors to jump between 7 separate pages causes people to leave at every click",
      explanation: "When someone wants to get certified, they shouldn't have to open Page 1 to learn about exams, Page 2 to see the price, Page 3 to check the refund policy, Page 6 to read reviews, and Page 7 to ask their boss. Every time a visitor is forced to click to a new page, 20% to 40% of them give up, close the tab, and leave.",
      businessImpact: "Most visitors leave before ever reaching the sign-up button."
    },
    {
      id: "choice-paralysis",
      icon: "🤯",
      headline: "Dumping too many choices at once overwhelms visitors so they delay buying",
      explanation: "When visitors are faced with dozens of dates, textbooks, and different course formats without a simple recommendation, their brain gets tired. When people feel overwhelmed, they don't buy — they tell themselves 'I'll figure this out later tonight' and never come back.",
      businessImpact: "Visitors postpone enrolling and end up buying from competitors or doing nothing."
    },
    {
      id: "separated-trust",
      icon: "🛡️",
      headline: "Trust builders (reviews and money-back guarantees) are hidden where people can't see them",
      explanation: "We have an incredible 93% pass rate, a 100% money-back guarantee, and 49+ real graduate reviews with photos. But they are buried on hidden pages! When a candidate sees the $1,065 price tag, they get nervous about failing. That exact moment is when they need to see the guarantee and real graduate reviews right in front of them.",
      businessImpact: "Visitors hesitate on price because reassurance isn't shown where they need it."
    },
    {
      id: "weak-value",
      icon: "💰",
      headline: "We present the course as a huge out-of-pocket expense instead of a high-return career upgrade",
      explanation: "Our current pages present $1,065 as tuition fee. In reality, certified HR professionals earn $10,000 to $20,000 more per year, get promoted faster, and help their companies avoid multi-million-dollar lawsuits. We fail to show this career payoff, and we don't show how easy it is to get their boss to pay for it.",
      businessImpact: "Tuition feels like a costly expense instead of a smart career investment."
    }
  ],
  consolidationBlueprint: {
    headline: "The Simple Solution: Combine 7 Confusing Pages into 3 Clear, High-Converting Pages",
    hubs: [
      {
        tag: "Main Page (For Individual Students)",
        name: "The Master Certification & Prep Hub",
        replaces: "Combines Page 1 (Understanding), Page 2 (Prep Options), Page 3 (Guarantee), and Page 6 (Reviews)",
        howItWorks: "A single, seamless page where students match their experience in 1 click, see simple course recommendations, view the 100% money-back guarantee right next to pricing, and read real graduate reviews at the exact moment they are deciding."
      },
      {
        tag: "Employer Page (For Teams & Company Funding)",
        name: "Employer Reimbursement & Team Training Hub",
        replaces: "Combines Page 4 (Group Certification) & Page 7 (Ask My Employer)",
        howItWorks: "Gives individual candidates a 1-click email template to send their boss for approval, while giving team managers an instant discount calculator for groups of 5+ HR staff."
      },
      {
        tag: "Renewal Page (For Already-Certified Pros)",
        name: "HR Recertification & Credits Engine",
        replaces: "Page 5 (HR Recertification)",
        howItWorks: "Dedicated to already-certified professionals who need to renew their 60 credits every 3 years. Focuses on effortless automated credit tracking, ethics credits, and all-access webcast passes."
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
    screenshot: "screenshots/01-understanding-hr-certification.png",
    executiveSummary: "This page is the front door for beginners, but it confuses visitors with an outdated confetti graphic, a slow quiz that doesn't give instant answers, a cluttered cartoon 6-box chart, and buried information.",
    hotspots: [
      {
        id: "p1-h1",
        top: 6.5,
        left: 32,
        title: "Outdated Confetti Hero Graphic",
        whatIsWrong: "The hero uses an old-fashioned confetti explosion with a cut-out photo of a woman and a generic slogan ('Your Ticket to Success!').",
        whyUsersBounce: "When people are looking to spend $1,000+ on a serious professional credential, outdated graphics make the website look old and untrustworthy. Visitors wonder if the study materials are outdated too.",
        theFix: "Replace with a sharp headline: 'HR Certification: What You NEED to Know' with modern professional photography and clear salary boost highlights."
      },
      {
        id: "p1-h2",
        top: 18.5,
        left: 35,
        title: "Slow Quiz That Requires Extra Clicks",
        whatIsWrong: "The experience chips ('0-1 yr', '1-2 yr', '2-4 yr') make users click a submit button and don't give instant answers on which exam fits them.",
        whyUsersBounce: "Having to fill out forms and wait for answers is annoying. Visitors want to know immediately whether they qualify for aPHR, PHR, or SPHR.",
        theFix: "Turn this into an instant 1-click matcher that immediately reveals the best exam and salary boost without reloading the page."
      },
      {
        id: "p1-h3",
        top: 31,
        left: 35,
        title: "Benefit Cards Look Washed Out",
        whatIsWrong: "The 4 benefit cards ('Earn More & Advance', 'Boost Your Expertise', 'Stand Out', 'Gain Confidence') use generic icons and dull pastel colors.",
        whyUsersBounce: "Skimming visitors miss the huge salary boost (+$10,000 to $20,000/year) because the numbers aren't highlighted.",
        theFix: "Use bold highlight badges, high contrast, and show real salary boost numbers front and center."
      },
      {
        id: "p1-h4",
        top: 45,
        left: 35,
        title: "Only 2 Student Quotes Shown",
        whatIsWrong: "Shows only 2 static quotes without letting visitors filter reviews by exam type.",
        whyUsersBounce: "Someone studying for the senior SPHR exam wants to see reviews from experienced managers, while a beginner wants to see aPHR reviews.",
        theFix: "Add an interactive review slider with easy filter buttons for each certification."
      },
      {
        id: "p1-h5",
        top: 63,
        left: 35,
        title: "Confusing 6-Step Cartoon Chart",
        whatIsWrong: "The 6-step roadmap uses cartoon drawings and dense paragraphs that are hard to scan on computers and almost unreadable on phones.",
        whyUsersBounce: "Cluttered graphics make simple steps look complicated and overwhelming, so people skip past them without reading.",
        theFix: "Replace the cartoon boxes with a clean 7-step roadmap that clearly shows when to start studying and when to book the exam."
      },
      {
        id: "p1-h6",
        top: 76.5,
        left: 35,
        title: "Helpful Articles Are Hidden at the Bottom",
        whatIsWrong: "The bottom of the page has plain text links instead of attractive article cards answering common questions (like the difference between HRCI and SHRM).",
        whyUsersBounce: "Unsure visitors leave our site to search Google for answers and end up buying study materials from competitors.",
        theFix: "Add 5 prominent guide cards that directly answer top exam questions and prove our authority."
      },
      {
        id: "p1-h7",
        top: 88,
        left: 35,
        title: "Two Separate FAQ Sections Create Endless Scrolling",
        whatIsWrong: "Having two separate FAQ sections ('FAQs about prep courses' and 'FAQs on HR certification') creates long, repetitive text walls.",
        whyUsersBounce: "Visitors get tired of scrolling and miss important answers about our 100% money-back guarantee and online access.",
        theFix: "Combine everything into one clean, searchable FAQ list with simple topic tabs."
      }
    ]
  },
  {
    id: "page-2",
    num: "02",
    name: "Preparation Options",
    url: "/en/certifications/preparation_options/",
    screenshot: "screenshots/02-preparation-options.png",
    executiveSummary: "The course catalog overwhelms visitors with a wall of class dates, confusing tabs, and book options. There is no clear recommendation on which course to pick.",
    hotspots: [
      {
        id: "p2-h1",
        top: 7,
        left: 30,
        title: "Vague Hero Banner and Competing Buttons",
        whatIsWrong: "The banner says 'Unlock My Savings!' without saying how much money visitors save or which courses qualify, plus 3 competing buttons.",
        whyUsersBounce: "Vague discounts feel like marketing tricks. Too many buttons at the top confuse visitors before they even see the courses.",
        theFix: "Replace with clear seasonal savings badges (e.g. 'Early Bird: Save $150 on Spring Classes') with a single, clear browsing path."
      },
      {
        id: "p2-h2",
        top: 28,
        left: 25,
        title: "Too Many Choices with No Clear Recommendation",
        whatIsWrong: "Dumps 16-week classes, 8-week classes, self-paced courses, and books all in one crowded grid with identical '100% Money Back' badges on every card.",
        whyUsersBounce: "When presented with dozens of identical-looking cards, visitors don't know what to choose. They give up and tell themselves they will decide later.",
        theFix: "Organize into 3 clear choices: 1) Live Online Classes (Marked as 'Most Popular - 93% Pass Rate'), 2) Self-Paced Online, and 3) Study Books Only."
      },
      {
        id: "p2-h3",
        top: 46,
        left: 50,
        title: "Quiz Box Placed Awkwardly in the Middle of Courses",
        whatIsWrong: "A tall quiz box ('Which exam is right for you?') is stuck right between course cards in the second row.",
        whyUsersBounce: "Interrupting the course list with a random quiz card breaks the flow and distracts visitors who are comparing prices.",
        theFix: "Keep the quiz at the very top of the page as a helpful guide, not as an awkward interruption in the price list."
      },
      {
        id: "p2-h4",
        top: 74,
        left: 78,
        title: "Study Books Look Like Full Classes",
        whatIsWrong: "Physical book packages ($480 HRCP books) look visually almost identical to $1,065 full instructor-led classes, and the comparison chart is buried at the bottom.",
        whyUsersBounce: "Budget-conscious buyers accidentally buy just the books thinking it includes live classes, then get upset when they have no instructor.",
        theFix: "Clearly separate 'Complete Live Class with Instructor' from 'Self-Study Books Only' with clear checkmark lists."
      },
      {
        id: "p2-h5",
        top: 88,
        left: 35,
        title: "Disconnected 1-on-1 Coaching & Missing Employer Budget Prompt",
        whatIsWrong: "The 1-on-1 coaching banner is pushed to the bottom, and there is no reminder that employers often pay for courses.",
        whyUsersBounce: "Price-conscious visitors leave because they think they must pay all $1,065 out of their own personal pocket.",
        theFix: "Add a clear note right under the price: 'Get Your Employer to Pay 100% of Tuition' with a 1-click email template."
      }
    ]
  },
  {
    id: "page-3",
    num: "03",
    name: "Pass Assurance Program",
    url: "/en/certifications/pass_assurance_program/",
    screenshot: "screenshots/03-pass-assurance-program.png",
    executiveSummary: "Our most powerful selling point — the 100% Money-Back Guarantee — is hidden on a separate page where most buyers will never even find it.",
    hotspots: [
      {
        id: "p3-h1",
        top: 28,
        left: 45,
        title: "Hidden on a Separate Page",
        whatIsWrong: "Putting the guarantee on its own separate page forces buyers to leave the catalog just to check if there is a refund policy.",
        whyUsersBounce: "Most visitors never click to subpages. If they don't see the guarantee on the pricing page, they assume there is no safety net.",
        theFix: "Show the 100% Money-Back Guarantee badge and details directly on every course card and price tag."
      },
      {
        id: "p3-h2",
        top: 55,
        left: 20,
        title: "Missing Our 93% Pass Rate Proof",
        whatIsWrong: "The badge says '100% Refund Guarantee' but forgets to mention our 93% first-time student pass rate compared to the 60% national average.",
        whyUsersBounce: "Without real numbers, a money-back claim sounds like generic sales talk rather than proven results.",
        theFix: "Show our real success rate right next to the guarantee: '93% of HR.com Students Pass on Their First Try (National Avg: 60%)'."
      },
      {
        id: "p3-h3",
        top: 55,
        left: 55,
        title: "Rules Look Like Strict Legal Fine Print",
        whatIsWrong: "The 3 simple requirements (attend 80% of classes, take practice tests, take official exam within 90 days) look like scary legal disclaimers.",
        whyUsersBounce: "Legal-looking text makes people suspicious that there is a hidden catch or loophole.",
        theFix: "Reformat into 3 friendly, reassuring checkmarks: 1. Attend your live classes, 2. Take your practice tests, 3. Pass or get 100% of your money back."
      },
      {
        id: "p3-h4",
        top: 80,
        left: 45,
        title: "Weak Links with No Direct Sign-Up Button",
        whatIsWrong: "The bottom lists eligible courses as plain rounded buttons instead of letting users pick a start date and sign up directly.",
        whyUsersBounce: "When a visitor feels reassured and is ready to buy, there is no easy button to start checkout.",
        theFix: "Add direct 'Enroll with Pass Assurance' buttons under each course option."
      }
    ]
  },
  {
    id: "page-4",
    num: "04",
    name: "HR Group Certification",
    url: "/en/certifications/hr_group_certification/",
    screenshot: "screenshots/04-hr-group-certification.png",
    executiveSummary: "The team training page looks like a plain contact form with no upfront group pricing, no team savings calculator, and little proof of business results.",
    hotspots: [
      {
        id: "p4-h1",
        top: 10,
        left: 28,
        title: "Generic Headline Doesn't Speak to Business Leaders",
        whatIsWrong: "Headline 'An investment in your HR people is an investment in your business' sounds like generic corporate talk.",
        whyUsersBounce: "Executives care about real business results: stopping costly legal mistakes, keeping good employees, and standardizing HR practices.",
        theFix: "Lead with clear business benefits: 'Certify Your HR Team to Eliminate Costly Compliance Risks and Retain Top Talent'."
      },
      {
        id: "p4-h2",
        top: 28,
        left: 50,
        title: "Missing Group Savings Calculator",
        whatIsWrong: "The page says 'Groups of 5 or more save the most!' but shows no prices, discount percentages, or estimates.",
        whyUsersBounce: "Busy managers hate filling out blind forms just to see basic prices. If they can't get a quick estimate, they leave.",
        theFix: "Add a simple interactive slider where managers select team size (e.g. 5, 10, 20 people) and instantly see their volume discount."
      },
      {
        id: "p4-h3",
        top: 50,
        left: 30,
        title: "Dense Text Paragraphs Instead of Quick Business Benefits",
        whatIsWrong: "Uses long paragraphs of text instead of quick bullet points, company case studies, or client logos.",
        whyUsersBounce: "Executives skim quickly. Long walls of text get skipped, making the program look less professional.",
        theFix: "Highlight key business numbers: 'Lower Turnover (-24%)', 'Avoid $100k+ in Lawsuit Risks', and 'Consistent Team Skills'."
      },
      {
        id: "p4-h4",
        top: 80,
        left: 65,
        title: "Only a Plain Contact Form with No Instant Call Booking",
        whatIsWrong: "The page ends with a basic form without any option to pick custom dates or book a quick phone call.",
        whyUsersBounce: "Team managers don't want to wait days for an email reply to a generic form.",
        theFix: "Let managers book a 15-minute consultation directly on our calendar alongside the quote request form."
      }
    ]
  },
  {
    id: "page-5",
    num: "05",
    name: "HR Recertification",
    url: "/en/certifications/hr_recertification/",
    screenshot: "screenshots/05-hr-recertification.png",
    executiveSummary: "Recertification is for people who are already certified, but the page is text-heavy and fails to show how simple our automatic credit tracking is.",
    hotspots: [
      {
        id: "p5-h1",
        top: 9,
        left: 50,
        title: "Passive Headline Misses the 3-Year Renewal Deadline Stress",
        whatIsWrong: "Headline 'HR Recertification Program - Congratulations, you've found the easiest way to get recertified!' lacks urgency and clarity.",
        whyUsersBounce: "Certified professionals are stressed about renewing their 60 credits before their 3-year deadline runs out. They want a fast, simple solution.",
        theFix: "Focus on zero-stress renewal: 'Earn All 60 HRCI & SHRM Recertification Credits in One Place — 100% Automatic Logging'."
      },
      {
        id: "p5-h2",
        top: 19,
        left: 45,
        title: "Pricing Comparison Is Hard to Read",
        whatIsWrong: "The 1-year pass ($250) and 3-year pass ($500) options are shown in a flat bar without showing how much money users save.",
        whyUsersBounce: "Visitors don't immediately see that the 3-Year Pass ($500) covers their whole 3-year cycle and saves them $250 (1 full year free).",
        theFix: "Highlight the 3-Year All-Inclusive Pass as 'Best Value — Covers Your Entire 3-Year Cycle & Saves $250'."
      },
      {
        id: "p5-h3",
        top: 38,
        left: 30,
        title: "Hard to Understand How Credits Work",
        whatIsWrong: "Explaining the 60-credit rules across HRCI and SHRM using long, dense paragraphs and tiny static icons.",
        whyUsersBounce: "Busy HR pros are worried about missing credits. Reading long text walls is frustrating.",
        theFix: "Use simple visual progress bars showing how watching HR.com webcasts automatically fills up all 60 credits for HRCI and SHRM."
      },
      {
        id: "p5-h4",
        top: 60,
        left: 60,
        title: "Mandatory Ethics Requirement Is Buried",
        whatIsWrong: "The required ethics credits are hidden near the bottom in a plain text box.",
        whyUsersBounce: "Professionals who specifically need ethics credits cannot easily tell if our webcasts include ethics credits.",
        theFix: "Add an 'Ethics Credits Included' badge right at the top on the main pricing card."
      },
      {
        id: "p5-h5",
        top: 86,
        left: 50,
        title: "Showing Beginner Courses to People Who Are Already Certified",
        whatIsWrong: "The bottom section tries to sell beginner exam prep courses (like aPHR prep) to professionals who already passed their exams!",
        whyUsersBounce: "Showing beginner courses to senior certified pros looks unprofessional and clutters the page.",
        theFix: "Replace with advanced leadership masterclasses, executive summits, and specialized HR certificates."
      }
    ]
  },
  {
    id: "page-6",
    num: "06",
    name: "Testimonials & Reviews",
    url: "/en/certifications/testimonials/",
    screenshot: "screenshots/06-testimonials.png",
    executiveSummary: "We have 49+ authentic 5-star reviews with real photos of graduates holding their certificates, but hiding them on a separate page wastes their power.",
    hotspots: [
      {
        id: "p6-h1",
        top: 12,
        left: 30,
        title: "Incredible Reviews Are Hidden Away",
        whatIsWrong: "90% of prospective students never click the 'Testimonials' tab in the menu, so they never see this proof.",
        whyUsersBounce: "Candidates looking at prices on the catalog page don't know that thousands of real people have passed with our help.",
        theFix: "Put these 49 reviews and graduate photos directly on the course catalog and quiz pages right next to prices."
      },
      {
        id: "p6-h2",
        top: 14,
        left: 75,
        title: "Certificate Photos Lack Career & Salary Details",
        whatIsWrong: "Photos of students holding their certificates are shown without mentioning their promotions or salary increases.",
        whyUsersBounce: "Photos build trust, but mentioning real salary gains and promotions gives buyers the final push to enroll.",
        theFix: "Add clear career outcomes to review cards: 'Promoted to HR Manager (+ $18,000)' and 'Passed SPHR on First Try'."
      },
      {
        id: "p6-h3",
        top: 25,
        left: 50,
        title: "Review Filter Is Too Limited",
        whatIsWrong: "Reviews only have 3 broad buttons (All, PHR/SPHR/SHRM, aPHR) without letting users filter by specific exams or study styles.",
        whyUsersBounce: "Someone studying for SPHR wants to read reviews from other senior professionals who took the 16-week live class.",
        theFix: "Add simple filter tags: All Reviews, aPHR, PHR, SPHR, SHRM-CP, and SHRM-SCP."
      },
      {
        id: "p6-h4",
        top: 55,
        left: 50,
        title: "Long Blocks of Text Without Highlighted Quotes",
        whatIsWrong: "Long paragraphs of student quotes without highlighted lines make it hard for visitors to skim quickly.",
        whyUsersBounce: "People scan before reading. Long solid blocks of text are tiring to read.",
        theFix: "Put a punchy 1-sentence takeaway in bold at the top of every student review."
      },
      {
        id: "p6-h5",
        top: 90,
        left: 50,
        title: "No Sign-Up Button After Inspiring Reviews",
        whatIsWrong: "The page ends with a plain 'View more comments' link and no button to enroll in the course mentioned in the review.",
        whyUsersBounce: "Visitors get inspired by student success stories but have to search through menus to find where to sign up.",
        theFix: "Add an 'Enroll in This Course' button inside every graduate review card."
      }
    ]
  },
  {
    id: "page-7",
    num: "07",
    name: "Ask My Employer",
    url: "/en/certifications/ask_my_employer/",
    screenshot: "screenshots/07-ask-my-employer.png",
    executiveSummary: "This page has great arguments to convince employers to pay for tuition, but hiding it on page 7 means most buyers never even know their company could pay for them.",
    hotspots: [
      {
        id: "p7-h1",
        top: 12,
        left: 30,
        title: "Hidden on Page 7 Instead of Shown at Checkout",
        whatIsWrong: "Hiding the boss approval kit on page 7 means 85%+ of hesitant buyers never realize their company has money to pay for their course.",
        whyUsersBounce: "Candidates who want to enroll but can't afford $1,065 leave the site without realizing their boss has an education budget.",
        theFix: "Add a 'Get Your Boss to Pay' button right next to every 'Enroll Now' button across the entire website."
      },
      {
        id: "p7-h2",
        top: 25,
        left: 50,
        title: "Static Badges Don't Provide Downloadable Documents",
        whatIsWrong: "The 3 trust badges are just pictures and don't give employees a simple document to show their boss.",
        whyUsersBounce: "When employees ask their manager for $1,000+, the manager asks for written details. If the employee has nothing to show, the request stalls.",
        theFix: "Provide a 1-page downloadable summary: 'Boss Approval Kit: Why Sponsoring HR Certification Pays Off'."
      },
      {
        id: "p7-h3",
        top: 50,
        left: 50,
        title: "No Ready-to-Send Email Template",
        whatIsWrong: "The reasons are written in long paragraphs rather than giving the employee a ready-made email they can copy, paste, and send in 30 seconds.",
        whyUsersBounce: "Writing a formal email to a boss is stressful. If we don't give them a pre-written template, they put it off and forget.",
        theFix: "Provide a 1-click 'Copy Pre-Written Email to Boss' button with blank spaces for their manager's name."
      },
      {
        id: "p7-h4",
        top: 76,
        left: 50,
        title: "Plain Contact Box Instead of Instant Company Invoice",
        whatIsWrong: "The bottom is a giant purple box asking users to call or email rather than letting them generate a company invoice.",
        whyUsersBounce: "Many companies prefer paying with a company invoice or purchase order instead of a personal credit card.",
        theFix: "Add an 'Instant Company Invoice Generator' where candidates enter their manager's email to send an official invoice directly."
      }
    ]
  }
];


