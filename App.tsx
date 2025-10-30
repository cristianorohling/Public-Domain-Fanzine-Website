import React, { useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Editions from './components/Editions';
import Team from './components/Team';
import Wallpapers from './components/Wallpapers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import MusicPlayer from './components/MusicPlayer';
import { CartProvider } from './contexts/CartContext';
import CartModal from './components/CartModal';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const sections = {
    editions: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    team: useRef<HTMLDivElement>(null),
    wallpapers: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: keyof typeof sections) => {
    sections[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header onNavigate={scrollToSection} onCartClick={() => setIsCartOpen(true)} />
        <main className="overflow-x-hidden">
          <Hero onNavigate={() => scrollToSection('editions')} />
          
          <div ref={sections.editions} className="pt-20 -mt-20">
            <Editions />
          </div>
          <div ref={sections.about} className="pt-20 -mt-20">
            <About />
          </div>
          <div ref={sections.team} className="pt-20 -mt-20">
            <Team />
          </div>
          <div ref={sections.wallpapers} className="pt-20 -mt-20">
            <Wallpapers />
          </div>
          <div ref={sections.contact} className="pt-20 -mt-20">
            <Contact />
          </div>
        </main>
        <Footer />
        <MusicPlayer />
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default App;
