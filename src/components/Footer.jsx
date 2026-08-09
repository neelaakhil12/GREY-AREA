import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-grey-nav text-white border-t border-grey-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/logo.png" 
                alt="Grey Area Logo" 
                className="h-20 sm:h-28 lg:h-32 w-auto object-contain filter drop-shadow-md shrink-0" 
              />
              <div className="flex flex-col justify-center">
                <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-wider text-white leading-tight">
                  GREY AREA
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-gray-400 font-bold uppercase leading-none mt-0.5">
                  Creative Media Agency
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Grey Area is a dynamic Nigerian creative media agency specializing in brand video production, strategic digital marketing, and professional event coverage for businesses and individuals.
            </p>
            <div className="pt-2 text-xs text-gray-500 font-medium">
              Operating continuously for 2–3 years in Nigeria.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-4 tracking-wide border-b border-grey-border/50 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition flex items-center space-x-1 group">
                  <span>Home</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition flex items-center space-x-1 group">
                  <span>About Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition flex items-center space-x-1 group">
                  <span>Our Services</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition flex items-center space-x-1 group">
                  <span>Creative Gallery</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition flex items-center space-x-1 group">
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Primary Services */}
          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-4 tracking-wide border-b border-grey-border/50 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/services#brand-video" className="hover:text-white transition">
                  Brand Video Production
                </Link>
              </li>
              <li>
                <Link to="/services#digital-marketing" className="hover:text-white transition">
                  Digital Marketing & Strategy
                </Link>
              </li>
              <li>
                <Link to="/services#event-coverage" className="hover:text-white transition">
                  Event Storytelling & Coverage
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white text-xs transition">
                  Corporate Video & Commercials
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white text-xs transition">
                  Product Shoots & Highlights
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-4 tracking-wide border-b border-grey-border/50 pb-2">
              Get In Touch
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <a
                href="tel:+2349122934694"
                className="flex items-center space-x-3 hover:text-white transition group"
              >
                <div className="w-8 h-8 bg-grey-card rounded-md flex items-center justify-center border border-grey-border group-hover:border-white transition">
                  <Phone className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider">Phone Call</div>
                  <div className="font-medium text-white">+234 912 293 4694</div>
                </div>
              </a>

              <a
                href="https://wa.me/2349122934694"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-white transition group"
              >
                <div className="w-8 h-8 bg-grey-card rounded-md flex items-center justify-center border border-grey-border group-hover:border-emerald-500 transition">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider">WhatsApp</div>
                  <div className="font-medium text-white">+234 912 293 4694</div>
                </div>
              </a>

              <a
                href="mailto:greyarea.p@gmail.com"
                className="flex items-center space-x-3 hover:text-white transition group"
              >
                <div className="w-8 h-8 bg-grey-card rounded-md flex items-center justify-center border border-grey-border group-hover:border-white transition">
                  <Mail className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider">Email Us</div>
                  <div className="font-medium text-white break-all">greyarea.p@gmail.com</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-grey-border/60 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Grey Area Creative Media Agency. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <span>Location: Nigeria</span>
            <span>Visual Storytelling & Media Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
