import React, { useState } from 'react';
import type { Edition } from '../types';
import { useCart } from '../contexts/CartContext';

interface EditionModalProps {
  edition: Edition | null;
  onClose: () => void;
}

const EditionModal: React.FC<EditionModalProps> = ({ edition, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!edition) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart(edition, quantity);
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
        onClose();
    }, 1500);
  };
  
  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
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
                style={{ imageRendering: 'auto' }}
              />
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-brand-secondary font-mono">Edição #{edition.issue}</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-light-text">{edition.title}</h2>
              <p className="text-medium-text text-lg mb-8 whitespace-pre-wrap">{edition.description}</p>
              
              {edition.status !== 'coming-soon' && (
                <div className="mb-8 bg-dark-bg p-4 rounded-lg border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-3xl font-bold text-brand-primary font-mono">
                      R$ {edition.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleQuantityChange(-1)} 
                          className="w-10 h-10 bg-[#222] border border-gray-700 rounded-md font-bold text-xl hover:bg-gray-700 transition-colors"
                        >-</button>
                        <span className="w-12 h-10 flex items-center justify-center bg-dark-bg border border-gray-700 rounded-md font-bold text-lg">
                          {quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(1)} 
                          className="w-10 h-10 bg-[#222] border border-gray-700 rounded-md font-bold text-xl hover:bg-gray-700 transition-colors"
                        >+</button>
                      </div>
                      <button 
                        onClick={handleAddToCart}
                        className={`px-6 py-2 h-10 rounded-md font-bold text-dark-bg uppercase tracking-wider transition-colors duration-300 ${isAdded ? 'bg-green-500' : 'bg-brand-primary hover:bg-opacity-80'}`}
                      >
                       {isAdded ? 'Adicionado!' : 'Adicionar'}
                      </button>
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