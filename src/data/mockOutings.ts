import { Activity, Itinerary } from '../types/index.ts';

export const SINGAPORE_ACTIVITIES: Activity[] = [
  {
    id: 'gardens-by-the-bay',
    name: 'Gardens by the Bay (Flower Dome & Cloud Forest)',
    category: 'attractions',
    area: 'Marina Bay',
    description: 'World-renowned architectural glass biodomes housing the misty 35m Cloud Mountain waterfall and exotic Mediterranean floral displays.',
    image: '/src/assets/images/singapore_cloud_forest_1792135381952.jpg',
    durationHours: 3.5,
    isIndoor: true,
    rainResistant: true,
    transitAccess: 'Bayfront MRT (DT16 / CE1) Exit B via underground link',
    pricing: {
      standardSGD: 32.0,
      residentSGD: 20.0,
      childSGD: 15.0,
      groupDiscountThreshold: 10,
      groupDiscountPercent: 12,
      notes: 'Singapore Citizens & PRs enjoy local concession. Fully climate-controlled & sheltered.'
    },
    highlights: ['35-metre indoor waterfall', 'Mist walkway sky bridge', '100% sheltered against rain'],
    recommendedAudiences: ['couples', 'families', 'tourists', 'corporate']
  },
  {
    id: 'marina-skyline-promenade',
    name: 'Marina Bay Waterfront & Supertree Grove',
    category: 'attractions',
    area: 'Marina Bay',
    description: 'Evening scenic stroll along the Marina Bay promenade catching the skyline reflection and free Garden Rhapsody light & sound show.',
    image: '/src/assets/images/singapore_skyline_hero_1792135348759.jpg',
    durationHours: 2.0,
    isIndoor: false,
    rainResistant: false,
    transitAccess: 'Bayfront MRT (DT16 / CE1) or Promenade MRT (CC4 / DT15)',
    pricing: {
      standardSGD: 0.0,
      residentSGD: 0.0,
      notes: 'Free public access outdoor promenade. OCBC Skyway optional at $14/pax.'
    },
    highlights: ['Free Garden Rhapsody show at 7:45pm & 8:45pm', 'Marina Bay skyline backdrop', 'Spectacular sunset photos'],
    recommendedAudiences: ['couples', 'friends', 'tourists']
  },
  {
    id: 'sentosa-adventure-luge',
    name: 'Sentosa Skyline Luge & Cable Car Sky Pass',
    category: 'attractions',
    area: 'Sentosa',
    description: 'Fly high over the jungle canopy in scenic cable cars, then gravity-steer down purpose-built downhill luge tracks overlooking Siloso Beach.',
    image: '/src/assets/images/singapore_sentosa_fun_1792135397989.jpg',
    durationHours: 3.0,
    isIndoor: false,
    rainResistant: false,
    transitAccess: 'HarbourFront MRT (NE1 / CC29) to Sentosa Express or Cable Car Mount Faber Line',
    pricing: {
      standardSGD: 34.0,
      residentSGD: 28.0,
      childSGD: 24.0,
      groupDiscountThreshold: 8,
      groupDiscountPercent: 15,
      notes: '3-ride combo ticket. Rides suspend temporarily during lightning warnings.'
    },
    highlights: ['4 distinct downhill tracks', 'Night luge with neon lighting', 'Panoramic harbour views'],
    recommendedAudiences: ['friends', 'corporate', 'families']
  },
  {
    id: 'maxwell-laupasat-hawker',
    name: 'Maxwell & Lau Pa Sat Heritage Hawker Feast',
    category: 'food',
    area: 'Chinatown / CBD',
    description: 'Taste authentic Singapore culinary staples: Michelin Bib Gourmand Hainanese Chicken Rice, piping hot Laksa, freshly grilled Satay, and sugarcane juice.',
    image: '/src/assets/images/singapore_hawker_feast_1792135365809.jpg',
    durationHours: 1.5,
    isIndoor: true,
    rainResistant: true,
    transitAccess: 'Maxwell MRT (TE18) Exit 1 or Telok Ayer MRT (DT18)',
    pricing: {
      standardSGD: 12.0,
      residentSGD: 12.0,
      notes: 'Average $8 - $16 per person for main course, drink and shared satay.'
    },
    highlights: ['Tian Tian Hainanese Chicken Rice', 'Lau Pa Sat Satay Street open-air buzz', 'Budget-friendly authentic dining'],
    recommendedAudiences: ['couples', 'families', 'friends', 'corporate', 'tourists']
  },
  {
    id: 'artscience-museum-future-world',
    name: 'ArtScience Museum (Future World Exhibition)',
    category: 'indoor',
    area: 'Marina Bay',
    description: 'Immersive digital interactive art installation created with teamLab. 16 high-tech installations with light projection, digital slide, and crystal universe.',
    image: '/src/assets/images/singapore_cloud_forest_1792135381952.jpg',
    durationHours: 2.0,
    isIndoor: true,
    rainResistant: true,
    transitAccess: 'Bayfront MRT (DT16 / CE1) via Shoppes at Marina Bay Sands link',
    pricing: {
      standardSGD: 25.0,
      residentSGD: 20.0,
      childSGD: 18.0,
      notes: 'Fully air-conditioned indoor experience inside the iconic lotus building.'
    },
    highlights: ['Crystal Universe photo tunnel', 'teamLab interactive projections', 'Zero wet-weather risk'],
    recommendedAudiences: ['couples', 'families', 'tourists']
  },
  {
    id: 'national-gallery-singapore',
    name: 'National Gallery Singapore & Underground Art Link',
    category: 'culture',
    area: 'Civic District',
    description: 'Southeast Asia’s largest modern art collection housed within the restored historic City Hall and former Supreme Court, connected by subterranean concourses.',
    image: '/src/assets/images/singapore_skyline_hero_1792135348759.jpg',
    durationHours: 2.5,
    isIndoor: true,
    rainResistant: true,
    transitAccess: 'City Hall MRT (NS25 / EW13) Exit B with covered walkway',
    pricing: {
      standardSGD: 20.0,
      residentSGD: 0.0,
      notes: 'General admission is completely FREE for Singapore Citizens and Permanent Residents.'
    },
    highlights: ['Free admission for Singaporeans/PRs', 'Rooftop viewing deck of Padang & Marina skyline', 'Extensive sheltered corridors'],
    recommendedAudiences: ['couples', 'families', 'tourists', 'corporate']
  },
  {
    id: 'jewel-changi-rain-vortex',
    name: 'Jewel Changi (HSBC Rain Vortex & Canopy Park)',
    category: 'indoor',
    area: 'Changi',
    description: 'The world’s tallest 40-metre indoor waterfall surrounded by 4 storeys of verdant subtropical forest valley, canopy sky bridge, and bouncing nets under glass.',
    image: '/src/assets/images/singapore_cloud_forest_1792135381952.jpg',
    durationHours: 3.0,
    isIndoor: true,
    rainResistant: true,
    transitAccess: 'Changi Airport MRT (CG2) linked directly via sheltered Terminal 1/2/3 link bridges',
    pricing: {
      standardSGD: 8.0,
      residentSGD: 6.0,
      notes: 'Rain Vortex viewing is Free. Canopy Park entry is $6-$8/pax with attraction add-ons.'
    },
    highlights: ['World tallest indoor waterfall', '100% sheltered & air-conditioned', 'Over 280 dining and retail options'],
    recommendedAudiences: ['families', 'tourists', 'friends', 'couples']
  },
  {
    id: 'suntec-indoor-team-quest',
    name: 'Suntec City Indoor Team Bonding & Escape Adventure',
    category: 'team-bonding',
    area: 'City / Suntec',
    description: 'Corporate team bonding escape challenge, bowling tournament, and dining hub connected to underground MRT pedestrian concourse.',
    image: '/src/assets/images/singapore_sentosa_fun_1792135397989.jpg',
    durationHours: 3.0,
    isIndoor: true,
    rainResistant: true,
    transitAccess: 'Promenade MRT (CC4 / DT15) & Esplanade MRT (CC3) direct mall link',
    pricing: {
      standardSGD: 38.0,
      residentSGD: 35.0,
      groupDiscountThreshold: 12,
      groupDiscountPercent: 20,
      notes: 'Includes escape game room entry + shared appetizers. Corporate receipt provided.'
    },
    highlights: ['Corporate invoice ready', 'Full indoor air-con facility', 'Collaborative team puzzle solving'],
    recommendedAudiences: ['corporate', 'friends']
  }
];

