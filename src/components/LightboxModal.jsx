import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

const LightboxModal = ({ item, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fade-in">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2.5 sm:p-3 text-gray-400 hover:text-white bg-grey-card rounded-full border border-grey-border transition focus:outline-none z-20"
        aria-label="Close modal"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Navigation Buttons */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 sm:left-8 p-3 text-gray-300 hover:text-white bg-grey-card/80 hover:bg-grey-card rounded-full border border-grey-border transition focus:outline-none hidden sm:flex items-center justify-center z-10"
          aria-label="Previous item"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 sm:right-8 p-3 text-gray-300 hover:text-white bg-grey-card/80 hover:bg-grey-card rounded-full border border-grey-border transition focus:outline-none hidden sm:flex items-center justify-center z-10"
          aria-label="Next item"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content Container */}
      <div className="max-w-4xl w-full bg-grey-nav rounded-xl border border-grey-border overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Image Display */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[220px] max-h-[60vh]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain max-h-[60vh]"
          />
        </div>

        {/* Details Footer */}
        <div className="p-4 sm:p-6 bg-grey-nav border-t border-grey-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="inline-flex items-center text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded bg-grey-card text-gray-300 border border-grey-border">
                <Tag className="w-3 h-3 mr-1 text-gray-400" />
                {item.category}
              </span>
            </div>
            <h3 className="font-heading font-bold text-xl text-white">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-gray-400 text-sm mt-1 max-w-2xl">
                {item.description}
              </p>
            )}
          </div>

          <a
            href="/contact"
            className="inline-flex items-center space-x-2 bg-white text-black font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-gray-200 transition shrink-0"
          >
            <span>Request Similar Media</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;
