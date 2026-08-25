// HR.com Certification Redesign 2026 — Low-Fi Prototype Data Store
// Master Conversion Blueprint & Behavioral Psychology Engine
// Incorporating Eric Anderson's and Shelley Marsland's strategic content requirements.

export const lowFiHubs = [
  {
    id: "hub-1",
    num: "01",
    name: "Master Certification & Prep",
    targetAudience: "Individual HR Candidates (aPHR, PHR, SPHR, SHRM-CP, SHRM-SCP)",
    coreMission: "Turn browsing traffic into committed course enrollments by eliminating decision paralysis, embedding trust directly on pricing cards, and removing out-of-pocket payment anxiety.",
    replaces: "Consolidates Page 1 (Understanding), Page 2 (Prep Options), Page 3 (Guarantee), and Page 6 (Reviews)",
    sections: [
      {
        id: "h1-s1",
        name: "1. Career Value Hero",
        psychology: {
          heuristic: "Value Reframing",
          whyItWorks: "When people immediately see a concrete personal benefit — like earning $10,000–$20,000 more per year — they stop questioning whether something is worth it and start figuring out how to get it. Leading with salary gains reframes the course from a cost into a career investment.",
          conversionFix: "Fixes the 35% bounce rate on Page 1. Visitors were leaving because the headline talked about HR.com, not about the candidate's career future."
        },
        wireframe: {
          eyebrow: "HR.COM ACCREDITED EXAM PREPARATION (HRCI & SHRM)",
          headline: "HR Certification: What You NEED to Know to Pass on Your First Try",
          subheadline: "Certified HR professionals earn $10,000 to $20,000 more per year and get promoted faster. Take 15 seconds to find your ideal exam, study format, and employer funding options.",
          imagePlaceholder: {
            title: "Hero Visual",
            description: "High-contrast candid photo of a real HR professional confidently smiling at a modern workplace with HRCI/SHRM official provider seals floating beside her.",
            psychology: "People trust faces. A real, confident graduate instantly signals 'this course works' better than any text claim ever could."
          },
          ctaPills: [
            { label: "Find My Recommended Exam ↓", action: "scroll-to-quiz", primary: true },
            { label: "Browse 2026 Class Cohorts", action: "scroll-to-catalog", primary: false }
          ],
          trustStrip: [
            { stat: "93% Pass Rate", label: "vs 60% national average" },
            { stat: "10,000+ Certified", label: "HR professionals since 2012" },
            { stat: "100% Money-Back", label: "Pass Assurance Guarantee" },
            { stat: "74% Employer Paid", label: "Free boss pitch kit included" }
          ]
        }
      },
      {
        id: "h1-s2",
        name: "2. 4 Core Value Pillars (Eric's Suggestion)",
        psychology: {
          heuristic: "Concrete Benefit Framing",
          whyItWorks: "Candidates hesitate because they wonder if the grueling study hours are worth it. Laying out 4 clear, undeniable return-on-investment pillars answers 'Why should I do this now?' before they even look at prices.",
          conversionFix: "Transforms vague career aspirations into tangible reasons to commit today."
        },
        wireframe: {
          badge: "WHY GET CERTIFIED IN 2026?",
          title: "4 Career Accelerators That Pay Off for Decades",
          pillars: [
            { icon: "💰", metric: "+$10k to $20k", title: "Earn More & Advance", desc: "Certified HR leaders command significantly higher compensation and are 2.5x more likely to be promoted." },
            { icon: "🧠", metric: "Master Law & Policy", title: "Boost Strategic Expertise", desc: "Deepen command of federal compliance, total rewards, and workforce planning to become an indispensable advisor." },
            { icon: "🏆", metric: "90%+ Employer Preference", title: "Stand Out in Hiring", desc: "Top HR employers filter candidates by credential. Your resume moves straight to the top of executive shortlists." },
            { icon: "⚡", metric: "100% Authority", title: "Gain Unshakeable Confidence", desc: "Back every talent and compliance decision with official body of knowledge mastery and executive respect." }
          ]
        }
      },
      {
        id: "h1-s3",
        name: "3. Important Choice #1: 1-Click Exam Matcher",
        psychology: {
          heuristic: "Reduce Choices",
          whyItWorks: "When people face too many options, they delay or abandon the decision entirely. By reducing the choice to just 3 experience levels and instantly showing the right exam for each, candidates feel guided rather than overwhelmed. The result appears in 1 click — no forms, no waiting.",
          conversionFix: "Stops candidates from feeling lost about eligibility. Before, a confusing 6-box flowchart was sending people away without a clear answer."
        },
        wireframe: {
          badge: "STEP 1: CHOOSE YOUR EXAM",
          title: "Select Your Years of HR Experience for an Instant Recommendation:",
          chips: [
            { id: "exp-0", label: "0 – 1 Year (Entry)", active: false, match: "aPHR (Associate)", salary: "+$8,000/yr Avg Boost", desc: "No HR experience required. Ideal for entry-level professionals and career changers looking to break into HR." },
            { id: "exp-1", label: "1 – 3 Years (Operational)", active: true, match: "PHR & SHRM-CP", salary: "+$14,500/yr Avg Boost", desc: "For professionals performing operational HR duties, employee relations, and compliance management." },
            { id: "exp-4", label: "4 – 7+ Years (Strategic)", active: false, match: "SPHR & SHRM-SCP", salary: "+$22,000/yr Avg Boost", desc: "For senior leaders driving organizational strategy, workforce planning, compensation design, and executive policy." }
          ],
          activeRecommendationBox: {
            title: "Recommended for You: Professional in Human Resources (PHR®) or SHRM-CP®",
            summary: "Based on 1-3 years of experience, you qualify for industry-standard professional credentials recognized by 90%+ of HR employers.",
            quickStats: "Exam Duration: 3 Hours | 175 Questions | Passing Score: 500/700 | Prep Time: 12-16 Weeks"
          }
        }
      },
      {
        id: "h1-s4",
        name: "4. Important Choice #2: 3-Tier Course Catalog",
        psychology: {
          heuristic: "Guide the Decision",
          whyItWorks: "Instead of dumping dozens of dates and packages, 3 clearly labelled tiers make comparison easy and fast. Crucially, the guarantee and student reviews appear right on the pricing cards — exactly where a candidate's financial hesitation peaks. They see the price and immediately the reassurance that eliminates doubt.",
          conversionFix: "Fixes the biggest conversion leak: candidates seeing $1,065, not knowing about the guarantee, and quietly leaving the page."
        },
        wireframe: {
          badge: "STEP 2: CHOOSE HOW TO PREPARE",
          title: "3 Formats Built Around Your Schedule & Learning Style",
          subtitle: "All formats include official 2026 HRCP learning manuals, 800+ practice exam questions, and online flashcards.",
          cards: [
            {
              tier: "TIER 1 — MOST POPULAR & HIGHEST PASS RATE",
              featured: true,
              name: "Live Online Instructor-Led Cohort",
              duration: "16-Week or 8-Week Accelerated",
              passRate: "93% First-Time Pass Rate",
              price: "$1,065",
              employerNote: "Or $0 out-of-pocket with Employer Approval",
              features: [
                "Weekly live classes led by certified master HR instructors",
                "Sunday live group review & exam strategy sessions",
                "Complete HRCP printed textbooks + 2-year online LMS access",
                "800+ timed practice exam questions with detailed explanations",
                "Direct 1-on-1 instructor email coaching and mentoring"
              ],
              guaranteeBadge: "🛡️ 100% Money-Back Pass Assurance Included",
              reviewQuote: "\"I passed my SPHR on the 1st try! The instructor's test tips were pure gold.\" — Gabriella T., HR Director",
              cta: "Select Your Live Class Schedule →"
            },
            {
              tier: "TIER 2 — FLEXIBLE INDEPENDENT STUDY",
              featured: false,
              name: "Self-Paced Online eLearning",
              duration: "Anytime 24/7 Access (Self-Paced)",
              passRate: "88% First-Time Pass Rate",
              price: "$890",
              employerNote: "Eligible for standard L&D expense budget",
              features: [
                "Interactive on-demand video modules for all functional areas",
                "Audio lecture recordings for learning on your daily commute",
                "Complete HRCP printed textbooks + online digital reader",
                "800+ practice questions and full-length simulated mock exams",
                "Self-paced weekly study schedules and progress trackers"
              ],
              guaranteeBadge: "🛡️ 100% Course Retake Access if Needed",
              reviewQuote: "\"Perfect for my crazy schedule with two young kids.\" — Karitza B., HR Generalist",
              cta: "Start Self-Paced eLearning →"
            },
            {
              tier: "TIER 3 — BOOKS & MATERIALS ONLY",
              featured: false,
              name: "HRCP Study Manuals & Practice Exams",
              duration: "Physical Books + Online Tests",
              passRate: "Self-Guided",
              price: "$480",
              employerNote: "Single book package fee",
              features: [
                "Official 2026 HRCP 4-volume printed comprehensive textbook set",
                "100s of physical and digital flashcards",
                "Online practice exam bank with 800+ questions",
                "Quick-reference formula and compliance sheets",
                "NOTE: Does not include live instruction or video lessons"
              ],
              guaranteeBadge: "📦 Free Standard US Shipping",
              reviewQuote: "\"The practice exam explanations match the real exam style.\" — Michelle R.",
              cta: "Order Study Manuals →"
            }
          ]
        }
      },
      {
        id: "h1-s5",
        name: "5. Video Explainer: Prep Pros & Cons (Greg's Suggestion)",
        psychology: {
          heuristic: "Multi-Modal Engagement",
          whyItWorks: "Visual and audio learners appreciate a 3-minute honest breakdown of the pros and cons of each study method from a lead instructor. It builds deep trust by openly sharing who should and shouldn't take self-paced study.",
          conversionFix: "Guides undecided visitors who hesitate between live cohort and self-study to choose the right format for their lifestyle."
        },
        wireframe: {
          badge: "VIDEO BREAKDOWN",
          title: "Watch: Which Prep Option Fits Your Learning Style?",
          subtitle: "Lead instructor Jennifer Marants breaks down pass rates, time commitments, and study habits in 3 minutes.",
          videoDuration: "3:42 Mins",
          videoPlaceholder: "▶️ PLAY: Pros & Cons of Every Prep Method (Landscape Video Embed)"
        }
      },
      {
        id: "h1-s6",
        name: "6. 'Get Your Boss to Pay' Conversion Trigger",
        psychology: {
          heuristic: "Remove the Money Barrier",
          whyItWorks: "Over 70% of HR professionals have a company training budget — but most are afraid to ask, or don't know what to say. Placing a ready-to-use email template right next to the price completely removes that barrier. The candidate doesn't have to figure out the conversation; it's already done for them.",
          conversionFix: "Recovers price-sensitive candidates who would otherwise abandon the page. The price isn't the problem — the fear of asking is."
        },
        wireframe: {
          badge: "ZERO OUT-OF-POCKET OPTION",
          title: "Want Your Company to Cover Your $1,065 Tuition?",
          subtitle: "Most employers have dedicated L&D budgets for HR certifications because certified HR staff protect the business from costly labor compliance lawsuits.",
          featuresGrid: [
            { icon: "✉️", title: "1-Click Boss Pitch Email", desc: "Pre-written, professionally persuasive email template ready to send your manager in 30 seconds." },
            { icon: "📊", title: "1-Page Executive Business Case PDF", desc: "Clear financial metrics showing how your certification prevents turnover and reduces external legal counsel fees." },
            { icon: "🧾", title: "Direct Employer Invoice Option", desc: "We invoice your finance department directly via purchase order or corporate credit card so you pay $0." }
          ],
          cta: "Download 1-Click Boss Pitch Kit & Invoice Generator →"
        }
      },
      {
        id: "h1-s7",
        name: "7. Real Graduate Stories & Outcomes",
        psychology: {
          heuristic: "Show Real People, Real Results",
          whyItWorks: "Seeing real photos of graduates holding their actual certificates — alongside concrete salary gains and job titles — is far more convincing than written testimonials alone. People naturally ask themselves 'could that be me?' and the answer moves them toward enrolling.",
          conversionFix: "Elevates credibility from 'company claims' to 'peer proof.' Anonymous star ratings don't convert. Real faces and real numbers do."
        },
        wireframe: {
          badge: "VERIFIED GRADUATE SUCCESS",
          title: "10,000+ HR Professionals Have Passed. Here Are Their Real Stories.",
          filterPills: ["All Proof (49+)", "PHR / SPHR", "aPHR", "SHRM-CP / SHRM-SCP"],
          reviewCards: [
            {
              name: "Gabriella Talentino, SPHR",
              role: "HR Director at Healthcare Systems",
              outcomeBadge: "🎉 Promoted + $18,500 Salary Increase",
              imageNote: "[PHOTO: Real graduate holding official HRCI SPHR framed certificate]",
              quote: "\"With my new SPHR certification, I was able to secure a major promotion to HR Director within 3 months. HR.com's live Sunday coaching sessions made all the difference!\""
            },
            {
              name: "Rochelle Harris, PHR",
              role: "Senior HR Business Partner",
              outcomeBadge: "🎉 Passed 1st Attempt (Score: 560/700)",
              imageNote: "[PHOTO: Real graduate holding official pass letter with HRCI watermark]",
              quote: "\"You definitely have to put in the study hours, but HR.com's practice tests matched the actual test environment 100%. When you see that PASS screen, it is life-changing!\""
            },
            {
              name: "Marky Hyde, aPHR",
              role: "HR Coordinator",
              outcomeBadge: "🎉 Successfully Pivoted from Retail into Corporate HR",
              imageNote: "[PHOTO: Graduate holding aPHR certificate at desk]",
              quote: "\"Coming from non-HR background, I was terrified. My instructor broke down federal employment law into simple practical examples. Couldn't have done it without this course.\""
            }
          ]
        }
      },
      {
        id: "h1-s8",
        name: "8. 7-Step Certification Best Practices (Eric's Roadmap)",
        psychology: {
          heuristic: "Break It Into Steps",
          whyItWorks: "A complex 16-week commitment feels intimidating as one big block. Breaking it into 7 named, numbered steps makes the journey feel short and completely manageable. People are far more likely to start something when they can clearly see the finish line from the beginning.",
          conversionFix: "Eliminates the 'this sounds too hard' dropout. Replaces the legacy 6-box clipart with actionable guidance on when to start the 180-day exam testing window."
        },
        wireframe: {
          badge: "BEST PRACTICES ROADMAP",
          title: "7 Certification Best Practices We Couldn't Recommend More",
          steps: [
            { num: "01", title: "Research Institutes", desc: "Compare HRCI and SHRM requirements to select your ideal credential." },
            { num: "02", title: "Verify Your Eligibility", desc: "Confirm your years of professional HR experience or relevant degree match exam rules." },
            { num: "03", title: "Enroll with Guarantee", desc: "Choose an accredited prep program that includes a 100% money-back pass assurance." },
            { num: "04", title: "Allow 12–16 Weeks", desc: "Carve out 6–8 study hours per week across live sessions and manual reading." },
            { num: "05", title: "Take Timed Mock Exams", desc: "Master test timing and score 80%+ on practice exams to build muscle memory." },
            { num: "06", title: "Time Your Exam Window", desc: "Important: Don't activate your 180-day testing window until you are midway through prep!" },
            { num: "07", title: "Plan Recertification Early", desc: "After passing, start logging your 60 recertification credits early with on-demand webcasts." }
          ]
        }
      },
      {
        id: "h1-s9",
        name: "9. Resource Center & Authority Guides (Shelley's Requirement)",
        psychology: {
          heuristic: "Progressive Disclosure & Authority",
          whyItWorks: "Hesitating candidates often want deep-dive reading before committing money. Providing 5 authoritative, bite-sized guides lets them educate themselves and proves HR.com is the definitive leader in HR certification.",
          conversionFix: "Engages research-oriented buyers who would otherwise leave to search Google for exam comparison details."
        },
        wireframe: {
          badge: "CERTIFICATION RESOURCE CENTER",
          title: "Deep-Dive Guides & Exam Secrets",
          subtitle: "Explore our free authority articles to master exam differences, eligibility rules, and test-taking strategies.",
          resourceCards: [
            { tag: "Career Guide • 4 Min Read", title: "Why Get HR Certified in 2026?", desc: "Comprehensive salary benchmarks, employer demand trends, and career mobility data for HR leaders." },
            { tag: "Exam Facts • 5 Min Read", title: "Get the Facts on HR Certification", desc: "National pass rates (60%) vs accredited course rates (93%), testing costs, and governing body standards." },
            { tag: "Comparison • 6 Min Read", title: "HRCI vs SHRM: Top 3 Differences", desc: "A practical breakdown of exam formats, question styles, and which credential employers in your industry prefer." },
            { tag: "Exam Secrets • 5 Min Read", title: "Secrets to Passing the SHRM-CP & SHRM-SCP", desc: "How to master situational judgment questions and apply the SHRM BASK framework under timed pressure." },
            { tag: "Exam Secrets • 5 Min Read", title: "Secrets to Passing the HRCI aPHR, PHR & SPHR", desc: "How to tackle federal employment law questions, strategic management scenarios, and tricky test traps." }
          ]
        }
      },
      {
        id: "h1-s10",
        name: "10. Honest FAQ & Reassurance Support",
        psychology: {
          heuristic: "Answer the Last Doubt",
          whyItWorks: "By the time a visitor reaches the FAQ section, they're interested but still have one or two unresolved fears stopping them. A clean, searchable FAQ directly answers those final sticking points — missed sessions, refund rules, exam eligibility — before they can become reasons to leave.",
          conversionFix: "Resolves last-minute hesitation. The #1 questions were about missing live classes and how the guarantee actually works — both are now answered upfront in plain language."
        },
        wireframe: {
          badge: "TRANSPARENT ANSWERS",
          title: "Frequently Asked Questions",
          searchPlaceholder: "Search any question (e.g. guarantee, missed class, recordings)...",
          categories: ["Pass Assurance Guarantee", "Class Schedules & Recordings", "Exam Eligibility", "Employer Reimbursement"],
          sampleFaqs: [
            { q: "What happens if I miss a live class session?", a: "Every class is recorded and posted to your online account within 24 hours. You can watch anytime at your own pace." },
            { q: "How does the 100% Money-Back Pass Assurance work?", a: "Attend 80% of live classes, score 80% on practice exams, and take your test within 90 days. If you don't pass, we refund 100% of your tuition or pay for your re-test!" },
            { q: "Can my employer be invoiced directly?", a: "Yes! We provide itemized corporate invoices and accept POs, company credit cards, and ACH transfers." }
          ]
        }
      }
    ]
  },
  {
    id: "hub-2",
    num: "02",
    name: "Employer Funding & Teams",
    targetAudience: "HR Leaders, Directors & Employees seeking Tuition Sponsorship",
    coreMission: "Capture enterprise team training revenue (5–50+ cohorts) and empower solo candidates to get 100% corporate reimbursement with 1-click tools.",
    replaces: "Consolidates Page 4 (Group Certification) & Page 7 (Ask My Employer)",
    sections: [
      {
        id: "h2-s1",
        name: "1. Dual-Audience Hero",
        psychology: {
          heuristic: "Speak to the Right Person",
          whyItWorks: "Two completely different people land on this page: an employee who wants their boss to pay, and an HR leader who wants to train their team. If the page tries to speak to both at once, it connects with neither. Letting visitors self-select in 1 click means every person immediately sees messaging built for them.",
          conversionFix: "Stops HR executives from bouncing off a consumer-focused page and prevents individual candidates from feeling intimidated by enterprise pricing."
        },
        wireframe: {
          eyebrow: "ENTERPRISE WORKFORCE DEVELOPMENT & CORPORATE SPONSORSHIP",
          headline: "An Investment in HR Certification Is the Highest-ROI Business Protection",
          subheadline: "Whether you need your boss to sponsor your individual tuition or you want to upskill a cohort of 5 to 50 HR staff, we make corporate funding effortless.",
          toggleChips: [
            { label: "👤 I'm an Employee Asking My Boss", active: true },
            { label: "🏢 I'm an HR Leader Training My Team", active: false }
          ],
          imagePlaceholder: {
            title: "Executive Team Visual",
            description: "High-level photo of a collaborative HR leadership meeting reviewing talent retention and compliance metrics on dashboard screens.",
            psychology: "Shows a situation the buyer already recognizes — their own world. People trust what they can see themselves in."
          }
        }
      },
      {
        id: "h2-s2",
        name: "2. Team Savings Calculator",
        psychology: {
          heuristic: "Let Them See the Number",
          whyItWorks: "Managers won't fill out a form just to learn pricing. But they will drag a slider. An interactive calculator that instantly shows volume savings (15% to 35% off) gives executives the specific number they need to justify the purchase internally — without any friction.",
          conversionFix: "Solves the bounce on Page 4 where managers hit a blank contact form and left. If they can't see pricing instantly, they assume it's too expensive."
        },
        wireframe: {
          badge: "INSTANT TEAM VOLUME PRICING",
          title: "Calculate Your Group Certification Savings",
          slider: {
            label: "Select Number of HR Team Members:",
            range: "5 to 50+ Team Members",
            currentVal: "10 Members",
            regularTotal: "$10,650",
            discountPercentage: "25% Volume Discount",
            discountedTotal: "$7,987 (Save $2,663)",
            perSeatPrice: "$798 / person"
          },
          includedBonus: "🎁 INCLUDED: 1 Full Year of HR.com Prime Membership for each attendee ($499/person value free).",
          cta: "Request Official Team Quote & Custom Cohort Dates →"
        }
      },
      {
        id: "h2-s3",
        name: "3. The Business Case for the CFO",
        psychology: {
          heuristic: "Frame as Risk, Not Cost",
          whyItWorks: "Executives don't approve 'training budgets' — they approve investments that reduce risk and protect the business. Showing that a single HR mistake costs $150,000+ in legal fees reframes the $1,065 course fee from 'expense' to 'the cheapest insurance they'll ever buy.'",
          conversionFix: "Gives candidates and managers hard financial data they can take directly to their CFO. Without this, the approval conversation stalls at 'sounds nice, but can we afford it?'"
        },
        wireframe: {
          badge: "THE CFO BUSINESS CASE",
          title: "Why Sponsoring HR Certification Delivers 400%+ ROI",
          pillars: [
            {
              metric: "🛡️ $150,000+",
              title: "Compliance Risk Shield",
              desc: "Certified HR pros know current federal, state, and local employment laws, preventing costly wrongful termination, wage & hour, and discrimination claims."
            },
            {
              metric: "📉 -24% Turnover",
              title: "Talent Retention & Mobility",
              desc: "Organizations that invest in HR certifications experience 24% lower department turnover and build strong internal leadership pipelines."
            },
            {
              metric: "⚡ Standardized Quality",
              title: "Consistent Policy Execution",
              desc: "Ensures every HR team member operates under a unified, legally sound framework for hiring, employee relations, and performance management."
            }
          ]
        }
      },
      {
        id: "h2-s4",
        name: "4. Ready-to-Send Boss Pitch Kit",
        psychology: {
          heuristic: "Do the Hard Part For Them",
          whyItWorks: "Most employees want to ask for tuition reimbursement but freeze when it comes to actually writing the email. Providing a polished, pre-written pitch — ready to copy and send in 30 seconds — removes the one action that was blocking the approval conversation from ever starting.",
          conversionFix: "Empowers the 85% of employees who hesitate to ask. The barrier was never the manager's willingness to approve — it was the employee's confidence to ask."
        },
        wireframe: {
          badge: "FOR INDIVIDUAL EMPLOYEES",
          title: "Get Your Employer to Approve Your Tuition in 30 Seconds",
          emailPreviewBox: {
            subject: "Subject: Professional Development Request — HR Certification Prep Course",
            bodyPreview: "Hi [Manager Name],\n\nAs part of my professional development goals for 2026, I would like to enroll in HR.com's accredited HR certification prep course. This course has a 93% pass rate and a 100% money-back guarantee...\n\nThe knowledge gained in employment law compliance, compensation design, and workforce strategy will immediately benefit our team by...",
            copyButton: "📋 Copy Pre-Written Email to Clipboard",
            downloadPdfButton: "📥 Download 1-Page Business Case PDF"
          }
        }
      }
    ]
  },
  {
    id: "hub-3",
    num: "03",
    name: "HR Recertification & Credits",
    targetAudience: "Already-Certified HR Professionals Maintaining Credentials",
    coreMission: "Provide a seamless, panic-free renewal engine where certified professionals easily log all 60 credits with zero manual paperwork.",
    replaces: "Replaces Page 5 (HR Recertification)",
    sections: [
      {
        id: "h3-s1",
        name: "1. Zero-Panic Renewal Hero",
        psychology: {
          heuristic: "Lead with Relief",
          whyItWorks: "Certified HR professionals approaching their 3-year deadline feel genuine stress. The first thing this page does is acknowledge that anxiety and immediately promise a fully automated solution. When people feel understood and reassured in the same breath, they relax — and relaxed people are far more likely to take action.",
          conversionFix: "Replaces the confusing duplicate header and generic copy with a bold, emotion-first headline that converts anxious visitors into confident buyers."
        },
        wireframe: {
          eyebrow: "OFFICIAL HRCI & SHRM RECERTIFICATION PROVIDER",
          headline: "Renew All 60 HRCI & SHRM Recertification Credits in One Place",
          subheadline: "Never worry about credit expiration or audits again. Watch pre-approved on-demand webcasts with automatic credit tracking directly synced to your account.",
          trustSeals: ["HRCI 2026 Approved Provider", "SHRM Recertification Provider", "Pre-Approved Ethics Credits"],
          imagePlaceholder: {
            title: "Effortless Learning Visual",
            description: "Photo of an HR leader comfortably learning on a tablet during downtime with a visible green 60/60 credits progress meter overlay.",
            psychology: "Showing the goal already achieved — a full progress bar — makes the outcome feel inevitable and close, not distant and effortful."
          }
        }
      },
      {
        id: "h3-s2",
        name: "2. Smart Pricing Comparison",
        psychology: {
          heuristic: "Make the Better Option Obvious",
          whyItWorks: "When people compare two options and one is clearly better value, they don't agonize — they just pick the better deal. Framing the 3-Year Pass as '$166/year with 1 year free' makes the math do the selling. The single-year option only exists to make the 3-year look like the obvious choice.",
          conversionFix: "Replaces a confusing pricing comparison bar that nobody could scan. Candidates were leaving without understanding what they were even comparing."
        },
        wireframe: {
          badge: "UNLIMITED RECERTIFICATION PASSES",
          title: "Select Your Recertification Membership",
          cards: [
            {
              tier: "3-YEAR ALL-INCLUSIVE PASS (MOST POPULAR)",
              featured: true,
              price: "$500 Total",
              subprice: "Covers your entire 3-year renewal cycle for only $166/year",
              savingsRibbon: "💥 SAVE $250 — GET 1 FULL YEAR FREE",
              features: [
                "400+ pre-approved HRCI & SHRM webcasts on-demand",
                "Mandatory Ethics credits fully included (no extra fees)",
                "50+ Strategic HRCI business management credits",
                "100% automated credit logging with downloadable audit proof",
                "Dedicated Recertification Concierge support"
              ],
              cta: "Get 3-Year All-Inclusive Pass →"
            },
            {
              tier: "1-YEAR STANDARD PASS",
              featured: false,
              price: "$250 / Year",
              subprice: "Renews annually",
              savingsRibbon: "Standard Access",
              features: [
                "Access to 400+ webcasts for 12 months",
                "Earn up to 30 credits in a single year",
                "Ethics and general recertification credits",
                "Automated attendance tracking",
                "Digital credit transcript"
              ],
              cta: "Get 1-Year Pass →"
            }
          ]
        }
      },
      {
        id: "h3-s3",
        name: "3. Live Credit Tracker Demo",
        psychology: {
          heuristic: "Show, Don't Tell",
          whyItWorks: "Telling people the credit tracking is automatic is easy to ignore. Showing them an interactive demo of progress bars filling up as credits are earned makes the benefit tangible and real. When people can see themselves almost at 60/60, the purchase feels like completing something, not starting something.",
          conversionFix: "Replaces paragraphs of credit rules that nobody read. Visual progress meters communicate the same information in 3 seconds."
        },
        wireframe: {
          badge: "AUTOMATED CREDIT TRACKER DEMO",
          title: "How HR.com Automatically Keeps You 100% Audit-Proof",
          progressMeters: [
            { label: "HRCI General Credits", current: 45, max: 60, pct: "75%" },
            { label: "HRCI Strategic Business Credits", current: 12, max: 15, pct: "80%" },
            { label: "Mandatory Ethics Credit", current: 1, max: 1, pct: "100% COMPLETED", status: "✅ Verified" },
            { label: "SHRM PDC Points", current: 58, max: 60, pct: "96%" }
          ],
          guaranteeCallout: "🛡️ Audit Protection Promise: If HRCI or SHRM audits your renewal submission, our concierge will generate an official verified transcript backed by our approved provider status."
        }
      }
    ]
  }
];
