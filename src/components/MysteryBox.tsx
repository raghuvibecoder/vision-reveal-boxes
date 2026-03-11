import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Lock } from 'lucide-react';
import { Person } from '../data/people';

interface MysteryBoxProps {
  person: Person;
}

export const MysteryBox: React.FC<MysteryBoxProps> = ({ person }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Video and Sound refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playCountRef = useRef(0);
  const openSoundRef = useRef<HTMLAudioElement | null>(null);
  const revealSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize sounds
    openSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'); // Chest creak
    revealSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'); // Magical shimmer
  }, []);

  // Force video to play when modal opens
  useEffect(() => {
    if (showContent && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Auto-play failed", e));
    }
  }, [showContent]);

  const closeBox = () => {
    setShowContent(false);
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('video-modal-toggled', { detail: false }));
  };

  const handleOpen = async () => {
    if (!isOpen) {
      playCountRef.current = 0; // Reset play count

      // Play open sound
      openSoundRef.current?.play().catch(e => console.log("Audio play failed", e));
      
      setIsOpen(true);
      
      // Delay showing the full modal content slightly to let the box animation start
      setTimeout(() => {
        setShowContent(true);
        window.dispatchEvent(new CustomEvent('video-modal-toggled', { detail: true }));
        // Play reveal sound when content appears
        setTimeout(() => {
            revealSoundRef.current?.play().catch(e => console.log("Audio play failed", e));
        }, 300);
      }, 800);
    }
  };

  const handleClose = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    closeBox();
  };

  const handleVideoEnded = () => {
    playCountRef.current += 1;
    if (playCountRef.current < 2) {
      // Play again
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log("Replay failed", e));
      }
    } else {
      // Close after 2 plays
      closeBox();
    }
  };

  return (
    <>
      <div 
        className="relative w-64 h-64 cursor-pointer group" 
        onClick={handleOpen}
        style={{ perspective: '1000px' }}
      >
        {/* The Box Container */}
        <div 
          className="relative w-full h-full transition-transform duration-500 group-hover:scale-105"
          style={{ transformStyle: 'preserve-3d' }}
        >
          
          {/* Box Body (Bottom) - Treasure Chest Style */}
          <div className="absolute inset-0 flex items-center justify-center rounded-b-xl shadow-2xl bg-[#5d4037] border-4 border-[#ffd700] overflow-hidden">
             {/* Wood Texture Gradient */}
             <div className="absolute inset-0 bg-[linear-gradient(45deg,#3e2723_25%,#4e342e_25%,#4e342e_50%,#3e2723_50%,#3e2723_75%,#4e342e_75%,#4e342e_100%)] bg-[length:20px_20px] opacity-30" />
             
             {/* Inner Shadow */}
             <div className="absolute inset-0 bg-black/40 pointer-events-none" />
             
             {/* Content inside box (visible when open) */}
             <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-4">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#ffd700] p-3 rounded-full shadow-[0_0_15px_#ffd700]"
                        >
                            <Sparkles className="text-[#8b4513] w-8 h-8 animate-spin-slow" />
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
          </div>

          {/* Box Lid (Top) - Treasure Chest Style */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 110 } : { rotateX: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 h-full z-20 origin-top"
            style={{ transformStyle: 'preserve-3d' }}
          >
             {/* Lid Front/Top Face */}
             <div className="absolute inset-0 bg-[#5d4037] rounded-xl border-4 border-[#ffd700] flex items-center justify-center backface-hidden">
                {/* Wood Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#3e2723_25%,#4e342e_25%,#4e342e_50%,#3e2723_50%,#3e2723_75%,#4e342e_75%,#4e342e_100%)] bg-[length:20px_20px] opacity-30" />
                
                {/* Metal Bands */}
                <div className="absolute top-0 bottom-0 left-8 w-4 bg-[#ffd700] shadow-md" />
                <div className="absolute top-0 bottom-0 right-8 w-4 bg-[#ffd700] shadow-md" />
                
                {/* Lock */}
                <div className="relative z-10 bg-[#ffd700] p-3 rounded-full shadow-lg border-2 border-[#b8860b]">
                    <Lock className="text-[#5d4037] w-8 h-8" />
                </div>
             </div>

             {/* Lid Underside (Visible when open) */}
             <div 
                className="absolute inset-0 bg-[#3e2723] rounded-xl border-4 border-[#ffd700] flex items-center justify-center"
                style={{ transform: 'rotateX(180deg) translateZ(1px)' }}
             >
                 <div className="text-[#ffd700]/50 font-serif italic text-sm">Royal Decree</div>
             </div>
          </motion.div>

          {/* Magical Glow Effect when opening */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
              >
                <div className="w-32 h-32 bg-[#ffd700] rounded-full blur-[50px] opacity-60 mix-blend-screen" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Screen Video Modal */}
      {createPortal(
        <AnimatePresence>
          {showContent && (
            <motion.div
              key="video-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black m-0 p-0"
            >
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 p-4 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors z-[10000] border border-white/30"
              >
                <X size={32} />
              </button>

              {/* Full Screen Video Content */}
              <video 
                ref={videoRef}
                src={person.videoUrl} 
                autoPlay 
                controls
                playsInline
                onEnded={handleVideoEnded}
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              {/* Overlay Content (Minimal at the bottom) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-center pointer-events-none z-[10000]">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-[#ffd700] font-serif text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                        {person.name}
                    </h2>
                  </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
