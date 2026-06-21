import meImg from '../assets/self/me.png';
import { Code2, Plane, BookOpen, Gamepad2 } from 'lucide-react';

const IDENTITY_ITEMS = [
  { label: 'Developer', icon: <Code2 size={14} /> },
  { label: 'Traveler', icon: <Plane size={14} /> },
  { label: 'Teacher', icon: <BookOpen size={14} /> },
  { label: 'Gamer', icon: <Gamepad2 size={14} /> },
];

export default function Hero() {
  return (
    <section className="hero">
      <img className="hero-bg" src={meImg} alt="" />
      <div className="hero-overlay" />
      <div className="hero-copy">
        <h1>
          Hello,<br />
          I'm Yejee.
        </h1>
        <p>
          Aspiring software developer<br />
          Building small projects<br />
          Learning along the way<br />
        </p>
        <ul className="identity-list">
          {IDENTITY_ITEMS.map(({ label, icon }) => (
            <li key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {icon} {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
