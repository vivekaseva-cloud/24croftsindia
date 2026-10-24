import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Send,
  Lock,
  CheckCircle2,
  Building2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';

interface ContactAndMapSectionProps {
  lang: Language;
}

export const ContactAndMapSection: React.FC<ContactAndMapSectionProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Talent Registration Query');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert('దయచేసి మీ పేరు, మొబైల్ నంబర్ మరియు సందేశాన్ని నమోదు చేయండి.');
      return;
    }
    setIsSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSent(false);
    }, 4000);
  };

  return (
    <section id="contact-and-map" className="py-16 bg-[#070a10] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>{lang === 'te' ? 'సంప్రదించండి & మ్యాప్ లొకేషన్' : 'Contact Us & Map Integration'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-cinema tracking-tight">
            {lang === 'te' ? (
              <>
                24crofts.com <span className="gold-gradient-text">హైదరాబాద్ హెడ్‌ఆఫీస్</span>
              </>
            ) : (
              <>
                24crofts.com <span className="gold-gradient-text">Hyderabad Head Office</span>
              </>
            )}
          </h2>
          <p className="text-sm text-slate-400 font-telugu mt-2">
            {lang === 'te'
              ? 'సినిమా ప్రొడక్షన్ హౌసెస్, 24 క్రాఫ్ట్స్ ఆర్టిస్టులు మరియు ప్రకటనల సేవల కోసం మమ్మల్ని నేరుగా సంప్రదించండి.'
              : 'Direct hotline & headquarters for Production Houses, 24 Crafts artists and cinema advertisers.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & Interactive Map */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-400">హాట్‌లైన్ మొబైల్ (Direct Phone)</span>
                <p className="text-base font-bold text-white mt-1">7989144860</p>
                <span className="text-[11px] text-amber-400/80 mt-1 block">
                  కాల్స్ & వాట్సాప్ సపోర్ట్
                </span>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-400">అధికారిక ఈమెయిల్ (Official Email)</span>
                <p className="text-base font-bold text-white mt-1 break-all">
                  24croftsindia@gmail.com
                </p>
                <span className="text-[11px] text-emerald-400 mt-1 block">
                  24 గంటల్లో ప్రత్యుత్తరం
                </span>
              </div>
            </div>

            {/* Address Info */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-300">
                <h4 className="font-bold text-white text-sm">కార్యాలయ చిరునామా (Hyderabad Office)</h4>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  24crofts.com, Film Nagar Main Road, Beside Annapurna Studios / Jubilee Hills,
                  Hyderabad, Telangana - 500096, India.
                </p>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-amber-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>సమయాలు: సోమవారం - శనివారం (10:00 AM - 7:00 PM)</span>
                </div>
              </div>
            </div>

            {/* Interactive Map Embed (Hyderabad Cinema Hub) */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl relative aspect-[16/9]">
              <iframe
                title="24crofts.com Hyderabad Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.9427027599723!2d78.4069811!3d17.4145228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96dc562f689f%3A0xe54e20798e1694f5!2sFilm%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300 shadow">
                Film Nagar & Jubilee Hills Hub, Hyderabad
              </div>
            </div>
          </div>

          {/* Right: End-to-End Encrypted Contact Form */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white font-cinema">
                  {lang === 'te' ? 'నేరుగా సంప్రదించండి' : 'Quick Inquiry Form'}
                </h3>
                <p className="text-xs text-slate-400 font-telugu mt-0.5">
                  మీ సందేశం నేరుగా అడ్మిన్ టీమ్‌కు చేరుతుంది
                </p>
              </div>

              {/* End-to-End Encryption Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>E2EE 256-Bit</span>
              </div>
            </div>

            {isSent ? (
              <div className="p-8 text-center bg-emerald-950/40 rounded-2xl border border-emerald-500/50 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white font-telugu">
                  మీ సందేశం ఎన్‌క్రిప్ట్ చేయబడి విజయవంతంగా పంపబడింది!
                </h4>
                <p className="text-xs text-slate-300 font-telugu">
                  మా 24crofts టీమ్ వెంటనే 7989144860 లేదా మీ ఈమెయిల్ ద్వారా మిమ్మల్ని సంప్రదిస్తారు.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    మీ పేరు (Your Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="మీ పేరును నమోదు చేయండి"
                    className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      మొబైల్ నంబర్ (Phone Number) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10 అంకెల మొబైల్"
                      className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      ఈమెయిల్ (Email Address)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    విషయం (Subject / Category)
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                  >
                    <option value="Talent Registration Query">24 క్రాఫ్ట్స్ టాలెంట్ రిజిస్ట్రేషన్ సందేహాలు</option>
                    <option value="Production House Verification">ప్రొడక్షన్ హౌస్ వెరిఫికేషన్ & కాంటాక్ట్ అన్లాక్</option>
                    <option value="Movie Teaser & Ad Placement">సినిమా టీజర్ & యాడ్ ప్లేస్‌మెంట్</option>
                    <option value="Paid VIP Profile Activation">VIP పెయిడ్ ప్రొఫైల్ ఆక్టివేషన్</option>
                    <option value="Other">ఇతర వివరాలు</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    మీ సందేశం (Your Message) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="మీ సందేహం లేదా వివరాలను ఇక్కడ రాయండి..."
                    className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ఎండ్-టు-ఎండ్ ఎన్‌క్రిప్షన్ ద్వారా మీ డేటా మరియు కాంటాక్ట్ నంబర్ అత్యంత సురక్షితం.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>సందేశం పంపండి (Send Message)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
