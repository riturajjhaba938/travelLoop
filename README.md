# ✈️ TravelLoop — Plan Your Next Adventure

> A premium, modern travel planning web application built with React + Vite. Organize itineraries, track budgets, manage checklists, and discover community travel stories — all in one beautifully designed platform.

![TravelLoop Banner](./frontend/public/logo-vertical.png)

---

## 📸 Screenshots

| Dashboard | Build Itinerary | Community |
|-----------|----------------|-----------|
| Cinematic hero with glassmorphic search | Visual timeline with activities | Staggered card animations |

---

## 🚀 Features

### 🗺️ Trip Management
- **Create Trips** — Set destination, dates, budget, and traveler count with an elegant split-panel form
- **My Trips** — View all trips grouped by status: Upcoming, Planning, and Completed
- **Trip Overview** — Full-detail view with weather info, budget breakdown, and quick-access cards
- **Trip Status Badges** — Color-coded (Teal = Confirmed, Coral = Planning, Grey = Completed)

### 📅 Itinerary Builder
- **Day-by-Day Planning** — Add, edit, and remove days with a visual timeline connector (coral → teal gradient)
- **Activity Management** — Add activities with time, title, description, type, and cost per day
- **Framer Motion Interactions** — Cards scale and glow on hover for premium feel
- **Save Changes** — Persisted via Zustand state management across the session

### 💰 Budget Tracker
- **Budget Breakdown** — Visual progress bar showing dining vs. activities spend vs. total limit
- **Per-Activity Costs** — Track individual activity costs within each day
- **Currency Support** — Budget stored with currency symbol

### ✅ Checklist
- **Trip Checklists** — Pre-populated smart checklist per trip (transport, documents, packing, finance)
- **Category Grouping** — Items organized by category (Transportation, Documents, Packing, Finance, Tech)
- **Check/Uncheck** — Toggle items with persistent state

### 📝 Notes
- **Rich Notes** — Per-trip notes with title and multi-line content
- **Add / Delete Notes** — Full CRUD interface with toast feedback
- **Timestamp Display** — Shows last updated date on each note

### 🌍 Explore & Search
- **Destination Cards** — Browse popular destinations (London, Paris, Tokyo, Bali) with real Unsplash photos
- **Activity Search** — Search by city or activity name across 6 curated experiences
- **Search Hero** — Cinematic city banner with glassmorphic search bar
- **Experience Cards** — Rounded cards with image zoom, category pills, rating badges, and price

### 👥 Community
- **Traveler Stories** — Browse posts by fellow travelers with real destination photos
- **Trending / Latest Toggle** — Filter posts by trending or newest
- **Staggered Animations** — Cards animate in sequentially on page load
- **Author Avatars** — Gradient-colored initials avatars per user

### 🔐 Authentication
- **Login & Register** — Cinematic split-panel layout (form left, travel photo right)
- **Form Validation** — Formik + Yup schema validation with inline error messages
- **Password Toggle** — Show/hide password field
- **Test Credentials** — Displayed on login page for easy demo access
- **Protected Routes** — All app routes require authentication via React Context

### 🎨 Design System
- **Typography** — `Instrument Serif` (headings) + `Satoshi` (body) editorial pairing
- **Color Palette** — Coral Red `#FF5A5F`, Vibrant Teal `#00A699`, Bright Orange `#FC642D`
- **Glassmorphism** — `backdrop-filter: blur` used across navbar, hero, and search elements
- **Micro-animations** — Framer Motion entrance animations, hover lifts, and tap effects
- **Dot Navigation** — Coral dot indicator under active navbar link
- **Responsive Images** — 35+ curated Unsplash photo IDs mapped by destination for guaranteed loading

### 🖼️ Image System
- **Centralized Image Utility** — `src/utils/images.js` with semantic photo keys
- **Destination Matching** — `getDestinationImage('Kyoto')` returns correct photo automatically
- **Fallback Handling** — `handleImgError` gracefully replaces broken images with brand gradient
- **No Rate Limits** — Direct Unsplash CDN URLs (not the deprecated source.unsplash.com API)

### 📊 Analytics (Admin)
- **Admin Dashboard** — Overview stats, Recharts-based activity graph
- **Protected Admin Route** — Separate admin panel page

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 + Vanilla CSS Variables |
| Routing | React Router DOM v6 |
| State Management | Zustand |
| Forms | Formik + Yup |
| Animations | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts |
| Notifications | React Hot Toast |
| PDF Export | jsPDF + html2canvas |
| File Upload | React Dropzone |
| HTTP Client | Axios |
| Date Utilities | date-fns |
| Fonts | Instrument Serif (Google Fonts) + Satoshi (Fontshare) |
| Images | Unsplash CDN (direct photo IDs) |

