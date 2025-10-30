
import React, { useState } from 'react';
import type { Edition } from '../types';
import { getEditions } from '../services/contentService';
import EditionModal from './EditionModal';

const YouTubeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const EditionCard: React.FC<{ edition: Edition, onSelect: () => void }> = ({ edition, onSelect }) => {
  const isComingSoon = edition.status === 'coming-soon';

  return (
    <div className="relative overflow-hidden rounded-lg">
      <button 
        onClick={onSelect}
        className={`group bg-[#1a1a1a] rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out text-left w-full focus:outline-none focus:ring-2 focus:ring-brand-primary ring-offset-2 ring-offset-dark-bg hover:-translate-y-2 ${isComingSoon ? 'opacity-70' : ''}`}
      >
        <div className="p-4 pb-0 relative">
          <img 
            src={edition.coverImageUrl} 
            alt={`Cover for ${edition.title}`} 
            className="w-full h-auto object-cover aspect-[3/4] rounded-md"
            style={{ imageRendering: 'auto' }}
          />
           {edition.youtubeVideoId && !isComingSoon && (
            <a 
              href={`https://www.youtube.com/watch?v=${edition.youtubeVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className="absolute bottom-6 right-6 p-3 bg-red-600/80 backdrop-blur-sm rounded-full text-white hover:bg-red-600 hover:scale-110 transition-all duration-200 z-20"
              aria-label="Ver teaser no YouTube"
            >
              <YouTubeIcon className="w-6 h-6" />
            </a>
          )}
        </div>
        <div className="p-6">
          <p className="text-sm text-brand-secondary font-mono">Edição #{edition.issue}</p>
          <h3 className="text-2xl font-bold mt-2 mb-3 text-light-text">{edition.title}</h3>
          <p className="text-medium-text">{edition.excerpt}</p>
          {!isComingSoon && (
            <p className="mt-4 text-xl font-bold text-brand-primary font-mono">
              R$ {edition.price.toFixed(2).replace('.', ',')}
            </p>
          )}
        </div>
      </button>
      {isComingSoon && (
        <div className="absolute top-4 -left-8 text-xs px-8 py-1 sm:top-8 sm:-left-10 sm:text-sm sm:px-12 transform -rotate-45 bg-yellow-400 text-black font-bold uppercase tracking-wider text-center shadow-lg select-none pointer-events-none z-10">
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
      <section className="py-16 md:py-24 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">Edições</h2>
            <p className="mt-4 text-base sm:text-lg text-medium-text max-w-2xl mx-auto">Navegue pelo nosso arquivo de zines.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {mainSeriesEditions.map((edition) => (
              <EditionCard key={edition.issue} edition={edition} onSelect={() => setSelectedEdition(edition)} />
            ))}
          </div>

          {specialEditions.length > 0 && (
            <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t-2 border-brand-secondary/20">
              <div className="text-center mb-12">
                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-brand-secondary">Séries Especiais</h2>
                 <p className="mt-4 text-base sm:text-lg text-medium-text max-w-3xl mx-auto">
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
