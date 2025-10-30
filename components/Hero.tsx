
import React from 'react';

interface HeroProps {
  onNavigate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="min-h-[80vh] md:h-screen flex items-center justify-center text-center bg-transparent relative overflow-hidden">
      {/* FIX: Replaced non-standard <style jsx> with React inline styles for compatibility. */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '2rem 2rem',
        }}
      ></div>
      <div className="relative z-10 p-4">
        <img 
          src="https://publicdomainfanzine.puter.site/img/logo.png" 
          alt="Public Domain Fanzine Logo" 
          className="w-full max-w-[500px] md:max-w-[700px] mx-auto mb-8" 
        />
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-medium-text mb-8">
          PUBLIC DOMAIN Fanzine é uma série em formato de fanzine que resgata joias esquecidas da Era de Ouro dos quadrinhos. Focada em comics norte-americanos em domínio público, a coleção une pesquisa, preservação e paixão pela história dos heróis e vilões que moldaram a cultura pop.
        </p>
        <button
          onClick={onNavigate}
          className="group relative inline-block px-8 py-3 text-lg font-bold text-light-text uppercase tracking-widest overflow-hidden border-2 border-brand-secondary"
        >
          <span className="absolute inset-0 bg-brand-secondary transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0"></span>
          <span className="relative">Veja as Edições</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
