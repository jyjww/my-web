const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
];

type HeaderProps = {
  lang: 'en' | 'ko';
  setLang: React.Dispatch<React.SetStateAction<'en' | 'ko'>>;
};

export default function Header({ lang, setLang }: HeaderProps) {

  return (
    <header className="header">
      <div className="header-inner container">
        <span className="logo">Yejee</span>
        <nav className="nav">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>

        <button className="lang-toggle" aria-label="Toggle language" onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}>
          {lang.toUpperCase()}
        </button>
      </div>
    </header>
  );
}
