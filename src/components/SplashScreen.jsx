import React, { useState, useEffect } from 'react';
import { Camera, Film, Sparkles } from 'lucide-react';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    // Fade out phase
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2400);

    // Remove from DOM phase
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3100);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-brand-black text-white flex flex-col items-center justify-center p-6 transition-all duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none scale-105 filter blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Radial Lens Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(52,211,153,0.12)_0%,_transparent_70%)] pointer-events-none animate-pulse-slow"></div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-6">
        
        {/* Animated Camera Shutter Lens Icon Backdrop */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-36 h-36 rounded-full border border-emerald-500/20 animate-ping opacity-25"></div>
          <div className="absolute w-28 h-28 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '10s' }}></div>

          {/* Graphic Logo */}
          <div className="relative z-10 p-4 transform transition-all duration-1000">
            <img
              src="/logo.png"
              alt="Grey Area Logo"
              className="h-28 sm:h-36 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-fade-in"
            />
          </div>
        </div>

        {/* Text Title & Subtitle */}
        <div className="space-y-2 animate-slide-up">
          <div className="flex items-center justify-center space-x-2">
            <span className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl tracking-widest text-white uppercase">
              GREY AREA
            </span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-[10px] xs:text-xs font-bold text-gray-400 tracking-[0.25em] uppercase">
            <Film className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>Creative Media Agency</span>
            <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
          </div>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-full max-w-xs space-y-2 pt-4">
          <div className="h-1 w-full bg-grey-card rounded-full overflow-hidden border border-grey-border/50">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-white to-emerald-400 transition-all duration-100 ease-out shadow-[0_0_10px_#34d399]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider flex justify-between">
            <span>Loading Production Suite...</span>
            <span>{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;
