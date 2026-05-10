// ============================================================
// ALL DUMMY DATA — import from here, never hardcode elsewhere
// ============================================================

export const delay = (ms = 600) => new Promise(res => setTimeout(res, ms));

export const MOCK_USER = {
  id: 'user-1',
  firstName: 'Elena',
  lastName: 'Rodriguez',
  email: 'elena@example.com',
  password: 'password123',
  avatar: null,
  bio: 'Digital nomad and photography enthusiast. Searching for the perfect espresso across Europe and the best hidden trails in South America. Always ready for the next adventure.',
  location: 'Barcelona, Spain',
  tripsTaken: 24,
  countriesVisited: 15,
  continentsVisited: 3,
  travelStyle: ['Adventure', 'Foodie', 'Culture'],
};

export const MOCK_TRIPS = [
  {
    id: 'trip-1',
    name: 'Autumn Serenity Retreat',
    destination: 'Kyoto, Japan',
    startDate: '2024-10-12',
    endDate: '2024-10-24',
    status: 'confirmed',
    coverImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
    budget: 3450,
    currency: '$',
    travelers: 3,
    description: 'A peaceful autumn journey through ancient temples and bamboo forests of Kyoto.',
    days: [
      {
        id: 'day-1', dayNumber: 1,
        title: 'Arrival & Eastern Kyoto', date: '2024-10-12',
        activities: [
          { id: 'act-1', time: '10:00 AM', title: 'Kiyomizu-dera Temple', description: 'Iconic wooden stage with panoramic city views', duration: '2 hrs', type: 'sightseeing', cost: 500, status: 'upcoming', icon: '🏛' },
          { id: 'act-2', time: '01:00 PM', title: 'Lunch Break', description: 'Find a spot in Higashiyama', duration: '1 hr', type: 'food', cost: 1200, status: 'upcoming', icon: '🍴' },
          { id: 'act-3', time: '03:00 PM', title: 'Traditional Tea Ceremony', description: 'Experience matcha preparation in a tatami room', duration: '1 hr', type: 'experience', cost: 4500, status: 'upcoming', icon: '🍵' },
        ],
      },
      {
        id: 'day-2', dayNumber: 2,
        title: 'Arashiyama & West', date: '2024-10-13',
        activities: [
          { id: 'act-4', time: '08:00 AM', title: 'Fushimi Inari Shrine', description: 'Early morning hike through thousands of vermillion torii gates', duration: '3 hrs', type: 'sightseeing', cost: 0, status: 'completed', icon: '⛩' },
          { id: 'act-5', time: '12:30 PM', title: 'Lunch at Nishiki Market', description: 'Sample local delicacies and street food', duration: '1.5 hrs', type: 'food', cost: 1500, status: 'upcoming', icon: '🍜' },
        ],
      },
      {
        id: 'day-3', dayNumber: 3,
        title: 'Central Kyoto & Markets', date: '2024-10-14',
        activities: [],
      },
    ],
    budget_breakdown: { dining: 7800, activities: 4200, total: 12000, limit: 15000 },
    weather: { high: 22, low: 15, condition: 'Sunny', note: 'Pleasant weather expected. Light jacket recommended for the evening.' },
  },
  {
    id: 'trip-2',
    name: 'Gastronomy & Art Tour',
    destination: 'Paris, France',
    startDate: '2024-11-05',
    endDate: '2024-11-12',
    status: 'confirmed',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    budget: 2100, currency: '$', travelers: 1,
    description: 'Indulge in Parisian cuisine, world-class museums, and charming Haussmann boulevards.',
    days: [
      {
        id: 'day-4', dayNumber: 1, title: 'Arrival & Montmartre', date: '2024-11-05',
        activities: [
          { id: 'act-6', time: '02:00 PM', title: 'Sacré-Cœur Basilica', description: 'Visit the iconic white-domed basilica atop Montmartre hill', duration: '1.5 hrs', type: 'sightseeing', cost: 0, status: 'upcoming', icon: '⛪' },
        ],
      },
    ],
    budget_breakdown: { dining: 900, activities: 600, total: 1500, limit: 2100 },
    weather: { high: 14, low: 8, condition: 'Cloudy', note: 'Cool autumn weather. Bring a warm coat and umbrella.' },
  },
  {
    id: 'trip-3',
    name: 'Jungle Villa Escape',
    destination: 'Ubud, Bali',
    startDate: '2025-01-15',
    endDate: '2025-01-28',
    status: 'planning',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    budget: 1800, currency: '$', travelers: 2,
    description: 'Tropical retreat surrounded by emerald rice terraces and spiritual temples.',
    days: [],
    budget_breakdown: { dining: 0, activities: 0, total: 0, limit: 1800 },
    weather: null,
  },
  {
    id: 'trip-4',
    name: 'Parisian Autumn',
    destination: 'Paris, France',
    startDate: '2023-10-12',
    endDate: '2023-10-20',
    status: 'completed',
    coverImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    budget: 2800, currency: '$', travelers: 3,
    description: 'A glorious 8-day autumn trip to the City of Light.',
    days: [],
    budget_breakdown: { dining: 1200, activities: 900, total: 2800, limit: 2800 },
    weather: null,
  },
  {
    id: 'trip-5',
    name: 'Italian Riviera',
    destination: 'Cinque Terre, Italy',
    startDate: '2023-06-01',
    endDate: '2023-06-10',
    status: 'completed',
    coverImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80',
    budget: 2200, currency: '$', travelers: 2,
    description: 'Hiking coastal trails between five colorful cliffside villages.',
    days: [],
    budget_breakdown: { dining: 900, activities: 700, total: 2200, limit: 2200 },
    weather: null,
  },
  {
    id: 'trip-6',
    name: 'Kyoto Spring',
    destination: 'Kyoto, Japan',
    startDate: '2023-04-01',
    endDate: '2023-04-10',
    status: 'completed',
    coverImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    budget: 3000, currency: '$', travelers: 2,
    description: 'Cherry blossom season in ancient Kyoto — sakura viewing and temple walks.',
    days: [],
    budget_breakdown: { dining: 1000, activities: 1200, total: 3000, limit: 3000 },
    weather: null,
  },
];

