import React, { useState } from 'react';
import {
  X,
  Film,
  Video,
  ShieldCheck,
  CheckCircle2,
  Tv,
  Sparkles,
  Upload,
} from 'lucide-react';
import { AdItem, Language } from '../types';

interface UploadAdModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onSubmitAd: (item: AdItem) => void;
}

export const UploadAdModal: React.FC<UploadAdModalProps> = ({
  isOpen,
  lang,
  onClose,
  onSubmitAd,
}) => {
  const [type, setType] = useState<'movie_teaser' | 'pvt_ad' | 'special_ad'>('movie_teaser');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [clientName, setClientName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !youtubeUrl || !clientName || !contactPhone) {
      alert('దయచేసి శీర్షిక, యూట్యూబ్ లింక్, క్లయింట్ పేరు మరియు ఫోన్ నంబర్ నమోదు చేయండి.');
      return;
    }

    const newAd: AdItem = {
      id: `ad-user-${Date.now()}`,
      type,
      title,
      subtitle: subtitle || 'Submitted for Admin Placement Approval',
      bannerUrl:
        bannerUrl ||
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
      youtubeUrl,
      targetUrl: 'https://24crofts.com',
      priorityOrder: 6,
      status: 'pending', // Requires admin approval!
      clientName,
      contactPhone,
      createdDate: new Date().toISOString(),
    };

    onSubmitAd(newAd);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-4 flex items-center justify-center">
      <div className="relative w-full max-w-lg bg-slate-950 rounded-3xl border border-amber-500/40 shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white font-cinema">
              {lang === 'te' ? 'సినిమా ప్రకటన / టీజర్ అప్‌లోడ్' : 'Submit Cinema Ad or Teaser'}
            </h3>
            <p className="text-xs text-amber-400 font-telugu mt-0.5">
              * ఏ ప్రకటన ప్లేస్‌మెంట్‌కైనా అడ్మిన్ టీమ్ ఆమోదం తప్పనిసరి
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white font-telugu">
              మీ ప్రకటన విజయవంతంగా అడ్మిన్ ఆమోదం కోసం సమర్పించబడింది!
            </h4>
            <p className="text-xs text-slate-400">
              మా అడ్మిన్ టీమ్ పరిశీలించి ప్రాధాన్యతా క్రమంలో హోమ్‌పేజీలో ప్రదర్శిస్తారు.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                ప్రకటన రకం (Ad Category) *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setType('movie_teaser')}
                  className={`p-2 rounded-xl border text-center transition ${
                    type === 'movie_teaser'
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  మూవీ టీజర్ (Teaser)
                </button>
                <button
                  type="button"
                  onClick={() => setType('pvt_ad')}
                  className={`p-2 rounded-xl border text-center transition ${
                    type === 'pvt_ad'
                      ? 'bg-sky-500 text-slate-950 font-bold border-sky-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  Pvt ఎక్విప్‌మెంట్ యాడ్
                </button>
                <button
                  type="button"
                  onClick={() => setType('special_ad')}
                  className={`p-2 rounded-xl border text-center transition ${
                    type === 'special_ad'
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  స్పెషల్ కాస్టింగ్ యాడ్
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                సినిమా / ప్రకటన శీర్షిక (Title) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ఉదా: కొత్త సినిమా అధికారిక టీజర్"
                className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-red-400" />
                <span>యూట్యూబ్ లింక్ (YouTube Video Link - తప్పనిసరి) *</span>
              </label>
              <input
                type="url"
                required
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                పోస్టర్ / బ్యానర్ ఇమేజ్ URL
              </label>
              <input
                type="url"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="https://... (లేదా ఖాళీగా ఉంచితే డిఫాల్ట్ సినిమా పోస్టర్ వర్తిస్తుంది)"
                className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  సంస్థ / బ్యానర్ పేరు *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="ప్రొడక్షన్ హౌస్ పేరు"
                  className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  కాంటాక్ట్ మొబైల్ *
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="10 అంకెల మొబైల్"
                  className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center gap-2 text-[11px] text-amber-200">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                అడ్మిన్ టీమ్ ఈ ప్రకటనను సమీక్షించిన తర్వాత హోమ్‌పేజీలో టాప్ స్లాట్‌లలో అమర్చబడుతుంది.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>అడ్మిన్ ఆమోదం కోసం సమర్పించండి</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
