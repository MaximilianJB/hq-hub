import { Roommate, Bounty, UpgradeItem, PokerSession, Event } from './types';

export const ROOMMATES: Roommate[] = [
  { id: '1', name: 'Kyle', avatar: 'https://picsum.photos/id/1005/200/200', status: 'GAMING', contributionScore: 1250, balance: 450 },
  { id: '2', name: 'Matt', avatar: 'https://picsum.photos/id/1012/200/200', status: 'WORKING', contributionScore: 400, balance: -120 },
  { id: '3', name: 'Dave', avatar: 'https://picsum.photos/id/1025/200/200', status: 'OUT', contributionScore: 850, balance: 50 },
  { id: '4', name: 'Sarah', avatar: 'https://picsum.photos/id/1027/200/200', status: 'ASLEEP', contributionScore: 1100, balance: 210 },
];

export const EVENTS: Event[] = [
  { id: '1', title: 'MNF Football', date: 'Tonight', time: '8:00 PM', location: '@ The Pub', attendees: 3, type: 'SPORTS', bgImage: 'https://picsum.photos/id/1050/600/400' },
  { id: '2', title: 'Pre-game @ HQ', date: 'Friday', time: '9:00 PM', location: 'Living Room', attendees: 12, type: 'PARTY', bgImage: 'https://picsum.photos/id/433/600/400' },
  { id: '3', title: 'Dave\'s Hinge Date', date: 'Saturday', time: '10:00 AM', location: 'Kitchen', attendees: 2, type: 'GUEST', bgImage: 'https://picsum.photos/id/338/600/400' },
];

export const BOUNTIES: Bounty[] = [
  { id: '1', title: 'Trash Run (Overflowing)', xp: 150 },
  { id: '2', title: 'Scrub the Shower', xp: 500 },
  { id: '3', title: 'Kitchen Reset', xp: 300 },
  { id: '4', title: 'Sort Recycling', xp: 100 },
];

export const UPGRADES: UpgradeItem[] = [
  { id: '1', title: 'Neon Sign for Living Room', votes: 12, status: 'WISHLIST', cost: 150 },
  { id: '2', title: 'Espresso Machine', votes: 8, status: 'WISHLIST', cost: 600 },
  { id: '3', title: 'Bar Cart Build', votes: 20, status: 'IN_PROGRESS', cost: 200 },
  { id: '4', title: 'Mesh Router System', votes: 4, status: 'DONE', cost: 300 },
];

export const POKER_DATA = [
  { name: 'Week 1', Kyle: 50, Matt: -50, Dave: 20, Sarah: -20 },
  { name: 'Week 2', Kyle: 120, Matt: -100, Dave: -30, Sarah: 10 },
  { name: 'Week 3', Kyle: 200, Matt: -150, Dave: 0, Sarah: -50 },
  { name: 'Week 4', Kyle: 450, Matt: -300, Dave: 50, Sarah: -200 },
];

export const TICKER_ITEMS = [
  "Kyle owes the swear jar $5.",
  "Internet bill is paid.",
  "Trash pickup is tomorrow morning.",
  "Who ate the leftover pizza?",
  "Quiet hours start at 2 AM.",
];