// Matched Primary (Fair Weather) and Secondary (Wet Weather Contingency) Itineraries
export const CURATED_ITINERARIES: Itinerary[] = [
  {
    id: 'itin-marina-fair',
    title: 'Marina Bay Waterfront & Supertree Twilight Walk',
    tagline: 'Iconic open-air Singapore: waterfront promenade, Helix Bridge, and Supertree Grove',
    targetAudience: 'tourists',
    duration: '5 hours',
    estimatedCostPerPax: 48.0,
    isPrimary: true,
    matchedSecondaryId: 'itin-marina-rain',
    weatherSuitability: 'sunny-preferred',
    shelterPercentage: 45,
    stops: [
      {
        id: 'stop-1',
        time: '3:30 PM',
        name: 'Gardens by the Bay Flower Dome',
        type: 'activity',
        location: 'Gardens by the Bay',
        costPerPersonSGD: 20.0,
        isSheltered: true,
        notes: 'Explore climate-controlled floral displays.'
      },
      {
        id: 'stop-2',
        time: '5:30 PM',
        name: 'Helix Bridge & Marina Bay Promenade Walk',
        type: 'activity',
        location: 'Marina Centre to Bayfront',
        costPerPersonSGD: 0.0,
        isSheltered: false,
        notes: 'Open outdoor pedestrian bridge with stunning city skyline views.'
      },
      {
        id: 'stop-3',
        time: '6:45 PM',
        name: 'Makansutra Gluttons Bay Hawker Dinner',
        type: 'meal',
        location: 'Esplanade Mall Outdoor Food Street',
        costPerPersonSGD: 16.0,
        isSheltered: false,
        notes: 'Outdoor alfresco dining overlooking the Marina Bay Sands light reflection.'
      },
      {
        id: 'stop-4',
        time: '7:45 PM',
        name: 'Supertree Grove Garden Rhapsody Light Show',
        type: 'activity',
        location: 'Supertree Grove',
        costPerPersonSGD: 0.0,
        isSheltered: false,
        notes: 'Lie on the open grass lawn to watch musical synchronized lights.'
      },
      {
        id: 'stop-5',
        time: '9:00 PM',
        name: 'Marina Bay Waterfront Cocktail or Dessert',
        type: 'break',
        location: 'OverEasy or Level33 Promenade',
        costPerPersonSGD: 12.0,
        isSheltered: true,
        notes: 'Unwind by the bay.'
      }
    ],
    transportAdvice: 'MRT Bayfront Station (CE1/DT16). Bring sun protection or light umbrella.',
    votes: 42
  },
  {
    id: 'itin-marina-rain',
    title: 'Marina Bay Sheltered Cultural Trail (Wet Weather Contingency)',
    tagline: '100% weather-proof contingency: ArtScience Museum, Shoppes subterranean links, and Cloud Dome',
    targetAudience: 'tourists',
    duration: '5 hours',
    estimatedCostPerPax: 52.0,
    isPrimary: false,
    matchedSecondaryId: 'itin-marina-fair',
    weatherSuitability: 'rain-contingency',
    shelterPercentage: 100,
    stops: [
      {
        id: 'stop-r1',
        time: '3:30 PM',
        name: 'Gardens by the Bay Cloud Forest Biodome',
        type: 'activity',
        location: 'Gardens by the Bay',
        costPerPersonSGD: 20.0,
        isSheltered: true,
        notes: 'Step directly from Bayfront underground MRT exit B into enclosed biodome.'
      },
      {
        id: 'stop-r2',
        time: '5:30 PM',
        name: 'ArtScience Museum Future World (teamLab)',
        type: 'activity',
        location: 'Shoppes at Marina Bay Sands',
        costPerPersonSGD: 22.0,
        isSheltered: true,
        notes: 'Walk through air-conditioned Shoppes subterranean link without a single raindrop.'
      },
      {
        id: 'stop-r3',
        time: '7:15 PM',
        name: 'Rasapura Masters Indoor Gourmet Hawker Feast',
        type: 'meal',
        location: 'Marina Bay Sands B2 Food Hall',
        costPerPersonSGD: 18.0,
        isSheltered: true,
        notes: 'Air-conditioned indoor hawker stalls: Bak Kut Teh, Char Kway Teow, and beef noodles.'
      },
      {
        id: 'stop-r4',
        time: '8:45 PM',
        name: 'Rain Oculus & Digital Light Canvas Show',
        type: 'activity',
        location: 'Marina Bay Sands Interior Mall',
        costPerPersonSGD: 0.0,
        isSheltered: true,
        notes: 'Watch 6,000 gallons of water whirlpool through the indoor glass skylight vortex.'
      }
    ],
    transportAdvice: 'Utilize MRT Bayfront station (DT16/CE1) direct underground concourses connecting Marina Bay Sands and Gardens by the Bay.',
    votes: 38
  },
  {
    id: 'itin-sentosa-fair',
    title: 'Sentosa Sun & Thrill Outdoor Island Day',
    tagline: 'Outdoor coastal adventure: Cable Car over the harbour, Skyline Luge, and beach club chill',
    targetAudience: 'friends',
    duration: '6 hours',
    estimatedCostPerPax: 68.0,
    isPrimary: true,
    matchedSecondaryId: 'itin-sentosa-rain',
    weatherSuitability: 'sunny-preferred',
    shelterPercentage: 35,
    stops: [
      {
        id: 'stop-s1',
        time: '1:00 PM',
        name: 'Mount Faber Cable Car Harbour Crossing',
        type: 'activity',
        location: 'Mount Faber to Sentosa',
        costPerPersonSGD: 28.0,
        isSheltered: true,
        notes: 'Aerial views of Keppel Bay and tropical coastline.'
      },
      {
        id: 'stop-s2',
        time: '2:30 PM',
        name: 'Skyline Luge 3-Ride Downhill Race',
        type: 'activity',
        location: 'Imbiah Lookout to Siloso Beach',
        costPerPersonSGD: 30.0,
        isSheltered: false,
        notes: 'Outdoor gravity downhill cart racing with sea breezes.'
      },
      {
        id: 'stop-s3',
        time: '5:00 PM',
        name: 'Siloso Beach Walk & Coastal Refreshment',
        type: 'break',
        location: 'Siloso Beach',
        costPerPersonSGD: 10.0,
        isSheltered: false,
        notes: 'Sandy barefoot walk and coconut drink.'
      }
    ],
    transportAdvice: 'HarbourFront MRT to Sentosa Express or Cable Car. Outdoor ride operation subject to sunny weather.',
    votes: 35
  },
  {
    id: 'itin-sentosa-rain',
    title: 'Sentosa Indoor Wonders & S.E.A. Ocean Sanctuary',
    tagline: '100% sheltered Sentosa contingency: S.E.A. Aquarium, Trickeye Museum & Resorts World concourse',
    targetAudience: 'friends',
    duration: '6 hours',
    estimatedCostPerPax: 64.0,
    isPrimary: false,
    matchedSecondaryId: 'itin-sentosa-fair',
    weatherSuitability: 'rain-contingency',
    shelterPercentage: 100,
    stops: [
      {
        id: 'stop-sr1',
        time: '1:00 PM',
        name: 'S.E.A. Aquarium Deep Ocean Tunnel',
        type: 'activity',
        location: 'Resorts World Sentosa B1',
        costPerPersonSGD: 39.0,
        isSheltered: true,
        notes: 'Home to 100,000 marine animals and giant manta ray habitat inside climate-controlled dome.'
      },
      {
        id: 'stop-sr2',
        time: '3:45 PM',
        name: 'Malaysian Food Street Feast',
        type: 'meal',
        location: 'Resorts World Sentosa Waterfront (Indoor)',
        costPerPersonSGD: 15.0,
        isSheltered: true,
        notes: 'Recreated vintage Penang & Melaka street hawker stalls with air conditioning.'
      },
      {
        id: 'stop-sr3',
        time: '5:30 PM',
        name: 'Illumination & Indoor VR / Arcade Lounge',
        type: 'activity',
        location: 'Resorts World Sentosa Concourse',
        costPerPersonSGD: 10.0,
        isSheltered: true,
        notes: 'Full covered connectivity without encountering thunderstorms.'
      }
    ],
    transportAdvice: 'HarbourFront MRT -> Sentosa Express to Resorts World Station. Direct sheltered basement concourse.',
    votes: 29
  },
  {
    id: 'itin-corp-bonding',
    title: 'Civic District Team Bonding & Heritage Food Quest',
    tagline: 'Curated corporate escape: team scavenger puzzle at National Gallery & Lau Pa Sat feast',
    targetAudience: 'corporate',
    duration: '4.5 hours',
    estimatedCostPerPax: 42.0,
    isPrimary: true,
    weatherSuitability: 'all-weather',
    shelterPercentage: 85,
    stops: [
      {
        id: 'stop-c1',
        time: '2:00 PM',
        name: 'National Gallery Team Scavenger Challenge',
        type: 'activity',
        location: 'City Hall & Supreme Court Wing',
        costPerPersonSGD: 15.0,
        isSheltered: true,
        notes: 'Team photo mission across historical courtroom hallways and Rotunda dome.'
      },
      {
        id: 'stop-c2',
        time: '4:30 PM',
        name: 'Underground Pedestrian Trail to Marina Square',
        type: 'transit',
        location: 'City Hall Underground CityLink Mall',
        costPerPersonSGD: 0.0,
        isSheltered: true,
        notes: '1.2km subterranean air-conditioned link connecting civic landmarks.'
      },
      {
        id: 'stop-c3',
        time: '6:00 PM',
        name: 'Lau Pa Sat Satay Street Group Banquet',
        type: 'meal',
        location: 'Boon Tat Street / Lau Pa Sat',
        costPerPersonSGD: 25.0,
        isSheltered: true,
        notes: 'Reserved shared satay platters, chicken wings, sambal stingray, and drinks.'
      }
    ],
    transportAdvice: 'City Hall MRT (NS25/EW13) and Raffles Place MRT (NS26/EW14). Rain-resistant pedestrian networks.',
    votes: 51
  }
];
