import React from 'react';
import {
  Film,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Heart,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onOpenAdmin: () => void;
  onNavigateHome: () => void;
  onNavigateCrafts: () => void;
  onNavigateAds: () => void;
  onNavigateCostEstimate: () => void;
  onNavigateContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenAdmin,
  onNavigateHome,
  onNavigateCrafts,
  onNavigateAds,
  onNavigateCostEstimate,
  onNavigateContact,
}) => {
  return (
    <footer className="bg-[#05070c] border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Matrimonial Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Film className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white font-cinema">
                24<span className="gold-gradient-text">crofts</span>.com
              </span>
            </div>
            <p className="text-xs text-slate-400 font-telugu leading-relaxed">
              సినిమా సాంప్రదాయ 24 విభాగాల కోసం రూపొందించబడిన ప్రత్యేక మ్యాట్రిమోనియల్ తరహా టాలెంట్ మ్యాచ్‌మేకింగ్ ప్లాట్‌ఫామ్. ఆర్టిస్టుల మరియు సాంకేతిక నిపుణుల కాంటాక్ట్ నంబర్లు అడ్మిన్ ఆమోదంతో మాత్రమే అందుబాటులో ఉంటాయి.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% ఎండ్-టు-ఎండ్ ఎన్‌క్రిప్టెడ్ & ఆధార్ వెరిఫైడ్</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-cinema">
              ప్రధాన విభాగాలు (Navigation)
            </h4>
            <ul className="space-y-2 font-telugu">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-amber-400 transition"
                >
                  హోమ్ పేజీ (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateCrafts}
                  className="hover:text-amber-400 transition"
                >
                  24 సినిమా విభాగాలు (24 Crafts)
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateAds}
                  className="hover:text-amber-400 transition"
                >
                  సినిమా టీజర్లు & ప్రకటనలు (Teasers & Ads)
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateCostEstimate}
                  className="hover:text-amber-400 transition"
                >
                  సర్వర్ హోస్టింగ్ & వ్యయ విశ్లేషణ
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateContact}
                  className="hover:text-amber-400 transition"
                >
                  హైదరాబాద్ ఆఫీస్ & మ్యాప్
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-cinema">
              హెడ్‌ఆఫీస్ కాంటాక్ట్ (Headquarters)
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-300">24croftsindia@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-300">7989144860</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Film Nagar & Jubilee Hills Hub, Hyderabad, India.
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: iOS / Android App Readiness & Admin */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-cinema">
              యాప్ డెవలప్‌మెంట్ & అడ్మిన్
            </h4>
            <p className="text-[11px] text-slate-400 font-telugu">
              ఈ ప్లాట్‌ఫామ్ ఐఓఎస్ (iOS) మరియు ఆండ్రాయిడ్ (Android) రెండింటికీ అనుకూలంగా ఉండేలా ప్రొగ్రెసివ్ వెబ్ యాప్ (PWA) మరియు ఆఫ్లైన్ మోడ్ తో డిజైన్ చేయబడింది.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl border border-amber-500/30 font-bold transition flex items-center justify-center gap-2"
                title="Admin ID: Admin | Pass: Bchakriraju1992@"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>అడ్మిన్ పోర్టల్ లాగిన్</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 <strong>24crofts.com</strong>. All Rights Reserved. Cinema 24 Crafts Matrimonial Platform.
          </div>
          <div className="flex items-center gap-4">
            <span>హైదరాబాద్ • టాలీవుడ్ • భారతీయ సినిమా</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
