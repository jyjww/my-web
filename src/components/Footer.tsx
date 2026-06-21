export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span>© 2024 Yejee Jang</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:imabatmanithink@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
