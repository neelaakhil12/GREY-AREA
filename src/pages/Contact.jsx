import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Phone, Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, MapPin 
} from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || 'Brand Video Production';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email address is required';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message || 'Enquiry submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Brand Video Production',
          message: ''
        });
      } else {
        setErrorMessage(data.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Network error. Please check your connection or contact us via WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us | Grey Area Media Agency"
        description="Get in touch with Grey Area via Phone (+234 912 293 4694), WhatsApp, or Email (greyarea.p@gmail.com) for video production and media strategy inquiries."
      />

      {/* Header Banner */}
      <section className="bg-grey-nav text-white py-10 sm:py-16 lg:py-20 border-b border-grey-border">
        <div 
          data-aos="fade-down"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Get In Touch
          </span>
          <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-5xl text-white break-words">
            Contact Grey Area
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to bring your brand story to life? Contact our team via phone, WhatsApp, or send an enquiry below.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Direct Contact Cards Column */}
            <div 
              data-aos="fade-right"
              className="lg:col-span-5 space-y-6"
            >
              <h2 className="font-heading font-bold text-2xl text-black">
                Direct Contact Methods
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Click any of the contact channels below to connect with us immediately on your preferred device.
              </p>

              {/* Phone Card */}
              <a
                href="tel:+2349122934694"
                className="p-4 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:border-black shadow-sm hover:shadow-md transition-all flex items-start space-x-3 sm:space-x-4 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-grey-nav text-white flex items-center justify-center shrink-0 group-hover:bg-black transition">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Direct Phone Call
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-black group-hover:text-neutral-700 transition">
                    +234 912 293 4694
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Tap to open your device phone dialer directly.
                  </p>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/2349122934694"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex items-start space-x-3 sm:space-x-4 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    WhatsApp Chat
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-black group-hover:text-emerald-600 transition">
                    +234 912 293 4694
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Instant message exchange with Grey Area team.
                  </p>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:greyarea.p@gmail.com"
                className="p-4 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:border-black shadow-sm hover:shadow-md transition-all flex items-start space-x-3 sm:space-x-4 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-grey-nav text-white flex items-center justify-center shrink-0 group-hover:bg-black transition">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Official Email
                  </span>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-black break-all group-hover:text-neutral-700 transition">
                    greyarea.p@gmail.com
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Send detailed RFPs, project briefs, or inquiries.
                  </p>
                </div>
              </a>

              {/* Location Badge */}
              <div className="p-4 sm:p-6 rounded-2xl bg-grey-subtle border border-gray-200 flex items-center space-x-3 text-gray-700 text-sm">
                <MapPin className="w-5 h-5 text-gray-500 shrink-0" />
                <div>
                  <div className="font-bold text-black text-xs uppercase tracking-wider">Business Base</div>
                  <div>Operating across Nigeria & West Africa</div>
                </div>
              </div>

            </div>

            {/* Contact Form Column */}
            <div 
              data-aos="fade-left"
              className="lg:col-span-7 bg-white p-4 xs:p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xl"
            >
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-black">
                  Send Us An Enquiry
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Fill out the form below. Enquiries are stored securely in our database and reviewed promptly.
                </p>
              </div>

              {/* Success Notification */}
              {successMessage && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start space-x-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="font-medium">{successMessage}</div>
                </div>
              )}

              {/* Error Notification */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start space-x-3 text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="font-medium">{errorMessage}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Olawale Johnson"
                    className={`w-full px-4 py-3.5 rounded-lg border ${
                      errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:border-black focus:ring-black'
                    } focus:outline-none focus:ring-1 text-sm text-black placeholder-gray-400`}
                  />
                  {errors.name && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. olawale@company.com"
                      className={`w-full px-4 py-3.5 rounded-lg border ${
                        errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:border-black focus:ring-black'
                      } focus:outline-none focus:ring-1 text-sm text-black placeholder-gray-400`}
                    />
                    {errors.email && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +234 801 234 5678"
                      className={`w-full px-4 py-3.5 rounded-lg border ${
                        errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:border-black focus:ring-black'
                      } focus:outline-none focus:ring-1 text-sm text-black placeholder-gray-400`}
                    />
                    {errors.phone && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone}</p>}
                  </div>

                </div>

                {/* Service Dropdown */}
                <div>
                  <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Service Interested In <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-300 focus:border-black focus:ring-black focus:outline-none focus:ring-1 text-sm text-black bg-white"
                  >
                    <option value="Brand Video Production">Brand Video Production</option>
                    <option value="Digital Marketing">Digital Marketing & Strategy</option>
                    <option value="Event Coverage">Event Coverage & Storytelling</option>
                    <option value="Other">Other Media Request</option>
                  </select>
                  {errors.service && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.service}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Message / Project Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your brand, event date, target goals, or requirements..."
                    className={`w-full px-4 py-3.5 rounded-lg border ${
                      errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:border-black focus:ring-black'
                    } focus:outline-none focus:ring-1 text-sm text-black placeholder-gray-400`}
                  ></textarea>
                  {errors.message && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-grey-nav hover:bg-black text-white font-heading font-bold px-8 py-4 rounded-xl transition shadow-lg disabled:opacity-50 text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
