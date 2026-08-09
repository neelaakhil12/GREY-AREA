import React, { useState, useEffect } from 'react';
import { Eye, Loader2, Play, Camera, Film, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import LightboxModal from '../components/LightboxModal';
import { initialGalleryItems } from '../data/initialGallery';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const loadGalleryData = async () => {
    setLoading(true);
    let apiItems = [];
    let supaItems = [];
    let localCustomItems = [];

    try {
      // 1. Fetch local Express API items if available
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            apiItems = data.data;
          }
        }
      } catch (err) {}

      // 2. Query Supabase REST API directly for Vercel production deployment
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://moofrnuptxblogvfweac.supabase.co';
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb2ZybnVwdHhibG9ndmZ3ZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODE2MDcsImV4cCI6MjEwMTg1NzYwN30.H1KFnNtx5zIGm8-clt9S3WdPIrBSlcUfa0HAwJPafNo';
      try {
        const supaRes = await fetch(`${SUPABASE_URL}/rest/v1/gallery_items?select=*`, {
          headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        if (supaRes.ok) {
          const supaData = await supaRes.json();
          if (Array.isArray(supaData)) {
            supaItems = supaData.map(g => ({
              id: g.id,
              title: g.title,
              category: g.category,
              mediaType: g.media_type || g.mediaType || (g.video_url ? 'video' : 'image'),
              imageUrl: g.image_url || g.imageUrl,
              videoUrl: g.video_url || g.videoUrl || '',
              description: g.description || '',
              createdAt: g.created_at || g.createdAt
            }));
          }
        }
      } catch (e) {}

      // 3. Read client-saved custom uploads
      try {
        const stored = localStorage.getItem('grey_area_custom_gallery');
        if (stored) localCustomItems = JSON.parse(stored);
      } catch (e) {}

      // 4. Merge: custom uploads + supa items + api items + initial defaults
      const combined = [...localCustomItems, ...supaItems, ...apiItems, ...initialGalleryItems];
      const uniqueMap = new Map();
      combined.forEach(item => {
        if (item && item.title) {
          const titleKey = item.title.trim().toLowerCase();
          const idKey = item.id || titleKey;
          if (!uniqueMap.has(idKey) && !uniqueMap.has(titleKey)) {
            uniqueMap.set(idKey, item);
            uniqueMap.set(titleKey, item);
          }
        }
      });

      // Read deleted IDs/Titles list
      let deletedIds = [];
      try {
        const delStored = localStorage.getItem('grey_area_deleted_gallery_ids');
        if (delStored) deletedIds = JSON.parse(delStored);
      } catch (e) {}

      const defaultIds = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8'];
      const defaultTitles = initialGalleryItems.map(i => i.title.trim().toLowerCase());
      const filteredDeletedIds = deletedIds.filter(id => !defaultIds.includes(id) && !defaultTitles.includes(String(id).trim().toLowerCase()));

      const mergedList = Array.from(new Set(uniqueMap.values()));
      let activeItems = mergedList.filter(item => {
        if (!item || !item.title) return false;
        const titleLower = item.title.trim().toLowerCase();
        if (titleLower === 'swdfghj' || titleLower.includes('swdfghj') || titleLower.includes('xzcvbn')) return false;
        if (filteredDeletedIds.includes(item.id)) return false;
        if (filteredDeletedIds.includes(item.title)) return false;
        return true;
      });

      if (activeItems.length === 0) {
        activeItems = initialGalleryItems;
      }

      setGalleryItems(activeItems);
    } catch (err) {
      console.error('Gallery load error:', err);
      setGalleryItems(initialGalleryItems);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalleryData();
  }, []);

  // Filter items into 2 categories: Photos & Videos
  const filteredItems = galleryItems.filter(item => {
    const isVideo = item.mediaType === 'video' || Boolean(item.videoUrl) || item.category === 'Videos';
    if (activeCategory === 'Photos') return !isVideo;
    if (activeCategory === 'Videos') return isVideo;
    return true; // 'All'
  });

  const handleOpenLightbox = (item, index) => {
    setSelectedImage(item);
    setSelectedIndex(index);
  };

  return (
    <>
      <SEO 
        title="Our Gallery | Creative Media & Video Portfolio"
        description="Explore Grey Area's showcase of high-impact brand videos, commercial photography, corporate event films, and creative visual productions."
      />

      {/* Header Banner */}
      <section className="bg-grey-nav text-white py-10 sm:py-16 lg:py-20 border-b border-grey-border">
        <div 
          data-aos="fade-down"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4"
        >
          <div className="inline-flex items-center space-x-2 bg-grey-card border border-grey-border px-3.5 py-1 rounded-full text-xs font-bold text-gray-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Creative Showcase</span>
          </div>

          <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-5xl text-white break-words">
            Our Portfolio & Work
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            A curated collection of strategic brand videos, commercial photography, corporate event films, and visual storytelling.
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

          {/* 2 Category Filter Buttons: Photos vs Videos */}
          <div className="flex items-center justify-center">
            <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200 shadow-inner space-x-2">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center space-x-2 ${
                  activeCategory === 'All'
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <span>All Showcase ({galleryItems.length})</span>
              </button>

              <button
                onClick={() => setActiveCategory('Photos')}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center space-x-2 ${
                  activeCategory === 'Photos'
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>📷 Photos & Images</span>
              </button>

              <button
                onClick={() => setActiveCategory('Videos')}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center space-x-2 ${
                  activeCategory === 'Videos'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <Film className="w-4 h-4 text-white" />
                <span>🎬 Videos & Commercials</span>
              </button>
            </div>
          </div>

          {/* Loading Indicator */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
              <span className="text-sm font-medium">Loading portfolio items...</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200 max-w-md mx-auto space-y-3">
              <Camera className="w-10 h-10 text-gray-400 mx-auto" />
              <p className="text-gray-700 font-bold">No items found in this category.</p>
              <p className="text-xs text-gray-500">Switch to "All Showcase" to view all available media items.</p>
            </div>
          ) : (
            /* Gallery Items Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filteredItems.map((item, index) => {
                const isVideo = item.mediaType === 'video' || Boolean(item.videoUrl) || item.category === 'Videos';
                return (
                  <div
                    key={item.id || index}
                    onClick={() => handleOpenLightbox(item, index)}
                    className="group relative bg-grey-card rounded-2xl overflow-hidden border border-grey-border shadow-lg cursor-pointer h-72 sm:h-80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-end"
                  >
                    {/* Live Video Motion Preview or High-Res Cover Image */}
                    {(() => {
                      let ytThumb = '';
                      if (item.videoUrl) {
                        const ytMatch = item.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
                        if (ytMatch && ytMatch[1]) {
                          ytThumb = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
                        }
                      }

                      const coverSrc = item.imageUrl || ytThumb;
                      const isDirectVideo = isVideo && (
                        (item.videoUrl && (item.videoUrl.endsWith('.mp4') || item.videoUrl.includes('cloudinary') || item.videoUrl.startsWith('data:video'))) ||
                        !coverSrc
                      );

                      if (isDirectVideo && item.videoUrl) {
                        return (
                          <video 
                            src={item.videoUrl}
                            muted
                            loop
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover absolute inset-0 pointer-events-none transition-transform duration-500 group-hover:scale-110"
                          />
                        );
                      }

                      return (
                        <img 
                          src={coverSrc || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80'} 
                          alt={item.title}
                          loading="lazy" 
                          className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            if (ytThumb) e.target.src = ytThumb;
                          }}
                        />
                      );
                    })()}
                    
                    {/* Media Type Overlay Badge */}
                    {isVideo ? (
                      <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border border-white/20 z-10 shadow-lg">
                        <Play className="w-3 h-3 fill-white text-white" />
                        <span>Video</span>
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border border-white/20 z-10 shadow-lg">
                        <Camera className="w-3 h-3 text-white" />
                        <span>Photo</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-85 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">
                        {isVideo ? 'Video Production' : 'Photography Showcase'}
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
                        {isVideo ? (
                          <>
                            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                            <span className="text-emerald-300 font-semibold">Play Video</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full Quality</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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
            setSelectedImage(filteredItems[prevIndex]);
          } : null}
          onNext={selectedIndex < filteredItems.length - 1 ? () => {
            const nextIndex = selectedIndex + 1;
            setSelectedIndex(nextIndex);
            setSelectedImage(filteredItems[nextIndex]);
          } : null}
        />
      )}
    </>
  );
};

export default Gallery;
