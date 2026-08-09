import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Admin from './pages/Admin';

// ScrollToTop & AOS Refresh helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [pathname]);
  return null;
};

// Layout Wrapper Component to conditionally hide Header/Footer/WhatsApp on Admin route
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-white text-black overflow-x-hidden">
      {!isAdmin && <Navbar />}
      <main className={`flex-grow ${isAdmin ? 'pt-0' : 'pt-24 sm:pt-28 lg:pt-32'}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingWhatsApp />}
    </div>
  );
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // Animation triggers every time user scrolls
      mirror: true, // Elements animate in/out continuously as user scrolls up & down
      easing: 'ease-out-cubic',
      offset: 120,
    });
  }, []);

  return (
    <Router>
      <SplashScreen />
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
