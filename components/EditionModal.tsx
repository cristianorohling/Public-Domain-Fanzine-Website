import React, { useState, useEffect } from 'react';
import type { Edition } from '../types';
import { useCart } from '../contexts/CartContext';

interface EditionModalProps {
  edition: Edition | null;
  onClose: () => void;
}

const YouTubeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);


const EditionModal: React.FC<EditionModalProps> = ({ edition, onClose }) => {
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (edition) {
      const itemInCart = cartItems.find(item => item.issue === edition.issue);
      // Se o item estiver no carrinho, mostrar a quantidade atual.
      // Caso contrário, o padrão é 1 para um novo item.
      setQuantity(itemInCart ? itemInCart.quantity : 1);
      // Reinicia o estado de confirmação "Adicionado!".
      setIsAdded(false);
    }
  }, [edition, cartItems]);


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
            <div className="md:col-span-1 p-0 sm:p-4">
              <img 
                src={edition.coverImageUrl} 
                alt={`Cover for ${edition.title}`} 
                className="w-full h-auto object-cover aspect-[3/4] rounded-md"
                style={{ imageRendering: 'auto' }}
              />
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-brand-secondary font-mono">Edição #{edition.issue}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4 text-light-text">{edition.title}</h2>
              
              {edition.status !== 'coming-soon' && (
                <div className="my-6 bg-dark-bg p-4 rounded-lg border border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold text-brand-primary font-mono">
                      R$ {edition.price.toFixed(2).replace('.', ',')}
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
              
              <p className="text-medium-text text-base sm:text-lg mb-8 whitespace-pre-wrap">{edition.description}</p>
              
              {edition.youtubeVideoId && (
                <div className="mb-8">
                    <a
                        href={`https://www.youtube.com/watch?v=${edition.youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center w-full sm:w-auto px-6 py-2 text-base font-bold text-light-text bg-red-600 uppercase tracking-widest rounded-md border-2 border-red-600 transition-all duration-300 hover:bg-transparent hover:text-red-500 hover:border-red-500"
                    >
                        <YouTubeIcon className="w-6 h-6 mr-3" />
                        <span>Ver no YouTube</span>
                    </a>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditionModal;