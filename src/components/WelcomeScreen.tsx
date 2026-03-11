import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Ghost } from 'lucide-react';
import { PEOPLE } from '../data/people';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-6 relative overflow-hidden font-serif">
      {/* Custom Ghost Background Image */}
      <div className="absolute inset-0 bg-[url('/images/ghost-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none" />
      
      {/* Fog/Darkness */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="max-w-5xl w-full min-h-[70vh] flex flex-col items-center justify-center text-center z-10 border border-zinc-800 p-12 md:p-20 rounded-3xl bg-zinc-950/80 backdrop-blur-md shadow-2xl shadow-black relative"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
           <div className="p-4 bg-zinc-900 rounded-full border border-zinc-700 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
             <Ghost className="w-12 h-12 text-emerald-500" />
           </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-zinc-300 mb-6 tracking-tighter mt-8 leading-tight">
          PODAR INTERNATIONAL SCHOOL KADAPA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-800 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] text-3xl md:text-5xl mt-4 block">
            BETAL SHOWS YOUR VISION
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-emerald-500 mb-12 max-w-2xl mx-auto leading-relaxed font-bold tracking-wide uppercase">
          SAY THE MANTRA "BETAL BETAL SHOW OUR VISION" AND I WILL SHOW YOUR VISION
        </p>

        <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 mb-12 shadow-inner">
          <div className="flex items-center justify-center gap-2 mb-6 text-zinc-600">
            <Star className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-widest">VISIONS STORED</h3>
            <Star className="w-5 h-5" />
          </div>
          
          <div className="flex flex-col items-center justify-center gap-4">
            {PEOPLE.map((person, index) => (
              <motion.div 
                key={person.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.2) }}
                className="px-6 py-4 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-400 font-serif tracking-wide shadow-md text-center max-w-xl w-full"
              >
                {person.name}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(220, 38, 38, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-10 py-5 bg-zinc-900 text-red-500 rounded-lg font-bold text-xl overflow-hidden transition-all border border-red-900/50 hover:border-red-500 hover:text-red-400"
        >
          <span className="relative z-10 flex items-center drop-shadow-md">
            Approach the Phantom
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>
    </div>
  );
};
