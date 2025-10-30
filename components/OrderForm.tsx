import React, { useState, useMemo } from 'react';
import { getEditions } from '../services/contentService';
import { SHIPPING_BASE_COST } from '../config/settings';

const MERCADO_LIVRE_LINK = "https://mercadolivre.com.br"; // Placeholder link

const OrderForm: React.FC = () => {
  const editions = useMemo(() => getEditions(), []);
  
  const initialQuantities = useMemo(() => 
    editions.reduce((acc, edition) => {
      acc[edition.issue] = 0;
      return acc;
    }, {} as { [key: number]: number }), [editions]);

  const [quantities, setQuantities] = useState(initialQuantities);

  const handleQuantityChange = (issue: number, delta: number) => {
    setQuantities(prev => {
      const newQuantity = (prev[issue] || 0) + delta;
      return {
        ...prev,
        [issue]: Math.max(0, Math.min(10, newQuantity)) // Clamp between 0 and 10
      };
    });
  };

  const subtotal = useMemo(() => {
    return editions.reduce((total, edition) => {
      const quantity = quantities[edition.issue] || 0;
      return total + (quantity * edition.price);
    }, 0);
  }, [quantities, editions]);

  const total = useMemo(() => subtotal + (subtotal > 0 ? SHIPPING_BASE_COST : 0), [subtotal]);

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">Monte seu Pedido!</h2>
          <p className="mt-4 text-base sm:text-lg text-medium-text max-w-2xl mx-auto">Adicione as edições que deseja ao seu carrinho.</p>
        </div>
        <div className="max-w-3xl mx-auto bg-dark-bg p-4 sm:p-8 rounded-lg border border-gray-800">
          <div className="space-y-6">
            {editions.map(edition => {
              const isComingSoon = edition.status === 'coming-soon';
              return (
                <div key={edition.issue} className={`flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-4 last:border-b-0 last:pb-0 ${isComingSoon ? 'opacity-50' : ''}`}>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-bold text-light-text">{edition.title.toUpperCase()} - #{String(edition.issue).padStart(2, '0')}</h3>
                    <p className="text-brand-secondary font-mono">
                      {isComingSoon ? 'Em Breve!' : `R$ ${edition.price.toFixed(2)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleQuantityChange(edition.issue, -1)} 
                      className="w-10 h-10 bg-[#222] border border-gray-700 rounded-md font-bold text-xl hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isComingSoon || quantities[edition.issue] <= 0}
                    >-</button>
                    <span className="w-12 h-10 flex items-center justify-center bg-dark-bg border border-gray-700 rounded-md font-bold text-lg">
                      {isComingSoon ? '—' : quantities[edition.issue]}
                    </span>
                    <button 
                      onClick={() => handleQuantityChange(edition.issue, 1)} 
                      className="w-10 h-10 bg-[#222] border border-gray-700 rounded-md font-bold text-xl hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isComingSoon || quantities[edition.issue] >= 10}
                    >+</button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 border-t border-gray-800 pt-6">
             <div className="space-y-2 font-mono">
                <p className="flex justify-between text-medium-text"><span>Subtotal:</span> <span>R$ {subtotal.toFixed(2)}</span></p>
                <p className="flex justify-between text-medium-text"><span>Frete Fixo:</span> <span>R$ {subtotal > 0 ? SHIPPING_BASE_COST.toFixed(2) : '0.00'}</span></p>
                <hr className="border-gray-700 my-2" />
                <p className="flex justify-between text-xl sm:text-2xl font-bold text-light-text"><span>Total:</span> <span className="text-brand-primary">R$ {total.toFixed(2)}</span></p>
              </div>
          </div>
          
          <div className="mt-8">
            <a
              href={subtotal > 0 ? MERCADO_LIVRE_LINK : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full block text-center bg-brand-primary text-dark-bg font-bold py-3 sm:py-4 px-6 rounded-md text-base sm:text-lg uppercase tracking-wider transition-all duration-300 ${subtotal > 0 ? 'opacity-100 hover:bg-opacity-80' : 'opacity-50 cursor-not-allowed'}`}
              aria-disabled={subtotal === 0}
              onClick={(e) => subtotal === 0 && e.preventDefault()}
            >
              Comprar no Mercado Livre
            </a>
             {subtotal > 0 && <p className="text-center text-xs text-medium-text mt-4">Você será redirecionado para um ambiente de compra seguro.</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;