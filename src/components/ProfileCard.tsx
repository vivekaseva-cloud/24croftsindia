import React from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Sparkles,
  MapPin,
  Calendar,
  Share2,
  Check,
  Eye,
  Video,
  Star,
  Film,
} from 'lucide-react';
import { TalentProfile, ContactRequest, Language } from '../types';
import { UserSession, canViewFullContact, maskPhoneNumber } from '../utils/securityAndId';

interface ProfileCardProps {
  profile: TalentProfile;
  lang: Language;
  session: UserSession | null;
  approvedRequests: ContactRequest[];
  onViewProfile: (profile: TalentProfile) => void;
  onRequestContact: (profile: TalentProfile) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  lang,
  session,
  approvedRequests,
  onViewProfile,
  onRequestContact,
}) => {
  const [copied, setCopied] = React.useState(false);

  const contactAccess = canViewFullContact(profile.id, session, approvedRequests);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/?profile=${profile.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const primaryPhoto =
    profile.photoUrls && profile.photoUrls.length > 0
      ? profile.photoUrls[0]
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80';

  return (
    <div
      onClick={() => onViewProfile(profile)}
      className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-amber-500/50 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition duration-300 flex flex-col cursor-pointer"
    >
      {/* Paid VIP Badge Banner */}
      {profile.isPaid && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-l from-amber-500 via-amber-400 to-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-current" />
            <span>VIP {lang === 'te' ? 'చెల్లింపు ప్రొఫైల్' : 'Paid Profile'}</span>
          </div>
        </div>
      )}

      {/* Top Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <img
          src={primaryPhoto}
          alt={profile.fullName}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Unique Profile ID Badge (Clickable share) */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/50 text-xs font-mono font-bold text-amber-300 shadow">
            {profile.id}
          </span>
          <button
            onClick={handleShare}
            className="p-1 rounded-lg bg-black/70 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700 transition"
            title="ప్రొఫైల్ లింక్ కాపీ చేయండి"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Media count & Video reel badge */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 text-[10px] text-slate-200">
          {profile.youtubeLinks?.length > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-red-300 flex items-center gap-1">
              <Video className="w-3 h-3" />
              <span>Showreel</span>
            </span>
          )}
          <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-slate-700">
            {profile.photoUrls?.length || 1} Photos
          </span>
        </div>

        {/* Aadhaar Verified Stamp */}
        {profile.isVerified && (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/50 text-[10px] font-semibold text-emerald-300 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>{lang === 'te' ? 'ఆధార్ వెరిఫైడ్' : 'Aadhaar Verified'}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Sub-category Pill */}
          <div className="text-[11px] font-semibold text-amber-400 font-telugu line-clamp-1 mb-1">
            {profile.subCategory}
          </div>

          {/* Names */}
          <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition line-clamp-1">
            {profile.fullName}
            {profile.screenName && profile.screenName !== profile.fullName && (
              <span className="text-xs text-slate-400 font-normal ml-1">
                ({profile.screenName})
              </span>
            )}
          </h4>

          {/* Location & Experience */}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>{profile.city}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span>{profile.experienceYears} సం|| అనుభవం</span>
            </span>
          </div>

          {/* Languages Known & Industries */}
          <div className="mt-2 flex flex-wrap gap-1">
            {profile.industry.map((ind) => (
              <span
                key={ind}
                className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-medium text-slate-300 border border-slate-700"
              >
                {ind}
              </span>
            ))}
            {profile.languages.slice(0, 2).map((lng) => (
              <span
                key={lng}
                className="px-1.5 py-0.5 rounded bg-amber-950/40 text-[10px] font-medium text-amber-300 border border-amber-500/20"
              >
                {lng}
              </span>
            ))}
          </div>

          {/* Bio Preview */}
          <p className="mt-2 text-xs text-slate-400 line-clamp-2">
            {profile.bio}
          </p>
        </div>

        {/* Matrimony-Style Contact Protection Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          {contactAccess.allowed ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <Unlock className="w-3.5 h-3.5" />
              <span>{profile.mobile}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{maskPhoneNumber(profile.mobile)} (లాక్ చేయబడింది)</span>
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (contactAccess.allowed) {
                onViewProfile(profile);
              } else {
                onRequestContact(profile);
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              contactAccess.allowed
                ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40'
            }`}
          >
            {contactAccess.allowed ? (
              <span>పూర్తి ప్రొఫైల్</span>
            ) : (
              <span>కాంటాక్ట్ అభ్యర్థన</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
