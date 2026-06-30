import { GitFork, ExternalLink } from 'lucide-react';
import rechoThumb from '../assets/project/recho-thumb.png';
import loalarmThumb from '../assets/project/loalarm_thumb.svg';

type Link = {
  label: string;
  href: string;
  type: 'github' | 'website';
};

type Project = {
  name: string;
  thumbnail?: string;
  thumbnailFit?: 'cover' | 'contain';
  description: { en: string; ko: string };
  stack: string[];
  links: Link[];
};

const LINK_ICON = {
  github: <GitFork size={14} />,
  website: <ExternalLink size={14} />,
};

const PROJECTS: Project[] = [
  {
    name: 'Recho',
    thumbnail: rechoThumb,
    description: {
      en: 'A mobile-first platform for musicians to collaborate on short-form video, edit clips, and track ensemble history.',
      ko: '음악인을 위한 숏폼 영상 편집 및 온라인 합주 플랫폼',
    },
    stack: ['React Native', 'NestJS', 'TypeScript', 'PostgreSQL', 'AWS S3', 'CloudFront', 'FFmpeg', 'Canvas API', 'Docker'],
    links: [
      { label: 'GitHub', href: 'https://github.com/jyjww/Recho-Recovery', type: 'github' },
    ],
  },
  {
    name: 'LoAlarm',
    thumbnail: loalarmThumb,
    thumbnailFit: 'contain',
    description: {
      en: 'A PWA that tracks Lost Ark market prices and sends push notifications when items hit a target price.',
      ko: '로스트아크 거래소/경매장 시세 추적 및 가격 알림 PWA',
    },
    stack: ['NestJS', 'TypeScript', 'React', 'PostgreSQL', 'Upstash Redis', 'Firebase FCM', 'GCP Cloud Run', 'Cloud Scheduler', 'GitHub Actions'],
    links: [
      { label: 'GitHub', href: 'https://github.com/jyjww/LoaPwa', type: 'github' },
      { label: 'loalarm.com', href: 'https://loalarm.com', type: 'website' },
    ],
  },
];

export default function Projects({ lang = 'en' }: { lang?: 'en' | 'ko' }) {
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="project-grid">
          {PROJECTS.map((p) => (
            <div key={p.name} className="project-card">
              <div className="project-image">
                {p.thumbnail && (
                  <img
                    src={p.thumbnail}
                    alt={p.name}
                    style={{ objectFit: p.thumbnailFit ?? 'cover', padding: p.thumbnailFit === 'contain' ? '24px' : 0 }}
                  />
                )}
              </div>
              <div className="project-body">
                <h3>{p.name}</h3>

                <p className="project-text">{p.description[lang]}</p>

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
