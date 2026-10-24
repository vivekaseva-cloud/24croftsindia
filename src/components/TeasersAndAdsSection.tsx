import React, { useState } from 'react';
import {
  Play,
  Film,
  Sparkles,
  ExternalLink,
  PlusCircle,
  Clock,
  ShieldCheck,
  Video,
  X,
  Tv,
  CheckCircle2,
} from 'lucide-react';
import { AdItem, Language } from '../types';

interface TeasersAndAdsSectionProps {
  lang: Language;
  movieTeasers: AdItem[];
  pvtAds: AdItem[];
  specialAds: AdItem[];
  onOpenUploadAd: () => void;
}

export const TeasersAndAdsSection: React.FC<TeasersAndAdsSectionProps> = ({
  lang,
  movieTeasers,
  pvtAds,
  specialAds,
  onOpenUploadAd,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'teasers' | 'pvt' | 'special'>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<AdItem | null>(null);

  // Helper to extract YouTube video ID
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
      }
      if (url.includes('watch?v=')) {
        const id = url.split('watch?v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
      }
      return url;
    } catch {
      return url;
    }
  };

  // Sort by priorityOrder (1 first)
  const sortedTeasers = [...movieTeasers].sort((a, b) => a.priorityOrder - b.priorityOrder).slice(0, 6);
  const sortedPvtAds = [...pvtAds].sort((a, b) => a.priorityOrder - b.priorityOrder).slice(0, 6);
  const sortedSpecialAds = [...specialAds].sort((a, b) => a.priorityOrder - b.priorityOrder).slice(0, 6);

  return (
    <section id="teasers-and-ads" className="py-10 bg-gradient-to-b from-[#0b0f17] via-[#0e1422] to-[#0b0f17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>{lang === 'te' ? 'సినిమా ప్రమోషన్స్ & అడ్వర్టైజ్మెంట్స్' : 'Cinema Promotions & Ads'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-cinema tracking-tight">
              {lang === 'te' ? (
                <>
                  టాప్ <span className="gold-gradient-text">మూవీ టీజర్లు 6</span> & ఇండస్ట్రీ ప్రకటనలు
                </>
              ) : (
                <>
                  Top <span className="gold-gradient-text">6 Movie Teasers</span> & Industry Ads
                </>
              )}
            </h2>
            <p className="text-sm text-slate-400 font-telugu mt-1 max-w-2xl">
              {lang === 'te'
                ? 'అడ్మిన్ టీమ్ చేత ఆమోదించబడిన అధికారిక మూవీ టీజర్లు, ప్రైవేట్ సినిమా ఎక్విప్‌మెంట్ యాడ్స్ మరియు స్పెషల్ కాస్టింగ్ ప్రకటనలు.'
                : 'Verified movie teasers, private cinema equipment advertisements, and special casting calls approved by Admin.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Tabs */}
            <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'all'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'te' ? 'మొత్తం (18)' : 'All (18)'}
              </button>
              <button
                onClick={() => setActiveTab('teasers')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'teasers'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'te' ? 'మూవీ టీజర్లు (6)' : 'Teasers (6)'}
              </button>
              <button
                onClick={() => setActiveTab('pvt')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'pvt'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'te' ? 'Pvt యాడ్స్ (6)' : 'Pvt Ads (6)'}
              </button>
              <button
                onClick={() => setActiveTab('special')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'special'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'te' ? 'స్పెషల్ యాడ్స్ (6)' : 'Special (6)'}
              </button>
            </div>

            {/* Upload Ad / Teaser Button */}
            <button
              onClick={onOpenUploadAd}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{lang === 'te' ? 'యాడ్ / టీజర్ అప్లోడ్' : 'Submit Teaser / Ad'}</span>
            </button>
          </div>
        </div>

        {/* 1. MOVIE TEASERS (6) */}
        {(activeTab === 'all' || activeTab === 'teasers') && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-lg font-bold text-amber-300 font-cinema">
                  {lang === 'te' ? 'సినిమా టీజర్లు & ట్రైలర్స్ (Movie Teasers - 6)' : 'Movie Teasers & Trailers (6)'}
                </h3>
              </div>
              <span className="text-xs text-slate-400">అడ్మిన్ ద్వారా ర్యాంకింగ్ నిర్ణయం</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedTeasers.map((teaser, idx) => (
                <div
                  key={teaser.id}
                  className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-amber-500/50 overflow-hidden shadow-lg transition duration-300 flex flex-col"
                >
                  {/* Thumbnail with Play Trigger */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={teaser.bannerUrl}
                      alt={teaser.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                    {/* Priority Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <span>#{idx + 1}</span>
                      <span className="text-slate-400 text-[10px]">Priority</span>
                    </div>

                    {/* Admin Approved Stamp */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-semibold text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Approved</span>
                    </div>

                    {/* Big Play Button Overlay */}
                    <button
                      onClick={() => setActiveVideoModal(teaser)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition cursor-pointer"
                      title="ప్లే చేయండి (Watch on YouTube)"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </button>
                  </div>

                  {/* Teaser Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition font-telugu line-clamp-1">
                        {teaser.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {teaser.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Tv className="w-3 h-3 text-amber-400" />
                        <span className="truncate max-w-[140px]">{teaser.clientName}</span>
                      </span>
                      <button
                        onClick={() => setActiveVideoModal(teaser)}
                        className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                      >
                        <span>యూట్యూబ్‌లో చూడండి</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. PRIVATE ADS (6) */}
        {(activeTab === 'all' || activeTab === 'pvt') && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                <h3 className="text-lg font-bold text-sky-300 font-cinema">
                  {lang === 'te' ? 'ప్రైవేట్ సినిమా ప్రకటనలు (Pvt Ads - 6)' : 'Private Cinema Equipment & Studio Ads (6)'}
                </h3>
              </div>
              <span className="text-xs text-slate-400">ఎక్విప్‌మెంట్ & స్టూడియో సేవలు</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedPvtAds.map((ad, idx) => (
                <div
                  key={ad.id}
                  className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-sky-500/40 overflow-hidden shadow-lg transition duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img
                      src={ad.bannerUrl}
                      alt={ad.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 border border-sky-500/40 text-[11px] font-bold text-sky-300">
                      Pvt Ad #{idx + 1}
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-sky-950/80 text-[10px] font-semibold text-sky-200">
                      {ad.clientName}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition font-telugu line-clamp-1">
                        {ad.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {ad.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        హెల్ప్‌లైన్: <strong className="text-sky-400">{ad.contactPhone}</strong>
                      </span>
                      <button
                        onClick={() => setActiveVideoModal(ad)}
                        className="px-2 py-1 rounded bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 font-medium transition flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>వీడియో డెమో</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SPECIAL ADS (6) */}
        {(activeTab === 'all' || activeTab === 'special') && (
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-lg font-bold text-emerald-300 font-cinema">
                  {lang === 'te' ? 'స్పెషల్ యాడ్స్ & కాస్టింగ్ కాల్స్ (Special Ads - 6)' : 'Special Ads & Auditions (6)'}
                </h3>
              </div>
              <span className="text-xs text-slate-400">ప్రత్యేక కాస్టింగ్ & వర్క్‌షాప్‌లు</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedSpecialAds.map((ad, idx) => (
                <div
                  key={ad.id}
                  className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-emerald-500/40 overflow-hidden shadow-lg transition duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img
                      src={ad.bannerUrl}
                      alt={ad.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
                      Special Ad #{idx + 1}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition font-telugu line-clamp-1">
                        {ad.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {ad.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        సంప్రదించండి: <strong className="text-emerald-400">{ad.contactPhone}</strong>
                      </span>
                      <button
                        onClick={() => setActiveVideoModal(ad)}
                        className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-medium transition flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>వివరాలు</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Embedded YouTube Video Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white truncate max-w-lg">
                  {activeVideoModal.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={getYouTubeEmbedUrl(activeVideoModal.youtubeUrl)}
                title={activeVideoModal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <div>
                <span className="text-amber-400 font-semibold">{activeVideoModal.clientName}</span>
                <span className="text-slate-400 ml-2">| సంప్రదించండి: {activeVideoModal.contactPhone}</span>
              </div>
              <a
                href={activeVideoModal.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>యూట్యూబ్‌లో ఒరిజినల్ పేజీ తెరవండి</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
