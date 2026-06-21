import type { ReactNode } from 'react';

type Lang = 'en' | 'ko';

const TIMELINE = [
  {
    year: '2014.03 - 2019.08',
    title: { en: 'Hanyang University', ko: '한양대학교' },
    desc: { en: 'B.A. in International Studies', ko: '국제학부 졸업' },
  },
  {
    year: '2019.10 - 2020.05',
    title: { en: 'Blizzard Entertainment', ko: 'Blizzard Entertainment' },
    desc: { en: 'Customer Support Intern', ko: '고객 지원 인턴' },
  },
  {
    year: '2022.03 - 2025.03',
    title: { en: 'KEC', ko: 'KEC' },
    desc: { en: 'B2B Sales & Marketing', ko: '반도체 B2B 영업' },
  },
  {
    year: '2025.03 - 2025.08',
    title: { en: 'Krafton Jungle', ko: '크래프톤 정글' },
    desc: { en: 'Computer Science Bootcamp', ko: 'CS 집중 교육 과정' },
  },
  {
    year: '2025.12 - Present',
    title: { en: 'English Instructor', ko: '영어 강사' },
    desc: { en: 'Teaching English to K–12 students', ko: '초·중·고 영어 지도' },
  },
  {
    year: 'Present',
    title: { en: 'Aspiring Software Developer', ko: '소프트웨어 개발자' },
    desc: { en: 'Learning through projects', ko: '개인 프로젝트 개발' },
  },
];

const QUOTE: Record<Lang, ReactNode> = {
  en: (
    <>
      <span>"I didn't originally plan to become a software developer.</span>
      <br /><br />
      <span>After working in customer support, B2B sales, and education,<br /> I enjoyed building solutions more than simply using them.</span>
      <br /><br />
      <span>That curiosity eventually led me to software engineering."</span>
    </>
  ),
  ko: (
    <>
      <span>고객지원, 영업, 교육 등 다양한 분야에서 일하며 사람들의 불편함을 이해하고 해결하는 과정에서 가장 큰 보람을 느꼈습니다.</span>
      <br /><br />
      <span>이제는 그 경험을 바탕으로, 사람들의 일상을 조금 더 편리하게 만드는 소프트웨어 개발자가 되고 싶습니다.</span>
    </>
  ),
};

const LABELS = {
  certificates: { en: 'Certificates', ko: '자격증' },
  languages: { en: 'Languages', ko: '언어' },
  korean: { en: 'Korean (native)', ko: '한국어 (모국어)' },
  english: { en: 'English (fluent)', ko: '영어 (유창)' },
};

type Props = { lang: Lang };

export default function Journey({ lang }: Props) {
  return (
    <section className="section" id="journey">
      <div className="container">
        <h2 className="section-title">Journey</h2>
        <div className="journey-layout">
          <div className="timeline">
            {TIMELINE.map(({ year, title, desc }) => (
              <div key={year} className="timeline-item">
                <p className="timeline-year">{year}</p>
                <p className="timeline-title">{title[lang]}</p>
                <p className="timeline-desc">{desc[lang]}</p>
              </div>
            ))}
          </div>
          <div>
            <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.6, margin: '0 0 2rem', fontStyle: 'italic' }}>
              {QUOTE[lang]}
            </blockquote>
            <div style={{ marginTop: '1.5rem' }}>
              <p className="timeline-year" style={{ marginBottom: '0.75rem' }}>{LABELS.certificates[lang]}</p>
              <ul className="dash-list">
                <li>SQLD</li>
                <li>{lang === 'en' ? 'Information Processing Engineer' : '정보처리기사'}</li>
                <li>TOEIC 980</li>
              </ul>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <p className="timeline-year" style={{ marginBottom: '0.75rem' }}>{LABELS.languages[lang]}</p>
              <ul className="dash-list">
                <li>{LABELS.korean[lang]}</li>
                <li>{LABELS.english[lang]}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
