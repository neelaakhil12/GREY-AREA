import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Film, TrendingUp, Calendar, ArrowRight, MessageSquare, Phone 
} from 'lucide-react';
import SEO from '../components/SEO';
import { servicesData } from '../data/servicesData';

const Services = () => {
  return (
    <>
      <SEO 
        title="Our Services | Brand Video, Digital Marketing & Event Coverage"
        description="Detailed services from Grey Area: Brand Video Production, Digital Marketing Strategy, and Professional Event Storytelling in Nigeria."
      />

      {/* Header Banner */}
      <section className="bg-grey-nav text-white py-10 sm:py-16 lg:py-20 border-b border-grey-border">
        <div 
          data-aos="fade-down"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            What We Do
          </span>
          <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-5xl text-white break-words">
            Our Primary Services
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Strategic visual storytelling, video production, and digital media solutions tailored to drive measurable growth.
          </p>
        </div>
      </section>

      {/* Detailed Services Listing */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white space-y-10 sm:space-y-16 lg:space-y-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16 lg:space-y-24">
          
          {servicesData.map((service, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={service.id}
                id={service.id}
                data-aos="fade-up"
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t ${idx === 0 ? 'border-none' : 'border-gray-200'}`}
              >
                
                {/* Visual Image Banner */}
                <div 
                  data-aos={isEven ? "fade-right" : "fade-left"}
                  className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-900 group">
                    <img 
                      src={service.heroImage} 
                      alt={service.title} 
                      className="w-full h-56 sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-8">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-1">
                        Service Pillar 0{idx + 1}
                      </span>
                      <div className="font-heading font-bold text-xl sm:text-2xl text-white">
                        {service.title}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div 
                  data-aos={isEven ? "fade-left" : "fade-right"}
                  className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Grey Area Media
                    </span>
                    <h2 className="font-heading font-bold text-3xl text-black mt-1">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    “{service.shortDescription}”
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.details}
                  </p>

                  {/* Best For Box */}
                  <div className="bg-grey-subtle p-4 rounded-xl border border-gray-200">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Best For:
                    </div>
                    <div className="text-sm font-semibold text-black">
                      {service.bestFor}
                    </div>
                  </div>

                  {/* What's Included Grid */}
                  <div>
                    <h4 className="font-heading font-bold text-base text-black mb-3">
                      What This Service Includes:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.includes.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center space-x-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Request CTA */}
                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center justify-center space-x-2 bg-grey-nav hover:bg-black text-white font-heading font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg transition shadow-md text-xs sm:text-sm w-full sm:w-auto"
                    >
                      <span>Discuss Your Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <a
                      href="https://wa.me/2349122934694"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 sm:py-3.5 rounded-lg transition text-xs sm:text-sm w-full sm:w-auto"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* Global Services CTA */}
      <section 
        data-aos="zoom-in"
        className="py-10 sm:py-16 lg:py-20 bg-grey-subtle border-t border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-heading font-bold text-3xl text-black">
            Need A Custom Media Package?
          </h2>
          <p className="text-gray-600 text-base">
            We often combine video production, event coverage, and digital campaign planning into comprehensive multi-phase project plans.
          </p>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-grey-nav text-white font-heading font-bold px-8 py-4 rounded-xl hover:bg-black transition shadow-lg"
            >
              <span>Contact Our Media Strategist</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
