import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Play } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-grey-nav border-b border-grey-border shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 sm:h-28 lg:h-32 gap-3 sm:gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-4 group shrink-0 py-1 min-w-0">
            <img 
              src="/logo.png" 
              alt="Grey Area Logo" 
              className="h-20 sm:h-24 lg:h-28 w-auto object-contain transition-transform group-hover:scale-105 filter drop-shadow-md shrink-0" 
            />
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-heading font-black text-xl xs:text-2xl sm:text-3xl lg:text-4xl tracking-wider text-white leading-tight truncate">
                GREY AREA
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs tracking-widest text-gray-400 font-bold uppercase leading-none mt-0.5 truncate">
                Creative Media Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-grey-card'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="tel:+2349122934694"
              className="flex items-center space-x-2 bg-grey-card hover:bg-grey-border border border-grey-border text-white text-xs font-semibold px-3.5 py-2.5 rounded-md transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-gray-300" />
              <span>+234 912 293 4694</span>
            </a>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="md:hidden flex items-center shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-grey-card focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-grey-nav border-b border-grey-border px-4 pt-3 pb-6 space-y-3 animate-fade-in max-w-full overflow-x-hidden">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'text-gray-300 hover:bg-grey-card hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-grey-border/60 flex flex-col space-y-2">
            <a
              href="tel:+2349122934694"
              className="flex items-center justify-center space-x-2 bg-white text-black font-semibold px-4 py-3 rounded-lg text-sm transition hover:bg-gray-200"
            >
              <Phone className="w-4 h-4" />
              <span>Call +234 912 293 4694</span>
            </a>
            <a
              href="https://wa.me/2349122934694"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-3 rounded-lg text-sm transition"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
