import React, { useState } from 'react';
import {
  X,
  Sliders,
  Users,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Film,
  Sparkles,
  Search,
  Edit2,
  Trash2,
  Save,
  DollarSign,
  BarChart3,
  Server,
  Code,
  Layers,
  ArrowUp,
  ArrowDown,
  Lock,
  Eye,
  EyeOff,
  Building2,
  ExternalLink,
} from 'lucide-react';
import {
  TalentProfile,
  ProductionHouse,
  ContactRequest,
  AdItem,
  AdSenseConfig,
  Language,
} from '../types';
import { HOSTING_AND_MAINTENANCE_ESTIMATE } from '../utils/costEstimator';

interface AdminPanelModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  talentProfiles: TalentProfile[];
  onUpdateTalentProfiles: (profiles: TalentProfile[]) => void;
  productionHouses: ProductionHouse[];
  onUpdateProductionHouses: (houses: ProductionHouse[]) => void;
  contactRequests: ContactRequest[];
  onUpdateContactRequests: (requests: ContactRequest[]) => void;
  movieTeasers: AdItem[];
  pvtAds: AdItem[];
  specialAds: AdItem[];
  onUpdateAds: (type: 'movie_teaser' | 'pvt_ad' | 'special_ad', items: AdItem[]) => void;
  adSenseConfig: AdSenseConfig;
  onUpdateAdSenseConfig: (config: AdSenseConfig) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  lang,
  onClose,
  talentProfiles,
  onUpdateTalentProfiles,
  productionHouses,
  onUpdateProductionHouses,
  contactRequests,
  onUpdateContactRequests,
  movieTeasers,
  pvtAds,
  specialAds,
  onUpdateAds,
  adSenseConfig,
  onUpdateAdSenseConfig,
}) => {
  const [activeTab, setActiveTab] = useState<
    'profiles' | 'contacts' | 'ads' | 'adsense' | 'analytics' | 'hosting'
  >('profiles');

  // Profile Edit State
  const [editingProfile, setEditingProfile] = useState<TalentProfile | null>(null);
  const [profileSearch, setProfileSearch] = useState('');
  const [showPlainPassword, setShowPlainPassword] = useState(false);

  // AdSense local editing state
  const [localAdSense, setLocalAdSense] = useState<AdSenseConfig>({ ...adSenseConfig });

  if (!isOpen) return null;

  // Handle Contact Approval/Rejection
  const handleApproveContactRequest = (reqId: string) => {
    const updated = contactRequests.map((req) =>
      req.id === reqId
        ? {
            ...req,
            status: 'approved' as const,
            adminDecisionDate: new Date().toISOString(),
          }
        : req
    );
    onUpdateContactRequests(updated);
  };

  const handleDenyContactRequest = (reqId: string) => {
    const updated = contactRequests.map((req) =>
      req.id === reqId
        ? {
            ...req,
            status: 'rejected' as const,
            adminDecisionDate: new Date().toISOString(),
          }
        : req
    );
    onUpdateContactRequests(updated);
  };

  // Reorder Ads priority
  const handleMoveAdPriority = (
    type: 'movie_teaser' | 'pvt_ad' | 'special_ad',
    id: string,
    direction: 'up' | 'down'
  ) => {
    let list =
      type === 'movie_teaser'
        ? [...movieTeasers]
        : type === 'pvt_ad'
        ? [...pvtAds]
        : [...specialAds];

    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) return;

    if (direction === 'up' && idx > 0) {
      const temp = list[idx].priorityOrder;
      list[idx].priorityOrder = list[idx - 1].priorityOrder;
      list[idx - 1].priorityOrder = temp;
      const [item] = list.splice(idx, 1);
      list.splice(idx - 1, 0, item);
    } else if (direction === 'down' && idx < list.length - 1) {
      const temp = list[idx].priorityOrder;
      list[idx].priorityOrder = list[idx + 1].priorityOrder;
      list[idx + 1].priorityOrder = temp;
      const [item] = list.splice(idx, 1);
      list.splice(idx + 1, 0, item);
    }

    onUpdateAds(type, list);
  };

  // Save edited profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile) return;

    const updated = talentProfiles.map((tp) =>
      tp.id === editingProfile.id ? editingProfile : tp
    );
    onUpdateTalentProfiles(updated);
    setEditingProfile(null);
  };

  const handleDeleteProfile = (id: string) => {
    if (window.confirm('ఈ ప్రొఫైల్‌ను ఖచ్చితంగా తొలగించాలనుకుంటున్నారా?')) {
      onUpdateTalentProfiles(talentProfiles.filter((tp) => tp.id !== id));
      if (editingProfile?.id === id) setEditingProfile(null);
    }
  };

  // Filter profiles
  const filteredProfiles = talentProfiles.filter(
    (p) =>
      p.id.toLowerCase().includes(profileSearch.toLowerCase()) ||
      p.fullName.toLowerCase().includes(profileSearch.toLowerCase()) ||
      p.username.toLowerCase().includes(profileSearch.toLowerCase()) ||
      p.craftId.toLowerCase().includes(profileSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 flex items-center justify-center">
      <div className="relative w-full max-w-6xl bg-slate-950 rounded-3xl border border-red-500/40 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Admin Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-900/60 bg-gradient-to-r from-red-950 via-slate-950 to-red-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-900/60 border border-red-500/40 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-cinema">
                  24crofts.com మాస్టర్ అడ్మిన్ పోర్టల్
                </h3>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                  Super Admin Active
                </span>
              </div>
              <p className="text-xs text-amber-300 font-telugu">
                లాగిన్ ID: <strong>Admin</strong> | అన్ని ప్రొఫైల్స్, కాంటాక్ట్ అప్రూవల్స్, యాడ్స్, యాడ్సెన్స్ నియంత్రణ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/80 px-4 text-xs font-bold overflow-x-auto gap-1 py-1.5">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`py-2 px-3 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'profiles'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ప్రొఫైల్స్ & పాస్‌వర్డ్స్ ({talentProfiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-2 px-3 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'contacts'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>కాంటాక్ట్ అన్లాక్ అభ్యర్థనలు ({contactRequests.filter((r) => r.status === 'pending').length} పెండింగ్)</span>
          </button>

          <button
            onClick={() => setActiveTab('ads')}
            className={`py-2 px-3 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'ads'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>టీజర్లు & యాడ్స్ ఆర్డరింగ్ (6+6+6)</span>
          </button>

          <button
            onClick={() => setActiveTab('adsense')}
            className={`py-2 px-3 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'adsense'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>గూగుల్ యాడ్సెన్స్ (Admin Only)</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-3 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>రిపోర్టింగ్ డాష్‌బోర్డ్</span>
          </button>

          <button
            onClick={() => setActiveTab('hosting')}
            className={`py-2 px-3 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'hosting'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>హోస్టింగ్ & మెయింటెనెన్స్ వ్యయం</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* ==================== TAB 1: PROFILES & PASSWORDS ==================== */}
          {activeTab === 'profiles' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={profileSearch}
                    onChange={(e) => setProfileSearch(e.target.value)}
                    placeholder="ID, పేరు, యూజర్‌నేమ్ లేదా క్రాఫ్ట్‌తో వెతకండి..."
                    className="w-full bg-slate-900 text-slate-100 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-amber-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>అడ్మిన్ కు అన్ని ప్రొఫైల్స్ యూజర్ ID & పాస్‌వర్డ్ ఎడిట్ చేసే పూర్తి అధికారం కలదు.</span>
                </div>
              </div>

              {/* Profiles Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">ప్రొఫైల్ ID</th>
                      <th className="py-3 px-4">పేరు & స్క్రీన్ నేమ్</th>
                      <th className="py-3 px-4">విభాగం</th>
                      <th className="py-3 px-4">యూజర్‌నేమ్ & పాస్‌వర్డ్</th>
                      <th className="py-3 px-4">మొబైల్ & ఈమెయిల్</th>
                      <th className="py-3 px-4">ఆధార్ నంబర్</th>
                      <th className="py-3 px-4">చెల్లింపు స్థితి</th>
                      <th className="py-3 px-4 text-right">చర్యలు</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredProfiles.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 px-4 font-mono font-bold text-amber-400">
                          {p.id}
                        </td>
                        <td className="py-3 px-4 font-medium text-white">
                          <div>{p.fullName}</div>
                          <span className="text-[10px] text-slate-400">({p.screenName})</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-amber-300 font-telugu">{p.subCategory}</span>
                        </td>
                        <td className="py-3 px-4 font-mono">
                          <div className="text-slate-200">ID: {p.username}</div>
                          <div className="text-amber-300">Pass: {p.passwordHash}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div>{p.mobile}</div>
                          <span className="text-[10px] text-slate-400">{p.email}</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-emerald-400">
                          {p.aadhaarNumber}
                        </td>
                        <td className="py-3 px-4">
                          {p.isPaid ? (
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[10px]">
                              VIP Paid
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                              Regular
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingProfile({ ...p })}
                              className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition"
                              title="ఎడిట్ చేయండి"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProfile(p.id)}
                              className="p-1.5 rounded-lg bg-red-950 text-red-300 hover:bg-red-800 transition"
                              title="తొలగించండి"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edit Profile Modal Dialog */}
              {editingProfile && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/50 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-bold text-amber-300 font-telugu">
                      ప్రొఫైల్ ఎడిట్ చేయండి (ID: {editingProfile.id})
                    </h4>
                    <button
                      onClick={() => setEditingProfile(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="text-slate-400 mb-1 block">పూర్తి పేరు (Full Name)</label>
                      <input
                        type="text"
                        value={editingProfile.fullName}
                        onChange={(e) =>
                          setEditingProfile({ ...editingProfile, fullName: e.target.value })
                        }
                        className="w-full bg-slate-950 p-2 rounded-xl border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 mb-1 block">స్క్రీన్ నేమ్ (Screen Name)</label>
                      <input
                        type="text"
                        value={editingProfile.screenName}
                        onChange={(e) =>
                          setEditingProfile({ ...editingProfile, screenName: e.target.value })
                        }
                        className="w-full bg-slate-950 p-2 rounded-xl border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 mb-1 block">యూజర్‌నేమ్ (Username)</label>
                      <input
                        type="text"
                        value={editingProfile.username}
                        onChange={(e) =>
                          setEditingProfile({ ...editingProfile, username: e.target.value })
                        }
                        className="w-full bg-slate-950 p-2 rounded-xl border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 mb-1 block">పాస్‌వర్డ్ (Password Reset)</label>
                      <input
                        type="text"
                        value={editingProfile.passwordHash}
                        onChange={(e) =>
                          setEditingProfile({ ...editingProfile, passwordHash: e.target.value })
                        }
                        className="w-full bg-slate-950 p-2 rounded-xl border border-slate-700 text-amber-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 mb-1 block">మొబైల్ నంబర్</label>
                      <input
                        type="tel"
                        value={editingProfile.mobile}
                        onChange={(e) =>
                          setEditingProfile({ ...editingProfile, mobile: e.target.value })
                        }
                        className="w-full bg-slate-950 p-2 rounded-xl border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 mb-1 block">ఆధార్ నంబర్</label>
                      <input
                        type="text"
                        value={editingProfile.aadhaarNumber}
                        onChange={(e) =>
                          setEditingProfile({ ...editingProfile, aadhaarNumber: e.target.value })
                        }
                        className="w-full bg-slate-950 p-2 rounded-xl border border-slate-700 text-white"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      <label className="flex items-center gap-2 cursor-pointer text-amber-300 font-bold">
                        <input
                          type="checkbox"
                          checked={editingProfile.isPaid}
                          onChange={(e) =>
                            setEditingProfile({ ...editingProfile, isPaid: e.target.checked })
                          }
                          className="rounded text-amber-500"
                        />
                        <span>VIP చెల్లింపు ప్రొఫైల్ (Paid Profile)</span>
                      </label>
                    </div>

                    <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingProfile(null)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                      >
                        రద్దు చేయి
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>సేవ్ చేయండి (Save Changes)</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ==================== TAB 2: CONTACT UNLOCK REQUESTS ==================== */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                <p>
                  <strong>మ్యాట్రిమోనియల్ నిబంధన:</strong> వెబ్‌సైట్ అడ్మిన్ టీమ్ ఆమోదంతో మాత్రమే ప్రొడక్షన్ హౌస్ వారికి కాంటాక్ట్ నంబర్లను చూసేందుకు అధికారం ఉంటుంది. అడ్మిన్ ఆమోదం లేకుండా ఏ ప్రొడక్షన్ హౌస్ కూడా ఆర్టిస్టుల మొబైల్ నంబర్లను చూడలేరు.
                </p>
              </div>

              <div className="space-y-3">
                {contactRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {req.productionHouseName}
                        </span>
                        <span className="text-slate-400">అభ్యర్థించిన ప్రొఫైల్:</span>
                        <span className="font-mono text-amber-300 font-bold">
                          {req.talentName} ({req.talentProfileId})
                        </span>
                      </div>
                      <p className="text-slate-300">
                        <strong>సినిమా రీజన్:</strong> {req.reason}
                      </p>
                      <div className="text-[11px] text-slate-400">
                        ఆర్టిస్ట్ మొబైల్: <strong className="text-emerald-400">{req.talentMobile}</strong> | తేదీ: {new Date(req.requestDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {req.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleApproveContactRequest(req.id)}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-1.5 shadow"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>ఆమోదించు (Approve)</span>
                          </button>
                          <button
                            onClick={() => handleDenyContactRequest(req.id)}
                            className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl transition flex items-center gap-1.5"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>తిరస్కరించు (Deny)</span>
                          </button>
                        </>
                      ) : req.status === 'approved' ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/40 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>ఆమోదించబడింది (Approved)</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-red-950 text-red-400 font-bold border border-red-500/40 flex items-center gap-1">
                          <XCircle className="w-4 h-4" />
                          <span>తిరస్కరించబడింది (Denied)</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== TAB 3: ADS & MOVIE TEASERS ORDERING ==================== */}
          {activeTab === 'ads' && (
            <div className="space-y-6">
              <div className="text-xs text-slate-400">
                హోమ్ పేజీలో ఏ యాడ్ ముందుగా ప్రదర్శించాలో నిర్ణయించే ఆప్షన్ అడ్మిన్ కు ఉంటుంది. ఆరో బటన్ల ద్వారా ప్రాధాన్యతా క్రమాన్ని మార్చండి.
              </div>

              {/* 1. Teasers (6) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  మూవీ టీజర్లు 6 (Movie Teasers - Priority Ordering):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {movieTeasers.map((t, idx) => (
                    <div
                      key={t.id}
                      className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                          #{t.priorityOrder}
                        </span>
                        <div className="truncate">
                          <div className="font-bold text-white truncate">{t.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{t.clientName}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleMoveAdPriority('movie_teaser', t.id, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveAdPriority('movie_teaser', t.id, 'down')}
                          disabled={idx === movieTeasers.length - 1}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Pvt Ads (6) */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  ప్రైవేట్ యాడ్స్ 6 (Pvt Ads - Priority Ordering):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pvtAds.map((p, idx) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="w-6 h-6 rounded-lg bg-sky-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                          #{p.priorityOrder}
                        </span>
                        <div className="truncate">
                          <div className="font-bold text-white truncate">{p.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{p.clientName}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleMoveAdPriority('pvt_ad', p.id, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveAdPriority('pvt_ad', p.id, 'down')}
                          disabled={idx === pvtAds.length - 1}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Special Ads (6) */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  స్పెషల్ యాడ్స్ 6 (Special Ads - Priority Ordering):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specialAds.map((s, idx) => (
                    <div
                      key={s.id}
                      className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                          #{s.priorityOrder}
                        </span>
                        <div className="truncate">
                          <div className="font-bold text-white truncate">{s.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{s.clientName}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleMoveAdPriority('special_ad', s.id, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveAdPriority('special_ad', s.id, 'down')}
                          disabled={idx === specialAds.length - 1}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: GOOGLE ADSENSE INTEGRATION ==================== */}
          {activeTab === 'adsense' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                <strong>నిబంధన ధృవీకరణ:</strong> గూగుల్ యాడ్సెన్స్ లింక్ మరియు కాన్ఫిగరేషన్ అడ్మిన్ ప్యానల్‌లో మాత్రమే కనిపిస్తుంది. హోమ్‌పేజీ లేఅవుట్ క్లీన్‌గా ఉండేలా హోమ్‌పేజీలో కనిపించదు.
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-semibold mb-1 block">
                      Google AdSense Publisher ID
                    </label>
                    <input
                      type="text"
                      value={localAdSense.publisherId}
                      onChange={(e) =>
                        setLocalAdSense({ ...localAdSense, publisherId: e.target.value })
                      }
                      className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-700 text-amber-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold mb-1 block">
                      Ad Slot ID (Cinema Banner Unit)
                    </label>
                    <input
                      type="text"
                      value={localAdSense.adSlotBannerId}
                      onChange={(e) =>
                        setLocalAdSense({ ...localAdSense, adSlotBannerId: e.target.value })
                      }
                      className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-700 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-400">
                    <input
                      type="checkbox"
                      checked={localAdSense.isEnabled}
                      onChange={(e) =>
                        setLocalAdSense({ ...localAdSense, isEnabled: e.target.checked })
                      }
                      className="rounded text-amber-500"
                    />
                    <span>యాడ్సెన్స్ ఇంటిగ్రేషన్ సక్రియం (Enable AdSense)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-300">
                    <input
                      type="checkbox"
                      checked={localAdSense.testMode}
                      onChange={(e) =>
                        setLocalAdSense({ ...localAdSense, testMode: e.target.checked })
                      }
                      className="rounded text-amber-500"
                    />
                    <span>శాండ్‌బాక్స్ / టెస్ట్ మోడ్</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onUpdateAdSenseConfig(localAdSense);
                    alert('Google AdSense సెట్టింగ్స్ విజయవంతంగా సేవ్ అయ్యాయి!');
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>యాడ్సెన్స్ కాన్ఫిగరేషన్ సేవ్ చేయండి</span>
                </button>
              </div>

              {/* AdSense Live Preview inside Admin */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 text-center space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Google AdSense Live Unit Preview (Admin Inspection Only)
                </span>
                <div className="max-w-xl mx-auto p-6 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                  <p className="font-bold text-amber-400">Google Ads by 24crofts.com</p>
                  <p className="text-[11px] mt-1">Publisher: {localAdSense.publisherId} | Status: Connected</p>
                  <div className="mt-3 p-3 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono text-emerald-400">
                    &lt;script async src=&quot;https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={localAdSense.publisherId}&quot;&gt;&lt;/script&gt;
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: ANALYTICS & REPORTING DASHBOARD ==================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Stat metric cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">మొత్తం టాలెంట్ ప్రొఫైల్స్</span>
                  <p className="text-2xl font-black text-white mt-1">{talentProfiles.length}</p>
                  <span className="text-[10px] text-emerald-400 mt-1 block">24 విభాగాలలో విస్తరించి ఉంది</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">ప్రొడక్షన్ హౌసెస్</span>
                  <p className="text-2xl font-black text-amber-400 mt-1">{productionHouses.length}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">అధికారిక సినిమా బ్యానర్లు</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">VIP చెల్లింపు ప్రొఫైల్స్</span>
                  <p className="text-2xl font-black text-amber-300 mt-1">
                    {talentProfiles.filter((p) => p.isPaid).length}
                  </p>
                  <span className="text-[10px] text-amber-400 mt-1 block">టాప్ ర్యాంక్ పొజిషన్</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">కాంటాక్ట్ అన్లాక్ అభ్యర్థనలు</span>
                  <p className="text-2xl font-black text-emerald-400 mt-1">
                    {contactRequests.length}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {contactRequests.filter((r) => r.status === 'approved').length} ఆమోదించబడ్డాయి
                  </span>
                </div>
              </div>

              {/* Craft Performance Metrics */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  విభాగాల వారిగా వీక్షణలు & ప్రొఫైల్ పనితీరు విశ్లేషణ:
                </h4>
                <div className="space-y-3">
                  {talentProfiles.slice(0, 6).map((p) => (
                    <div key={p.id} className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span className="font-semibold">{p.fullName} ({p.subCategory})</span>
                        <span className="font-mono text-amber-400">{p.viewsCount} వీక్షణలు</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full"
                          style={{ width: `${Math.min(100, (p.viewsCount / 2500) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: HOSTING & SECURITY COST ESTIMATE ==================== */}
          {activeTab === 'hosting' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <h4 className="font-bold text-amber-400 text-sm mb-1">
                  సర్వర్ హోస్టింగ్, డేటాబేస్ ఎన్‌క్రిప్షన్ & మెయింటెనెన్స్ అధికారిక అంచనా వ్యయం
                </h4>
                <p>
                  24crofts.com ప్లాట్‌ఫామ్‌లో 25 ఫోటోలు, యూట్యూబ్ లింకులు, ప్రొడక్షన్ హౌస్ ప్రాజెక్ట్ డాక్యుమెంట్లు మరియు ప్రొటెక్టెడ్ కాంటాక్ట్ నంబర్ల భద్రత కోసం క్లౌడ్ ఇన్‌ఫ్రాస్ట్రక్చర్ ప్రణాళిక క్రింద వివరించబడింది.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {HOSTING_AND_MAINTENANCE_ESTIMATE.map((tier) => (
                  <div
                    key={tier.tierName}
                    className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-bold text-white font-cinema">
                          {tier.tierName}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                          {tier.scale}
                        </span>
                      </div>
                      <p className="text-xs text-amber-400 font-telugu mb-4">
                        {tier.tierNameTe}
                      </p>

                      <div className="text-2xl font-black text-white font-mono mb-4 pb-3 border-b border-slate-800">
                        {tier.monthlyCostInr}{' '}
                        <span className="text-xs font-normal text-slate-400">
                          ({tier.monthlyCostUsd})
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-2 text-xs mb-6">
                        {tier.breakdown.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-1.5 border-b border-slate-800/60"
                          >
                            <span className="text-slate-300">{item.item}</span>
                            <span className="font-mono font-bold text-amber-400">{item.costInr}</span>
                          </div>
                        ))}
                      </div>

                      {/* Security Features */}
                      <div>
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                          డేటాబేస్ & సెక్యూరిటీ ప్రమాణాలు:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {tier.securityFeatures.map((sec, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
          )}
        </div>
      </div>
    </div>
  );
};
