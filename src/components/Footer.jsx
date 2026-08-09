import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare, ArrowUpRight, Facebook, Instagram, HelpCircle } from 'lucide-react';
import NewsletterCTA from './NewsletterCTA';

const Footer = () => {
  return (
    <footer className="bg-grey-nav text-white border-t border-grey-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Column 1: Brand Info & Social Media Buttons */}
          <div className="lg:col-span-3 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/logo.png" 
                alt="Grey Area Logo" 
                className="h-20 sm:h-24 w-auto object-contain filter drop-shadow-md shrink-0" 
              />
              <div className="flex flex-col justify-center">
                <span className="font-heading font-black text-xl sm:text-2xl tracking-wider text-white leading-tight">
                  GREY AREA
                </span>
                <span className="text-[10px] tracking-widest text-gray-400 font-bold uppercase leading-none mt-0.5">
                  Creative Media Agency
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Grey Area is a dynamic Nigerian creative media agency specializing in brand video production, strategic digital marketing, and professional event coverage for businesses and individuals.
            </p>
            <div className="pt-1 text-xs text-gray-500 font-medium">
              Operating continuously for 2–3 years in Nigeria.
            </div>

            {/* Social Media Buttons */}
            <div className="pt-2">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                Connect With Us
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://facebook.com/greyarea.p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-grey-card hover:bg-blue-600/20 border border-grey-border hover:border-blue-500 text-gray-300 hover:text-white px-3 py-2 rounded-xl text-xs transition group"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-xs">Facebook</span>
                </a>

                <a
                  href="https://instagram.com/greyarea.p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-grey-card hover:bg-pink-600/20 border border-grey-border hover:border-pink-500 text-gray-300 hover:text-white px-3 py-2 rounded-xl text-xs transition group"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-xs">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
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
                <Link to="/faq" className="hover:text-white transition flex items-center space-x-1 group">
                  <span>FAQs</span>
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
          <div className="lg:col-span-3">
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

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h4 className="font-heading font-bold text-lg text-white mb-4 tracking-wide border-b border-grey-border/50 pb-2">
                Get In Touch
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-xs text-gray-300">
                <a
                  href="tel:+2349122934694"
                  className="flex items-center space-x-3 hover:text-white transition group"
                >
                  <div className="w-8 h-8 bg-grey-card rounded-lg flex items-center justify-center border border-grey-border group-hover:border-white transition shrink-0">
                    <Phone className="w-4 h-4 text-gray-300 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Phone Call</div>
                    <div className="font-medium text-white text-xs">+234 912 293 4694</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/2349122934694"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-white transition group"
                >
                  <div className="w-8 h-8 bg-grey-card rounded-lg flex items-center justify-center border border-grey-border group-hover:border-emerald-500 transition shrink-0">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">WhatsApp</div>
                    <div className="font-medium text-white text-xs">+234 912 293 4694</div>
                  </div>
                </a>

                <a
                  href="mailto:greyarea.p@gmail.com"
                  className="flex items-center space-x-3 hover:text-white transition group sm:col-span-2 lg:col-span-1"
                >
                  <div className="w-8 h-8 bg-grey-card rounded-lg flex items-center justify-center border border-grey-border group-hover:border-white transition shrink-0">
                    <Mail className="w-4 h-4 text-gray-300 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Email Us</div>
                    <div className="font-medium text-white text-xs break-all">greyarea.p@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-grey-border/60 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Grey Area Creative Media Agency. All rights reserved.</p>
          
          {/* Social Icons Bar */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://facebook.com/greyarea.p" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-400 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com/greyarea.p" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-pink-400 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <Link 
              to="/admin"
              className="text-gray-400 hover:text-white transition cursor-pointer flex items-center space-x-1 group"
              title="Admin Staff Portal"
            >
              <span>Location: Nigeria</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
