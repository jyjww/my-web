export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1rem' }}>
          <span>© 2026 Yejee Jang</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="https://github.com/jyjww" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:jyjww@naver.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
