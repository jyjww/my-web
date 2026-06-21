import { GitFork, ExternalLink, Play } from 'lucide-react';

type Link = {
  label: string;
  href: string;
  type: 'github' | 'demo' | 'website';
};

type Project = {
  name: string;
  thumbnail?: string;
  problem: string;
  solution: string;
  metric: string;
  metricDesc: string;
  stack: string[];
  links: Link[];
};

const LINK_ICON = {
  github: <GitFork size={14} />,
  demo: <Play size={14} />,
  website: <ExternalLink size={14} />,
};

const PROJECTS: Project[] = [
  {
    name: 'Recho',
    problem: 'Users had no simple way to log and revisit music they discovered.',
    solution: 'Built a mobile-first app that lets users record, tag, and replay music moments with minimal friction.',
    metric: '×5.6',
    metricDesc: 'increase in weekly return visits',
    stack: ['React Native', 'NestJS', 'Redis', 'AWS'],
    links: [
      { label: 'GitHub', href: '#', type: 'github' },
      { label: 'Demo', href: '#', type: 'demo' },
    ],
  },
  {
    name: 'Project Two',
    problem: 'Placeholder — describe the core problem this project solved.',
    solution: 'Placeholder — describe the approach and key technical decisions made.',
    metric: '—',
    metricDesc: 'key result placeholder',
    stack: ['React', 'TypeScript', 'Node.js'],
    links: [
      { label: 'GitHub', href: '#', type: 'github' },
    ],
  },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="project-grid">
          {PROJECTS.map((p) => (
            <div key={p.name} className="project-card">
              <div className="project-image">
                {p.thumbnail && <img src={p.thumbnail} alt={p.name} />}
              </div>
              <div className="project-body">
                <h3>{p.name}</h3>

                <p className="project-label">Problem</p>
                <p className="project-text">{p.problem}</p>

                <p className="project-label">Solution</p>
                <p className="project-text">{p.solution}</p>

                <div className="project-metric">
                  <span className="metric">{p.metric}</span>
                  <span className="metric-desc">{p.metricDesc}</span>
                </div>

                <div className="tech-tags">
                  {p.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="project-links">
                  {p.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="project-link-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {LINK_ICON[link.type]}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