export const MOCK_CHECKLIST = [
  { id: 'chk-1', tripId: 'trip-1', text: 'Book JR Pass (7-day)', category: 'Transportation', checked: true },
  { id: 'chk-2', tripId: 'trip-1', text: 'Reserve tea ceremony slot', category: 'Activities', checked: true },
  { id: 'chk-3', tripId: 'trip-1', text: 'Purchase travel insurance', category: 'Finance', checked: true },
  { id: 'chk-4', tripId: 'trip-1', text: 'Pack light jacket & layers', category: 'Packing', checked: false },
  { id: 'chk-5', tripId: 'trip-1', text: 'Download offline Google Maps', category: 'Tech', checked: false },
  { id: 'chk-6', tripId: 'trip-1', text: 'Notify bank of travel dates', category: 'Finance', checked: false },
  { id: 'chk-7', tripId: 'trip-1', text: 'Pack universal power adapter', category: 'Packing', checked: false },
  { id: 'chk-8', tripId: 'trip-1', text: 'Print hotel confirmations', category: 'Documents', checked: false },
  { id: 'chk-9', tripId: 'trip-1', text: 'Check passport validity (6+ months)', category: 'Documents', checked: true },
  { id: 'chk-10', tripId: 'trip-1', text: 'Get yen at airport or ATM', category: 'Finance', checked: false },
  { id: 'chk-11', tripId: 'trip-1', text: 'Download translation app', category: 'Tech', checked: false },
  { id: 'chk-12', tripId: 'trip-1', text: 'Pack comfortable walking shoes', category: 'Packing', checked: false },
];

export const MOCK_NOTES = [
  { id: 'note-1', tripId: 'trip-1', title: 'Restaurant Recommendations', content: 'Kikunoi for kaiseki dinner — book 2 weeks ahead. Nishiki Market for breakfast street food. Ippudo ramen near Gion for dinner. Must try yudofu at Nanzen-ji area. Pontocho Alley for evening drinks with river views.', updatedAt: '2024-10-05T10:00:00Z' },
  { id: 'note-2', tripId: 'trip-1', title: 'Temple Opening Hours', content: 'Fushimi Inari: open 24h (go at 5am to avoid crowds). Kinkaku-ji: 9am–5pm ¥500. Ryoan-ji: 8am–5pm ¥600. Ginkaku-ji: 8:30am–5pm ¥500. Kiyomizu-dera: 6am–6pm ¥500.', updatedAt: '2024-10-03T14:30:00Z' },
  { id: 'note-3', tripId: 'trip-1', title: 'Transport Tips', content: 'Get IC Suica card at airport — works on all buses and trains. Day bus pass ¥600 covers most sites. Bike rental near Arashiyama station ¥1000/day. Taxi from station to hotel ~¥1500.', updatedAt: '2024-09-28T09:15:00Z' },
];

