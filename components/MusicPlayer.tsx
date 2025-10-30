import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getTracks } from '../services/contentService';
import type { Track } from '../types';

const PlayIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M4.018 14.385V5.615a.6.6 0 0 1 .882-.52l8.03 4.385a.6.6 0 0 1 0 1.04l-8.03 4.385a.6.6 0 0 1-.882-.52z"></path></svg>
);
const PauseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M5 15.25a.75.75 0 0 1-.75-.75V5.5a.75.75 0 0 1 1.5 0v9a.75.75 0 0 1-.75.75zm10 0a.75.75 0 0 1-.75-.75V5.5a.75.75 0 0 1 1.5 0v9a.75.75 0 0 1-.75.75z"></path></svg>
);
const NextIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M15.03 9.47 6.47 5.18a.5.5 0 0 0-.72.43v8.78a.5.5 0 0 0 .72.43l8.56-4.29a.5.5 0 0 0 0-.86zM15.5 5v10a.5.5 0 0 0 1 0V5a.5.5 0 0 0-1 0z"></path></svg>
);
const PrevIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M4.97 10.53 13.53 14.82a.5.5 0 0 0 .72-.43V5.61a.5.5 0 0 0-.72-.43L4.97 9.47a.5.5 0 0 0 0 .86zM4.5 15V5a.5.5 0 0 0-1 0v10a.5.5 0 0 0 1 0z"></path></svg>
);
const MusicIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M17.5 2.5a.5.5 0 0 0-.5-.5H8a1 1 0 0 0-1 1v10.33a3.5 3.5 0 1 0 2 3.17V8.5h7.5v2.33a3.5 3.5 0 1 0 2 3.17V3a.5.5 0 0 0-.5-.5z"></path></svg>
);
const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

const MusicPlayer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const tracks = getTracks();
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.75);

    const audioRef = useRef<HTMLAudioElement>(null);

    const playTrack = useCallback((index: number) => {
        if (index === currentTrackIndex) {
            setIsPlaying(p => !p);
        } else {
            setCurrentTrackIndex(index);
            setIsPlaying(true);
        }
    }, [currentTrackIndex]);

    const handleNext = useCallback(() => {
        if (tracks.length === 0) return;
        const nextIndex = currentTrackIndex === null ? 0 : (currentTrackIndex + 1) % tracks.length;
        playTrack(nextIndex);
    }, [currentTrackIndex, tracks.length, playTrack]);
    
    const handlePrev = () => {
        if (tracks.length === 0) return;
        const prevIndex = currentTrackIndex === null ? tracks.length - 1 : (currentTrackIndex - 1 + tracks.length) % tracks.length;
        playTrack(prevIndex);
    };

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying && currentTrackIndex !== null) {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);
    
    const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 z-50 w-16 h-16 bg-brand-primary text-dark-bg rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200"
                aria-label="Open music player"
            >
                <MusicIcon className="w-8 h-8"/>
            </button>
        );
    }

    return (
        <>
            <audio
                ref={audioRef}
                src={currentTrack?.url}
                onEnded={handleNext}
                preload="auto"
            />
            <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 sm:w-80 z-50 bg-dark-bg/80 backdrop-blur-md border border-gray-800 rounded-lg shadow-2xl text-light-text font-mono animate-fade-in-scale">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="font-bold tracking-widest uppercase">PDF Radio</h3>
                    <button onClick={() => setIsOpen(false)} className="text-medium-text hover:text-light-text" aria-label="Close music player">
                        <CloseIcon className="w-5 h-5"/>
                    </button>
                </div>
                
                <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
                    {tracks.map((track, index) => (
                        <button key={track.id} onClick={() => playTrack(index)} className={`w-full text-left p-2 rounded-md flex items-center gap-3 transition-colors duration-200 ${currentTrackIndex === index ? 'bg-brand-primary/20' : 'hover:bg-gray-800'}`}>
                            {currentTrackIndex === index && isPlaying ? <PauseIcon className="w-4 h-4 text-brand-secondary" /> : <PlayIcon className="w-4 h-4 text-brand-secondary" />}
                            <div>
                                <p className={`font-bold text-sm ${currentTrackIndex === index ? 'text-brand-secondary' : 'text-light-text'}`}>{track.title}</p>
                                <p className="text-xs text-medium-text">{track.artist}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-4 bg-black/20">
                    <div className="text-center mb-4">
                        <p className="text-xs text-medium-text">Now Playing</p>
                        <p className="font-bold truncate">{currentTrack?.title || 'Select a track'}</p>
                    </div>
                    <div className="flex justify-around items-center text-light-text">
                        <button onClick={handlePrev} className="hover:text-brand-primary transition-colors" aria-label="Previous track"><PrevIcon /></button>
                        <button onClick={() => isPlaying ? setIsPlaying(false) : playTrack(currentTrackIndex ?? 0)} className="w-12 h-12 bg-brand-primary text-dark-bg rounded-full flex items-center justify-center" aria-label={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? <PauseIcon className="w-8 h-8"/> : <PlayIcon className="w-8 h-8"/>}
                        </button>
                        <button onClick={handleNext} className="hover:text-brand-primary transition-colors" aria-label="Next track"><NextIcon /></button>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <svg className="w-4 h-4 text-medium-text" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2.5a.75.75 0 0 0-3.531 6.552v.948c0 .398-.323.72-.72.72H5.03a.75.75 0 0 0 0 1.5h.719c.398 0 .72.322.72.72v.948a.75.75 0 0 0 1.28.53L10 10.84l2.25 2.158a.75.75 0 0 0 1.28-.53v-.948c0-.398.322-.72.72-.72h.719a.75.75 0 0 0 0-1.5h-.719a.72.72 0 0 0-.72-.72v-.948A.75.75 0 0 0 10 2.5z"></path></svg>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
                            aria-label="Volume control"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MusicPlayer;
