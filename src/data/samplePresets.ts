export interface Preset {
  id: string;
  name: string;
  role: string;
  company: string;
  category: string;
  jdText: string;
  cvText: string;
}

export const SAMPLE_PRESETS: Preset[] = [
  {
    id: 'stripe-staff-engineer',
    name: 'Staff Distributed Systems Engineer',
    role: 'Staff Infrastructure / Distributed Systems Engineer',
    company: 'Stripe',
    category: 'Engineering & Tech',
    jdText: `Role: Staff Software Engineer, Core Payments & Distributed Infrastructure
Company: Stripe
Location: San Francisco, CA / Remote

About Stripe:
Stripe builds economic infrastructure for the internet. Millions of companies—from world’s largest enterprises to ambitious startups—use Stripe’s software and APIs to accept payments, send payouts, and manage their business online.

Role Overview:
We are seeking a Staff Software Engineer to lead the architecture, resilience, and scaling of our Core Ledger and Payment Routing engine. You will design fault-tolerant distributed systems handling hundreds of thousands of transactions per second, with 99.999% availability and strict zero-loss consistency guarantees.

Key Responsibilities:
• Architect, design, and implement mission-critical distributed services in Go, Java, or Rust that process billions of dollars in daily transactions.
• Drive the technical strategy for data consistency, idempotency, event sourcing, and partition tolerance across geo-distributed databases.
• Mentor senior and staff-level engineers, review complex architecture proposals, and establish company-wide engineering best practices.
• Collaborate with Security, Compliance, and SRE teams to safeguard data integrity and exceed PCI-DSS Level 1 specifications.
• Lead post-mortems and root-cause analyses on high-severity operational incidents, building automated self-healing mechanisms.

Qualifications & Requirements:
• 8+ years of professional software engineering experience designing and operating high-throughput, low-latency distributed systems.
• Proven mastery in Go, Java, C++, or Rust with deep knowledge of concurrency models, memory management, and asynchronous I/O.
• Hands-on expertise with distributed consensus protocols (Raft, Paxos), Kafka/Pulsar streaming, and globally distributed SQL/NoSQL stores (CockroachDB, Spanner, Cassandra, PostgreSQL).
• Strong track record of driving cross-functional technical initiatives and delivering multi-quarter architectural transformations.
• Deep understanding of microservice networking, gRPC, distributed tracing, Kubernetes, and AWS infrastructure.
• Bachelor’s or Master’s degree in Computer Science, or equivalent practical industry experience.`,
    cvText: `ALEXANDER VANCE
San Francisco, CA • alex.vance.dev@gmail.com • (555) 392-1840 • linkedin.com/in/alexandervance • github.com/avance-infra

SUMMARY
Principal / Staff-track Distributed Systems Engineer with 9+ years of experience engineering high-scale fintech backend infrastructure. Proven track record designing distributed ledgers, event-driven payment pipelines, and zero-loss consensus protocols processing 45,000+ RPS at 99.995% uptime. Passionate about system correctness, latency optimization, and mentoring high-velocity engineering teams.

PROFESSIONAL EXPERIENCE

LEAD DISTRIBUTED SYSTEMS ENGINEER | Plaid Technologies (2021 – Present)
• Architected and deployed next-generation Transaction Ingestion Pipeline in Go and Kafka, handling 45K requests/sec across 12,000 financial institutions with sub-50ms p99 latency.
• Engineered a two-phase commit distributed ledger atop CockroachDB and Redis, achieving 100% idempotency and eliminating $1.4M in annual transaction discrepancies.
• Spearheaded migration from monolithic Ruby service to Go-based microservices orchestrated on Kubernetes (EKS), cutting cloud compute costs by 32% ($450K annually).
• Led an 8-engineer platform squad, instituted rigorous design review templates, and conducted 70+ technical interviews for senior engineering roles.
• Coordinated zero-downtime database partition migrations and authored disaster recovery runbooks meeting SOC-2 Type II standards.

SENIOR SOFTWARE ENGINEER | Square / Block (2018 – 2021)
• Built core settlement routing microservice in Java (Spring Boot) and gRPC, routing $3.2B in monthly merchant card processing volume.
• Designed Kafka streaming consumers with dead-letter queue automation, reducing failed webhook retries by 68%.
• Implemented OpenTelemetry distributed tracing and Prometheus alerting across 24 core services, reducing MTTR for Sev-1 incidents from 42 minutes to 11 minutes.
• Mentored 4 mid-level engineers through successful promotions to Senior Engineer.

SOFTWARE ENGINEER | Affirm (2015 – 2018)
• Developed loan underwriting decision engine in Python and PostgreSQL, serving real-time risk scores in <120ms.
• Built automated CI/CD deployment pipelines on AWS and Docker, accelerating engineering release frequency from bi-weekly to daily.

TECHNICAL SKILLS
• Languages: Go (Golang), Java, Rust (intermediate), Python, SQL, C++
• Distributed Systems: Kafka, CockroachDB, PostgreSQL, Redis, gRPC, Raft, Event Sourcing, Distributed Locking
• Cloud & DevOps: AWS (EKS, Aurora, S3, IAM), Kubernetes, Docker, Terraform, Datadog, Prometheus, CI/CD
• Practices: High-Availability Architecture, Idempotency, Performance Profiling, Zero-Trust Security, Chaos Engineering

EDUCATION
• Bachelor of Science in Computer Science | University of California, Berkeley (2011 – 2015)
  Honors: Magna Cum Laude, Tau Beta Pi Engineering Honor Society

CERTIFICATIONS
• AWS Certified Solutions Architect – Professional (2023)
• Certified Kubernetes Administrator (CKA, 2022)`,
  },
  {
    id: 'mckinsey-consultant',
    name: 'Management Consultant / Engagement Manager',
    role: 'Associate / Engagement Manager (Digital & Strategy)',
    company: 'McKinsey & Company',
    category: 'Consulting & Strategy',
    jdText: `Role: Engagement Manager / Associate – Strategy & Digital Transformation
Company: McKinsey & Company
Location: New York, NY / Chicago, IL

About McKinsey & Company:
McKinsey is the premier global management consulting firm committed to helping institutions in the private, public, and social sectors create change that matters. We partner with clients from the C-suite to the front line to transform organizations and build enduring capabilities.

Role Overview:
Engagement Managers lead client service teams solving our clients' toughest strategic, operational, and organizational dilemmas. You will manage end-to-end consulting engagements from hypothesis generation, executive interviews, and quantitative economic modeling through C-level presentation and change management execution.

Key Responsibilities:
• Lead cross-functional problem-solving workstreams across market entry, profitability enhancement, commercial pricing, M&A due diligence, and operational turnaround.
• Direct and mentor teams of 3–5 consultants and business analysts, structuring complex problem breakdowns into MECE hypotheses and analytics workplans.
• Synthesize complex quantitative and qualitative data into compelling executive board decks and actionable strategic recommendations.
• Serve as the primary trusted advisor to client VP and C-suite stakeholders, managing expectations, alignment, and implementation roadmaps.
• Lead client workshops and design sprints to co-create sustainable digital operating models and customer journeys.

Qualifications & Requirements:
• Master of Business Administration (MBA) or equivalent advanced degree from a top-tier business school.
• 4–7 years of experience in management consulting, corporate strategy, investment banking, or high-growth tech operational strategy.
• Exceptional structured problem-solving skills, quantitative modeling capabilities, and business acumen across multiple industry verticals.
• Demonstrated leadership track record managing high-performing project teams under tight timelines.
• Superior verbal and written executive communication skills; ability to influence senior business leaders.`,
    cvText: `PRIYA SHARMA
New York, NY • priya.sharma.consult@gmail.com • (555) 819-2041 • linkedin.com/in/priyasharma-strategy

EXECUTIVE SUMMARY
Strategic advisor and Engagement Lead with 6 years of consulting and corporate strategy experience across Fortune 100 enterprise tech and financial services. Proven expertise in profitability optimization, go-to-market strategy, commercial pricing, and post-merger integration. Track record of leading 4-6 person consulting teams delivering $85M+ in measurable client enterprise value.

EDUCATION
• MBA, Strategy & Finance | Columbia Business School, New York (2019 – 2021)
  Dean’s Honors List, President of Management Consulting Club
• B.S. in Economics & Industrial Engineering | Northwestern University (2013 – 2017)
  Summa Cum Laude, Phi Beta Kappa

EXPERIENCE

STRATEGY ENGAGEMENT LEAD | Oliver Wyman / Strategy Practice (2021 – Present)
• Directed 8 high-stakes client engagements for Tier-1 Banks and Enterprise SaaS clients, managing teams of 4 consultants and data analysts.
• Formulated a value-based pricing strategy for a $4B global payments provider, restructuring 3-tier contract terms to capture $38M in incremental annual net revenue (+7.2%).
• Led operational profitability turnaround for a healthcare logistics client, identifying $24M in SG&A redundancies and driving MECE cost-reduction workstreams.
• Conducted commercial M&A due diligence on a $650M fintech acquisition target, building market sizing, customer churn regression models, and presenting findings directly to Managing Partners and target C-suite.
• Facilitated 15+ executive steering committee sessions with client EVP/SVP stakeholders, ensuring seamless change-management adoption across 1,200 employees.

SENIOR STRATEGY CONSULTANT | Deloitte Consulting (2017 – 2019)
• Built comprehensive financial three-statement models, DCF valuations, and unit economic sensitivity analyses for telecom market entry in Latin America.
• Designed and executed customer journey optimization workstream, reducing onboarding drop-off by 22% across 350K monthly digital users.
• Mentored 6 incoming Business Analysts and developed internal firm training curriculum on MECE structured hypothesis problem solving.

SKILLS & CORE COMPETENCIES
• Strategic Competencies: Market Sizing, Profitability Diagnostics, Pricing Strategy, Growth Vector Analysis, M&A Due Diligence, Zero-Based Budgeting
• Frameworks: MECE Structuring, Issue Trees, Porter’s Five Forces, 3C’s/4P’s, Value Chain Disaggregation, Balanced Scorecard
• Quantitative Tools: Advanced Financial Modeling (Excel, DCF, LBO), Tableau, SQL, Alteryx, PowerPoint Executive Synthesis
• Leadership: Cross-functional Stakeholder Management, Team Mentorship, Executive Board Presentations`,
  },
  {
    id: 'anthropic-pm',
    name: 'Senior Product Manager - AI Platform',
    role: 'Senior Product Manager, Enterprise AI & Model APIs',
    company: 'Anthropic',
    category: 'Product & AI',
    jdText: `Role: Senior Product Manager, Enterprise AI Platform & Developer API
Company: Anthropic
Location: San Francisco, CA / Hybrid

About Anthropic:
Anthropic is an AI safety and research company that builds reliable, interpretable, and steerable AI systems. Our flagship Claude family of models powers mission-critical enterprise workflows and millions of developers worldwide.

The Role:
We are looking for a technical Senior Product Manager to lead our Enterprise Model API and Developer Platform. You will bridge cutting-edge frontier research and enterprise developer needs, defining the product roadmap for tool use, prompt caching, batch processing, and safety guardrails.

Responsibilities:
• Define product vision, customer discovery, and roadmaps for Anthropic’s developer API platform, SDKs, and enterprise console.
• Partner closely with AI Research Scientists, Infrastructure Engineers, and Enterprise Sales to commercialize frontier model capabilities.
• Conduct customer interviews with CTOs and Lead AI Architects to identify friction in latency, token pricing, context retrieval, and safety controls.
• Establish quantitative product metrics (API adoption, developer retention, gross margins, token throughput) and run data-informed experiments.
• Write comprehensive PRDs, API specs, and coordinate go-to-market rollouts for major model releases.

Requirements:
• 5+ years of software product management experience, with at least 2+ years leading developer-facing API, platform, or machine learning infrastructure products.
• Deep technical fluency in LLM capabilities (prompt engineering, function calling, embeddings, RAG architectures, fine-tuning).
• Proven track record of taking complex developer platforms from 0-to-1 and scaling to millions in API consumption.
• Outstanding written and verbal communication skills; ability to translate ambiguity into crisp engineering roadmaps.
• Degree in Computer Science, Engineering, or demonstrable hands-on software development background.`,
    cvText: `MARCUS CHEN
San Francisco, CA • marcus.chen.pm@gmail.com • (555) 472-9102 • linkedin.com/in/marcuschen-pm

PROFESSIONAL SUMMARY
Senior Product Manager with 6+ years of experience leading developer platforms, cloud APIs, and enterprise ML infrastructure. Proven ability to translate complex distributed systems and machine learning models into intuitive, high-velocity developer products. Grew API developer platform from $4M to $28M ARR while leading cross-functional teams of 14 engineers, designers, and researchers.

EXPERIENCE

SENIOR PRODUCT MANAGER, DEVELOPER PLATFORM | Twilio (2021 – Present)
• Owned developer API platform, SDK ecosystem, and developer console serving 350,000+ active developers and generating $75M in API revenue.
• Spearheaded 0-to-1 launch of Twilio AI Voice Assist API, incorporating low-latency streaming and tool execution, scaling to 15M monthly API calls within 6 months.
• Introduced prompt caching and smart token batching for enterprise customers, cutting average developer end-to-end latency by 41% and lowering infrastructure cost by 25%.
• Authored 18 comprehensive PRDs and API specifications; conducted weekly sprint planning and backlog prioritization for two engineering squads (12 engineers).
• Partnered with Enterprise Sales to close 14 Fortune 500 accounts ($12M ARR) by developing enterprise SSO, RBAC, and SOC-2 audit log controls.

PRODUCT MANAGER, CLOUD INFRASTRUCTURE | Cloudflare (2018 – 2021)
• Led product strategy for Cloudflare Workers KV and serverless edge storage, achieving 180% YoY developer adoption growth.
• Designed usage-based pricing model and quota management system that lifted gross margins by 8 percentage points.
• Collaborated with developer advocates and technical documentation teams to overhaul onboarding tutorials, improving developer time-to-first-hello-world from 14 minutes to 3.5 minutes.

ASSOCIATE PM / TECHNICAL ANALYST | Oracle Cloud (2016 – 2018)
• Analyzed customer churn patterns across 500+ database customers; drafted feature specs for automated automated database failover.

EDUCATION
• B.S. in Computer Science | Stanford University (2012 – 2016)
  President of Stanford Product Management Association

SKILLS & EXPERTISE
• Product Strategy: Developer Experience (DX), API Design (REST/gRPC/GraphQL), Usage-Based Pricing, GTM, Customer Discovery
• AI & ML Concepts: LLM Function Calling, RAG Pipelines, Vector Search, Latency Optimization, Model Evaluation Rubrics
• Technical: Python, TypeScript, SQL, Postman, Git, AWS, DataDog, Mixpanel, Amplitude, Figma`,
  },
  {
    id: 'figma-growth-marketing',
    name: 'Head of Growth Marketing',
    role: 'Growth Marketing Lead / Director of Performance',
    company: 'Figma',
    category: 'Marketing & Growth',
    jdText: `Role: Growth Marketing Lead (B2B SaaS & Product-Led Growth)
Company: Figma
Location: San Francisco, CA / New York / Remote

About Figma:
Figma is the collaborative interface design platform powering modern product creation. From wireframes to production-ready design systems, Figma connects teams so they can build better products together.

Role Overview:
We are seeking an experienced Growth Marketing Lead to drive self-serve user acquisition, product-led expansion, and enterprise pipeline generation. You will lead paid digital marketing, conversion rate optimization (CRO), lifecycle engagement loops, and experimentation across paid and organic growth loops.

Responsibilities:
• Own multi-million dollar annual performance marketing budget across Google Search, LinkedIn, Meta, YouTube, and programmatic channels.
• Partner with Product Growth and Analytics to build virality loops and optimize freemium-to-paid self-serve conversion funnels.
• Design, launch, and analyze 20+ A/B tests per quarter across landing pages, onboarding email sequences, and paid media creatives.
• Develop sophisticated attribution models (multi-touch, incrementality testing) with the Data Science team.
• Lead cross-functional growth squad of growth marketers, designers, copywriters, and frontend engineers.

Requirements:
• 6+ years of growth marketing, performance marketing, or demand generation in B2B SaaS or Product-Led Growth (PLG) businesses.
• Proven track record of scaling paid customer acquisition profitably while lowering Blended CAC and increasing LTV:CAC > 4x.
• Deep expertise in Web Analytics (GA4, Segment), BI tools (Looker, Amplitude), and conversion optimization platforms.
• Strong quantitative and analytical mindset; fluent in SQL and cohort retention analysis.
• Bachelor’s degree in Business, Marketing, Economics, or related field.`,
    cvText: `SOPHIA MARTINEZ
San Francisco, CA • sophia.martinez.growth@gmail.com • (555) 720-4491 • linkedin.com/in/sophiamartinez-growth

SUMMARY
Data-driven Growth Marketing Leader with 7+ years of experience scaling Product-Led Growth (PLG) SaaS platforms. Managed $12M+ in annual digital media budgets, improved trial-to-paid conversion by 34%, and scaled ARR from $18M to $65M. Expert in paid performance channels, lifecycle automation, full-funnel CRO, and multi-touch attribution modeling.

EXPERIENCE

LEAD GROWTH MARKETING MANAGER | Miro (2021 – Present)
• Manage an $8.5M annual performance marketing budget across Paid Search, LinkedIn Ads, YouTube, and Programmatic Display, generating 240,000+ monthly sign-ups.
• Lowered Customer Acquisition Cost (CAC) by 26% while scaling enterprise sales-qualified leads (SQLs) by 48% YoY.
• Built automated lifecycle email onboarding journeys in Braze, boosting day-14 team activation rate from 18% to 29%.
• Orchestrated 35+ landing page A/B tests per year with growth engineering, driving a +19% increase in self-serve checkout completions.
• Mentored a team of 4 growth marketers and managed 2 external performance media agencies.

SENIOR PERFORMANCE MARKETING MANAGER | Notion (2018 – 2021)
• Scaled paid search and social acquisition campaigns from $1.2M to $5M annual run rate with a sustained LTV:CAC ratio of 5.2x.
• Implemented incrementality testing and Markov multi-touch attribution models in collaboration with Data Science, reallocating $1.8M in inefficient ad spend.
• Partnered with Product team to design viral referral loop for workspace team invites, driving 140,000 organic signups in 6 months.

GROWTH MARKETING SPECIALIST | Asana (2016 – 2018)
• Managed SEM and retargeting campaigns; increased click-to-lead conversion rate by 22% through keyword intent restructuring and bespoke landing pages.

CORE SKILLS
• Growth Channels: Google Ads (Search/PMax), LinkedIn Ads, Meta, YouTube, Display, SEO
• Analytics & Data: SQL, Google Analytics 4, Amplitude, Segment, Looker, Tableau, Excel
• Optimization & CRO: Optimizely, VWO, Webflow, Landing Page Architecture, A/B Testing
• Lifecycle & Automation: Braze, HubSpot, Marketo, Customer.io, Segment, Zapier`,
  },
];
