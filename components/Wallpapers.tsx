
import React from 'react';
import type { Wallpaper } from '../types';
import { getWallpapers } from '../services/contentService';

const WallpaperCard: React.FC<{ wallpaper: Wallpaper }> = ({ wallpaper }) => (
  <a
    href={wallpaper.imageUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block overflow-hidden rounded-lg"
  >
    <img
      src={wallpaper.imageUrl}
      alt={wallpaper.title}
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
      <h3 className="text-lg sm:text-xl font-bold text-white text-center">{wallpaper.title}</h3>
    </div>
  </a>
);

const Wallpapers: React.FC = () => {
  const wallpapers = getWallpapers();

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">Papéis de Parede</h2>
          <p className="mt-4 text-base sm:text-lg text-medium-text max-w-2xl mx-auto">Leve a arte do nosso zine para a sua área de trabalho.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallpapers.map((wallpaper) => (
            <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wallpapers;
