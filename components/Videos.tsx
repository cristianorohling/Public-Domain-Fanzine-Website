import React from 'react';
import { getEditions } from '../services/contentService';
import type { Edition } from '../types';

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.538 0 3.286L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const VideoCard: React.FC<{ edition: Edition }> = ({ edition }) => {
  if (!edition.youtubeVideoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${edition.youtubeVideoId}/hqdefault.jpg`;
  const videoUrl = `https://www.youtube.com/shorts/${edition.youtubeVideoId}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full max-w-[280px] aspect-[9/16] rounded-xl overflow-hidden shadow-lg border-2 border-gray-800 hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-secondary ring-offset-2 ring-offset-dark-bg transition-all duration-300"
      >
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for ${edition.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <PlayIcon className="w-16 h-16 text-white/80 drop-shadow-lg transform transition-transform duration-300 group-hover:scale-110" />
        </div>
      </a>
      <h3 className="font-bold text-center text-light-text mt-2">{edition.title}</h3>
      <p className="text-sm font-mono text-brand-secondary">Edição #{edition.issue}</p>
    </div>
  );
};

const Videos: React.FC = () => {
  const editionsWithVideos = getEditions().filter(e => e.youtubeVideoId && e.status !== 'coming-soon');

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">Vídeos</h2>
          <p className="mt-4 text-base sm:text-lg text-medium-text max-w-2xl mx-auto">Assista aos teasers de nossas edições.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 justify-center">
          {editionsWithVideos.map((edition) => (
            <VideoCard key={edition.issue} edition={edition} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