export const MOCK_COMMUNITY_POSTS = [
  { id: 'post-1', author: { name: 'Alex Mercer', initials: 'AM' }, destination: 'Dubai, UAE', coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', title: '7 Days of Luxury in Dubai', excerpt: 'A complete guide to experiencing the best fine dining, desert safaris, and high-end shopping in the UAE\'s crown jewel.', likes: 1200, comments: 48, postedAgo: '4 days ago', trending: true },
  { id: 'post-2', author: { name: 'Emma Watson', initials: 'EW' }, destination: 'Paris, France', coverImage: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&q=80', title: 'Hidden Cafes of Montmartre', excerpt: 'Skip the tourist traps. Here is my curated list of the best spots for a croissant and perfect espresso in the city.', likes: 856, comments: 24, postedAgo: '1 week ago', trending: false },
  { id: 'post-3', author: { name: 'Kenji Sato', initials: 'KS' }, destination: 'Kyoto, Japan', coverImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80', title: 'Autumn Temple Trail', excerpt: 'A walking itinerary connecting the most beautiful and less-crowded Zen gardens during the fall foliage season.', likes: 2400, comments: 112, postedAgo: '2 weeks ago', trending: false },
  { id: 'post-4', author: { name: 'Sofia Chen', initials: 'SC' }, destination: 'Amalfi Coast, Italy', coverImage: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?w=800&q=80', title: 'Driving the Amalfi Coast', excerpt: 'Everything you need to know about renting a car and navigating the breathtaking coastal roads without stress.', likes: 3100, comments: 89, postedAgo: '3 weeks ago', trending: true },
  { id: 'post-5', author: { name: 'Marcus Hill', initials: 'MH' }, destination: 'Bali, Indonesia', coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Bali on a Budget: 14 Days Under $800', excerpt: 'Proving that Bali does not have to be expensive. My full itinerary with accommodation, food, and transport costs.', likes: 4700, comments: 203, postedAgo: '1 month ago', trending: false },
  { id: 'post-6', author: { name: 'Priya Sharma', initials: 'PS' }, destination: 'Swiss Alps', coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', title: '7 Days in the Swiss Alps', excerpt: 'Nature, hiking and mountain peaks. The ultimate guide to the best trails, huts, and panoramas in Switzerland.', likes: 1900, comments: 67, postedAgo: '1 month ago', trending: false },
];

export const MOCK_DESTINATIONS = [
  { id: 'dest-1', name: 'London, UK', tagline: 'Explore the historic streets and vibrant culture.', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80', trending: true, large: true },
  { id: 'dest-2', name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', trending: false, large: false },
  { id: 'dest-3', name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', trending: false, large: false },
  { id: 'dest-4', name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', trending: false, large: false },
];

export const MOCK_FEATURED_TRIPS = [
  { id: 'ft-1', name: 'Alpine Escapade', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', rating: 4.9, description: 'A 7-day journey through the most breathtaking mountain passes and cozy villages.', price: 1299 },
  { id: 'ft-2', name: 'Tropical Retreat', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', rating: 4.8, description: 'Relax and unwind with 5 days of sun, sand, and luxurious beachfront accommodations.', price: 899 },
  { id: 'ft-3', name: 'Urban Discovery', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', rating: 4.7, description: "Immerse yourself in the city's vibrant art, culinary scene, and nightlife over a long weekend.", price: 650 },
];

export const MOCK_SEARCH_RESULTS = [
  { id: 'sr-1', name: 'Kyoto Tea Ceremony', type: 'CULTURAL', price: 120, duration: '2 hours', image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=600&q=80', city: 'Kyoto', rating: 4.9 },
  { id: 'sr-2', name: 'Swiss Alps Hike', type: 'ADVENTURE', price: 85, duration: 'Half-day', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', city: 'Interlaken', rating: 4.8 },
  { id: 'sr-3', name: 'Amalfi Coast Boat Tour', type: 'NATURE', price: 150, duration: 'Full day', image: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?w=600&q=80', city: 'Amalfi', rating: 4.7 },
  { id: 'sr-4', name: 'Paris Food Walking Tour', type: 'CULINARY', price: 75, duration: '3 hours', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80', city: 'Paris', rating: 4.8 },
  { id: 'sr-5', name: 'Bali Temple Sunrise', type: 'CULTURAL', price: 45, duration: '4 hours', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', city: 'Ubud', rating: 4.6 },
  { id: 'sr-6', name: 'Tokyo Ramen Experience', type: 'CULINARY', price: 60, duration: '2.5 hours', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', city: 'Tokyo', rating: 4.9 },
];

export const MOCK_CITIES = [
  'Tokyo, Japan', 'Kyoto, Japan', 'Paris, France', 'London, UK',
  'Bali, Indonesia', 'Dubai, UAE', 'Rome, Italy', 'Barcelona, Spain',
  'New York, USA', 'Sydney, Australia', 'Bangkok, Thailand',
  'Singapore', 'Prague, Czech Republic', 'Amsterdam, Netherlands', 'Lisbon, Portugal',
];

export const MOCK_SUGGESTIONS = [
  { id: 'sug-1', name: 'Fushimi Inari Taisha', subtitle: 'Shrine • Free', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=200&q=80' },
  { id: 'sug-2', name: 'Traditional Tea Ceremony', subtitle: 'Experience • $45', image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=200&q=80' },
  { id: 'sug-3', name: 'Arashiyama Bamboo Grove', subtitle: 'Nature • Free', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=200&q=80' },
  { id: 'sug-4', name: 'Nishiki Market', subtitle: 'Food • Free entry', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=200&q=80' },
];
