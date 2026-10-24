import React, { useState } from 'react';
import {
  Clapperboard,
  BookOpen,
  UserCheck,
  Users,
  Mic2,
  Camera,
  Zap,
  Wrench,
  Image,
  Palette,
  Hammer,
  Shirt,
  Sparkles,
  ShieldAlert,
  Footprints,
  Scissors,
  Volume2,
  Music,
  Briefcase,
  Contact2,
  Coffee,
  HeartHandshake,
  Truck,
  Megaphone,
  CheckCircle,
  Filter,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Layers,
  Sparkle,
} from 'lucide-react';
import { CraftCategory, TalentProfile, ContactRequest, Language } from '../types';
import { CINEMA_24_CRAFTS } from '../data/craftsData';
import { ProfileCard } from './ProfileCard';
import { UserSession, filterAndSortProfiles } from '../utils/securityAndId';

// Icon mapping helper
const CRAFT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Clapperboard,
  BookOpen,
  UserCheck,
  Users,
  Mic2,
  Camera,
  Zap,
  Wrench,
  Image,
  Palette,
  Hammer,
  Shirt,
  Sparkles,
  ShieldAlert,
  Footprints,
  Scissors,
  Volume2,
  Music,
  Briefcase,
  Contact2,
  Coffee,
  HeartHandshake,
  Truck,
  Megaphone,
};

interface CraftsGridProps {
  lang: Language;
  profiles: TalentProfile[];
  session: UserSession | null;
  approvedRequests: ContactRequest[];
  onViewProfile: (profile: TalentProfile) => void;
  onRequestContact: (profile: TalentProfile) => void;
  selectedCraftId: string | null;
  onSelectCraft: (craftId: string | null) => void;
  selectedSubCategory: string | null;
  onSelectSubCategory: (subCat: string | null) => void;
}

