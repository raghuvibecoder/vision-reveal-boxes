import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { BoxGrid } from './components/BoxGrid';
import { SoundBoard } from './components/SoundBoard';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="font-sans antialiased text-slate-900 bg-white min-h-screen relative">
      {hasStarted ? (
        <BoxGrid onBack={() => setHasStarted(false)} />
      ) : (
        <WelcomeScreen onStart={() => setHasStarted(true)} />
      )}
      
      {/* Global Sound Board at the bottom */}
      <SoundBoard />
    </div>
  );
}
