import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Ghost, Hand } from 'lucide-react';
import { PEOPLE } from '../data/people';
import { MysteryBox } from './MysteryBox';

interface BoxGridProps {
  onBack: () => void;
}

export const BoxGrid: React.FC<BoxGridProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-zinc-950 p-8 relative font-serif overflow-hidden flex flex-col items-center justify-center">
       {/* Custom Ghost Background Image */}
       <div className="absolute inset-0 bg-[url('/images/ghost-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none z-0" />

       {/* Fog & Darkness */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none z-0" />

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center text-zinc-500 hover:text-red-500 transition-colors z-50 font-bold tracking-wide"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Flee
      </motion.button>

      {/* Ambient Glow (Replaced the giant Ghost icon) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none z-0">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative flex flex-col items-center"
        >
          <div className="absolute inset-0 bg-emerald-500/10 blur-[150px] rounded-full w-[600px] h-[600px]" />
        </motion.div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center z-20 mt-12">
        
        {/* The Palms and Boxes */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-5xl gap-48 md:gap-0 px-10 relative z-30 mt-48">
          {PEOPLE.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.4 }}
              className="relative flex flex-col items-center"
            >
              {/* The Palm underneath */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index * 1.5 }}
                className="absolute -bottom-32 text-emerald-900/60 pointer-events-none flex flex-col items-center z-10"
              >
                <Hand className="w-64 h-64 drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]" />
              </motion.div>

              {/* The Box */}
              <div className="relative z-20 mb-12">
                <MysteryBox person={person} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