export const CraftsGrid: React.FC<CraftsGridProps> = ({
  lang,
  profiles,
  session,
  approvedRequests,
  onViewProfile,
  onRequestContact,
  selectedCraftId,
  onSelectCraft,
  selectedSubCategory,
  onSelectSubCategory,
}) => {
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [onlyPaid, setOnlyPaid] = useState<boolean>(false);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);

  const selectedCraft = CINEMA_24_CRAFTS.find((c) => c.id === selectedCraftId);

  // If a craft is selected: Show Sub-Categories and all its profiles (Paid first)
  const craftProfiles = selectedCraftId
    ? filterAndSortProfiles(profiles, {
        craftId: selectedCraftId,
        subCategory: selectedSubCategory || undefined,
        industry: industryFilter !== 'all' ? industryFilter : undefined,
        onlyPaid,
        onlyVerified,
      })
    : [];

  return (
    <section id="cinema-crafts" className="py-12 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'te' ? 'సినిమా సాంప్రదాయ 24 విభాగాలు' : 'Traditional 24 Crafts of Indian Cinema'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-cinema tracking-tight">
            {lang === 'te' ? (
              <>
                24 క్రాఫ్ట్స్ <span className="gold-gradient-text">టాలెంట్ కేటలాగ్</span>
              </>
            ) : (
              <>
                The 24 Crafts <span className="gold-gradient-text">Talent Catalog</span>
              </>
            )}
          </h2>
          <p className="text-sm text-slate-400 font-telugu mt-2">
            {lang === 'te'
              ? 'ప్రారంభంలో కేవలం 24 విభాగాలు మాత్రమే కనిపిస్తాయి. మీరు విభాగాన్ని క్లిక్ చేసినప్పుడు సబ్-కేటగిరీలు మరియు మొదట చెల్లింపు ప్రొఫైళ్లు (Paid Profiles) ప్రదర్శించబడతాయి.'
              : 'Initial view shows only the 24 categories. Click any category to reveal sub-categories and view Paid profiles first.'}
          </p>
        </div>

        {/* IF A CRAFT IS SELECTED: SHOW DETAILED SUB-CATEGORY NAVIGATION & PROFILES */}
        {selectedCraft ? (
          <div className="bg-slate-900/90 rounded-3xl border border-amber-500/30 p-6 md:p-8 shadow-2xl mb-12">
            {/* Header with Back button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    onSelectCraft(null);
                    onSelectSubCategory(null);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>←</span>
                  <span>{lang === 'te' ? 'అన్ని 24 విభాగాలు' : 'All 24 Crafts'}</span>
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                      {selectedCraft.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-telugu">
                      {lang === 'te' ? selectedCraft.teluguName : selectedCraft.englishName}
                    </h3>
                  </div>
                  <p className="text-xs text-amber-300/80 font-telugu mt-0.5">
                    {lang === 'te' ? selectedCraft.taglineTe : selectedCraft.taglineEn}
                  </p>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Industry Filter */}
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                >
                  <option value="all">అన్ని ఇండస్ట్రీలు (All)</option>
                  <option value="Tollywood">టాలీవుడ్ (Tollywood)</option>
                  <option value="Kollywood">కోలీవుడ్ (Kollywood)</option>
                  <option value="Bollywood">బాలీవుడ్ (Bollywood)</option>
                  <option value="Web Series">వెబ్ సిరీస్ (OTT)</option>
                </select>

                {/* Paid Profiles Only Toggle */}
                <button
                  onClick={() => setOnlyPaid(!onlyPaid)}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 font-semibold ${
                    onlyPaid
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'te' ? 'చెల్లింపు ప్రొఫైల్స్ మాత్రమే' : 'Paid Only'}</span>
                </button>

                {/* Verified Only */}
                <button
                  onClick={() => setOnlyVerified(!onlyVerified)}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 font-semibold ${
                    onlyVerified
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'te' ? 'ఆధార్ వెరిఫైడ్' : 'Aadhaar Verified'}</span>
                </button>
              </div>
            </div>

            {/* Sub-Categories Pills Row ("అక్కడ సబ్-కేటగిరీ అనే ఎంపిక ఉండాలి") */}
            <div className="mt-5 mb-8">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {lang === 'te'
                    ? 'ఉప-విభాగాలు (Sub-Categories - ఎంచుకోండి):'
                    : 'Sub-Categories (Select to filter):'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectSubCategory(null)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    selectedSubCategory === null
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {lang === 'te' ? 'అన్ని ఉప-విభాగాలు (All)' : 'All Sub-Categories'}
                </button>
                {(lang === 'te'
                  ? selectedCraft.subCategoriesTe
                  : selectedCraft.subCategoriesEn
                ).map((subCat) => (
                  <button
                    key={subCat}
                    onClick={() => onSelectSubCategory(subCat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                      selectedSubCategory === subCat
                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                    }`}
                  >
                    {subCat}
                  </button>
                ))}
              </div>
            </div>

            {/* Profiles under this Craft (Paid Profiles Shown First!) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'te'
                      ? 'నియమం ప్రకారం మొదట చెల్లింపు ప్రొఫైళ్లు (Paid Profiles) మరియు తాజా రిజిస్ట్రేషన్లు ప్రదర్శించబడుతున్నాయి'
                      : 'Showing Paid Profiles first, followed by daily new uploads'}
                  </span>
                </span>
                <span className="text-xs text-slate-400">
                  లభించిన ప్రొఫైల్స్: <strong>{craftProfiles.length}</strong>
                </span>
              </div>

              {craftProfiles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {craftProfiles.map((p) => (
                    <ProfileCard
                      key={p.id}
                      profile={p}
                      lang={lang}
                      session={session}
                      approvedRequests={approvedRequests}
                      onViewProfile={onViewProfile}
                      onRequestContact={onRequestContact}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-slate-950/60 rounded-2xl border border-dashed border-slate-800">
                  <p className="text-sm text-slate-400">
                    ఈ సబ్-కేటగిరీలో ప్రస్తుతం ప్రొఫైళ్లు లేవు. కొత్త ఆర్టిస్టుల కోసం రిజిస్ట్రేషన్ అందుబాటులో ఉంది!
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* DEFAULT VIEW: 24 CRAFTS CARDS ONLY, PLUS 3 FEATURED PROFILES PER CATEGORY ON HOMEPAGE */
          <div>
            {/* The 24 Crafts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-16">
              {CINEMA_24_CRAFTS.map((craft) => {
                const IconComponent = CRAFT_ICONS[craft.iconName] || Clapperboard;
                const count = profiles.filter((p) => p.craftId === craft.id).length;

                return (
                  <div
                    key={craft.id}
                    onClick={() => {
                      onSelectCraft(craft.id);
                      onSelectSubCategory(null);
                    }}
                    className="group relative bg-slate-900/80 hover:bg-slate-800/90 rounded-2xl border border-slate-800 hover:border-amber-500/60 p-4 transition duration-300 cursor-pointer shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Department Number & Icon */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold flex items-center justify-center">
                          #{craft.number}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-amber-400 flex items-center justify-center transition">
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Craft Title */}
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition font-telugu line-clamp-1">
                        {lang === 'te' ? craft.teluguName : craft.englishName}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-telugu line-clamp-2 mt-1">
                        {lang === 'te' ? craft.taglineTe : craft.taglineEn}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{count} ప్రొఫైల్స్</span>
                      <span className="text-amber-400 group-hover:translate-x-1 transition font-bold flex items-center">
                        ఓపెన్ →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* HOMEPAGE REQUIREMENT: "ఒక్కో క్యాటగిరి కి 3 ప్రొఫైల్స్ కనిపించాలి. న్యూ రిజిస్ట్రేషన్ ఎవరైతే చేశారో అది మొదట కనిపించాలి" */}
            <div className="space-y-12">
              <div className="border-b border-amber-500/30 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-cinema">
                    {lang === 'te'
                      ? 'విభాగాల వారిగా తాజా ప్రొఫైల్స్ (ఒక్కో కేటగిరీకి 3 ప్రొఫైల్స్)'
                      : 'Craft Highlights (3 Profiles per Category)'}
                  </h3>
                  <p className="text-xs text-slate-400 font-telugu mt-0.5">
                    రోజువారీ తాజా రిజిస్ట్రేషన్లకు మరియు చెల్లింపు ప్రొఫైళ్లకు మొదటి ప్రాధాన్యత.
                  </p>
                </div>
              </div>

              {/* Render top crafts that have profiles */}
              {CINEMA_24_CRAFTS.slice(0, 8).map((craft) => {
                // Get 3 profiles for this craft, sorted (Paid first, then newest)
                const topThree = filterAndSortProfiles(profiles, { craftId: craft.id }).slice(0, 3);
                if (topThree.length === 0) return null;

                const IconComponent = CRAFT_ICONS[craft.iconName] || Clapperboard;

                return (
                  <div key={`featured-${craft.id}`} className="bg-slate-900/40 p-5 rounded-3xl border border-slate-800/80">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-amber-400">#{craft.number}</span>
                            <h4 className="text-lg font-bold text-white font-telugu">
                              {lang === 'te' ? craft.teluguName : craft.englishName}
                            </h4>
                          </div>
                          <span className="text-xs text-slate-400 font-telugu">
                            {lang === 'te' ? craft.taglineTe : craft.taglineEn}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onSelectCraft(craft.id);
                          onSelectSubCategory(null);
                        }}
                        className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                      >
                        <span>మొత్తం చూడండి & సబ్-కేటగిరీలు</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {topThree.map((p) => (
                        <ProfileCard
                          key={p.id}
                          profile={p}
                          lang={lang}
                          session={session}
                          approvedRequests={approvedRequests}
                          onViewProfile={onViewProfile}
                          onRequestContact={onRequestContact}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