---

## 📦 All Packages

### Production Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "axios": "^1.7.7",
  "formik": "^2.4.6",
  "yup": "^1.4.0",
  "zustand": "^4.5.5",
  "date-fns": "^3.6.0",
  "lucide-react": "^0.441.0",
  "react-hot-toast": "^2.4.1",
  "jspdf": "^2.5.1",
  "html2canvas": "^1.4.1",
  "framer-motion": "^11.5.0",
  "react-dropzone": "^14.2.3",
  "recharts": "^3.8.1"
}
```

### Dev Dependencies

```json
{
  "@vitejs/plugin-react": "^4.3.1",
  "vite": "^5.4.8",
  "tailwindcss": "^3.4.10",
  "postcss": "^8.4.47",
  "autoprefixer": "^10.4.20",
  "eslint": "^8.57.0",
  "eslint-plugin-react": "^7.35.0",
  "eslint-plugin-react-hooks": "^4.6.2"
}
```

---

## 📁 Project Structure

```
TravelLoop/
└── travelLoop/
    └── frontend/
        ├── public/
        │   ├── logo.png               # Horizontal navbar logo
        │   ├── logo-vertical.png      # Vertical logo (auth pages)
        │   └── logo-dual.png          # Dual-loop logo variant
        ├── src/
        │   ├── api/                   # Mock API layer (simulates backend)
        │   │   ├── auth.api.js        # Login / register
        │   │   ├── trips.api.js       # Trip CRUD operations
        │   │   ├── checklist.api.js   # Checklist item management
        │   │   ├── notes.api.js       # Trip notes
        │   │   ├── cities.api.js      # City search + activities
        │   │   ├── sections.api.js    # Itinerary section management
        │   │   └── axios.js           # Axios instance config
        │   ├── components/
        │   │   ├── common/
        │   │   │   ├── Navbar.jsx     # Frosted-glass nav with dot indicator
        │   │   │   ├── Footer.jsx     # Site footer
        │   │   │   ├── Loader.jsx     # Spinner component
        │   │   │   ├── ErrorMessage.jsx
        │   │   │   └── ProtectedRoute.jsx  # Auth guard
        │   │   ├── trips/
        │   │   │   └── TripCard.jsx   # Destination-matched image cards
        │   │   ├── itinerary/         # Itinerary sub-components
        │   │   ├── checklist/         # Checklist sub-components
        │   │   └── admin/             # Admin-only components
        │   ├── context/
        │   │   └── AuthContext.jsx    # Global auth state + login/logout
        │   ├── mock/
        │   │   └── data.js            # All mock data (trips, posts, destinations)
        │   ├── pages/
        │   │   ├── LoginPage.jsx      # Cinematic split-panel login
        │   │   ├── RegisterPage.jsx   # Cinematic split-panel register
        │   │   ├── DashboardPage.jsx  # Hero + destination grid
        │   │   ├── CreateTripPage.jsx # Trip creation form + Amalfi panel
        │   │   ├── MyTripsPage.jsx    # Grouped trip cards
        │   │   ├── ItineraryViewPage.jsx  # Full trip detail overview
        │   │   ├── BuildItineraryPage.jsx # Day/activity builder
        │   │   ├── ChecklistPage.jsx  # Trip checklist manager
        │   │   ├── NotesPage.jsx      # Trip notes CRUD
        │   │   ├── CommunityPage.jsx  # Traveler stories feed
        │   │   ├── SearchPage.jsx     # Experience search with hero
        │   │   ├── ProfilePage.jsx    # User profile
        │   │   └── AdminDashboard.jsx # Admin stats panel
        │   ├── store/
        │   │   └── useTripStore.js    # Zustand store for trip data
        │   ├── styles/
        │   │   ├── variables.css      # UI 2.0 design tokens (colors, shadows, radii)
        │   │   └── index.css          # Global resets + shimmer animation
        │   ├── utils/
        │   │   └── images.js          # Centralized Unsplash image utility
        │   ├── App.jsx                # Router + route definitions
        │   └── main.jsx               # React entry point
        ├── index.html                 # Font CDN links + SEO meta
        ├── tailwind.config.js         # Custom color palette + font tokens
        ├── vite.config.js             # Vite config
        └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** — v18.0.0 or higher → [Download](https://nodejs.org/)
- **npm** — v9.0.0 or higher (comes with Node.js)
- **Git** → [Download](https://git-scm.com/)

Check your versions:

```bash
node --version   # should be v18+
npm --version    # should be v9+
git --version
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/TravelLoop.git
cd TravelLoop
```

> 🔁 Replace `YOUR_USERNAME` with the actual GitHub username if you are cloning from a fork.

---

### 2. Navigate to the Frontend

```bash
cd travelLoop/frontend
```

---

### 3. Install Dependencies

```bash
npm install
```

This installs all ~15 production packages and ~7 dev packages automatically.

---

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

> ✅ No `.env` file is required. The project uses a fully mocked API layer — no backend needed.

---

### 5. Test Login Credentials

Since there is no backend, use these pre-set credentials on the login page:

| Field | Value |
|-------|-------|
| Email | `elena@example.com` |
| Password | `password123` |

These are also displayed as a hint box on the login screen itself.

---

## 🏗️ Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder. To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo
3. Set the **Root Directory** to `travelLoop/frontend`
4. Leave all other settings as default
5. Click **Deploy**

> No environment variables are required for the base deployment.

---

## 🌐 Deploying to Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connect your GitHub repository
3. Set:
   - **Base directory**: `travelLoop/frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `travelLoop/frontend/dist`
4. Click **Deploy site**

---

## 🎨 Design Tokens

All design tokens live in `src/styles/variables.css`. Key tokens:

```css
--primary:        #FF5A5F;   /* Coral Red — CTA buttons, accents */
--secondary:      #00A699;   /* Vibrant Teal — success, badges */
--accent:         #FC642D;   /* Bright Orange — highlights */
--font-serif:     'Instrument Serif', Georgia, serif;
--font-sans:      'Satoshi', 'Inter', sans-serif;
--r-3xl:          24px;      /* Card border radius */
--shadow-lg:      0 20px 48px rgba(0,0,0,0.12);
--glow-primary:   0 0 0 3px rgba(255,90,95,0.25);
```

---

## 🖼️ Image System

The `src/utils/images.js` utility provides reliable Unsplash images without rate limits:

```js
import { getPhotoUrl, getDestinationImage, handleImgError } from './utils/images';

// Get a specific photo by key
const img = getPhotoUrl('hero_mountain_lake', 1600);

// Get a destination-matched photo by name string
const parisImg = getDestinationImage('Paris, France', 800);

// Handle broken images gracefully
<img src={imgSrc} onError={handleImgError} />
```

**Supported destinations:** Paris, London, Tokyo, Kyoto, Bali, Dubai, Amalfi, New York, Barcelona, Rome, Santorini, Amsterdam, Prague, Lisbon, Singapore, Iceland, Maldives, Swiss Alps, Morocco, Vietnam, New Zealand, Cappadocia, Peru (Machu Picchu), India (Taj Mahal), Bangkok, and more.

---

## 🔑 Key Architecture Decisions

| Decision | Reason |
|----------|--------|
| **Mock API layer** | No backend required — all data simulated with realistic delays |
| **Zustand for state** | Lightweight, no boilerplate — replaces Redux for this scale |
| **CSS Variables + Tailwind** | Variables for design tokens; Tailwind for utility layout classes |
| **Direct Unsplash CDN URLs** | `source.unsplash.com` is rate-limited; direct photo IDs are stable |
| **Framer Motion** | Declarative entrance animations and hover interactions |
| **Formik + Yup** | Decoupled form state and schema validation with great DX |

---

## 📌 Mock Data Overview

All mock data is in `src/mock/data.js`:

| Export | Description |
|--------|-------------|
| `MOCK_USER` | Logged-in user profile (Elena Rodriguez) |
| `MOCK_TRIPS` | 6 sample trips (Kyoto, Paris, Bali, Cinque Terre, etc.) |
| `MOCK_CHECKLIST` | 12 checklist items for trip-1 |
| `MOCK_NOTES` | 3 sample notes for trip-1 |
| `MOCK_COMMUNITY_POSTS` | 6 community travel stories |
| `MOCK_DESTINATIONS` | 4 featured destinations for dashboard |
| `MOCK_FEATURED_TRIPS` | 3 curated trip packages |
| `MOCK_SEARCH_RESULTS` | 6 searchable activities |
| `MOCK_CITIES` | 15 city suggestions for autocomplete |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

## 👤 Author

**Swaraj**
- Project: TravelLoop
- Built with ❤️ using React + Vite

---

> ⭐ If you found this useful, please star the repository!