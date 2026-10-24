import { TalentProfile, ContactRequest } from '../types';

export interface UserSession {
  role: 'guest' | 'talent' | 'production_house' | 'admin';
  id?: string;
  name?: string;
  bannerName?: string;
}

export function generateProfileId(craftId: string, count: number): string {
  const prefixMap: Record<string, string> = {
    direction: 'DIR',
    'script-writers': 'SCR',
    actors: 'ACT',
    'junior-artists': 'JNR',
    'dubbing-artists': 'DUB',
    cinematography: 'CAM',
    'outdoor-lightman': 'LGT',
    'outdoor-technicians': 'GRP',
    'still-photographer': 'STL',
    'art-department': 'ART',
    'studio-workers': 'STW',
    'costume-designers': 'CST',
    'makeup-department': 'MKP',
    'stunt-action': 'STN',
    'dance-choreography': 'DNC',
    'editing-department': 'EDT',
    'sound-design': 'SND',
    'music-department': 'MUS',
    'production-management': 'MGT',
    'junior-artist-agents': 'AGT',
    'production-assistants': 'AST',
    'production-women': 'WMN',
    'cinema-drivers': 'DRV',
    'publicity-designers': 'PUB',
  };

  const code = prefixMap[craftId] || 'CRF';
  const paddedNumber = String(1000 + count).padStart(4, '0');
  return `24C-${code}-${paddedNumber}`;
}

export function maskAadhaar(aadhaar: string, isAdmin = false): string {
  if (!aadhaar) return 'Aadhaar Not Provided';
  if (isAdmin) return aadhaar;
  const cleaned = aadhaar.replace(/\s+/g, '');
  if (cleaned.length < 4) return 'XXXX-XXXX-XXXX';
  const lastFour = cleaned.slice(-4);
  return `XXXX-XXXX-${lastFour}`;
}

export function maskPhoneNumber(phone: string): string {
  if (!phone) return '';
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length < 4) return 'XXXXXX';
  return `${clean.slice(0, 2)}XXXXXX${clean.slice(-2)}`;
}

export function canViewFullContact(
  talentProfileId: string,
  session: UserSession | null,
  approvedRequests: ContactRequest[]
): { allowed: boolean; reason: string } {
  // 1. Admin always has full access
  if (session?.role === 'admin') {
    return { allowed: true, reason: 'Admin Access Granted' };
  }

  // 2. Talent viewing their own profile
  if (session?.role === 'talent' && session.id === talentProfileId) {
    return { allowed: true, reason: 'Own Profile Access' };
  }

  // 3. Production House checking if Admin approved their request
  if (session?.role === 'production_house' && session.id) {
    const isApproved = approvedRequests.some(
      (req) =>
        req.productionHouseId === session.id &&
        req.talentProfileId === talentProfileId &&
        req.status === 'approved'
    );

    if (isApproved) {
      return { allowed: true, reason: 'Admin Verified & Approved Access' };
    }

    const isPending = approvedRequests.some(
      (req) =>
        req.productionHouseId === session.id &&
        req.talentProfileId === talentProfileId &&
        req.status === 'pending'
    );

    if (isPending) {
      return {
        allowed: false,
        reason: 'Contact Request Pending Admin Approval',
      };
    }

    return {
      allowed: false,
      reason: 'Admin Permission Required. Click Request Contact Access.',
    };
  }

  // 4. Guest or unverified user
  return {
    allowed: false,
    reason: 'Restricted: Production House Login & Admin Authorization Required.',
  };
}

export function filterAndSortProfiles(
  profiles: TalentProfile[],
  options: {
    query?: string;
    craftId?: string;
    subCategory?: string;
    industry?: string;
    onlyPaid?: boolean;
    onlyVerified?: boolean;
    city?: string;
  }
): TalentProfile[] {
  const { query, craftId, subCategory, industry, onlyPaid, onlyVerified, city } = options;

  let filtered = [...profiles];

  if (query && query.trim() !== '') {
    const q = query.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.id.toLowerCase().includes(q) ||
        p.fullName.toLowerCase().includes(q) ||
        p.screenName.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.languages.some((l) => l.toLowerCase().includes(q))
    );
  }

  if (craftId && craftId !== 'all') {
    filtered = filtered.filter((p) => p.craftId === craftId);
  }

  if (subCategory && subCategory !== 'all') {
    filtered = filtered.filter((p) => p.subCategory === subCategory);
  }

  if (industry && industry !== 'all') {
    filtered = filtered.filter((p) => p.industry.includes(industry));
  }

  if (onlyPaid) {
    filtered = filtered.filter((p) => p.isPaid);
  }

  if (onlyVerified) {
    filtered = filtered.filter((p) => p.isVerified);
  }

  if (city && city !== 'all') {
    filtered = filtered.filter((p) => p.city.toLowerCase() === city.toLowerCase());
  }

  // Sorting:
  // 1. Paid profiles come first ("మనం మొదట చెల్లింపు ప్రొఫైల్లను చూపించాలి")
  // 2. Newest registrations / daily uploads come next ("హోమ్ పేజీలో కొత్త ప్రొఫైల్స్ మొదట కనిపించాలి... రోజువారీ అప్లోడ్లకు మొదటి ప్రాధాన్యత ఇవ్వాలి")
  filtered.sort((a, b) => {
    if (a.isPaid && !b.isPaid) return -1;
    if (!a.isPaid && b.isPaid) return 1;

    const dateA = new Date(a.uploadDate).getTime();
    const dateB = new Date(b.uploadDate).getTime();
    return dateB - dateA;
  });

  return filtered;
}
