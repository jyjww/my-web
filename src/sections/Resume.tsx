const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '10px 28px',
  border: '1px solid var(--accent)',
  borderRadius: '4px',
  fontSize: '13px',
  color: 'var(--accent)',
  textDecoration: 'none',
  letterSpacing: '0.04em',
};

export default function Resume() {
  return (
    <section className="section" id="resume">
      <div className="container">
        <h2 className="section-title">Resume</h2>
        <div style={{ textAlign: 'center', padding: '2rem 0 1.5rem' }}>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '1rem', letterSpacing: '0.03em' }}>
            이력서를 확인하거나 PDF로 저장하세요.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`${import.meta.env.BASE_URL}resume.html`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...buttonStyle}}
            >
              View Resume
            </a>
            <a
              href={`${import.meta.env.BASE_URL}resume.html`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...buttonStyle}}
            >
              Download Resume
            </a>

            <a
              href={`${import.meta.env.BASE_URL}portfolio.html`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...buttonStyle}}
            >
              Download Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
