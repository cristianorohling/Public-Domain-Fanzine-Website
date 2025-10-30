import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onNavigate: (section: string) => void;
  onCartClick: () => void;
}

const NAV_ITEMS = [
  { key: 'editions', label: 'Edições' },
  { key: 'about', label: 'Sobre' },
  { key: 'team', label: 'Equipe' },
  { key: 'wallpapers', label: 'Wallpapers' },
  { key: 'contact', label: 'Contato' },
];

const CartIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);


const Header: React.FC<HeaderProps> = ({ onNavigate, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-dark-bg/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="text-xl sm:text-2xl font-bold font-mono text-light-text hover:text-brand-primary transition-colors duration-300">
              PDFanzine
            </a>
          </div>
          <nav className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className="text-medium-text hover:text-light-text px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button onClick={onCartClick} className="ml-6 relative text-medium-text hover:text-light-text transition-colors duration-300 p-2" aria-label={`Ver carrinho com ${totalItems} itens`}>
                <CartIcon className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-dark-bg text-xs font-bold">
                        {totalItems}
                    </span>
                )}
            </button>
          </nav>
          <div className="md:hidden flex items-center">
             <button onClick={onCartClick} className="relative text-medium-text hover:text-light-text transition-colors duration-300 p-2 mr-2" aria-label={`Ver carrinho com ${totalItems} itens`}>
                <CartIcon className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-dark-bg text-xs font-bold">
                        {totalItems}
                    </span>
                )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-medium-text hover:text-light-text focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className="text-medium-text hover:text-light-text block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;