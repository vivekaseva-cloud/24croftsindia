import React, { useState } from 'react';
import {
  X,
  User,
  Building2,
  Sliders,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  LogIn,
  AlertCircle,
  KeyRound,
} from 'lucide-react';
import { TalentProfile, ProductionHouse, Language } from '../types';
import { UserSession } from '../utils/securityAndId';

interface LoginModalProps {
  isOpen: boolean;
  roleHint?: 'admin' | 'production_house' | 'talent';
  lang: Language;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
  talentProfiles: TalentProfile[];
  productionHouses: ProductionHouse[];
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  roleHint = 'production_house',
  lang,
  onClose,
  onLoginSuccess,
  talentProfiles,
  productionHouses,
}) => {
  const [role, setRole] = useState<'talent' | 'production_house' | 'admin'>(roleHint);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. ADMIN LOGIN
    if (role === 'admin') {
      if (username.trim() === 'Admin' && password === 'Bchakriraju1992@') {
        onLoginSuccess({
          role: 'admin',
          id: 'admin',
          name: 'Super Admin',
        });
        onClose();
        return;
      } else {
        setErrorMsg('అడ్మిన్ యూజర్ ID లేదా పాస్‌వర్డ్ సరైనది కాదు. (ID: Admin, Password: Bchakriraju1992@)');
        return;
      }
    }

    // 2. PRODUCTION HOUSE LOGIN
    if (role === 'production_house') {
      const match = productionHouses.find(
        (ph) =>
          ph.username.toLowerCase() === username.trim().toLowerCase() &&
          ph.passwordHash === password
      );

      if (match) {
        onLoginSuccess({
          role: 'production_house',
          id: match.id,
          name: match.contactPerson,
          bannerName: match.bannerName,
        });
        onClose();
        return;
      } else {
        setErrorMsg('ప్రొడక్షన్ హౌస్ యూజర్ ID లేదా పాస్‌వర్డ్ సరైనది కాదు.');
        return;
      }
    }

    // 3. TALENT LOGIN
    if (role === 'talent') {
      const match = talentProfiles.find(
        (tp) =>
          (tp.username.toLowerCase() === username.trim().toLowerCase() ||
            tp.id.toLowerCase() === username.trim().toLowerCase()) &&
          tp.passwordHash === password
      );

      if (match) {
        onLoginSuccess({
          role: 'talent',
          id: match.id,
          name: match.fullName,
        });
        onClose();
        return;
      } else {
        setErrorMsg('టాలెంట్ యూజర్ ID లేదా పాస్‌వర్డ్ సరైనది కాదు.');
        return;
      }
    }
  };

  // Quick helper to fill test credentials for seamless testing
  const fillTestCredentials = (type: 'admin' | 'production' | 'talent') => {
    if (type === 'admin') {
      setRole('admin');
      setUsername('Admin');
      setPassword('Bchakriraju1992@');
    } else if (type === 'production') {
      setRole('production_house');
      setUsername('mythri_official');
      setPassword('Mythri#2026');
    } else {
      setRole('talent');
      setUsername('aaradhya_sharma');
      setPassword('Aaradhya#2026');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-4 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-slate-950 rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white font-cinema">
              {lang === 'te' ? '24crofts.com లాగిన్' : '24crofts.com Login'}
            </h3>
            <p className="text-xs text-slate-400 font-telugu mt-0.5">
              సినిమా మ్యాట్రిమోనియల్ & మ్యాచ్‌మేకింగ్ ఖాతా
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 my-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setRole('production_house');
              setErrorMsg('');
            }}
            className={`py-2 px-1 rounded-xl transition flex flex-col items-center gap-1 ${
              role === 'production_house'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span className="text-[10px]">ప్రొడక్షన్ హౌస్</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('talent');
              setErrorMsg('');
            }}
            className={`py-2 px-1 rounded-xl transition flex flex-col items-center gap-1 ${
              role === 'talent'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px]">24 క్రాఫ్ట్స్ ఆర్టిస్ట్</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('admin');
              setErrorMsg('');
            }}
            className={`py-2 px-1 rounded-xl transition flex flex-col items-center gap-1 ${
              role === 'admin'
                ? 'bg-red-900/90 text-amber-300 border border-amber-500/50 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span className="text-[10px]">అడ్మిన్ (Admin)</span>
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              యూజర్ ID / Profile ID *
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={
                role === 'admin'
                  ? 'Admin'
                  : role === 'production_house'
                  ? 'mythri_official'
                  : 'aaradhya_sharma లేదా 24C-ACT-1001'
              }
              className="w-full bg-slate-900 text-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              పాస్‌వర్డ్ (Password) *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900 text-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>లాగిన్ అవ్వండి (Sign In)</span>
          </button>
        </form>

        {/* Test Login Shortcuts helper */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-semibold mb-2 flex items-center gap-1">
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>డెమో టెస్ట్ క్రెడెన్షియల్స్ (1-క్లిక్ ఆటోఫిల్):</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => fillTestCredentials('admin')}
              className="p-1.5 rounded-lg bg-red-950/40 text-amber-300 border border-red-800/40 hover:bg-red-900/40 font-bold"
            >
              Admin Auto-fill
            </button>
            <button
              type="button"
              onClick={() => fillTestCredentials('production')}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            >
              Mythri Movies
            </button>
            <button
              type="button"
              onClick={() => fillTestCredentials('talent')}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            >
              Aaradhya (Heroine)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
