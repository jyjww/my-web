const NAV_ITEMS = [
  { label: 'Home', href: '#', icon: '⌂' },
  { label: 'Journey', href: '#journey', icon: '◎' },
  { label: 'Projects', href: '#projects', icon: '⬡' },
  { label: 'Writing', href: '#writing', icon: '✎' },
  { label: 'Resume', href: '#resume', icon: '↓' },
];

export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav">
      {NAV_ITEMS.map(({ label, href, icon }) => (
        <a key={label} href={href}>
          <div>{icon}</div>
          <div>{label}</div>
        </a>
      ))}
    </nav>
  );
}
