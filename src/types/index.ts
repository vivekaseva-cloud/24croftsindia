export type CraftCategory = {
  id: string;
  number: number;
  teluguName: string;
  englishName: string;
  taglineTe: string;
  taglineEn: string;
  iconName: string;
  subCategoriesTe: string[];
  subCategoriesEn: string[];
  isCastingDept?: boolean;
};

export type CastingDetails = {
  fullName: string;
  screenName: string;
  age: number | string;
  city: string;
  height: string;
  weight: string;
  bust: string;
  waist: string;
  hip: string;
  skinTone: string;
  eyeColour: string;
  hairColour: string;
  shoeSize: string;
  maritalStatus: string;
  presentProfession: string;
  education: string;
  dressesComfortable: string;
  openForOutstationShoots: boolean;
  openForOutOfCountryShoots: boolean;
  passport: string; // e.g., 'Yes (Valid)', 'In Process', 'No'
  experience: string;
  comfortableWithAllTimings: boolean;
  languages: string[];
  aim: string;
  instagramId: string;
  interestedIn: {
    acting: boolean;
    printShoots: boolean;
    rampShows: boolean;
    designerShoots: boolean;
    ethnicWears: boolean;
    westernWears: boolean;
    bikiniShoots: boolean;
    lingerieShoots: boolean;
    swimSuit: boolean;
    calendarShoots: boolean;
    musicAlbums: boolean;
    seminude: boolean;
    nudeShoots: boolean;
    bodyPaintShoots: boolean;
  };
  comfortableWith: {
    onScreenKiss: boolean;
    loveMaking: boolean;
    hugScenes: boolean;
    lipLockScenes: boolean;
    indianWears: boolean;
    westernWears: boolean;
    skirts: boolean;
    bikini: boolean;
    shorts: boolean;
    boldScenes: boolean;
    smokingScenesOnScreen: boolean;
    drinkingScenesOnScreen: boolean;
    drivingScenes: boolean;
    ableToWorkIndoorAndOutdoor: boolean;
    allergiesToDustOrCosmetics: string;
  };
};

export type TalentProfile = {
  id: string; // Unique ID, e.g., "24C-ACT-1001"
  username: string;
  passwordHash: string; // displayed/editable by Admin
  fullName: string;
  screenName: string;
  craftId: string;
  subCategory: string;
  industry: string[]; // Tollywood, Kollywood, Bollywood, etc.
  languages: string[];
  aadhaarNumber: string; // e.g. "5489 1234 5678"
  mobile: string;
  email: string;
  emergencyContact: string;
  city: string;
  state: string;
  address: string;
  experienceYears: number | string;
  bio: string;
  isPaid: boolean; // Paid profile gets top placement!
  isVerified: boolean;
  status: 'approved' | 'pending' | 'rejected';
  uploadDate: string; // ISO date for daily priority
  viewsCount: number;
  photoUrls: string[]; // up to 25 photos
  youtubeLinks: string[]; // unlimited youtube links
  castingDetails?: CastingDetails;
};

export type ProductionHouse = {
  id: string; // e.g., "24C-PH-501"
  username: string;
  passwordHash: string;
  bannerName: string;
  productionHouseName: string;
  regNumber: string;
  contactPerson: string;
  designation: string;
  email: string;
  mobile: string;
  officeAddress: string;
  city: string;
  industry: string[];
  aadhaarNumber: string;
  movieProjectFileName?: string;
  movieProjectFileUrl?: string;
  status: 'approved' | 'pending' | 'rejected';
  registrationDate: string;
};

export type ContactRequest = {
  id: string;
  productionHouseId: string;
  productionHouseName: string;
  talentProfileId: string;
  talentName: string;
  talentCraft: string;
  talentMobile: string;
  talentEmail: string;
  requestDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  adminDecisionDate?: string;
};

export type AdItem = {
  id: string;
  type: 'movie_teaser' | 'pvt_ad' | 'special_ad';
  title: string;
  subtitle: string;
  bannerUrl: string;
  youtubeUrl: string;
  targetUrl: string;
  priorityOrder: number; // 1 to 6 (Admin can re-order)
  status: 'approved' | 'pending' | 'rejected';
  clientName: string;
  contactPhone: string;
  createdDate: string;
};

export type AdSenseConfig = {
  publisherId: string; // e.g. "ca-pub-7989144860242424"
  adSlotBannerId: string;
  adSlotSidebarId: string;
  isEnabled: boolean;
  testMode: boolean;
  notes: string;
};

export type Language = 'te' | 'en';
