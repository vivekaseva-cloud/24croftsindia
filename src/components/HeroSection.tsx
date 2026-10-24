import React from 'react';
import {
  Film,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  Search,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  lang: Language;
  onOpenRegisterTalent: () => void;
  onOpenRegisterProduction: () => void;
  onExploreCrafts: () => void;
  totalCraftsCount: number;
  totalProfilesCount: number;
  totalProductionHouses: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenRegisterTalent,
  onOpenRegisterProduction,
  onExploreCrafts,
  totalCraftsCount,
  totalProfilesCount,
  totalProductionHouses,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0e1422] via-[#0b0f17] to-[#0b0f17] pt-12 pb-16 border-b border-amber-500/10">
      {/* Background Decorative Cinema Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-red-600/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Matrimonial Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>
              {lang === 'te'
                ? 'మ్యాట్రిమోనియల్ తరహా భద్రత: అడ్మిన్ అధికారంతో మాత్రమే కాంటాక్ట్ యాక్సెస్'
                : 'Matrimonial Privacy: Contact Numbers Protected by Admin Authorization'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight font-cinema leading-none">
            24<span className="gold-gradient-text">crofts</span>.com
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-amber-200/90 font-telugu max-w-3xl mx-auto">
            {lang === 'te'
              ? 'సినిమా సాంప్రదాయ 24 విభాగాల అధికారిక మ్యాట్రిమోనియల్ & మ్యాచ్‌మేకింగ్ వేదిక'
              : 'The Premier Cinema Matchmaking & Verified Talent Platform for all 24 Crafts'}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 font-telugu max-w-2xl mx-auto leading-relaxed">
            {lang === 'te'
              ? 'దర్శకత్వం, రచయితలు, నటీనటులు, సినిమాటోగ్రఫీ, స్టంట్, ఎడిటింగ్ మొదలైన 24 విభాగాల టాలెంట్ ప్రొఫైళ్లు. రోజువారీ తాజా అప్‌లోడ్లకు మరియు చెల్లింపు ప్రొఫైళ్లకు మొదటి ప్రాధాన్యత.'
              : 'Discover certified talent and technicians across all 24 Crafts of Indian Cinema. Production Houses get verified access with zero compromise on artist privacy.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={onOpenRegisterTalent}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>{lang === 'te' ? '24 క్రాఫ్ట్స్ లో రిజిస్టర్ అవ్వండి' : 'Talent Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenRegisterProduction}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs sm:text-sm shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{lang === 'te' ? 'ప్రొడక్షన్ హౌస్ రిజిస్ట్రేషన్' : 'Production House Portal'}</span>
            </button>

            <button
              onClick={onExploreCrafts}
              className="px-5 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-medium text-xs sm:text-sm transition flex items-center gap-1.5"
            >
              <Film className="w-4 h-4 text-slate-400" />
              <span>{lang === 'te' ? '24 విభాగాలు అన్వేషించండి' : 'Browse 24 Crafts'}</span>
            </button>
          </div>

          {/* Core Trust & Metrics Ticker */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-cinema">
                24
              </span>
              <p className="text-[11px] text-slate-400 font-telugu mt-0.5">సాంప్రదాయ విభాగాలు</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-xl sm:text-2xl font-black text-white font-cinema">
                {totalProfilesCount}+
              </span>
              <p className="text-[11px] text-slate-400 font-telugu mt-0.5">వెరిఫైడ్ ప్రొఫైల్స్</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-xl sm:text-2xl font-black text-amber-300 font-cinema">
                {totalProductionHouses}+
              </span>
              <p className="text-[11px] text-slate-400 font-telugu mt-0.5">ప్రొడక్షన్ హౌసెస్</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-cinema">
                100%
              </span>
              <p className="text-[11px] text-slate-400 font-telugu mt-0.5">ఆధార్ & కాంటాక్ట్ సెక్యూర్</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
