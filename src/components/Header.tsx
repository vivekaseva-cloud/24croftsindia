import React, { useState } from 'react';
import {
  Film,
  Search,
  ShieldCheck,
  User,
  Building2,
  LogIn,
  UserPlus,
  Globe,
  Bell,
  Wifi,
  WifiOff,
  Sliders,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';
import { UserSession } from '../utils/securityAndId';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  searchId: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  session: UserSession | null;
  onOpenLogin: (roleHint?: 'admin' | 'production_house' | 'talent') => void;
  onOpenRegister: (tabHint?: 'talent' | 'production') => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  onNavigateHome: () => void;
  onNavigateCrafts: () => void;
  onNavigateAds: () => void;
  onNavigateCostEstimate: () => void;
  onNavigateContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  searchId,
  onSearchChange,
  onSearchSubmit,
  session,
  onOpenLogin,
  onOpenRegister,
  onOpenAdmin,
  onLogout,
  isOffline,
  onToggleOffline,
  notificationsEnabled,
  onToggleNotifications,
  onNavigateHome,
  onNavigateCrafts,
  onNavigateAds,
  onNavigateCostEstimate,
  onNavigateContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/95 backdrop-blur-md border-b border-amber-500/20 shadow-2xl">
      {/* Top Bar for Privacy Guarantee, Helpline & Offline Indicator */}
      <div className="bg-gradient-to-r from-amber-950/60 via-black to-amber-950/60 px-4 py-1.5 text-xs text-amber-200/90 border-b border-amber-500/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-amber-400">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            {lang === 'te'
              ? 'మ్యాట్రిమోనియల్ గోప్యతా మోడల్: అడ్మిన్ ఆమోదంతో మాత్రమే కాంటాక్ట్ వివరాలు'
              : 'Matrimonial Privacy: Contact Numbers Protected by Admin Authorization'}
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300">
            హైదరాబాద్ హెల్ప్‌లైన్: <strong className="text-amber-400">7989144860</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications Simulator */}
          <button
            onClick={onToggleNotifications}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition ${
              notificationsEnabled
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="మొబైల్ పుష్ నోటిఫికేషన్లు"
          >
            <Bell className="w-3 h-3" />
            <span>{notificationsEnabled ? 'నోటిఫికేషన్లు ON' : 'నోటిఫికేషన్లు OFF'}</span>
          </button>

          {/* Offline Mode Switch */}
          <button
            onClick={onToggleOffline}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition ${
              isOffline
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="PWA ఆఫ్లైన్ మోడ్"
          >
            {isOffline ? <WifiOff className="w-3 h-3 text-emerald-400" /> : <Wifi className="w-3 h-3" />}
            <span>{isOffline ? 'ఆఫ్‌లైన్ మోడ్ (Cached)' : 'ఆన్‌లైన్'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(lang === 'te' ? 'en' : 'te')}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 text-amber-300 border border-slate-700 hover:border-amber-500/50 text-[11px] font-semibold transition"
          >
            <Globe className="w-3 h-3 text-amber-400" />
            <span>{lang === 'te' ? 'English' : 'తెలుగు'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
              <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
                <Film className="w-6 h-6 text-amber-400 group-hover:rotate-6 transition" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-cinema">
                  24<span className="gold-gradient-text">crofts</span>.com
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/40 uppercase">
                  Cinema
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-telugu line-clamp-1">
                {lang === 'te'
                  ? 'సినిమా 24 విభాగాల మ్యాట్రిమోనియల్ & మ్యాచ్‌మేకింగ్'
                  : 'Cinema 24 Crafts Matrimonial & Matchmaking Portal'}
              </p>
            </div>
          </div>

          {/* Search Bar by Profile ID or Name */}
          <form
            onSubmit={onSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchId}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={
                  lang === 'te'
                    ? 'ప్రొఫైల్ ID (ఉదా: 24C-ACT-1001) లేదా పేరుతో వెతకండి...'
                    : 'Search by Profile ID (e.g. 24C-ACT-1001) or Name...'
                }
                className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-24 py-2 rounded-full border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-full transition shadow"
              >
                {lang === 'te' ? 'వెతుకు' : 'Search'}
              </button>
            </div>
          </form>

          {/* Action Buttons & Profile State */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onNavigateCrafts}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition"
            >
              {lang === 'te' ? '24 విభాగాలు' : '24 Crafts'}
            </button>
            <button
              onClick={onNavigateAds}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition"
            >
              {lang === 'te' ? 'టీజర్లు & ప్రకటనలు' : 'Teasers & Ads'}
            </button>
            <button
              onClick={onNavigateCostEstimate}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition"
            >
              {lang === 'te' ? 'హోస్టింగ్ & మెయింటెనెన్స్' : 'Server Architecture'}
            </button>

            {/* Session Actions */}
            {session ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="text-right">
                  <div className="text-xs font-bold text-amber-300 flex items-center justify-end gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {session.role === 'admin'
                      ? 'అడ్మిన్ (Admin)'
                      : session.role === 'production_house'
                      ? session.bannerName || 'ప్రొడక్షన్ హౌస్'
                      : session.name || 'సినిమా ఆర్టిస్ట్'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {session.role === 'admin'
                      ? 'Master Access'
                      : session.role === 'production_house'
                      ? 'Production Verified'
                      : 'Talent Account'}
                  </div>
                </div>

                {session.role === 'admin' ? (
                  <button
                    onClick={onOpenAdmin}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-md transition flex items-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>అడ్మిన్ ప్యానెల్</span>
                  </button>
                ) : null}

                <button
                  onClick={onLogout}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition"
                >
                  {lang === 'te' ? 'లాగౌట్' : 'Logout'}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Talent Register */}
                <button
                  onClick={() => onOpenRegister('talent')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'te' ? 'రిజిస్ట్రేషన్' : 'Register'}</span>
                </button>

                {/* Login Button */}
                <button
                  onClick={() => onOpenLogin()}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{lang === 'te' ? 'లాగిన్' : 'Login'}</span>
                </button>

                {/* Direct Admin Login Quick Shortcut */}
                <button
                  onClick={onOpenAdmin}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-950/60 hover:bg-red-900/60 text-amber-300 border border-red-700/40 transition flex items-center gap-1"
                  title="Admin ID: Admin | Pass: Bchakriraju1992@"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenLogin()}
              className="px-2.5 py-1.5 text-xs bg-amber-500 text-slate-950 font-bold rounded-lg"
            >
              {session ? 'ఖాతా' : 'లాగిన్'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-current rounded-full" />
                <span className="w-full h-0.5 bg-current rounded-full" />
                <span className="w-full h-0.5 bg-current rounded-full" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={onSearchSubmit} className="mt-3 md:hidden relative">
          <input
            type="text"
            value={searchId}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ప్రొఫైల్ ID (24C-ACT-1001) తో వెతకండి..."
            className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-20 py-2 rounded-full border border-slate-700 focus:border-amber-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full"
          >
            వెతుకు
          </button>
        </form>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2 lg:hidden bg-slate-950/95 p-4 rounded-xl border border-amber-500/20 shadow-2xl">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
            >
              హోమ్ పేజీ (Home)
            </button>
            <button
              onClick={() => {
                onNavigateCrafts();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
            >
              24 సినిమా విభాగాలు (24 Crafts)
            </button>
            <button
              onClick={() => {
                onNavigateAds();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
            >
              టీజర్లు & ప్రకటనలు (Teasers & Ads)
            </button>
            <button
              onClick={() => {
                onNavigateCostEstimate();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
            >
              సర్వర్ హోస్టింగ్ & వ్యయం (Hosting & Security)
            </button>
            <button
              onClick={() => {
                onNavigateContact();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
            >
              సంప్రదించండి & మ్యాప్ (Contact & Map)
            </button>

            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenRegister('talent');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-slate-800 text-amber-300 font-medium rounded-lg text-sm flex items-center justify-center gap-2 border border-amber-500/30"
              >
                <UserPlus className="w-4 h-4 text-amber-400" />
                <span>24 క్రాఫ్ట్స్ టాలెంట్ రిజిస్ట్రేషన్</span>
              </button>
              <button
                onClick={() => {
                  onOpenRegister('production');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-slate-800 text-amber-300 font-medium rounded-lg text-sm flex items-center justify-center gap-2 border border-amber-500/30"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>ప్రొడక్షన్ హౌస్ రిజిస్ట్రేషన్</span>
              </button>
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-gradient-to-r from-red-950 to-amber-950 text-amber-300 font-bold rounded-lg text-sm flex items-center justify-center gap-2 border border-amber-500/40"
              >
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>అడ్మిన్ లాగిన్ (Admin Portal)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
