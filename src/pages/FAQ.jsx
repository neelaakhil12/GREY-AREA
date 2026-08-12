import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, ChevronDown, Search, ArrowRight, MessageSquare, Phone, 
  Clock, MapPin, Rocket, ShieldCheck, Sparkles 
} from 'lucide-react';
import SEO from '../components/SEO';
import NewsletterCTA from '../components/NewsletterCTA';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // Open first FAQ by default
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs = [
    {
      id: 1,
      category: 'Project Process',
      question: 'How Do You Start A New Project?',
      answer: 'Every project begins with a discovery phase where we learn about your goals, challenges, and expectations. Then, we define the creative direction, map out deliverables, and set a timeline that balances clarity with craft.',
      highlight: true
    },
    {
      id: 2,
      category: 'Travel & Logistics',
      question: 'Are You Available To Travel?',
      answer: 'Yes, but it will incur a 15% additional charge. You will be responsible for transportation and accommodation expenses.',
      highlight: true
    },
    {
      id: 3,
      category: 'Timelines & Delivery',
      question: 'How Long Does A Typical Project Take?',
      answer: 'It depends on the scope and level of detail. Expect to receive edited videos within 5 to 7 working days after the shoot. More complex but straight forward projects with minimal graphic effects for a 30-second commercial will have lead time of 2 weeks. Complicated long-form video projects with multiple levels of graphic rendering will have a lead time of one month or more. We always plan collaboratively to make sure deadlines fit both sides.',
      highlight: true
    },
    {
      id: 4,
      category: 'Project Process',
      question: 'What Services Does Grey Area Provide?',
      answer: 'Grey Area is a full-service Nigerian creative media agency offering Brand Video Production, Digital Marketing & Content Strategy, Professional Event Storytelling & Multi-Cam Coverage, Product Shoots, Corporate Promos, and Motion Graphics.'
    },
    {
      id: 5,
      category: 'Revisions & Feedback',
      question: 'How Do Revisions and Feedback Work?',
      answer: 'We include structured revision rounds for all video edits to ensure the final output aligns perfectly with your vision. Drafts are shared via review links where timestamped feedback can be provided easily.'
    },
    {
      id: 6,
      category: 'Equipment & Quality',
      question: 'What Cinema Equipment and Gear Do You Use?',
      answer: 'We deploy professional cinema cameras, multi-angle audio capture setups, wireless microphones, studio lighting, and post-production suites to ensure high-definition visual and audio excellence.'
    },
    {
      id: 7,
      category: 'Pricing & Payments',
      question: 'What Are Your Payment Terms?',
      answer: 'We operate on a standard deposit milestone model: 70% initial deposit upon contract agreement to lock production dates and kickstart storyboarding, with the remaining balance due prior to final high-resolution deliverable hand-off.'
    }
  ];

  const categories = ['All', 'Project Process', 'Travel & Logistics', 'Timelines & Delivery', 'Revisions & Feedback', 'Pricing & Payments'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <SEO 
        title="Frequently Asked Questions (FAQ) | Grey Area Media Agency"
        description="Find answers to common questions about working with Grey Area Creative Media Agency in Nigeria, project timelines, video production lead times, and travel availability."
      />

      {/* Hero Banner Section */}
      <section className="bg-grey-nav text-white py-16 sm:py-24 border-b border-grey-border relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div 
            data-aos="fade-down"
            className="inline-flex items-center space-x-2 bg-grey-card border border-grey-border px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-300 tracking-wide uppercase"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h1 
            data-aos="fade-up"
            data-aos-delay="100"
            className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight"
          >
            Frequently Asked <span className="text-gray-300">Questions</span>
          </h1>

          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Everything you need to know about starting a project, video turnaround lead times, production logistics, travel availability, and working with Grey Area.
          </p>

          {/* Search Input Bar */}
          <div 
            data-aos="zoom-in"
            data-aos-delay="300"
            className="max-w-2xl mx-auto pt-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs (e.g. travel, project start, video turnaround)..."
                className="w-full bg-grey-card text-white text-sm sm:text-base pl-12 pr-4 py-4 rounded-2xl border border-grey-border focus:border-white focus:outline-none placeholder-gray-500 shadow-xl transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-white bg-grey-nav px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Content Section */}
      <section className="py-12 sm:py-20 bg-white text-black min-h-[600px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  activeCategory === category
                    ? 'bg-grey-nav text-white shadow-md'
                    : 'bg-grey-subtle text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16 bg-grey-subtle rounded-3xl border border-gray-200 space-y-3">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto" />
                <h3 className="font-heading font-bold text-xl text-black">No FAQs found</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  We couldn't find any questions matching "{searchQuery}". Feel free to reach out to our team directly!
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 bg-grey-nav text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-black transition"
                  >
                    <span>Ask Us Directly</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen 
                        ? 'border-grey-nav bg-grey-subtle/70 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-5 sm:p-7 text-left flex items-start justify-between gap-4 focus:outline-none group"
                    >
                      <div className="space-y-1.5 pr-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-grey-nav text-white">
                            {faq.category}
                          </span>
                          {faq.highlight && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                              Core Question
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-black group-hover:text-gray-700 transition">
                          {faq.question}
                        </h3>
                      </div>

                      <div className={`p-2 rounded-full border border-gray-300 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-grey-nav text-white' : 'bg-white text-black'}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-7 pb-7 pt-1 text-gray-700 text-sm sm:text-base leading-relaxed border-t border-gray-200/80">
                        <div className="p-4 bg-white rounded-xl border border-gray-200 text-gray-800 font-medium">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Quick FAQ Highlights Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
            <div className="p-6 rounded-2xl bg-grey-subtle border border-gray-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-grey-nav text-white flex items-center justify-center font-bold">
                <Rocket className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-lg text-black">Project Kick-off</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Starts with discovery phase, creative direction definition, and clear deliverable timeline mapping.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-grey-subtle border border-gray-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-grey-nav text-white flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="font-heading font-bold text-lg text-black">Travel Availability</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Available to travel anywhere in Nigeria & beyond (+15% additional charge + travel/hotel expenses).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-grey-subtle border border-gray-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-grey-nav text-white flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-lg text-black">Lead Times</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Standard edits in 5-7 working days; 30s promos in 2 weeks; complex long-form films in 1 month+.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Still Have Questions CTA Banner */}
      <section className="py-12 sm:py-16 bg-grey-nav text-white border-t border-grey-border relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
            Still Have Questions?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Our team is always available to discuss custom project scope, video requirements, or budget planning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-black font-heading font-bold px-8 py-3.5 rounded-xl hover:bg-gray-200 transition shadow-lg text-sm sm:text-base"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/2349122934694"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-semibold px-8 py-3.5 rounded-xl transition text-sm sm:text-base"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href="tel:+2349122934694"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-grey-card hover:bg-grey-border border border-grey-border text-white font-heading font-semibold px-8 py-3.5 rounded-xl transition text-sm sm:text-base"
            >
              <Phone className="w-5 h-5" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <NewsletterCTA source="FAQ Page CTA" />
    </>
  );
};

export default FAQ;
