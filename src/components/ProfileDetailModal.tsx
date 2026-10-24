import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  Unlock,
  Share2,
  Check,
  Sparkles,
  MapPin,
  Calendar,
  Languages,
  Film,
  Instagram,
  Heart,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Video,
  Award,
  Phone,
  Mail,
  Home,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { TalentProfile, ContactRequest, Language } from '../types';
import { UserSession, canViewFullContact, maskAadhaar, maskPhoneNumber } from '../utils/securityAndId';

interface ProfileDetailModalProps {
  profile: TalentProfile | null;
  lang: Language;
  session: UserSession | null;
  approvedRequests: ContactRequest[];
  onClose: () => void;
  onRequestContact: (profile: TalentProfile) => void;
  onOpenLogin: (roleHint?: 'production_house') => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  lang,
  session,
  approvedRequests,
  onClose,
  onRequestContact,
  onOpenLogin,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'casting' | 'photos' | 'videos'>('overview');

  if (!profile) return null;

  const contactAccess = canViewFullContact(profile.id, session, approvedRequests);
  const photos = profile.photoUrls && profile.photoUrls.length > 0 ? profile.photoUrls : [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
  ];

  const handleShare = () => {
    const url = `${window.location.origin}/?profile=${profile.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const casting = profile.castingDetails;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 flex items-center justify-center">
      <div className="relative w-full max-w-5xl bg-slate-950 rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 font-mono font-bold text-sm">
              ID: {profile.id}
            </span>
            {profile.isPaid && (
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-black uppercase flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>VIP Paid</span>
              </span>
            )}
            {profile.isVerified && (
              <span className="hidden sm:flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Aadhaar Verified</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? 'లింక్ కాపీ అయింది!' : 'షేర్ లింక్'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-amber-500 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'te' ? 'ప్రొఫైల్ వివరాలు (Overview)' : 'Profile Overview'}
          </button>
          {casting && (
            <button
              onClick={() => setActiveTab('casting')}
              className={`py-3 px-4 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'casting'
                  ? 'border-amber-500 text-amber-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'te' ? 'కాస్టింగ్ & బాడీ మెజర్‌మెంట్స్' : 'Casting & Physical Specs'}</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'photos'
                ? 'border-amber-500 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'te' ? `ఫొటో గ్యాలరీ (${photos.length}/25)` : `Photo Gallery (${photos.length})`}
          </button>
          {profile.youtubeLinks?.length > 0 && (
            <button
              onClick={() => setActiveTab('videos')}
              className={`py-3 px-4 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'videos'
                  ? 'border-amber-500 text-amber-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-red-400" />
              <span>{lang === 'te' ? 'యూట్యూబ్ షోరీల్స్' : 'YouTube Showreels'}</span>
            </button>
          )}
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Photo Showcase */}
              <div className="md:col-span-5 space-y-4">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
                  <img
                    src={photos[activePhotoIdx]}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                  {photos.length > 1 && (
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
                        }}
                        className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white pointer-events-auto transition shadow"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePhotoIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
                        }}
                        className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white pointer-events-auto transition shadow"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                {photos.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {photos.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhotoIdx(i)}
                        className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                          activePhotoIdx === i ? 'border-amber-500 scale-95' : 'border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={p} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Profile Details */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-semibold text-amber-400 font-telugu uppercase tracking-wider">
                    {profile.subCategory}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-telugu mt-1">
                    {profile.fullName}
                  </h2>
                  {profile.screenName && (
                    <p className="text-sm text-amber-300 font-medium">
                      స్క్రీన్ నేమ్: {profile.screenName}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">
                    రిజిస్ట్రేషన్ తేదీ: {new Date(profile.uploadDate).toLocaleDateString()} | వీక్షణలు: {profile.viewsCount}
                  </p>
                </div>

                {/* Core Attributes Card */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400">నగరం (City)</span>
                    <p className="font-bold text-white mt-0.5">{profile.city}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">అనుభవం</span>
                    <p className="font-bold text-white mt-0.5">{profile.experienceYears} సంవత్సరాలు</p>
                  </div>
                  <div>
                    <span className="text-slate-400">ఇండస్ట్రీస్</span>
                    <p className="font-bold text-amber-300 mt-0.5">{profile.industry.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">తెలిసిన భాషలు</span>
                    <p className="font-bold text-white mt-0.5">{profile.languages.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">ఆధార్ స్థితి</span>
                    <p className="font-bold text-emerald-400 mt-0.5">
                      {maskAadhaar(profile.aadhaarNumber, session?.role === 'admin')}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">స్టేటస్</span>
                    <p className="font-bold text-white mt-0.5 capitalize">{profile.status}</p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    {lang === 'te' ? 'ఆర్టిస్ట్ పరిచయం & అనుభవం' : 'Bio & Professional Summary'}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                    {profile.bio}
                  </p>
                </div>

                {/* Protected Matrimonial Contact Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/30 border border-amber-500/30 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <h4 className="text-sm font-bold text-white font-telugu">
                      కాంటాక్ట్ సమాచారం (మ్యాట్రిమోనియల్ ప్రైవసీ మోడల్)
                    </h4>
                  </div>

                  {contactAccess.allowed ? (
                    <div className="space-y-3 bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/40">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>అడ్మిన్ ద్వారా ఆమోదించబడిన కాంటాక్ట్ వివరాలు:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-amber-400" />
                          <span>మొబైల్: <strong>{profile.mobile}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-amber-400" />
                          <span>ఈమెయిల్: <strong>{profile.email}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-amber-400" />
                          <span>ఎమర్జెన్సీ: <strong>{profile.emergencyContact || 'N/A'}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-amber-400" />
                          <span>చిరునామా: <strong>{profile.address || profile.city}</strong></span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300">
                        వెబ్‌సైట్ అడ్మిన్ టీమ్ ఆమోదంతో మాత్రమే ప్రొడక్షన్ హౌస్ వారికి కాంటాక్ట్ నంబర్లను చూసేందుకు అధికారం ఉంటుంది. అడ్మిన్ ఆమోదం లేకుండా కాంటాక్ట్ నంబర్లు సురక్షితంగా లాక్ చేయబడి ఉంటాయి.
                      </p>

                      <div className="flex items-center gap-2 text-xs text-amber-300 bg-black/60 p-3 rounded-xl border border-amber-500/30">
                        <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
                          ఫోన్ నంబర్: <strong className="font-mono">{maskPhoneNumber(profile.mobile)}</strong>
                        </span>
                      </div>

                      {session?.role === 'production_house' ? (
                        <button
                          onClick={() => onRequestContact(profile)}
                          className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                        >
                          <Unlock className="w-4 h-4" />
                          <span>అడ్మిన్ కాంటాక్ట్ అన్లాక్ అభ్యర్థన పంపండి (Request Access)</span>
                        </button>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => onOpenLogin('production_house')}
                            className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition text-center"
                          >
                            ప్రొడక్షన్ హౌస్ లాగిన్ చేయండి
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED CASTING REQUIREMENTS */}
          {activeTab === 'casting' && casting && (
            <div className="space-y-6">
              {/* Physical Specifications */}
              <div>
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>శారీరక కొలతలు & వ్యక్తిగత వివరాలు (Physical & Personal Specs)</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">వయస్సు (Age)</span>
                    <p className="font-bold text-white text-sm mt-0.5">{casting.age} సం||</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">ఎత్తు (Height)</span>
                    <p className="font-bold text-white text-sm mt-0.5">{casting.height}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">బరువు (Weight)</span>
                    <p className="font-bold text-white text-sm mt-0.5">{casting.weight}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">Bust - Waist - Hip</span>
                    <p className="font-bold text-amber-300 text-sm mt-0.5">
                      {casting.bust || '-'}-{casting.waist || '-'}-{casting.hip || '-'}
                    </p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">చర్మ ఛాయ (Skin Tone)</span>
                    <p className="font-bold text-white text-sm mt-0.5">{casting.skinTone}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">కళ్ళ రంగు (Eye Colour)</span>
                    <p className="font-bold text-white text-sm mt-0.5">{casting.eyeColour}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">జుట్టు రంగు (Hair)</span>
                    <p className="font-bold text-white text-sm mt-0.5">{casting.hairColour}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">షూ సైజు (Shoe Size)</span>
                    <p className="font-bold text-white text-sm mt-0.5">{casting.shoeSize}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">వైవాహిక స్థితి (Marital)</span>
                    <p className="font-bold text-white text-sm mt-0.5">{casting.maritalStatus}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">ప్రస్తుత వృత్తి</span>
                    <p className="font-bold text-white text-sm mt-0.5 truncate">{casting.presentProfession}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">విద్యార్హత (Education)</span>
                    <p className="font-bold text-white text-sm mt-0.5 truncate">{casting.education}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">పాస్‌పోర్ట్ (Passport)</span>
                    <p className="font-bold text-white text-sm mt-0.5 truncate">{casting.passport}</p>
                  </div>
                </div>
              </div>

              {/* Shoot Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300">అవుట్‌స్టేషన్ షూట్స్‌కు సిద్ధమా?</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${casting.openForOutstationShoots ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                    {casting.openForOutstationShoots ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300">విదేశీ షూట్స్‌కు సిద్ధమా?</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${casting.openForOutOfCountryShoots ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                    {casting.openForOutOfCountryShoots ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300">అన్ని టైమింగ్స్‌కు సౌకర్యమా?</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${casting.comfortableWithAllTimings ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                    {casting.comfortableWithAllTimings ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              {/* Aim & Instagram */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">లక్ష్యం (Aim)</span>
                  <p className="text-slate-200 mt-1">{casting.aim || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold flex items-center gap-1">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram ID</span>
                  </span>
                  <p className="text-pink-300 font-bold mt-1">{casting.instagramId || 'N/A'}</p>
                </div>
              </div>

              {/* Interested In Options */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  ఆసక్తి ఉన్న రంగాలు (INTERESTED IN):
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                  {Object.entries(casting.interestedIn).map(([key, val]) => (
                    <div
                      key={key}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        val
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span>{val ? '✓' : '—'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comfortable With Options */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  సన్నివేశాల సౌలభ్యం (Comfortable With Scenes & Attires):
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                  {Object.entries(casting.comfortableWith).map(([key, val]) => {
                    if (key === 'allergiesToDustOrCosmetics') return null;
                    return (
                      <div
                        key={key}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          val
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span>{val ? '✓' : '✗'}</span>
                      </div>
                    );
                  })}
                </div>
                {casting.comfortableWith.allergiesToDustOrCosmetics && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <strong>దుమ్ము లేదా కాస్మెటిక్స్ అలర్జీలు:</strong> {casting.comfortableWith.allergiesToDustOrCosmetics}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PHOTO GALLERY (UP TO 25 PHOTOS) */}
          {activeTab === 'photos' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400">
                  సిస్టమ్ లేదా ఫోన్ గ్యాలరీ నుండి అప్‌లోడ్ చేయబడిన ఫొటోలు (గరిష్టంగా 25)
                </span>
                <span className="text-xs text-amber-400 font-bold">{photos.length} Photos</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map((url, i) => (
                  <div
                    key={i}
                    onClick={() => setActivePhotoIdx(i)}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500 transition group cursor-pointer shadow"
                  >
                    <img src={url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono">
                      #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: YOUTUBE SHOWREELS */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <span className="text-xs text-slate-400">
                అపరిమిత యూట్యూబ్ లింక్స్ (Unlimited YouTube Links / Showreels)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {profile.youtubeLinks.map((link, idx) => {
                  let videoId = '';
                  if (link.includes('youtu.be/')) {
                    videoId = link.split('youtu.be/')[1]?.split('?')[0];
                  } else if (link.includes('watch?v=')) {
                    videoId = link.split('watch?v=')[1]?.split('&')[0];
                  }

                  return (
                    <div key={idx} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow">
                      <div className="relative aspect-video w-full bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`Showreel ${idx + 1}`}
                          className="w-full h-full border-0"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-3 flex items-center justify-between text-xs text-slate-300">
                        <span>షోరీల్ వీడియో #{idx + 1}</span>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <span>ఓపెన్ యూట్యూబ్</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
