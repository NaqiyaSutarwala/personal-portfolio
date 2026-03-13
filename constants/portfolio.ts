import type {
  Skill,
  Project,
  Experience,
  Education,
  SocialLink,
  Stat,
} from "@/types/portfolio";

/* ─── Personal ─────────────────────────────── */
export const PERSONAL_INFO = {
  name: "Naqiya Sutarwala",
  firstName: "Naqiya",
  lastName: "Sutarwala",
  role: "MERN Stack Developer",
  bio: "MERN Stack Developer with 2+ years building scalable full-stack applications. I turn complex problems into clean, performant code across the entire stack.",
  location: "Ahmedabad, India",
  email: "sutarwalanaqiya16@gmail.com",
  phone: "+91 9924632972",
  linkedin: "https://www.linkedin.com/in/naqiya-sutarwala-5747751b0",
} as const;

/* ─── Hero stats ────────────────────────────── */
export const STATS: Stat[] = [
  { number: "2", suffix: "+", label: "Years Experience" },
  { number: "5", suffix: "+", label: "Projects Shipped" },
  { number: "10", suffix: "+", label: "Technologies" },
  { number: "3", suffix: "×", label: "Gold Medals" },
];

/* ─── Skills ────────────────────────────────── */
export const SKILLS: Skill[] = [
  {
    id: "frontend",
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "Redux Toolkit", "JavaScript"],
  },
  {
    id: "backend",
    category: "Backend",
    items: ["Node.js", "Express.js", "NestJS", "REST APIs", "Socket.io"],
  },
  {
    id: "database",
    category: "Database",
    items: ["MongoDB", "MySQL", "PostgreSQL", "TypeORM", "Mongoose"],
  },
  {
    id: "ui",
    category: "UI & Styling",
    items: [
      "Tailwind CSS",
      "Material UI",
      "MantineUI",
      "React Query",
      "Formik",
    ],
  },
  {
    id: "devops",
    category: "Cloud & DevOps",
    items: ["AWS", "S3", "Docker", "CI/CD", "Kafka"],
  },
  {
    id: "integrations",
    category: "Integrations",
    items: ["Stripe", "Twilio", "BigCommerce", "Sanity", "Webhooks"],
  },
];

export const TICKER_ITEMS = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "NestJS",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Stripe",
  "Socket.io",
  "Tailwind",
  "Redux",
  "Express.js",
  "Kafka",
  "CI/CD",
];

/* ─── Projects ──────────────────────────────── */
export const PROJECTS: Project[] = [
  {
    id: "medituri",
    number: "01",
    domain: "Healthcare",
    name: "Medituri",
    description:
      "Platform for healthcare professionals to search drugs and diseases — covering toxicology, treatments, risk calculators, and neonatal/pediatric categorization.",
    tech: ["ReactJS", "Redux", "NestJS", "TypeORM", "MySQL"],
    type: "Full Stack",
    link: "https://portal.medituri.com/",
  },
  {
    id: "crewmates",
    number: "02",
    domain: "PropTech",
    name: "Crewmates",
    description:
      "Property rental platform with host, user, and admin interfaces. Real-time chat via Twilio and secure Stripe payments for short and long-term stays.",
    tech: ["ReactJS", "NodeJS", "Twilio", "Stripe", "Tailwind"],
    type: "Frontend",
    link: "https://devhost.crewmatesapp.com/",
  },
  {
    id: "acquaintdb",
    number: "03",
    domain: "EdTech",
    name: "AcquaintDB — LMS",
    description:
      "Role-based Learning Management System for admins, faculty, and students. Online exams, fee collection, and enrollment management in one place.",
    tech: ["ReactJS", "NodeJS", "MUI", "Sequelize"],
    type: "Full Stack",
  },
  {
    id: "dukkan",
    number: "04",
    domain: "E-Commerce",
    name: "Dukkan",
    description:
      "Headless eCommerce with Next.js + BigCommerce. SEO optimization, rewards/points system, streamlined returns, and Google Analytics integration.",
    tech: ["Next.js", "BigCommerce", "Headless CMS", "SEO"],
    type: "Full Stack",
    // link: "https://dukkan-sit.qatardutyfree.com/",
    isConfidential: true,
  },
  {
    id: "thymos",
    number: "05",
    domain: "HealthTech",
    name: "Thymos — HealthSync",
    description:
      "Healthcare management integrated with OystEHR. Unified appointments, patient charts, real-time chat, and lab orders via AHA and Z3 API integrations.",
    tech: ["NextJS", "TypeScript", "NestJS", "PostgreSQL", "Redux Toolkit"],
    type: "Full Stack",
    link: "http://login.thymos.health/",
  },
];

/* ─── Experience ────────────────────────────── */
export const EXPERIENCES: Experience[] = [
  {
    id: "qrious",
    company: "Qrious Tech Team LLP",
    role: "MERN Stack Developer",
    location: "Ahmedabad, India",
    startDate: "Jan 2024",
    endDate: null,
    isCurrent: true,
  },
];

/* ─── Education ─────────────────────────────── */
export const EDUCATION: Education[] = [
  {
    id: "gujarat-uni",
    degree: "MSc IT — Mobile Applications & UI Development",
    institution: "Gujarat University, Ahmedabad",
    year: "June 2024",
    achievements: [
      "Gold Medal — 1st Rank, Semester One",
      "Gold Medal — 1st Rank, Semester Two",
      "Gold Medal — 1st Rank, Semester Three",
    ],
  },
];

/* ─── Social / Contact links ────────────────── */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "email",
    icon: "✉",
    label: "sutarwalanaqiya16@gmail.com",
    href: "mailto:sutarwalanaqiya16@gmail.com",
    isExternal: false,
  },
  {
    id: "linkedin",
    icon: "💼",
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/naqiya-sutarwala-5747751b0",
    isExternal: true,
  },
  // {
  //   id: "phone",
  //   icon: "📞",
  //   label: "+91 99246 32972",
  //   href: "tel:+919924632972",
  //   isExternal: false,
  // },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
] as const;
