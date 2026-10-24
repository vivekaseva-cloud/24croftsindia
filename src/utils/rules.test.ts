import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateProfileId,
  maskAadhaar,
  maskPhoneNumber,
  canViewFullContact,
  filterAndSortProfiles,
  UserSession,
} from './securityAndId';
import { TalentProfile, ContactRequest } from '../types';

test('generateProfileId creates formatted 24 Crafts ID', () => {
  const dirId = generateProfileId('direction', 1);
  assert.equal(dirId, '24C-DIR-1001');

  const actId = generateProfileId('actors', 45);
  assert.equal(actId, '24C-ACT-1045');
});

test('maskAadhaar shields sensitive government ID except for admin', () => {
  const raw = '5489 1234 5678';
  assert.equal(maskAadhaar(raw, false), 'XXXX-XXXX-5678');
  assert.equal(maskAadhaar(raw, true), '5489 1234 5678');
});

test('maskPhoneNumber shields contact digits for unauthorized users', () => {
  assert.equal(maskPhoneNumber('7989144860'), '79XXXXXX60');
});

test('canViewFullContact enforces strict matrimony-style admin permission', () => {
  const talentId = '24C-ACT-1001';
  const approvedRequests: ContactRequest[] = [
    {
      id: 'req-1',
      productionHouseId: 'ph-mythri',
      productionHouseName: 'Mythri Movie Makers',
      talentProfileId: talentId,
      talentName: 'Kalyan Varma',
      talentCraft: 'actors',
      talentMobile: '9988776655',
      talentEmail: 'kalyan@actor.com',
      requestDate: '2026-10-20',
      reason: 'Feature Film Casting',
      status: 'approved',
    },
  ];

  // Guest cannot view
  const guestResult = canViewFullContact(talentId, null, approvedRequests);
  assert.equal(guestResult.allowed, false);

  // Unapproved PH cannot view
  const unapprovedSession: UserSession = { role: 'production_house', id: 'ph-other', name: 'Other Banner' };
  const deniedResult = canViewFullContact(talentId, unapprovedSession, approvedRequests);
  assert.equal(deniedResult.allowed, false);

  // Approved PH CAN view
  const approvedSession: UserSession = { role: 'production_house', id: 'ph-mythri', name: 'Mythri Movie Makers' };
  const approvedResult = canViewFullContact(talentId, approvedSession, approvedRequests);
  assert.equal(approvedResult.allowed, true);

  // Admin ALWAYS can view
  const adminSession: UserSession = { role: 'admin', id: 'admin', name: 'Super Admin' };
  const adminResult = canViewFullContact(talentId, adminSession, approvedRequests);
  assert.equal(adminResult.allowed, true);
});

test('filterAndSortProfiles ranks Paid profiles first, then latest daily uploads', () => {
  const dummyProfiles: TalentProfile[] = [
    {
      id: '24C-ACT-1',
      username: 'user1',
      passwordHash: 'pass1',
      fullName: 'Actor Free Old',
      screenName: 'FreeOld',
      craftId: 'actors',
      subCategory: 'Lead Hero',
      industry: ['Tollywood'],
      languages: ['Telugu'],
      aadhaarNumber: '1111 2222 3333',
      mobile: '9123456780',
      email: 'freeold@test.com',
      emergencyContact: '9123456781',
      city: 'Hyderabad',
      state: 'Telangana',
      address: 'Jubilee Hills',
      experienceYears: 5,
      bio: 'Experienced artist',
      isPaid: false,
      isVerified: true,
      status: 'approved',
      uploadDate: '2026-10-15T10:00:00Z',
      viewsCount: 120,
      photoUrls: [],
      youtubeLinks: [],
    },
    {
      id: '24C-ACT-2',
      username: 'user2',
      passwordHash: 'pass2',
      fullName: 'Actor Free New',
      screenName: 'FreeNew',
      craftId: 'actors',
      subCategory: 'Lead Hero',
      industry: ['Tollywood'],
      languages: ['Telugu'],
      aadhaarNumber: '2222 3333 4444',
      mobile: '9123456782',
      email: 'freenew@test.com',
      emergencyContact: '9123456783',
      city: 'Hyderabad',
      state: 'Telangana',
      address: 'Madhapur',
      experienceYears: 2,
      bio: 'New talent',
      isPaid: false,
      isVerified: true,
      status: 'approved',
      uploadDate: '2026-10-23T08:00:00Z',
      viewsCount: 50,
      photoUrls: [],
      youtubeLinks: [],
    },
    {
      id: '24C-ACT-3',
      username: 'user3',
      passwordHash: 'pass3',
      fullName: 'Actor Paid Star',
      screenName: 'PaidStar',
      craftId: 'actors',
      subCategory: 'Lead Hero',
      industry: ['Tollywood'],
      languages: ['Telugu', 'Hindi'],
      aadhaarNumber: '3333 4444 5555',
      mobile: '9123456784',
      email: 'paidstar@test.com',
      emergencyContact: '9123456785',
      city: 'Hyderabad',
      state: 'Telangana',
      address: 'Film Nagar',
      experienceYears: 8,
      bio: 'Paid premium artist',
      isPaid: true,
      isVerified: true,
      status: 'approved',
      uploadDate: '2026-10-20T12:00:00Z',
      viewsCount: 400,
      photoUrls: [],
      youtubeLinks: [],
    },
  ];

  const sorted = filterAndSortProfiles(dummyProfiles, {});

  // The Paid profile MUST be first:
  assert.equal(sorted[0].id, '24C-ACT-3');
  // Between the non-paid, the newer one (uploadDate 2026-10-23) MUST be second:
  assert.equal(sorted[1].id, '24C-ACT-2');
  // The older one (uploadDate 2026-10-15) MUST be last:
  assert.equal(sorted[2].id, '24C-ACT-1');
});
