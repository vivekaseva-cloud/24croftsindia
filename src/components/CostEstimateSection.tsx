import React from 'react';
import {
  Server,
  ShieldCheck,
  CheckCircle,
  Database,
  Cloud,
  HardDrive,
  Lock,
  Cpu,
  Smartphone,
  WifiOff,
  Bell,
} from 'lucide-react';
import { Language } from '../types';
import { HOSTING_AND_MAINTENANCE_ESTIMATE } from '../utils/costEstimator';

interface CostEstimateSectionProps {
  lang: Language;
}

export const CostEstimateSection: React.FC<CostEstimateSectionProps> = ({ lang }) => {
  return (
    <section id="hosting-and-costs" className="py-16 bg-[#0a0e17] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Server className="w-3.5 h-3.5" />
            <span>{lang === 'te' ? 'క్లౌడ్ ఆర్కిటెక్చర్ & సెక్యూరిటీ ప్రణాళిక' : 'Cloud Architecture & Security Plan'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-cinema tracking-tight">
            {lang === 'te' ? (
              <>
                సర్వర్ హోస్టింగ్ & <span className="gold-gradient-text">మెయింటెనెన్స్ అంచనా వ్యయం</span>
              </>
            ) : (
              <>
                Server Hosting & <span className="gold-gradient-text">Maintenance Estimates</span>
              </>
            )}
          </h2>
          <p className="text-sm text-slate-400 font-telugu mt-2">
            {lang === 'te'
              ? 'ప్రతి ప్రొఫైల్‌కు 25 ఫోటోలు, యూట్యూబ్ లింకులు, ప్రొడక్షన్ హౌస్ మూవీ రిజిస్ట్రేషన్ ఫారమ్స్ మరియు ఎండ్-టు-ఎండ్ ఎన్‌క్రిప్టెడ్ కాంటాక్ట్ భద్రత కోసం పూర్తి బడ్జెట్ ప్రణాళిక.'
              : 'Detailed server architecture, media storage (25 photos/user), PostgreSQL database encryption, and mobile readiness budget.'}
          </p>
        </div>

        {/* 3 Highlights of Platform Architecture: Mobile PWA, Offline mode, Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-telugu">
                iOS & Android అనుకూలత (Mobile PWA)
              </h4>
              <p className="text-xs text-slate-400 font-telugu mt-1 leading-relaxed">
                యాప్ స్టోర్ లేదా గూగుల్ ప్లే స్టోర్ లో ఇన్స్టాల్ చేసుకునేలా PWA ప్రమాణాలు మరియు పూర్తి రెస్పాన్సివ్ డిజైన్.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-telugu">
                ఆఫ్‌లైన్ మోడ్ సదుపాయం (Offline Caching)
              </h4>
              <p className="text-xs text-slate-400 font-telugu mt-1 leading-relaxed">
                నెట్‌వర్క్ లేని సమయంలో కూడా బ్రౌజ్ చేసిన ప్రొఫైళ్లు, కేటగిరీలు మరియు సమాచారం తక్షణమే లోడ్ అవుతాయి.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-telugu">
                AES-256 డేటాబేస్ ఎన్‌క్రిప్షన్
              </h4>
              <p className="text-xs text-slate-400 font-telugu mt-1 leading-relaxed">
                ఆధార్ నంబర్లు మరియు ఫోన్ నంబర్లు డేటాబేస్ స్థాయిలో అత్యున్నత ఎన్‌క్రిప్షన్ ద్వారా భద్రపరచబడతాయి.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing & Estimation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {HOSTING_AND_MAINTENANCE_ESTIMATE.map((tier) => (
            <div
              key={tier.tierName}
              className="p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white font-cinema">
                    {tier.tierName}
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    {tier.scale}
                  </span>
                </div>

                <p className="text-xs text-amber-400 font-telugu mb-4">
                  {tier.tierNameTe}
                </p>

                <div className="text-3xl font-black text-white font-mono mb-6 pb-4 border-b border-slate-800 flex items-baseline gap-2">
                  <span>{tier.monthlyCostInr}</span>
                  <span className="text-xs font-normal text-slate-400">
                    ({tier.monthlyCostUsd})
                  </span>
                </div>

                {/* Line Items */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    వివరణాత్మక వ్యయ విభజన (Cost Breakdown):
                  </span>
                  {tier.breakdown.map((item, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div className="pr-2">
                        <p className="font-semibold text-slate-200">{item.item}</p>
                        <p className="text-[10px] text-slate-400">{item.description}</p>
                      </div>
                      <span className="font-mono font-bold text-amber-400 shrink-0">
                        {item.costInr}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Security Measures */}
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                    డేటా భద్రత & ఎన్‌క్రిప్షన్ ప్రమాణాలు:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {tier.securityFeatures.map((sec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
