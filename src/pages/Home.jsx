import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, ArrowRight, CheckCircle2, Film, TrendingUp, Calendar, 
  Sparkles, Award, Phone, MessageSquare, Camera, Eye
} from 'lucide-react';
import SEO from '../components/SEO';
import LightboxModal from '../components/LightboxModal';
import NewsletterCTA from '../components/NewsletterCTA';
import { servicesData } from '../data/servicesData';

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Typewriter effect state
  const [typewrittenText, setTypewrittenText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  const typewriterPhrases = [
    "Content That Creates Impact.",
    "Brand Videos That Convert.",
    "Event Storytelling That Inspires.",
    "Digital Strategy That Delivers Growth."
  ];

  useEffect(() => {
    const i = loopNum % typewriterPhrases.length;
    const fullText = typewriterPhrases[i];

    const handleTyping = () => {
      setTypewrittenText(
        isDeleting 
          ? fullText.substring(0, typewrittenText.length - 1) 
          : fullText.substring(0, typewrittenText.length + 1)
      );

      setTypingSpeed(isDeleting ? 35 : 70);

      if (!isDeleting && typewrittenText === fullText) {
        setTimeout(() => setIsDeleting(true), 2200);
      } else if (isDeleting && typewrittenText === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
        setTypingSpeed(250);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typewrittenText, isDeleting, loopNum]);

  useEffect(() => {
    const loadFeatured = async () => {
      // 1. Try Supabase first (works on both localhost and Vercel)
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://moofrnuptxblogvfweac.supabase.co';
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb2ZybnVwdHhibG9ndmZ3ZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODE2MDcsImV4cCI6MjEwMTg1NzYwN30.H1KFnNtx5zIGm8-clt9S3WdPIrBSlcUfa0HAwJPafNo';
      try {
        const supaRes = await fetch(`${SUPABASE_URL}/rest/v1/gallery_items?select=*&order=created_at.desc&limit=4`, {
          headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        if (supaRes.ok) {
          const supaData = await supaRes.json();
          if (Array.isArray(supaData) && supaData.length > 0) {
            setFeaturedItems(supaData.slice(0, 4).map(g => ({
              id: g.id,
              title: g.title,
              category: g.category,
              mediaType: g.media_type || g.mediaType || (g.video_url ? 'video' : 'image'),
              imageUrl: g.image_url || g.imageUrl,
              videoUrl: g.video_url || g.videoUrl || '',
              description: g.description || ''
            })));
            return;
          }
        }
      } catch (e) {}

      // 2. Fallback to local Express API (localhost only) — Cloudinary items only
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const cloudinaryItems = data.data.filter(item =>
            item.imageUrl?.includes('cloudinary.com') || item.videoUrl?.includes('cloudinary.com')
          );
          if (cloudinaryItems.length > 0) {
            setFeaturedItems(cloudinaryItems.slice(0, 4));
            return;
          }
        }
      } catch (e) {}

      // No real items found — show empty state (no hardcoded placeholders)
      setFeaturedItems([]);
    };
    loadFeatured();
  }, []);

  const whyChoosePoints = [
    { title: "Creative Storytelling", desc: "We craft visually compelling narratives that capture brand identity and evoke real emotional connection." },
    { title: "Professional Production Quality", desc: "High-definition video gear, crisp lighting setups, and cinema-grade audio capture without compromise." },
    { title: "Strategic Content Planning", desc: "Every scene and strategy is engineered around clear business goals and target audience demographics." },
    { title: "Client-Focused Collaboration", desc: "We work directly with your team at every stage from storyboard concept to final deliverable edit." },
    { title: "Modern Creative Approach", desc: "Embracing fresh visual techniques, motion graphics, and evolving video consumption formats." },
    { title: "Results-Driven Content", desc: "Producing media that boosts audience engagement, brand authority, and measurable business growth." }
  ];

  const handleOpenLightbox = (item, idx) => {
    setSelectedImage(item);
    setSelectedIndex(idx);
  };

  return (
    <>
      <SEO 
        title="Grey Area | Creative Media Agency in Nigeria"
        description="Grey Area is a leading Nigerian creative media agency specializing in brand video production, digital marketing strategy, and high-impact event coverage."
      />

      {/* Hero Section */}
      <section className="relative bg-grey-nav text-white overflow-hidden py-12 sm:py-20 lg:py-28 border-b border-grey-border">
        {/* Background Overlay Visual */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=80" 
            alt="Camera Production Set" 
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-grey-nav via-grey-nav/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div 
                data-aos="fade-down"
                className="inline-flex max-w-full flex-wrap items-center space-x-2 bg-grey-card border border-grey-border px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] xs:text-xs font-semibold text-gray-300 tracking-wide uppercase"
              >
                <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="truncate">Nigerian Creative Media Agency</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              </div>

              <h1 
                data-aos="fade-up"
                data-aos-delay="100"
                className="font-heading font-black text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight break-words min-h-[2.4em]"
              >
                Stories That Connect. <br />
                <span className="text-gray-300">
                  {typewrittenText}
                </span>
              </h1>

              <p 
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-gray-300 text-base sm:text-xl font-normal leading-relaxed max-w-2xl"
              >
                We help businesses communicate with clarity and confidence through strategic video production, digital marketing and impactful event storytelling.
              </p>

              <div 
                data-aos="fade-up"
                data-aos-delay="300"
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
              >
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-gray-200 text-black font-heading font-bold px-5 sm:px-8 py-3.5 sm:py-4 rounded-lg transition shadow-xl text-sm sm:text-base group w-full sm:w-auto"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 bg-grey-card hover:bg-grey-border border border-grey-border text-white font-heading font-semibold px-5 sm:px-8 py-3.5 sm:py-4 rounded-lg transition text-sm sm:text-base w-full sm:w-auto"
                >
                  <span>Contact Us</span>
                </Link>
              </div>

              {/* Trust highlights */}
              <div 
                data-aos="fade-up"
                data-aos-delay="400"
                className="pt-6 border-t border-grey-border/60 grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left"
              >
                <div>
                  <div className="font-heading font-extrabold text-lg xs:text-xl sm:text-2xl text-white">2–3 Years</div>
                  <div className="text-[10px] sm:text-xs text-gray-400">Operating Experience</div>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-lg xs:text-xl sm:text-2xl text-white">3 Core</div>
                  <div className="text-[10px] sm:text-xs text-gray-400">Media Specializations</div>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-lg xs:text-xl sm:text-2xl text-white">100%</div>
                  <div className="text-[10px] sm:text-xs text-gray-400">Client Focused</div>
                </div>
              </div>
            </div>

            {/* Video Production Feature Mockup Card */}
            <div 
              data-aos="fade-left"
              data-aos-delay="200"
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl overflow-hidden border border-grey-border bg-grey-card shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?auto=format&fit=crop&w=800&q=80" 
                  alt="Grey Area Camera Production Setup" 
                  className="w-full h-80 sm:h-96 object-cover filter contrast-110 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-white text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                      Production Suite
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    High-Impact Visual Storytelling
                  </h3>
                  <p className="text-gray-300 text-xs mt-1">
                    Brand Storytelling • Corporate Events • Digital Campaigns
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div 
              data-aos="fade-right"
              className="lg:col-span-6 space-y-6"
            >
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Who We Are
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black leading-tight">
                Empowering Brands Through Professional Media & Visual Storytelling
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Operating continuously for approximately 2–3 years, Grey Area has been helping businesses, startups, corporate organizations, brands, and individuals across Nigeria communicate with clarity and confidence.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                We believe that powerful visual media is the catalyst for real audience connection and brand credibility. Whether producing a high-stakes corporate commercial, running a video marketing campaign, or capturing a historic event, we blend creative vision with strategic execution.
              </p>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 font-heading font-bold text-black border-b-2 border-black hover:text-gray-600 hover:border-gray-600 transition pb-1"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div 
              data-aos="fade-left"
              className="lg:col-span-6 grid grid-cols-2 gap-4"
            >
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" 
                alt="Corporate Event Production" 
                className="rounded-xl object-cover h-64 w-full shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" 
                alt="Product Media Shoot" 
                className="rounded-xl object-cover h-64 w-full shadow-md mt-8"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-10 sm:py-16 lg:py-24 bg-grey-subtle border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-aos="fade-up"
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Our Core Services
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black">
              Tailored Media Solutions Designed to Elevate Your Brand
            </h2>
            <p className="text-gray-600 text-base">
              Three focused service pillars providing end-to-end visual narrative, strategic reach, and event preservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const icons = [Film, TrendingUp, Calendar];
              const IconComp = icons[index] || Film;

              return (
                <div 
                  key={service.id}
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 150}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-900">
                    <img 
                      src={service.heroImage} 
                      alt={service.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4 bg-grey-nav text-white p-2.5 rounded-lg border border-grey-border">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-black mb-3 group-hover:text-neutral-700 transition">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {service.shortDescription}
                      </p>
                      
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Best For</div>
                        <div className="text-xs text-gray-700 font-medium">{service.bestFor}</div>
                      </div>
                    </div>

                    <Link
                      to="/services"
                      className="inline-flex items-center justify-between w-full bg-grey-nav hover:bg-black text-white font-semibold text-sm px-5 py-3 rounded-lg transition"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Grey Area */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-aos="fade-up"
            className="max-w-3xl mb-8 sm:mb-12 lg:mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Why Partner With Us
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black mt-2">
              Driven by Creativity, Built on Professional Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoosePoints.map((pt, i) => (
              <div 
                key={i} 
                data-aos="fade-up"
                data-aos-delay={(i % 3 + 1) * 100}
                className="p-5 sm:p-8 rounded-xl border border-gray-200 bg-white hover:border-black transition-colors duration-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-grey-nav text-white flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-5 h-5 text-gray-300" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-black mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-10 sm:py-16 lg:py-24 bg-grey-nav text-white border-b border-grey-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            data-aos="fade-up"
            className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 lg:mb-12"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Selected Portfolio
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-2">
                Featured Creative Projects
              </h2>
            </div>

            <Link
              to="/gallery"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 bg-white text-black font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Gallery Grid - Cleanly Spaced Portfolio Cards */}
          {featuredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400 text-base font-medium mb-1">No featured projects yet</p>
              <p className="text-gray-500 text-sm mb-6">Upload your first project from the Admin panel to showcase it here.</p>
              <Link
                to="/gallery"
                className="inline-flex items-center space-x-2 bg-white text-black font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-gray-200 transition"
              >
                <span>View Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredItems.map((item, idx) => (
              <div 
                key={item.id || idx}
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 100}
                onClick={() => handleOpenLightbox(item, idx)}
                className="group relative rounded-2xl overflow-hidden bg-grey-card border border-grey-border cursor-pointer aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-5 sm:p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest mb-1.5">
                    {item.category}
                  </span>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-white leading-snug group-hover:text-gray-200 transition line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="mt-2.5 flex items-center space-x-1.5 text-xs text-gray-300 font-medium">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Click to view larger</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}

        </div>
      </section>

      {/* Mission / Vision Preview Editorial Section */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div 
              data-aos="fade-right"
              className="lg:col-span-5 space-y-6"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Agency Purpose
              </span>
              <h2 className="font-heading font-bold text-3xl text-black">
                Transforming How Brands & Individuals Curate Experiences
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Grey Area stands at the intersection of creative artistry and business growth strategy. We turn complex business messages into clear visual stories.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-sm font-bold text-black hover:underline"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div 
              data-aos="fade-left"
              className="lg:col-span-7 space-y-8"
            >
              
              {/* Vision Card */}
              <div className="p-5 sm:p-8 rounded-2xl bg-grey-subtle border border-gray-200">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Our Vision
                </div>
                <p className="text-black font-heading font-semibold text-base sm:text-lg leading-relaxed">
                  “To become Nigeria's leading creative media agency, transforming how individuals and brands curate experiences, and connect with their audiences through exceptional brand video production, innovative digital marketing, and impactful event storytelling that inspires, connects, and delivers measurable results.”
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-5 sm:p-8 rounded-2xl bg-grey-nav text-white border border-grey-border">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Our Mission
                </div>
                <p className="text-white font-heading font-semibold text-base sm:text-lg leading-relaxed">
                  “To help businesses communicate with clarity and confidence through strategic, high-quality video that captivates audiences, strengthens brands, and drives measurable business growth.”
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Newsletter Signup CTA Section */}
      <NewsletterCTA source="Home Page CTA" />

      {/* Call to Action Section */}
      <section 
        data-aos="zoom-in"
        className="py-10 sm:py-16 lg:py-24 bg-grey-nav text-white relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-white">
            Ready to Tell Your Story?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Let's discuss how Grey Area can help elevate your brand visual identity, capture your major corporate events, or drive marketing results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-black font-heading font-bold px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-gray-200 transition shadow-xl text-sm sm:text-base"
            >
              <span>Send An Enquiry</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/2349122934694"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-semibold px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl transition text-sm sm:text-base"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="tel:+2349122934694"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-grey-card hover:bg-grey-border border border-grey-border text-white font-heading font-semibold px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl transition text-sm sm:text-base"
            >
              <Phone className="w-5 h-5" />
              <span>Call +234 912 293 4694</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <LightboxModal
          item={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrev={selectedIndex > 0 ? () => {
            const prevIdx = selectedIndex - 1;
            setSelectedIndex(prevIdx);
            setSelectedImage(featuredItems[prevIdx]);
          } : null}
          onNext={selectedIndex < featuredItems.length - 1 ? () => {
            const nextIdx = selectedIndex + 1;
            setSelectedIndex(nextIdx);
            setSelectedImage(featuredItems[nextIdx]);
          } : null}
        />
      )}
    </>
  );
};

export default Home;
