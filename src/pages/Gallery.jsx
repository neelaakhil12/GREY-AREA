import React, { useState, useEffect } from 'react';
import { Eye, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import LightboxModal from '../components/LightboxModal';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGalleryItems(data.data);
        } else {
          setGalleryItems([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching gallery:', err);
        setLoading(false);
      });
  }, []);

  const handleOpenLightbox = (item, index) => {
    setSelectedImage(item);
    setSelectedIndex(index);
  };

  return (
    <>
      <SEO 
        title="Our Gallery | Creative Media & Event Portfolio"
        description="Explore Grey Area's portfolio of brand story videos, corporate event coverage, fashion showcases, product shoots, and behind-the-scenes moments."
      />

      {/* Header Banner */}
      <section className="bg-grey-nav text-white py-10 sm:py-16 lg:py-20 border-b border-grey-border">
        <div 
          data-aos="fade-down"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Creative Portfolio
          </span>
          <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-5xl text-white break-words">
            Our Work & Showcase
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            A curated selection of brand video productions, corporate event coverage, product commercials, and celebratory moments.
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10 lg:space-y-12">

          {/* Loading Indicator */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
              <span className="text-sm font-medium">Loading portfolio items...</span>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200 max-w-md mx-auto space-y-3">
              <p className="text-gray-600 font-medium">No portfolio media items found.</p>
            </div>
          ) : (
            /* Gallery Items Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryItems.map((item, index) => (
                <div
                  key={item.id || index}
                  data-aos="zoom-in"
                  data-aos-delay={(index % 4 + 1) * 100}
                  onClick={() => handleOpenLightbox(item, index)}
                  className="group relative bg-grey-card rounded-xl overflow-hidden border border-grey-border shadow-md cursor-pointer aspect-4/3 flex flex-col justify-end"
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    loading="lazy" 
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-85 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-heading font-bold text-base text-white leading-snug">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center space-x-1 text-xs text-gray-400">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Full Quality</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Modal Component */}
      {selectedImage && (
        <LightboxModal
          item={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrev={selectedIndex > 0 ? () => {
            const prevIndex = selectedIndex - 1;
            setSelectedIndex(prevIndex);
            setSelectedImage(galleryItems[prevIndex]);
          } : null}
          onNext={selectedIndex < galleryItems.length - 1 ? () => {
            const nextIndex = selectedIndex + 1;
            setSelectedIndex(nextIndex);
            setSelectedImage(galleryItems[nextIndex]);
          } : null}
        />
      )}
    </>
  );
};

export default Gallery;
