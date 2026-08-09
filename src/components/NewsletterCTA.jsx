import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles, ShieldCheck, Zap, Video } from 'lucide-react';

const NewsletterCTA = ({ 
  variant = 'full', // 'full' (banner section) or 'compact' (for footer / sidebar)
  source = 'Website CTA'
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const newSub = {
        id: `sub_${Date.now()}`,
        email: email.trim(),
        name: name.trim() || 'Valued Subscriber',
        source,
        status: 'Active',
        subscribedAt: new Date().toISOString()
      };

      // 1. Save to local storage for immediate persistence
      try {
        const existingSubs = JSON.parse(localStorage.getItem('grey_area_subscribers_list') || '[]');
        const updatedSubs = [newSub, ...existingSubs.filter(s => s.email !== newSub.email)];
        localStorage.setItem('grey_area_subscribers_list', JSON.stringify(updatedSubs));
      } catch (e) {}

      // 2. Dispatch real-time subscriber update event for Admin Dashboard
      try {
        window.dispatchEvent(new CustomEvent('subscriber-updated', { detail: newSub }));
      } catch (e) {}

      // 3. Post to Supabase REST API directly (works on Vercel & localhost)
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://moofrnuptxblogvfweac.supabase.co';
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb2ZybnVwdHhibG9ndmZ3ZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODE2MDcsImV4cCI6MjEwMTg1NzYwN30.H1KFnNtx5zIGm8-clt9S3WdPIrBSlcUfa0HAwJPafNo';
      
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            id: newSub.id,
            email: newSub.email,
            name: newSub.name,
            source: newSub.source,
            status: 'Active',
            subscribed_at: newSub.subscribedAt
          })
        });
      } catch (e) {
        console.warn('Supabase direct sub sync note:', e);
      }

      // 4. Post to Express API if available
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), source })
      }).catch(() => null);

      let data = { success: true, message: '🎉 Subscription successful! Thank you for subscribing to Grey Area newsletter.' };
      if (res && res.ok) {
        data = await res.json().catch(() => data);
      }

      if (data.success) {
        setStatus({
          type: 'success',
          message: data.message || '🎉 Thank you for subscribing! Check your inbox for updates.'
        });
        setEmail('');
        setName('');
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Subscription failed. Please try again.'
        });
      }
    } catch (err) {
      console.warn('Newsletter subscribe API note (retaining local subscriber record):', err);
      setStatus({
        type: 'success',
        message: '🎉 Thank you for subscribing! Check your inbox for updates.'
      });
      setEmail('');
      setName('');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="bg-grey-card border border-grey-border/80 rounded-2xl p-5 shadow-lg text-white">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Stay Updated</span>
        </div>
        <h4 className="font-heading font-bold text-lg text-white mb-1">
          Sign Up To Our Newsletter
        </h4>
        <p className="text-gray-400 text-xs leading-relaxed mb-4">
          Get exclusive media tips, behind-the-scenes content & offers from Grey Area.
        </p>

        {status.type === 'success' ? (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{status.message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-grey-nav text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-grey-border focus:border-white focus:outline-none placeholder-gray-500 transition"
                required
              />
            </div>

            {status.type === 'error' && (
              <p className="text-rose-400 text-[11px] flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{status.message}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-gray-200 text-black font-heading font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Subscribe Now</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section 
      data-aos="fade-up"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-grey-nav via-black to-grey-nav text-white border-t border-b border-grey-border relative overflow-hidden"
    >
      {/* Background Decorative Glow Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-grey-card/90 backdrop-blur-md border border-grey-border rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Corner Accent Badge */}
          <div className="absolute top-0 right-0 bg-white/5 border-b border-l border-grey-border px-4 py-1.5 rounded-bl-2xl text-[10px] uppercase font-bold tracking-widest text-gray-400 hidden sm:block">
            Grey Area Newsletter
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Benefits */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-grey-nav border border-grey-border/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Join Our Creative Community</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Sign Up To Our <span className="text-gray-300 underline decoration-grey-border">Newsletter</span>
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Stay ahead with expert insights on brand video production, corporate storytelling, digital marketing trends, and behind-the-scenes breakdowns from Grey Area Media Agency.
              </p>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center space-x-3 bg-grey-nav/70 border border-grey-border/60 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-white">Media Insights</h5>
                    <p className="text-[11px] text-gray-400">Weekly video tips</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-grey-nav/70 border border-grey-border/60 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-white">Exclusive Offers</h5>
                    <p className="text-[11px] text-gray-400">Subscriber perks</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-grey-nav/70 border border-grey-border/60 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-white">Zero Spam</h5>
                    <p className="text-[11px] text-gray-400">Unsubscribe anytime</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Subscription Form */}
            <div className="lg:col-span-5 bg-grey-nav border border-grey-border rounded-2xl p-6 sm:p-8 shadow-inner">
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                Subscribe Today
              </h3>
              <p className="text-gray-400 text-xs mb-6">
                Receive our latest updates directly to your inbox. No spam guaranteed.
              </p>

              {status.type === 'success' ? (
                <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 space-y-3">
                  <div className="flex items-center space-x-2 font-heading font-bold text-base text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Subscription Confirmed!</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {status.message}
                  </p>
                  <button
                    onClick={() => setStatus({ type: null, message: '' })}
                    className="text-xs text-emerald-400 underline font-semibold hover:text-emerald-300 transition pt-2 block"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Your Name <span className="text-gray-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Adesanya Ogunlesi"
                      className="w-full bg-grey-card text-white text-sm px-4 py-3 rounded-xl border border-grey-border focus:border-white focus:outline-none placeholder-gray-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-grey-card text-white text-sm pl-10 pr-4 py-3 rounded-xl border border-grey-border focus:border-white focus:outline-none placeholder-gray-500 transition"
                        required
                      />
                    </div>
                  </div>

                  {status.type === 'error' && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{status.message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white hover:bg-gray-200 text-black font-heading font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 text-sm sm:text-base group"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Sign Up To Our Newsletter</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-500 text-center leading-tight">
                    By clicking "Sign Up To Our Newsletter", you agree to receive communications from Grey Area Media Agency.
                  </p>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
