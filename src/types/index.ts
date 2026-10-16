export type CategoryType = 'all' | 'attractions' | 'food' | 'culture' | 'indoor' | 'team-bonding' | 'nature';

export type AudienceType = 'couples' | 'families' | 'friends' | 'corporate' | 'tourists';

export interface Activity {
  id: string;
  name: string;
  category: CategoryType;
  area: string; // e.g., 'Marina Bay', 'Sentosa', 'Chinatown', 'Civic District', 'Changi'
  description: string;
  image: string;
  durationHours: number;
  isIndoor: boolean;
  rainResistant: boolean;
  transitAccess: string; // e.g., 'Bayfront MRT (DT16/CE1) Exit B'
  pricing: {
    standardSGD: number;
    residentSGD?: number;
    childSGD?: number;
    groupDiscountThreshold?: number;
    groupDiscountPercent?: number;
    notes: string;
  };
  highlights: string[];
  recommendedAudiences: AudienceType[];
}

export interface ItineraryStop {
  id: string;
  time: string;
  activityId?: string;
  name: string;
  type: 'activity' | 'meal' | 'transit' | 'break';
  location: string;
  costPerPersonSGD: number;
  isSheltered: boolean;
  notes: string;
}

export interface Itinerary {
  id: string;
  title: string;
  tagline: string;
  targetAudience: AudienceType;
  duration: string;
  estimatedCostPerPax: number;
  isPrimary: boolean;
  matchedSecondaryId?: string; // Links to secondary wet-weather itinerary
  weatherSuitability: 'all-weather' | 'sunny-preferred' | 'rain-contingency';
  shelterPercentage: number;
  stops: ItineraryStop[];
  transportAdvice: string;
  votes: number;
  votedUserIds?: string[];
}

export interface WeatherForecastItem {
  area: string;
  forecast: string;
}

export interface WeatherDataResponse {
  code?: number;
  error?: string;
  message?: string;
  update_timestamp?: string;
  valid_period?: {
    start: string;
    end: string;
  };
  forecasts?: WeatherForecastItem[];
}

export interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;
  dates: {
    start: {
      localDate: string;
      localTime?: string;
    };
  };
  priceRanges?: Array<{
    type: string;
    currency: string;
    min: number;
    max: number;
  }>;
  venues?: Array<{
    name: string;
    city?: { name: string };
  }>;
  images?: Array<{
    url: string;
    ratio?: string;
    width?: number;
  }>;
}

export interface GroupVoteOption {
  itineraryId: string;
  votesCount: number;
  voters: string[];
}

export interface PollState {
  groupName: string;
  partySize: number;
  selectedDate: string;
  votes: Record<string, string[]>; // itineraryId -> array of voter names
  activityVotes: Record<string, Record<string, number>>; // activityId -> { optionName: votes }
}
