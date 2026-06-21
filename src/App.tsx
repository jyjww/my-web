import { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import Hero from './sections/Hero';
import Journey from './sections/Journey';
import Projects from './sections/Projects';
import Travel from './sections/Travel';

  function App() {
    const [lang, setLang] = useState<'en' | 'ko'>('en');

    return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero />
        <Journey lang={lang} />
        <Projects />
        <Travel lang={lang} />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}

export default App;
