import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import StatsAndFaq from './sections/StatsAndFaq';
import SocialFeed from './sections/SocialFeed';
import ContactForm from './components/ContactForm';

export default function App() {
  const [lang, setLang] = useState('ES');

  return (
    <div className="min-h-screen bg-brand-950 text-white">
      <Navbar lang={lang} setLang={setLang} />

      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Services lang={lang} />
        <StatsAndFaq lang={lang} />
        <SocialFeed lang={lang} />
        <ContactForm lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
