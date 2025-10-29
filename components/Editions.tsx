import React, { useState } from 'react';
import type { Edition } from '../types';
import { getEditions } from '../services/contentService';
import EditionModal from './EditionModal';

const EditionCard: React.FC<{ edition: Edition, onSelect: () => void }> = ({ edition, onSelect }) => {
  const isComingSoon = edition.status === 'coming-soon';

  return (
    <div className="relative">
      <button 
        onClick={onSelect}
        className={`group bg-[#1a1a1a] rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out text-left w-full focus:outline-none focus:ring-2 focus:ring-brand-primary ring-offset-2 ring-offset-dark-bg hover:-translate-y-2 ${isComingSoon ? 'opacity-70' : ''}`}
      >
        <div className="p-4 pb-0">
          <img 
            src={edition.coverImageUrl} 
            alt={`Cover for ${edition.title}`} 
            className="w-full h-auto object-cover aspect-[3/4] rounded-md"
            style={{ imageRendering: 'auto' }}
          />
        </div>
        <div className="p-6">
          <p className="text-sm text-brand-secondary font-mono">Edição #{edition.issue}</p>
          <h3 className="text-2xl font-bold mt-2 mb-3 text-light-text">{edition.title}</h3>
          <p className="text-medium-text">{edition.excerpt}</p>
        </div>
      </button>
      {isComingSoon && (
        <div className="absolute top-8 -left-10 transform -rotate-45 bg-yellow-400 text-black font-bold uppercase tracking-wider px-12 py-1 text-center shadow-lg text-sm select-none pointer-events-none z-10">
          Em Breve!
        </div>
      )}
    </div>
  );
};

const Editions: React.FC = () => {
  const allEditions = getEditions();
  const mainSeriesEditions = allEditions.filter(e => e.title !== "Chocantes Histórias #01");
  const specialEditions = allEditions.filter(e => e.title === "Chocantes Histórias #01");
  
  const [selectedEdition, setSelectedEdition] = useState<Edition | null>(null);

  return (
    <>
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Edições</h2>
            <p className="mt-4 text-lg text-medium-text max-w-2xl mx-auto">Navegue pelo nosso arquivo de zines.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {mainSeriesEditions.map((edition) => (
              <EditionCard key={edition.issue} edition={edition} onSelect={() => setSelectedEdition(edition)} />
            ))}
          </div>

          {specialEditions.length > 0 && (
            <div className="mt-24 pt-16 border-t-2 border-brand-secondary/20">
              <div className="text-center mb-12">
                 <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-brand-secondary">Séries Especiais</h2>
                 <p className="mt-4 text-lg text-medium-text max-w-3xl mx-auto">
                    Explore nossas coleções temáticas! <span className="text-light-text font-bold">Chocantes Histórias</span> é a nossa primeira série dedicada ao melhor do horror, crime e ficção científica da Era de Ouro. Fique de olho para futuros lançamentos de romance, western e mais.
                 </p>
              </div>
              <div className="max-w-md mx-auto">
                {specialEditions.map(edition => (
                  <EditionCard key={edition.issue} edition={edition} onSelect={() => setSelectedEdition(edition)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <EditionModal edition={selectedEdition} onClose={() => setSelectedEdition(null)} />
    </>
  );
};

export default Editions;