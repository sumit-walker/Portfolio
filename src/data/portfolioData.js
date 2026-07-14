export const profile = {
  name: "Sumit Raj",
  handle: "sumit-raj",
  title: "Full-Stack Developer",
  location: "Delhi, India",
  email: "hiirajsumit@gmail.com",
  phone: "+91 7428259076",
  githubUser: "sumit-walker",
  x: "https://x.com/rajsumit_",
  github: "https://github.com/sumit-walker",
  linkedin: "https://linkedin.com/in/sumit-raj-8b8a51296",
  summary:
    "B.Tech IT student building full-stack applications with a focus on scalable systems — from Docker/CI-CD pipelines to GraphQL APIs and microservices architecture. Currently exploring cloud-native development and distributed systems design. Actively looking for Software Engineering / Full-Stack roles where I can ship real features and keep learning.",
  interests:
    "• System Design\n• AI-assisted Development\n• Full-Stack Development\n• Developer Tooling\n• Clean Architecture\n• Open Source\n• CI/CD & DevOps",
};

export const skillGroups = [
  { label: "Languages", items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"] },
  { label: "Frontend", items: ["React.js", "HTML", "CSS", "Tailwind CSS", "Redux", "Zustand"] },
  { label: "Backend", items: ["Node.js", "Express.js", "REST APIs", "Socket.io"] },
  { label: "Devops & Deployment", items: ["Docker", "GitHub Actions", "Vercel", "Render", "Netlify"] },
  { label: "Databases", items: ["MySQL", "MongoDB"] },
  { label: "Tools", items: ["Git","GitHub", "Postman", "Cloudinary", "npm audit", "Snyk"] },
];

export const education = [
  {
    school: "Dr. Akhilesh Das Gupta Institute of Professional Studies (GGSIPU)",
    degree: "B.Tech — Information Technology",
    detail: "CGPA: 7.6 / 10",
    period: "2022 – 2026",
  },
  {
    school: "Holy Convent Senior Secondary School",
    degree: "XII — CBSE",
    detail: "Percentage: 78%",
    period: "2022",
  },
];

export const achievements = [
  {
    title: "InnovateNSUT'25 Hackathon — Developer Productivity Dashboard",
    detail:
      "Built a full-stack dashboard as part of a 5-member team within a 24-hour sprint at NSUT, Delhi, competing against teams from across Delhi NCR. Owned API and dashboard integration: connected the GitHub API for live activity data and wired REST endpoints to React dashboard components using Zustand.",
  },
];

export const certifications = [
  "Data Structures & Algorithms — Udemy (2024)",
  "Full-Stack Web Development (MERN) — Apna College (2025)",
];

export const projects = [
  {
    id: 1,
    name: "NewsPulse",
    slug: "_newspulse",
    year: "2026",
    tags: ["React", "Node.js", "Python", "MongoDB"],
    desc:
      "Full-stack news aggregator that ingests articles from 5 RSS sources, deduplicates via SHA256 hashing, and clusters related stories with a BFS keyword-overlap algorithm on an interactive timeline UI. Ingestion automated with a 6-hour GitHub Actions cron job.",
    demo: "https://newspulse-rock.netlify.app",
    repo: "https://github.com/sumit-walker/NewsPulse",
    gradient: "linear-gradient(135deg,#173b3f 0%,#0b1c2c 60%)",
    glyph: "◍",
  },
  {
    id: 2,
    name: "Unused Package Detection System",
    slug: "_dependency-audit",
    year: "2025",
    tags: ["React", "Node.js", "Python"],
    desc:
      "AI-powered dependency analysis tool that flags unused packages across Node.js, Python, and Java projects. Real-time Chart.js dashboard, Snyk-powered CVE scanning, and dry-run simulation with one-click rollback for safe removal.",
    repo: "https://github.com/sumit-walker/unused-package-detection-system",
    gradient: "linear-gradient(135deg,#2a1f3d 0%,#0b1220 60%)",
    glyph: "⬡",
  },
  {
    id: 3,
    name: "Live Chat Platform",
    slug: "_livechat",
    year: "2024",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    desc:
      "Production-ready real-time chat app with JWT authentication and live presence indicators. Socket.io-driven WebSocket event system, Zustand global state, deployed with zero-downtime restarts.",
    demo: "https://chat-app-pvdd.onrender.com",
    repo: "https://github.com/sumit-walker/LiveChat-plateform",
    gradient: "linear-gradient(135deg,#1a2f45 0%,#0b1220 60%)",
    glyph: "◈",
  },
];

export const allTags = [...new Set(projects.flatMap((p) => p.tags))];

export const heroSnippets = [
  `function stack() {
  const langs = ["JS", "TS", "Python", "Java"];
  const core  = ["React", "Node", "Express"];
  return { langs, core, status: "shipping" };
}`,
  `// MERN + Docker + CI/CD
const pipeline = {
  build: "docker build .",
  test:  "npm run test",
  ship:  "gh-actions deploy"
};`,
  `export function auditDependencies(pkgJson) {
  const unused = scan(pkgJson, { engines: ["node","py","java"] });
  return unused.filter(risk => risk.cve || !risk.used);
}`,
];

export const navItems = [
  { key: "hello", label: "_hello" },
  { key: "about-me", label: "_about-me" },
  { key: "projects", label: "_projects" },
];
