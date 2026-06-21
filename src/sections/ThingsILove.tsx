const LOVES = [
  { label: 'Travel', icon: '✈', bg: 'hsl(200 25% 72%)' },
  { label: 'Whiskey', icon: '🥃', bg: 'hsl(350 30% 62%)' },
  { label: 'Gaming', icon: '🎮', bg: 'hsl(30 20% 68%)' },
  { label: 'Reading', icon: '📚', bg: 'hsl(160 18% 65%)' },
];

export default function ThingsILove() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Things I Love</h2>
        <div className="love-grid">
          {LOVES.map(({ label, icon, bg }) => (
            <div
              key={label}
              className="love-card"
              style={{ background: bg }}
            >
              <div className="love-card-content">
                <span>{label}</span>
                <span>{icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
