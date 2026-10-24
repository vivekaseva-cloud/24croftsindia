import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Send,
  Lock,
  Building2,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { TalentProfile, Language } from '../types';
import { UserSession } from '../utils/securityAndId';

interface RequestContactModalProps {
  profile: TalentProfile | null;
  session: UserSession | null;
  lang: Language;
  onClose: () => void;
  onSubmitRequest: (talentProfile: TalentProfile, reason: string) => void;
  onOpenLogin: (roleHint?: 'production_house') => void;
}

export const RequestContactModal: React.FC<RequestContactModalProps> = ({
  profile,
  session,
  lang,
  onClose,
  onSubmitRequest,
  onOpenLogin,
}) => {
  const [reason, setReason] = useState('');
  const [projectType, setProjectType] = useState('Feature Film (ఫీచర్ ఫిల్మ్)');
  const [submitted, setSubmitted] = useState(false);

  if (!profile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('దయచేసి ఆర్టిస్ట్‌ను ఎందుకు సంప్రదించాలనుకుంటున్నారో కారణాన్ని నమోదు చేయండి.');
      return;
    }

    const fullReason = `[${projectType}] ${reason.trim()}`;
    onSubmitRequest(profile, fullReason);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-4 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-slate-950 rounded-3xl border border-amber-500/40 shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white font-cinema">
              {lang === 'te' ? 'కాంటాక్ట్ నంబర్ అభ్యర్థన' : 'Request Contact Access'}
            </h3>
            <p className="text-xs text-slate-400 font-telugu mt-0.5">
              మ్యాట్రిమోనియల్ ప్రైవసీ మోడల్ & అడ్మిన్ ఆమోదం
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
            <h4 className="text-base font-bold text-white font-telugu">
              కాంటాక్ట్ అభ్యర్థన విజయవంతంగా అడ్మిన్ టీమ్‌కు పంపబడింది!
            </h4>
            <p className="text-xs text-slate-400">
              అడ్మిన్ ఆమోదించిన వెంటనే మీ ప్రొడక్షన్ హౌస్ ఖాతాలో ఫోన్ నంబర్ అన్లాక్ అవుతుంది.
            </p>
          </div>
        ) : !session || session.role !== 'production_house' ? (
          <div className="py-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-telugu">
                ప్రొడక్షన్ హౌస్ లాగిన్ అవసరం
              </h4>
              <p className="text-xs text-slate-400 font-telugu mt-1 max-w-xs mx-auto">
                24crofts.com నిబంధనల ప్రకారం, ఆర్టిస్టుల గోప్యత కొరకు కేవలం వెరిఫై చేయబడిన ప్రొడక్షన్ హౌస్ లాగిన్ మాత్రమే కాంటాక్ట్ అభ్యర్థన పంపగలదు.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenLogin('production_house');
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition"
            >
              ప్రొడక్షన్ హౌస్ లాగిన్ చేయండి (Sign In)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            {/* Target Profile Box */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <img
                src={profile.photoUrls?.[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                alt=""
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <span className="text-[10px] font-mono text-amber-400">{profile.id}</span>
                <h4 className="text-sm font-bold text-white font-telugu">{profile.fullName}</h4>
                <p className="text-[11px] text-slate-400">{profile.subCategory}</p>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                ప్రాజెక్ట్ రకం (Project Category)
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 outline-none"
              >
                <option value="Feature Film">ఫీచర్ ఫిల్మ్ (Feature Film)</option>
                <option value="Web Series">వెబ్ సిరీస్ (OTT Web Series)</option>
                <option value="Commercial Ad Shoot">కమర్షియల్ యాడ్ షూట్ (TVC/Ad)</option>
                <option value="Music Album">మ్యూజిక్ వీడియో ఆల్బమ్</option>
                <option value="Short Film / Independent">ఇండిపెండెంట్ ఫిల్మ్</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                సంప్రదించడానికి గల కారణం & పాత్ర వివరాలు *
              </label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="ఉదా: మా రాబోయే సినిమాలో ముఖ్య పాత్ర కోసం ఆడిషన్స్ నిమిత్తం కాంటాక్ట్ నంబర్ కావలెను..."
                className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 outline-none resize-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center gap-2 text-[11px] text-amber-200">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                అడ్మిన్ టీమ్ ఈ అభ్యర్థనను సమీక్షించి ఆమోదించిన వెంటనే ఆర్టిస్ట్ కాంటాక్ట్ నంబర్ మీకు కనిపిస్తుంది.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>అడ్మిన్‌కు అభ్యర్థన పంపండి (Submit Request)</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
