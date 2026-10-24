import React, { useState } from 'react';
import {
  X,
  User,
  Building2,
  ShieldCheck,
  Upload,
  Plus,
  Trash2,
  Sparkles,
  Film,
  Lock,
  Eye,
  EyeOff,
  Image,
  Video,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { TalentProfile, ProductionHouse, Language, CastingDetails } from '../types';
import { CINEMA_24_CRAFTS } from '../data/craftsData';
import { generateProfileId } from '../utils/securityAndId';

interface RegistrationModalProps {
  isOpen: boolean;
  initialTab?: 'talent' | 'production';
  lang: Language;
  onClose: () => void;
  onRegisterTalent: (profile: TalentProfile) => void;
  onRegisterProduction: (ph: ProductionHouse) => void;
  existingTalentCount: number;
  existingProductionCount: number;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  initialTab = 'talent',
  lang,
  onClose,
  onRegisterTalent,
  onRegisterProduction,
  existingTalentCount,
  existingProductionCount,
}) => {
  const [activeTab, setActiveTab] = useState<'talent' | 'production'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);

  // ------------------ TALENT FORM STATE ------------------
  const [craftId, setCraftId] = useState('actors');
  const [subCategory, setSubCategory] = useState('కథానాయిక (Heroine)');
  const [fullName, setFullName] = useState('');
  const [screenName, setScreenName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [state, setState] = useState('Telangana');
  const [address, setAddress] = useState('');
  const [experienceYears, setExperienceYears] = useState('2');
  const [bio, setBio] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  // Multi-select Industries
  const [industries, setIndustries] = useState<string[]>(['Tollywood']);
  // Languages
  const [languages, setLanguages] = useState<string[]>(['Telugu', 'English']);

  // Photos (up to 25)
  const [photoUrls, setPhotoUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
  ]);
  // YouTube links (unlimited)
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  ]);
  const [newYoutubeLink, setNewYoutubeLink] = useState('');

  // Casting Details
  const isCastingSelected = craftId === 'actors' || craftId === 'junior-artists';
  const [age, setAge] = useState('24');
  const [height, setHeight] = useState("5'7\"");
  const [weight, setWeight] = useState('54 kg');
  const [bust, setBust] = useState('34');
  const [waist, setWaist] = useState('26');
  const [hip, setHip] = useState('36');
  const [skinTone, setSkinTone] = useState('Fair');
  const [eyeColour, setEyeColour] = useState('Brown');
  const [hairColour, setHairColour] = useState('Black');
  const [shoeSize, setShoeSize] = useState('7 UK');
  const [maritalStatus, setMaritalStatus] = useState('Unmarried');
  const [presentProfession, setPresentProfession] = useState('Model / Artist');
  const [education, setEducation] = useState('Graduate');
  const [dressesComfortable, setDressesComfortable] = useState('All Styles');
  const [openForOutstation, setOpenForOutstation] = useState(true);
  const [openForOutOfCountry, setOpenForOutOfCountry] = useState(true);
  const [passport, setPassport] = useState('Yes (Valid)');
  const [comfortableTimings, setComfortableTimings] = useState(true);
  const [aim, setAim] = useState('To act in meaningful and commercial cinema');
  const [instagramId, setInstagramId] = useState('@artist_official');

  // Interested In
  const [interestedIn, setInterestedIn] = useState<CastingDetails['interestedIn']>({
    acting: true,
    printShoots: true,
    rampShows: false,
    designerShoots: true,
    ethnicWears: true,
    westernWears: true,
    bikiniShoots: false,
    lingerieShoots: false,
    swimSuit: false,
    calendarShoots: false,
    musicAlbums: true,
    seminude: false,
    nudeShoots: false,
    bodyPaintShoots: false,
  });

  // Comfortable With
  const [comfortableWith, setComfortableWith] = useState<CastingDetails['comfortableWith']>({
    onScreenKiss: false,
    loveMaking: false,
    hugScenes: true,
    lipLockScenes: false,
    indianWears: true,
    westernWears: true,
    skirts: true,
    bikini: false,
    shorts: true,
    boldScenes: false,
    smokingScenesOnScreen: false,
    drinkingScenesOnScreen: false,
    drivingScenes: true,
    ableToWorkIndoorAndOutdoor: true,
    allergiesToDustOrCosmetics: 'None',
  });

  // ------------------ PRODUCTION HOUSE FORM STATE ------------------
  const [phBannerName, setPhBannerName] = useState('');
  const [phCompanyName, setPhCompanyName] = useState('');
  const [phRegNumber, setPhRegNumber] = useState('');
  const [phContactPerson, setPhContactPerson] = useState('');
  const [phDesignation, setPhDesignation] = useState('Producer / Director');
  const [phEmail, setPhEmail] = useState('');
  const [phMobile, setPhMobile] = useState('');
  const [phOfficeAddress, setPhOfficeAddress] = useState('');
  const [phCity, setPhCity] = useState('Hyderabad');
  const [phAadhaarNumber, setPhAadhaarNumber] = useState('');
  const [phUsername, setPhUsername] = useState('');
  const [phPassword, setPhPassword] = useState('');
  const [phProjectFileName, setPhProjectFileName] = useState('');
  const [phProjectUploaded, setPhProjectUploaded] = useState(false);

  if (!isOpen) return null;

  // Selected craft data
  const currentCraft = CINEMA_24_CRAFTS.find((c) => c.id === craftId) || CINEMA_24_CRAFTS[0];

  // Handle Photo upload simulation from user file system / phone gallery
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newUrls: string[] = [];
      Array.from(files).forEach((file) => {
        if (photoUrls.length + newUrls.length < 25) {
          const reader = new FileReader();
          reader.onload = (loadEvent) => {
            if (loadEvent.target?.result) {
              setPhotoUrls((prev) => [...prev, loadEvent.target!.result as string].slice(0, 25));
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleAddYoutubeLink = () => {
    if (newYoutubeLink.trim()) {
      setYoutubeLinks([...youtubeLinks, newYoutubeLink.trim()]);
      setNewYoutubeLink('');
    }
  };

  const handleRemoveYoutubeLink = (index: number) => {
    setYoutubeLinks(youtubeLinks.filter((_, i) => i !== index));
  };

  const handleRemovePhoto = (index: number) => {
    setPhotoUrls(photoUrls.filter((_, i) => i !== index));
  };

  // Submit Talent
  const handleSubmitTalent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobile || !aadhaarNumber || !username || !password) {
      alert('దయచేసి పూర్తి పేరు, మొబైల్, తప్పనిసరి ఆధార్ మరియు యూజర్ ID, పాస్‌వర్డ్ పూరించండి.');
      return;
    }

    const newId = generateProfileId(craftId, existingTalentCount + 1);

    const newProfile: TalentProfile = {
      id: newId,
      username,
      passwordHash: password,
      fullName,
      screenName: screenName || fullName,
      craftId,
      subCategory,
      industry: industries,
      languages,
      aadhaarNumber,
      mobile,
      email,
      emergencyContact,
      city,
      state,
      address,
      experienceYears,
      bio: bio || `${subCategory} in 24 Crafts`,
      isPaid,
      isVerified: true,
      status: 'approved',
      uploadDate: new Date().toISOString(),
      viewsCount: 1,
      photoUrls,
      youtubeLinks,
      castingDetails: isCastingSelected
        ? {
            fullName,
            screenName: screenName || fullName,
            age,
            city,
            height,
            weight,
            bust,
            waist,
            hip,
            skinTone,
            eyeColour,
            hairColour,
            shoeSize,
            maritalStatus,
            presentProfession,
            education,
            dressesComfortable,
            openForOutstationShoots: openForOutstation,
            openForOutOfCountryShoots: openForOutOfCountry,
            passport,
            experience: `${experienceYears} years`,
            comfortableWithAllTimings: comfortableTimings,
            languages,
            aim,
            instagramId,
            interestedIn,
            comfortableWith,
          }
        : undefined,
    };

    onRegisterTalent(newProfile);
    onClose();
  };

  // Submit Production House
  const handleSubmitProduction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phBannerName || !phMobile || !phAadhaarNumber || !phUsername || !phPassword) {
      alert('దయచేసి బ్యానర్ పేరు, మొబైల్ నంబర్, ఆధార్ నంబర్, యూజర్ ID మరియు పాస్‌వర్డ్ తప్పనిసరిగా పూరించండి.');
      return;
    }

    if (!phProjectUploaded) {
      alert('ప్రొడక్షన్ హౌస్ మూవీ రిజిస్ట్రేషన్ ఫారం / ప్రాజెక్ట్ ప్రపోజల్ డాక్యుమెంట్ తప్పనిసరిగా అప్‌లోడ్ చేయాలి.');
      return;
    }

    const newPhId = `24C-PH-${500 + existingProductionCount + 1}`;

    const newPH: ProductionHouse = {
      id: newPhId,
      username: phUsername,
      passwordHash: phPassword,
      bannerName: phBannerName,
      productionHouseName: phCompanyName || phBannerName,
      regNumber: phRegNumber || 'CINE-REG-PENDING',
      contactPerson: phContactPerson || phBannerName,
      designation: phDesignation,
      email: phEmail,
      mobile: phMobile,
      officeAddress: phOfficeAddress,
      city: phCity,
      industry: ['Tollywood', 'Bollywood'],
      aadhaarNumber: phAadhaarNumber,
      movieProjectFileName: phProjectFileName || 'Movie_Registration_Proposal.pdf',
      movieProjectFileUrl: 'https://24crofts.com/uploads/proposal.pdf',
      status: 'approved',
      registrationDate: new Date().toISOString(),
    };

    onRegisterProduction(newPH);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div>
            <h3 className="text-xl font-bold text-white font-cinema">
              {lang === 'te' ? '24crofts.com అధికారిక రిజిస్ట్రేషన్ ఫారమ్' : '24crofts.com Official Registration Form'}
            </h3>
            <p className="text-xs text-slate-400 font-telugu mt-0.5">
              సినిమా 24 విభాగాల టాలెంట్ & ప్రొడక్షన్ హౌస్ ప్రత్యేక రిజిస్ట్రేషన్
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Selector Tabs */}
        <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-900/60 p-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('talent')}
            className={`py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition ${
              activeTab === 'talent'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>24 క్రాఫ్ట్స్ టాలెంట్ రిజిస్ట్రేషన్ ఫారమ్</span>
          </button>
          <button
            onClick={() => setActiveTab('production')}
            className={`py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition ${
              activeTab === 'production'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>ప్రొడక్షన్ హౌస్ రిజిస్ట్రేషన్ ఫారమ్</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* ===================== TAB 1: TALENT REGISTRATION ===================== */}
          {activeTab === 'talent' ? (
            <form onSubmit={handleSubmitTalent} className="space-y-6">
              {/* Category & Sub-category Selection */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Film className="w-4 h-4" />
                  <span>1. సినిమా విభాగం & సబ్-కేటగిరీ ఎంపిక</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      24 సినిమా విభాగం (Craft Category) *
                    </label>
                    <select
                      value={craftId}
                      onChange={(e) => {
                        const newCraft = e.target.value;
                        setCraftId(newCraft);
                        const c = CINEMA_24_CRAFTS.find((item) => item.id === newCraft);
                        if (c) {
                          setSubCategory(c.subCategoriesTe[0]);
                        }
                      }}
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    >
                      {CINEMA_24_CRAFTS.map((c) => (
                        <option key={c.id} value={c.id}>
                          #{c.number} {c.teluguName} ({c.englishName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      సబ్-కేటగిరీ (Sub-Category) *
                    </label>
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    >
                      {currentCraft.subCategoriesTe.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Login Credentials Creation */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  <span>2. యూజర్ ID మరియు పాస్‌వర్డ్ సృష్టి (Login Credentials)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      యూజర్ ID (Username) *
                    </label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="ఉదా: aaradhya_cine"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
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
                        placeholder="••••••••"
                        className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none pr-10"
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
                </div>
              </div>

              {/* Personal & Mandatory Aadhaar Verification */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>3. వ్యక్తిగత సమాచారం & ఆధార్ తప్పనిసరి (Aadhaar Mandatory)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      పూర్తి పేరు (Full Name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="మీ పూర్తి పేరు"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      స్క్రీన్ నేమ్ (Screen Name)
                    </label>
                    <input
                      type="text"
                      value={screenName}
                      onChange={(e) => setScreenName(e.target.value)}
                      placeholder="సినిమాలో పిలవబడే పేరు"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-amber-400 mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>ఆధార్ నంబర్ (Aadhaar Must) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                      placeholder="12 అంకెల ఆధార్ నంబర్"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-amber-500/50 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      మొబైల్ నంబర్ *
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10 అంకెల మొబైల్"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      ఈమెయిల్ ID
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      ఎమర్జెన్సీ కాంటాక్ట్ నంబర్
                    </label>
                    <input
                      type="tel"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="కుటుంబ సభ్యుల నంబర్"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Address Details & Industry Origin */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  4. చిరునామా, ఇండస్ట్రీ అనుబంధం & భాషలు (Address, Industry & Languages)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      నగరం (City) *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="ఉదా: Hyderabad"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      రాష్ట్రం (State)
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Telangana / Andhra Pradesh"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      అనుభవం (సంవత్సరాలు)
                    </label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    పూర్తి చిరునామా (Full Address)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="డోర్ నం., వీధి, ప్రాంతం, పిన్‌కోడ్"
                    className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Industries Checkboxes */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    ఎక్కడివారు / ఏ ఇండస్ట్రీలో పనిచేస్తారు? (Tollywood, Kollywood, Bollywood etc.)
                  </label>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {['Tollywood', 'Kollywood', 'Bollywood', 'Sandalwood', 'Mollywood', 'Web Series', 'Indie Cinema'].map(
                      (ind) => (
                        <button
                          type="button"
                          key={ind}
                          onClick={() => {
                            if (industries.includes(ind)) {
                              setIndustries(industries.filter((x) => x !== ind));
                            } else {
                              setIndustries([...industries, ind]);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl border transition ${
                            industries.includes(ind)
                              ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                              : 'bg-slate-950 text-slate-300 border-slate-700'
                          }`}
                        >
                          {ind} {industries.includes(ind) ? '✓' : ''}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    తెలిసిన భాషలు (భాషలు ఎన్ని వస్తాయో నమోదు చేయండి):
                  </label>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {['Telugu', 'Hindi', 'Tamil', 'English', 'Kannada', 'Malayalam'].map((lng) => (
                      <button
                        type="button"
                        key={lng}
                        onClick={() => {
                          if (languages.includes(lng)) {
                            setLanguages(languages.filter((x) => x !== lng));
                          } else {
                            setLanguages([...languages, lng]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl border transition ${
                          languages.includes(lng)
                            ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                            : 'bg-slate-950 text-slate-300 border-slate-700'
                        }`}
                      >
                        {lng} {languages.includes(lng) ? '✓' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SPECIAL CASTING DETAILS ACCORDION (If Casting/Actor/Junior artist) */}
              {isCastingSelected && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/40 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>5. కాస్టింగ్ కేటగిరీ ప్రత్యేక వివరాలు (Casting Special Details)</span>
                    </h4>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      నటీనటులకు మాత్రమే
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">వయస్సు (Age)</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">ఎత్తు (Height)</label>
                      <input
                        type="text"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">బరువు (Weight)</label>
                      <input
                        type="text"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">చర్మ ఛాయ (Skin Tone)</label>
                      <input
                        type="text"
                        value={skinTone}
                        onChange={(e) => setSkinTone(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                  </div>

                  {/* Measurements */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">Bust</label>
                      <input
                        type="text"
                        value={bust}
                        onChange={(e) => setBust(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">Waist</label>
                      <input
                        type="text"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">Hip</label>
                      <input
                        type="text"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">కళ్ళ రంగు (Eye Colour)</label>
                      <input
                        type="text"
                        value={eyeColour}
                        onChange={(e) => setEyeColour(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">జుట్టు రంగు (Hair Colour)</label>
                      <input
                        type="text"
                        value={hairColour}
                        onChange={(e) => setHairColour(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">షూ సైజు (Shoe Size)</label>
                      <input
                        type="text"
                        value={shoeSize}
                        onChange={(e) => setShoeSize(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">వైవాహిక స్థితి (Marital status)</label>
                      <input
                        type="text"
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">ప్రస్తుత వృత్తి (Present Profession)</label>
                      <input
                        type="text"
                        value={presentProfession}
                        onChange={(e) => setPresentProfession(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">విద్యార్హత (Education)</label>
                      <input
                        type="text"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">సౌకర్యవంతమైన దుస్తులు (Dresses Comfortable)</label>
                      <input
                        type="text"
                        value={dressesComfortable}
                        onChange={(e) => setDressesComfortable(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">పాస్‌పోర్ట్ వివరాలు (Passport)</label>
                      <input
                        type="text"
                        value={passport}
                        onChange={(e) => setPassport(e.target.value)}
                        placeholder="Yes (Valid) / No"
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">ఇన్‌స్టాగ్రామ్ ID (Instagram I'd)</label>
                      <input
                        type="text"
                        value={instagramId}
                        onChange={(e) => setInstagramId(e.target.value)}
                        placeholder="@username"
                        className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                      />
                    </div>
                  </div>

                  {/* Shoot Availability Toggles */}
                  <div className="flex flex-wrap gap-4 text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={openForOutstation}
                        onChange={(e) => setOpenForOutstation(e.target.checked)}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                      <span>Open for Outstation shoots</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={openForOutOfCountry}
                        onChange={(e) => setOpenForOutOfCountry(e.target.checked)}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                      <span>Open for out of country shoots</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={comfortableTimings}
                        onChange={(e) => setComfortableTimings(e.target.checked)}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                      <span>Comfortable with all Timings (Day & Night)</span>
                    </label>
                  </div>

                  {/* INTERESTED IN Checkboxes */}
                  <div>
                    <label className="block text-xs font-bold text-amber-400 mb-2">
                      ఆసక్తి ఉన్న రంగాలు (INTERESTED IN):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {Object.keys(interestedIn).map((key) => (
                        <label
                          key={key}
                          className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={interestedIn[key as keyof typeof interestedIn]}
                            onChange={(e) =>
                              setInterestedIn({
                                ...interestedIn,
                                [key]: e.target.checked,
                              })
                            }
                            className="rounded text-amber-500"
                          />
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* COMFORTABLE WITH Checkboxes */}
                  <div>
                    <label className="block text-xs font-bold text-emerald-400 mb-2">
                      సన్నివేశాలు & దుస్తుల సౌలభ్యం (Comfortable with):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {Object.keys(comfortableWith).map((key) => {
                        if (key === 'allergiesToDustOrCosmetics') return null;
                        return (
                          <label
                            key={key}
                            className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={comfortableWith[key as keyof typeof comfortableWith] as boolean}
                              onChange={(e) =>
                                setComfortableWith({
                                  ...comfortableWith,
                                  [key]: e.target.checked,
                                })
                              }
                              className="rounded text-emerald-500"
                            />
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">
                      దుమ్ము లేదా కాస్మెటిక్స్ అలర్జీలు ఏమైనా ఉన్నాయా? (Any Allergies to Dust or Cosmetics)
                    </label>
                    <input
                      type="text"
                      value={comfortableWith.allergiesToDustOrCosmetics}
                      onChange={(e) =>
                        setComfortableWith({
                          ...comfortableWith,
                          allergiesToDustOrCosmetics: e.target.value,
                        })
                      }
                      placeholder="ఉదా: No Allergies / దుమ్ము పడదు"
                      className="w-full bg-slate-950 text-white text-xs p-2 rounded-xl border border-slate-700"
                    />
                  </div>
                </div>
              )}

              {/* Photos Upload (Up to 25 Photos from System / Phone Gallery) */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Image className="w-4 h-4" />
                    <span>6. ఫొటోస్ అప్‌లోడ్ (ఫోన్ గ్యాలరీ / కంప్యూటర్ నుండి 25 ఫొటోల వరకు)</span>
                  </h4>
                  <span className="text-xs text-slate-400">{photoUrls.length} / 25 ఫొటోలు</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer transition flex items-center justify-center gap-2 shadow">
                    <Upload className="w-4 h-4" />
                    <span>గ్యాలరీ నుండి ఫొటోలు ఎంచుకోండి</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-slate-400">
                    JPG, PNG, WebP మద్దతు ఇవ్వబడుతుంది (గరిష్టంగా 25).
                  </span>
                </div>

                {/* Previews grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {photoUrls.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* YouTube Links (Unlimited) */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="w-4 h-4" />
                  <span>7. అపరిమిత యూట్యూబ్ లింక్స్ (Unlimited YouTube Links)</span>
                </h4>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newYoutubeLink}
                    onChange={(e) => setNewYoutubeLink(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 bg-slate-950 text-slate-100 text-xs px-3 py-2 rounded-xl border border-slate-700 outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddYoutubeLink}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl transition flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>జతచేయి</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {youtubeLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <span className="truncate max-w-md">{link}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveYoutubeLink(idx)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* VIP / Paid Profile Option */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>చెల్లింపు ప్రొఫైల్ (Paid Profile - మొదటి ప్రాధాన్యత ప్రదర్శన)</span>
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    కేటగిరీ ఓపెన్ చేసినప్పుడు మీ ప్రొఫైల్ మొదట కనిపిస్తుంది.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPaid}
                    onChange={(e) => setIsPaid(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/20 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>24 క్రాఫ్ట్స్ ప్రొఫైల్ సృష్టించండి (Submit Registration)</span>
              </button>
            </form>
          ) : (
            /* ===================== TAB 2: PRODUCTION HOUSE REGISTRATION ===================== */
            <form onSubmit={handleSubmitProduction} className="space-y-6">
              {/* Credentials */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  <span>1. ప్రొడక్షన్ హౌస్ లాగిన్ వివరాలు (Login Credentials)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      యూజర్ ID (Production House User ID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={phUsername}
                      onChange={(e) => setPhUsername(e.target.value)}
                      placeholder="ఉదా: mythri_cine_house"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
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
                        value={phPassword}
                        onChange={(e) => setPhPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none pr-10"
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
                </div>
              </div>

              {/* Banner & Registration Info */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>2. బ్యానర్ & సంస్థ వివరాలు (Banner & Production Details)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      సినిమా బ్యానర్ పేరు (Banner Name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={phBannerName}
                      onChange={(e) => setPhBannerName(e.target.value)}
                      placeholder="ఉదా: Mythri Movie Makers"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      రిజిస్టర్డ్ కంపెనీ పేరు (Production House Registered Name)
                    </label>
                    <input
                      type="text"
                      value={phCompanyName}
                      onChange={(e) => setPhCompanyName(e.target.value)}
                      placeholder="Pvt Ltd / LLP పేరు"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      ప్రొడక్షన్ హౌస్ రిజిస్ట్రేషన్ / ఛాంబర్ నంబర్
                    </label>
                    <input
                      type="text"
                      value={phRegNumber}
                      onChange={(e) => setPhRegNumber(e.target.value)}
                      placeholder="TS-HYD-CINE-2026-..."
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-amber-400 mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>నిర్మాత ఆధార్ నంబర్ (Aadhaar Must) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={phAadhaarNumber}
                      onChange={(e) => setPhAadhaarNumber(e.target.value)}
                      placeholder="12 అంకెల ఆధార్ నంబర్"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-amber-500/50 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Representative */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  3. కాంటాక్ట్ వ్యక్తి & కార్యాలయ చిరునామా
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      ప్రతినిధి పేరు (Contact Person)
                    </label>
                    <input
                      type="text"
                      value={phContactPerson}
                      onChange={(e) => setPhContactPerson(e.target.value)}
                      placeholder="నిర్మాత / ఎగ్జిక్యూటివ్"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      మొబైల్ నంబర్ *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phMobile}
                      onChange={(e) => setPhMobile(e.target.value)}
                      placeholder="ఆఫీస్ మొబైల్ నంబర్"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      అధికారిక ఈమెయిల్
                    </label>
                    <input
                      type="email"
                      value={phEmail}
                      onChange={(e) => setPhEmail(e.target.value)}
                      placeholder="production@banner.com"
                      className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    కార్యాలయ చిరునామా (Office Address)
                  </label>
                  <input
                    type="text"
                    value={phOfficeAddress}
                    onChange={(e) => setPhOfficeAddress(e.target.value)}
                    placeholder="రోడ్ నం., జూబ్లీహిల్స్ / ఫిల్మ్ నగర్, హైదరాబాద్"
                    className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* CRITICAL REQUIREMENT: "అలాగే పెడుక్షన్ హౌస్ మూవీ రిజిస్ట్రేషన్ ఫారం తప్పనిసరిగా అప్లోడ్ చేసేలా ఉండాలి" */}
              <div className="p-5 rounded-2xl bg-amber-950/20 border-2 border-dashed border-amber-500/50 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    4. మూవీ రిజిస్ట్రేషన్ ఫారమ్ అప్‌లోడ్ (తప్పనిసరి - Mandatory Upload) *
                  </h4>
                </div>
                <p className="text-xs text-slate-300 font-telugu">
                  ప్రొడక్షన్ హౌస్ వారు నిర్మించబోయే సినిమా టైటిల్ రిజిస్ట్రేషన్ సర్టిఫికేట్ లేదా టాలెంట్ ప్రాజెక్ట్ రిక్విజిషన్ ఫారమ్ (PDF/Docx/Scan) ను తప్పనిసరిగా అప్‌లోడ్ చేయాలి.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer transition flex items-center justify-center gap-2 shadow">
                    <Upload className="w-4 h-4" />
                    <span>ఫైల్ ఎంచుకోండి (PDF / Image)</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setPhProjectFileName(e.target.files[0].name);
                          setPhProjectUploaded(true);
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {phProjectUploaded ? (
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/40">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>అప్‌లోడ్ విజయవంతం: {phProjectFileName}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-amber-400/80 font-medium">
                      * డాక్యుమెంట్ ఇంకా అప్‌లోడ్ చేయలేదు
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>ప్రొడక్షన్ హౌస్ రిజిస్ట్రేషన్ పూర్తి చేయండి (Submit Banner)</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
