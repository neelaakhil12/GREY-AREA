import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/2349122934694"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center group focus:outline-none"
      aria-label="Chat with Grey Area on WhatsApp"
    >
      {/* Tooltip text */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg shadow-xl border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat with Grey Area
      </span>

      {/* WhatsApp Button */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110 border-2 border-white/20">
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
