import React from 'react';
import type { Edition } from '../types';

interface EditionModalProps {
  edition: Edition | null;
  onClose: () => void;
}

const EditionModal: React.FC<EditionModalProps> = ({ edition, onClose }) => {
  if (!edition) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-[#1a1a1a] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-800 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 relative">
           <button
            onClick={onClose}
            className="absolute top-4 right-4 text-medium-text hover:text-light-text transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 p-4">
              <img 
                src={edition.coverImageUrl} 
                alt={`Cover for ${edition.title}`} 
                className="w-full h-auto object-cover aspect-[3/4] rounded-md"
                // FIX: 'smooth' is not a valid value for the `imageRendering` property. Changed to 'auto' to resolve the TypeScript error.
                style={{ imageRendering: 'auto' }}
              />
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-brand-secondary font-mono">Edição #{edition.issue}</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-light-text">{edition.title}</h2>
              <p className="text-medium-text text-lg mb-8 whitespace-pre-wrap">{edition.description}</p>
              
              {edition.status !== 'coming-soon' && (
                <div className="mb-8">
                  <div className="bg-dark-bg p-4 rounded-lg border border-gray-800">
                    <span className="text-3xl font-bold text-brand-primary font-mono">
                      R$ {edition.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold text-light-text border-b-2 border-brand-primary pb-2 mb-4">Personagens em Destaque</h3>
              <div className="space-y-6">
                {edition.characterInfo.map(char => (
                  <div key={char.name} className="flex items-start gap-4">
                    <img src={char.imageUrl} alt={char.name} className="w-24 h-24 rounded-full object-cover border-2 border-gray-700 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg text-light-text">{char.name}</h4>
                      <p className="text-medium-text">{char.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditionModal;