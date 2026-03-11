import React, { useState, useRef, useEffect } from 'react';
import { SOUNDS } from '../data/sounds';
import { Volume2, Square } from 'lucide-react';

export const SoundBoard: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio when component unmounts
  useEffect(() => {
    const handleVideoToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIsVideoOpen(customEvent.detail);
    };

    window.addEventListener('video-modal-toggled', handleVideoToggle);

    return () => {
      window.removeEventListener('video-modal-toggled', handleVideoToggle);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = (url: string, id: string) => {
    if (playingId === id) {
      // Stop currently playing sound
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      // Stop any existing sound
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Play new sound
      audioRef.current = new Audio(url);
      
      // Handle audio ending
      audioRef.current.onended = () => {
        setPlayingId(null);
      };

      audioRef.current.play().catch(e => {
        console.error("Audio play failed. Make sure the file exists in /public/audio/", e);
        // Reset state if play fails (e.g. file not found)
        setPlayingId(null);
      });
      
      setPlayingId(id);
    }
  };

  if (SOUNDS.length === 0) return null;

  return (
    <div 
      className={`fixed z-[100] flex bg-[#1a0f0a]/40 opacity-50 hover:opacity-100 p-3 border-2 border-[#ffd700]/20 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out ${
        isVideoOpen 
          ? 'right-4 top-1/2 -translate-y-1/2 flex-col gap-3 rounded-full' 
          : 'bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex-wrap justify-center items-center gap-2 md:gap-4 rounded-3xl md:rounded-full max-w-[95vw]'
      }`}
    >
      {SOUNDS.map((sound, index) => (
        <div key={sound.id} className="relative group">
          {/* Tooltip */}
          <div className={`absolute bg-[#2c1810] text-[#ffd700] text-xs px-2 py-1 rounded border border-[#ffd700]/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-serif ${
            isVideoOpen ? 'right-full mr-3 top-1/2 -translate-y-1/2' : '-top-10 left-1/2 -translate-x-1/2'
          }`}>
            {sound.label}
          </div>
          
          {/* Round Dot Button */}
          <button
            onClick={() => toggleSound(sound.url, sound.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-inner ${
              playingId === sound.id
                ? 'bg-gradient-to-br from-[#ffd700] to-[#b8860b] border-[#fff8dc] shadow-[0_0_15px_#ffd700] scale-110'
                : 'bg-gradient-to-br from-[#5d4037] to-[#3e2723] border-[#ffd700] hover:bg-[#8b4513] hover:scale-110'
            }`}
          >
            {playingId === sound.id ? (
              <Square className="w-4 h-4 text-[#2c1810] fill-current" />
            ) : (
              <span className="text-[#ffd700] font-serif font-bold text-sm">{index + 1}</span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};
