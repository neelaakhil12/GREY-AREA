import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Award, ShieldCheck, Users, Zap, TrendingUp, ArrowRight, Eye, Target 
} from 'lucide-react';
import SEO from '../components/SEO';
import { coreValuesData } from '../data/coreValuesData';

const iconMap = {
  Sparkles: Sparkles,
  Award: Award,
  ShieldCheck: ShieldCheck,
  Users: Users,
  Zap: Zap,
  TrendingUp: TrendingUp
};

const About = () => {
  return (
    <>
      <SEO 
        title="About Us | Grey Area Creative Media Agency"
        description="Learn about Grey Area, a dynamic Nigerian creative media agency operating for 2–3 years focused on brand video production, digital marketing, and event storytelling."
      />

      {/* Header Banner */}
      <section className="bg-grey-nav text-white py-10 sm:py-16 lg:py-20 border-b border-grey-border">
        <div 
          data-aos="fade-down"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            About Grey Area
          </span>
          <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-5xl text-white mt-3 mb-4 break-words">
            Visual Storytellers Driven by Clarity & Impact
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Transforming how individuals and brands curate experiences and connect with audiences in Nigeria.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div 
              data-aos="fade-right"
              className="lg:col-span-6 space-y-6"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Our Journey
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black">
                2–3 Years of Creative Media Excellence in Nigeria
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Grey Area has been operating for approximately 2–3 years, helping businesses and individuals communicate through professional visual storytelling, video production, digital marketing and event coverage.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Based in Nigeria, our media agency was founded on the conviction that high-quality visual content shouldn't just look pretty—it must communicate clearly, build long-term brand equity, and deliver measurable outcomes for clients.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                From high-stakes corporate launches and brand identity commercials to intimate celebrations and digital campaign strategies, Grey Area collaborates closely with clients to bring ambitious concepts to life.
              </p>
            </div>

            <div 
              data-aos="fade-left"
              className="lg:col-span-6"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-900">
                <img 
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80" 
                  alt="Grey Area Video Production Crew" 
                  className="w-full h-64 sm:h-[400px] object-cover filter grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="text-xs text-gray-300 font-bold uppercase tracking-wider">
                    Creative Production Studio
                  </div>
                  <div className="text-xl font-heading font-bold text-white">
                    Nigeria's Modern Media Agency
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-10 sm:py-16 lg:py-24 bg-grey-subtle border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            data-aos="fade-up"
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16 space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Guiding Principles
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black">
              Vision & Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision Box */}
            <div 
              data-aos="fade-right"
              data-aos-delay="100"
              className="bg-white p-5 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-grey-nav text-white flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-gray-200" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-black mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium">
                  “To become Nigeria's leading creative media agency, transforming how individuals and brands curate experiences, and connect with their audiences through exceptional brand video production, innovative digital marketing, and impactful event storytelling that inspires, connects, and delivers measurable results.”
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Future Focused • Leading Agency
              </div>
            </div>

            {/* Mission Box */}
            <div 
              data-aos="fade-left"
              data-aos-delay="200"
              className="bg-grey-nav text-white p-5 sm:p-10 rounded-2xl border border-grey-border shadow-xl space-y-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                  “To help businesses communicate with clarity and confidence through strategic, high-quality video that captivates audiences, strengthens brands, and drives measurable business growth.”
                </p>
              </div>
              <div className="pt-4 border-t border-grey-border/60 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Strategic Impact • Client Growth
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            data-aos="fade-up"
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16 space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Company Culture
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-base">
              The fundamental principles that dictate our work standards, client relationships, and creative output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValuesData.map((val, i) => {
              const IconComp = iconMap[val.iconName] || Sparkles;
              return (
                <div 
                  key={i}
                  data-aos="zoom-in"
                  data-aos-delay={(i % 3 + 1) * 100}
                  className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-200 hover:border-black shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-grey-subtle text-black group-hover:bg-grey-nav group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-black mb-2">
                    {val.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section 
        data-aos="zoom-in"
        className="py-10 sm:py-16 lg:py-20 bg-grey-nav text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
            Let's Collaborate On Your Next Project
          </h2>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Discover how Grey Area can translate your vision into captivating visual storytelling.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-white text-black font-heading font-bold px-8 py-4 rounded-xl hover:bg-gray-200 transition"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
