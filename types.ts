
export type ScreenName = 
  | 'COMMAND' 
  | 'THE_MOVE' 
  | 'THE_GRIND' 
  | 'THE_STASH' 
  | 'UPGRADES' 
  | 'SHARK_TANK' 
  | 'RECEIPTS'
  | 'PROFILE';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  phone?: string;
  created_at?: string;
}

export interface HouseRoommate {
  id: number;
  house_id: number;
  user_id: string;
  state: 'PENDING INVITATION' | 'ROOMATE';
  created_at?: string;
}

export interface Roommate {
  id: string;
  name: string;
  avatar: string; // URL
  status: 'ONLINE' | 'ASLEEP' | 'WORKING' | 'GAMING' | 'OUT';
  contributionScore: number;
  balance: number; // For poker/savings
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  type: 'PARTY' | 'HANGOUT' | 'SPORTS' | 'GUEST';
  bgImage: string;
}

export interface Bounty {
  id: string;
  title: string;
  xp: number;
  assignedTo?: string; // Roommate ID
}

export interface UpgradeItem {
  id: string;
  title: string;
  votes: number;
  status: 'WISHLIST' | 'FUNDING' | 'IN_PROGRESS' | 'DONE';
  cost?: number;
}

export interface PokerSession {
  date: string;
  winner: string;
  loser: string;
  net: Record<string, number>;
}
