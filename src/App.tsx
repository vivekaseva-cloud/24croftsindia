import React, { useState, useEffect } from 'react';
import {
  TalentProfile,
  ProductionHouse,
  ContactRequest,
  AdItem,
  AdSenseConfig,
  Language,
} from './types';
import {
  INITIAL_PROFILES,
  INITIAL_PRODUCTION_HOUSES,
  INITIAL_CONTACT_REQUESTS,
  INITIAL_MOVIE_TEASERS,
  INITIAL_PVT_ADS,
  INITIAL_SPECIAL_ADS,
  INITIAL_ADSENSE_CONFIG,
} from './data/initialData';
import { UserSession } from './utils/securityAndId';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TeasersAndAdsSection } from './components/TeasersAndAdsSection';
import { CraftsGrid } from './components/CraftsGrid';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { RegistrationModal } from './components/RegistrationModal';
import { LoginModal } from './components/LoginModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { UploadAdModal } from './components/UploadAdModal';
import { RequestContactModal } from './components/RequestContactModal';
import { CostEstimateSection } from './components/CostEstimateSection';
import { ContactAndMapSection } from './components/ContactAndMapSection';
import { Footer } from './components/Footer';

export default function App() {
  // Multilingual state (Default Telugu 'te')
  const [lang, setLang] = useState<Language>('te');

  // Persistence with localStorage
  const [profiles, setProfiles] = useState<TalentProfile[]>(() => {
    try {
      const saved = localStorage.getItem('24crofts_profiles');
      return saved ? JSON.parse(saved) : INITIAL_PROFILES;
    } catch {
      return INITIAL_PROFILES;
    }
  });

  const [productionHouses, setProductionHouses] = useState<ProductionHouse[]>(() => {
    try {
      const saved = localStorage.getItem('24crofts_production_houses');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTION_HOUSES;
    } catch {
      return INITIAL_PRODUCTION_HOUSES;
    }
  });

  const [contactRequests, setContactRequests] = useState<ContactRequest[]>(() => {
    try {
      const saved = localStorage.getItem('24crofts_contact_requests');
      return saved ? JSON.parse(saved) : INITIAL_CONTACT_REQUESTS;
    } catch {
      return INITIAL_CONTACT_REQUESTS;
    }
  });

  const [movieTeasers, setMovieTeasers] = useState<AdItem[]>(() => {
    try {
      const saved = localStorage.getItem('24crofts_teasers');
      return saved ? JSON.parse(saved) : INITIAL_MOVIE_TEASERS;
    } catch {
      return INITIAL_MOVIE_TEASERS;
    }
  });

  const [pvtAds, setPvtAds] = useState<AdItem[]>(() => {
    try {
      const saved = localStorage.getItem('24crofts_pvt_ads');
      return saved ? JSON.parse(saved) : INITIAL_PVT_ADS;
    } catch {
      return INITIAL_PVT_ADS;
    }
  });

  const [specialAds, setSpecialAds] = useState<AdItem[]>(() => {
    try {
      const saved = localStorage.getItem('24crofts_special_ads');
      return saved ? JSON.parse(saved) : INITIAL_SPECIAL_ADS;
    } catch {
      return INITIAL_SPECIAL_ADS;
    }
  });

  const [adSenseConfig, setAdSenseConfig] = useState<AdSenseConfig>(() => {
    try {
      const saved = localStorage.getItem('24crofts_adsense');
      return saved ? JSON.parse(saved) : INITIAL_ADSENSE_CONFIG;
    } catch {
      return INITIAL_ADSENSE_CONFIG;
    }
  });

  // Current session (Default guest)
  const [session, setSession] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('24crofts_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Search ID state
  const [searchId, setSearchId] = useState('');

  // Selected Profile for Detailed View
  const [selectedProfile, setSelectedProfile] = useState<TalentProfile | null>(null);

  // Crafts Category & Sub-category selection
  const [selectedCraftId, setSelectedCraftId] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  // Modals state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginRoleHint, setLoginRoleHint] = useState<'admin' | 'production_house' | 'talent'>('production_house');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerTabHint, setRegisterTabHint] = useState<'talent' | 'production'>('talent');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isUploadAdOpen, setIsUploadAdOpen] = useState(false);
  const [contactRequestTarget, setContactRequestTarget] = useState<TalentProfile | null>(null);

  // App features: Offline mode simulation & Mobile Push Notifications
  const [isOffline, setIsOffline] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('24crofts_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('24crofts_production_houses', JSON.stringify(productionHouses));
  }, [productionHouses]);

  useEffect(() => {
    localStorage.setItem('24crofts_contact_requests', JSON.stringify(contactRequests));
  }, [contactRequests]);

  useEffect(() => {
    localStorage.setItem('24crofts_teasers', JSON.stringify(movieTeasers));
  }, [movieTeasers]);

  useEffect(() => {
    localStorage.setItem('24crofts_pvt_ads', JSON.stringify(pvtAds));
  }, [pvtAds]);

  useEffect(() => {
    localStorage.setItem('24crofts_special_ads', JSON.stringify(specialAds));
  }, [specialAds]);

  useEffect(() => {
    localStorage.setItem('24crofts_adsense', JSON.stringify(adSenseConfig));
  }, [adSenseConfig]);

  useEffect(() => {
    if (session) {
      localStorage.setItem('24crofts_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('24crofts_session');
    }
  }, [session]);

  // Deep linking: Check URL for ?profile=ID or hash #profile/ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const profileParam = params.get('profile');
    if (profileParam) {
      const match = profiles.find((p) => p.id.toLowerCase() === profileParam.toLowerCase());
      if (match) {
        setSelectedProfile(match);
      }
    }
  }, [profiles]);

  // Handle Search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const q = searchId.trim().toLowerCase();
    // 1. Direct ID match
    const exactIdMatch = profiles.find((p) => p.id.toLowerCase() === q);
    if (exactIdMatch) {
      setSelectedProfile(exactIdMatch);
      showToast(`ప్రొఫైల్ ${exactIdMatch.id} తెరవబడింది`);
      return;
    }

    // 2. Partial search
    const partialMatch = profiles.find(
      (p) =>
        p.fullName.toLowerCase().includes(q) ||
        p.screenName.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q)
    );

    if (partialMatch) {
      setSelectedProfile(partialMatch);
      showToast(`ప్రొఫైల్ ${partialMatch.fullName} లభించింది`);
    } else {
      showToast('ఈ ID లేదా పేరుతో ప్రొఫైల్ కనుగొనబడలేదు. దయచేసి సరైన ID నమోదు చేయండి.');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Login handler
  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
    showToast(
      newSession.role === 'admin'
        ? 'అడ్మిన్ సూపర్ లాగిన్ విజయవంతమైంది!'
        : `${newSession.name || newSession.bannerName} ఖాతాలోకి లాగిన్ అయ్యారు.`
    );
  };

  const handleLogout = () => {
    setSession(null);
    showToast('విజయవంతంగా లాగౌట్ అయ్యారు.');
  };

  // Add new talent profile (New registrations appear first!)
  const handleRegisterTalent = (newProfile: TalentProfile) => {
    setProfiles([newProfile, ...profiles]);
    showToast(`24 క్రాఫ్ట్స్ ప్రొఫైల్ ${newProfile.id} విజయవంతంగా సృష్టించబడింది!`);
    setSelectedProfile(newProfile);
  };

  // Add new production house
  const handleRegisterProduction = (newPH: ProductionHouse) => {
    setProductionHouses([newPH, ...productionHouses]);
    setSession({
      role: 'production_house',
      id: newPH.id,
      name: newPH.contactPerson,
      bannerName: newPH.bannerName,
    });
    showToast(`ప్రొడక్షన్ హౌస్ ${newPH.bannerName} రిజిస్టర్ చేయబడింది!`);
  };

  // Submit Ad / Teaser for admin approval
  const handleSubmitAd = (newAd: AdItem) => {
    if (newAd.type === 'movie_teaser') {
      setMovieTeasers([...movieTeasers, newAd]);
    } else if (newAd.type === 'pvt_ad') {
      setPvtAds([...pvtAds, newAd]);
    } else {
      setSpecialAds([...specialAds, newAd]);
    }
    showToast('మీ ప్రకటన అడ్మిన్ టీమ్ సమీక్ష కొరకు పంపబడింది.');
  };

  // Submit contact unlock request
  const handleSubmitContactRequest = (targetTalent: TalentProfile, reason: string) => {
    if (!session || session.role !== 'production_house') {
      setIsLoginOpen(true);
      setLoginRoleHint('production_house');
      return;
    }

    const newReq: ContactRequest = {
      id: `req-${Date.now()}`,
      productionHouseId: session.id || '24C-PH-GUEST',
      productionHouseName: session.bannerName || 'Production House',
      talentProfileId: targetTalent.id,
      talentName: `${targetTalent.fullName} (${targetTalent.screenName})`,
      talentCraft: targetTalent.subCategory,
      talentMobile: targetTalent.mobile,
      talentEmail: targetTalent.email,
      requestDate: new Date().toISOString(),
      reason,
      status: 'pending',
    };

    setContactRequests([newReq, ...contactRequests]);
    showToast('కాంటాక్ట్ అభ్యర్థన అడ్మిన్ టీమ్‌కు చేరింది. ఆమోదించబడగానే నంబర్ కనిపిస్తుంది.');
  };

  // Quick navigation smooth scrollers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-amber-500 selection:text-black flex flex-col">
      {/* Toast Notification Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-amber-400 text-xs sm:text-sm animate-bounce">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        searchId={searchId}
        onSearchChange={setSearchId}
        onSearchSubmit={handleSearchSubmit}
        session={session}
        onOpenLogin={(roleHint) => {
          setLoginRoleHint(roleHint || 'production_house');
          setIsLoginOpen(true);
        }}
        onOpenRegister={(tabHint) => {
          setRegisterTabHint(tabHint || 'talent');
          setIsRegisterOpen(true);
        }}
        onOpenAdmin={() => {
          if (session?.role === 'admin') {
            setIsAdminOpen(true);
          } else {
            setLoginRoleHint('admin');
            setIsLoginOpen(true);
          }
        }}
        onLogout={handleLogout}
        isOffline={isOffline}
        onToggleOffline={() => {
          setIsOffline(!isOffline);
          showToast(!isOffline ? 'PWA ఆఫ్‌లైన్ మోడ్ సక్రియం చేయబడింది (Offline Cache Active)' : 'ఆన్‌లైన్ మోడ్‌లోకి మారారు');
        }}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={() => {
          setNotificationsEnabled(!notificationsEnabled);
          showToast(!notificationsEnabled ? 'మొబైల్ పుష్ నోటిఫికేషన్లు ఆన్ చేయబడ్డాయి' : 'నోటిఫికేషన్లు ఆఫ్ చేయబడ్డాయి');
        }}
        onNavigateHome={() => {
          setSelectedCraftId(null);
          setSelectedSubCategory(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateCrafts={() => scrollToSection('cinema-crafts')}
        onNavigateAds={() => scrollToSection('teasers-and-ads')}
        onNavigateCostEstimate={() => scrollToSection('hosting-and-costs')}
        onNavigateContact={() => scrollToSection('contact-and-map')}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          lang={lang}
          onOpenRegisterTalent={() => {
            setRegisterTabHint('talent');
            setIsRegisterOpen(true);
          }}
          onOpenRegisterProduction={() => {
            setRegisterTabHint('production');
            setIsRegisterOpen(true);
          }}
          onExploreCrafts={() => scrollToSection('cinema-crafts')}
          totalCraftsCount={24}
          totalProfilesCount={profiles.length}
          totalProductionHouses={productionHouses.length}
        />

        {/* 2. Top Section Requirement: Movie Teasers (6), Pvt Ads (6), Special Ads (6) */}
        <TeasersAndAdsSection
          lang={lang}
          movieTeasers={movieTeasers}
          pvtAds={pvtAds}
          specialAds={specialAds}
          onOpenUploadAd={() => setIsUploadAdOpen(true)}
        />

        {/* 3. 24 Crafts Grid & Expandable Sub-Categories with Paid Profiles First (3 Profiles per category on homepage) */}
        <CraftsGrid
          lang={lang}
          profiles={profiles}
          session={session}
          approvedRequests={contactRequests}
          onViewProfile={(p) => setSelectedProfile(p)}
          onRequestContact={(p) => {
            setContactRequestTarget(p);
          }}
          selectedCraftId={selectedCraftId}
          onSelectCraft={setSelectedCraftId}
          selectedSubCategory={selectedSubCategory}
          onSelectSubCategory={setSelectedSubCategory}
        />

        {/* 4. Server Hosting & Maintenance Cost Estimation Section */}
        <CostEstimateSection lang={lang} />

        {/* 5. Contact, Hyderabad Map Integration & E2EE Form */}
        <ContactAndMapSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenAdmin={() => {
          if (session?.role === 'admin') {
            setIsAdminOpen(true);
          } else {
            setLoginRoleHint('admin');
            setIsLoginOpen(true);
          }
        }}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateCrafts={() => scrollToSection('cinema-crafts')}
        onNavigateAds={() => scrollToSection('teasers-and-ads')}
        onNavigateCostEstimate={() => scrollToSection('hosting-and-costs')}
        onNavigateContact={() => scrollToSection('contact-and-map')}
      />

      {/* ===================== MODALS ===================== */}
      {/* 1. Detailed Profile Modal */}
      <ProfileDetailModal
        profile={selectedProfile}
        lang={lang}
        session={session}
        approvedRequests={contactRequests}
        onClose={() => setSelectedProfile(null)}
        onRequestContact={(p) => setContactRequestTarget(p)}
        onOpenLogin={(roleHint) => {
          setLoginRoleHint(roleHint || 'production_house');
          setIsLoginOpen(true);
        }}
      />

      {/* 2. Registration Modal (Talent 24 Crafts & Production House) */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        initialTab={registerTabHint}
        lang={lang}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterTalent={handleRegisterTalent}
        onRegisterProduction={handleRegisterProduction}
        existingTalentCount={profiles.length}
        existingProductionCount={productionHouses.length}
      />

      {/* 3. Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        roleHint={loginRoleHint}
        lang={lang}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        talentProfiles={profiles}
        productionHouses={productionHouses}
      />

      {/* 4. Master Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        lang={lang}
        onClose={() => setIsAdminOpen(false)}
        talentProfiles={profiles}
        onUpdateTalentProfiles={setProfiles}
        productionHouses={productionHouses}
        onUpdateProductionHouses={setProductionHouses}
        contactRequests={contactRequests}
        onUpdateContactRequests={setContactRequests}
        movieTeasers={movieTeasers}
        pvtAds={pvtAds}
        specialAds={specialAds}
        onUpdateAds={(adType, items) => {
          if (adType === 'movie_teaser') setMovieTeasers(items);
          else if (adType === 'pvt_ad') setPvtAds(items);
          else setSpecialAds(items);
        }}
        adSenseConfig={adSenseConfig}
        onUpdateAdSenseConfig={setAdSenseConfig}
      />

      {/* 5. Upload Ad / Movie Teaser Modal */}
      <UploadAdModal
        isOpen={isUploadAdOpen}
        lang={lang}
        onClose={() => setIsUploadAdOpen(false)}
        onSubmitAd={handleSubmitAd}
      />

      {/* 6. Request Contact Number Access Modal */}
      <RequestContactModal
        profile={contactRequestTarget}
        session={session}
        lang={lang}
        onClose={() => setContactRequestTarget(null)}
        onSubmitRequest={handleSubmitContactRequest}
        onOpenLogin={(roleHint) => {
          setLoginRoleHint(roleHint || 'production_house');
          setIsLoginOpen(true);
        }}
      />
    </div>
  );
}
