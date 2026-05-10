# Traveloop — Product Requirements Document

**Hackathon:** Odoo × Parul  
**Stack:** PERN (PostgreSQL · Express · React · Node.js)  
**Team:** Rishab · Rituraj · Swaraj  
**Duration:** 8 Hours  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Team Roles & Responsibilities](#2-team-roles--responsibilities)
3. [8-Hour Execution Timeline](#3-8-hour-execution-timeline)
4. [Screen Specifications](#4-screen-specifications)
5. [Database Schema](#5-database-schema)
6. [API Endpoints](#6-api-endpoints)
7. [MVP Scope & Prioritization](#7-mvp-scope--prioritization)
8. [Pre-Demo Checklist](#8-pre-demo-checklist)

---

## 1. Project Overview

### Vision

Traveloop is a personalized, intelligent, and collaborative travel planning platform. Users can dream, design, and organize trips with ease through an end-to-end tool that combines flexibility and interactivity — explore destinations, build structured itineraries, manage budgets, and share plans within a community.

### Problem Statement

Design and develop a complete travel planning application where users can:

- Create customized multi-city itineraries
- Assign travel dates, activities, and budgets
- Discover activities and destinations through search
- Receive cost breakdowns and visual calendars
- Share their plans publicly or with friends

The application must use a relational database to store user-specific itineraries, stops, activities, and expenses, with a dynamic frontend that adapts to each user's trip flow.

### Key Metrics

| Metric | Value |
|---|---|
| Total Screens | 14 (6 core P0, 8 additional) |
| Team Size | 3 members |
| Time Budget | 8 hours |
| Database Tables | 8 |
| P0 (Must Have) Screens | 6 |
| P1 (Should Have) Screens | 5 |
| P2 (Nice to Have) Screens | 3 |

### Core Demo User Flows

These flows must work end-to-end for a successful demo:

1. Register / Login → lands on Dashboard
2. Create a Trip (name, place, dates) → redirected to Build Itinerary
3. Add sections to itinerary (hotel, activities) with date ranges and budgets
4. View Itinerary with day-wise layout and budget totals
5. Browse My Trips across Ongoing / Upcoming / Completed tabs
6. Add and check off items on the Packing Checklist
7. Browse the Community tab to see public trips

### Critical Constraints (8-Hour Build)

- No real payment gateway — use static/mock budget data
- No real map API integration — city/activity search uses seeded DB data
- No file uploads for photos — use placeholder image URLs
- Auth is JWT only, no OAuth or Google login
- Admin dashboard (Screen 12) and Expense Invoice (Screen 13) are P2 — skip if time is short
- Seed the DB with at least 10 cities and 20 activities before demoing

---

## 2. Team Roles & Responsibilities

### Rishab — Frontend Lead

**Focus:** React app structure, auth screens, dashboard, and utility screens

- React app setup, routing (React Router), auth context
- Login & Register screens
- Dashboard / Main Landing page
- My Trips listing screen (Ongoing/Upcoming/Completed tabs)
- Packing Checklist screen
- Trip Notes / Journal screen
- Community Tab screen

### Rituraj — Backend Lead

**Focus:** PostgreSQL schema, Express APIs, auth, and analytics

- PostgreSQL DB setup, schema design, and migrations
- Seed data script (cities, activities, demo user + trips)
- Auth APIs: register, login with JWT middleware
- Trip CRUD endpoints
- Itinerary sections and expenses endpoints
- Checklist and notes endpoints
- Admin analytics APIs

### Swaraj — Full-Stack / Integration

**Focus:** Itinerary screens, search, profile, and wiring frontend to backend

- Build Itinerary screen (add/remove sections)
- Itinerary View screen (day-wise layout + budget)
- Activity / City Search screen
- User Profile screen
- Expense Invoice screen (P2)
- Connect all frontend screens to backend via Axios
- End-to-end integration testing

### Tech Stack Division

| Layer | Tech | Owner |
|---|---|---|
| Database | PostgreSQL | Rituraj |
| Backend | Node.js + Express | Rituraj |
| Frontend Shell | React + React Router | Rishab |
| Auth & Dashboard Screens | React | Rishab |
| Itinerary & Search Screens | React | Swaraj |
| API Integration (Axios) | React → Express | Swaraj |
| Styling | CSS / Tailwind | All |

---

## 3. 8-Hour Execution Timeline

### Hour 0:00 – 0:30 | Kickoff & Setup | All

- Initialize Git repo, agree on branch strategy (main + feature branches)
- Bootstrap PERN project: CRA or Vite for frontend, Express for backend
- Create PostgreSQL database, run initial migration
- Agree on API response shapes and data contracts

### Hour 0:30 – 2:00 | Parallel Sprint 1 | All

**Rishab:** React Router setup, Login + Register UI, Navbar with auth state, Dashboard skeleton

**Rituraj:** Users and trips tables, auth endpoints (POST /register, POST /login), trips CRUD, JWT middleware

**Swaraj:** Build Itinerary screen UI with dummy data, section add/remove logic, City/Activity search UI mockup

### Hour 2:00 – 4:00 | Feature Sprint 1 | All

**Rishab:** My Trips listing screen with tabs, Trip detail navigation, shared TripCard component

**Rituraj:** trip_sections table + APIs, expenses schema, budget aggregation queries

**Swaraj:** Wire Create Trip form to POST /api/trips, connect Itinerary Builder to section APIs

### Hour 4:00 – 5:30 | Feature Sprint 2 | All

**Rishab:** Packing Checklist screen (full CRUD), Trip Notes/Journal screen

**Rituraj:** Checklist and notes APIs, budget breakdown endpoint, Community/public trips query

**Swaraj:** Itinerary View screen connected to real data, Activity/City Search connected to seeded DB, User Profile screen

### Hour 5:30 – 6:30 | Integration & Polish | All

- Full E2E flow testing (Register → Create Trip → Build Itinerary → View)
- Fix broken API connections and CORS issues
- Add loading spinners and error states
- Responsive layout fixes

### Hour 6:30 – 7:30 | Demo Prep | All

- Seed demo data: sample trip to Paris + London, June 2025
- Pre-fill packing checklist and trip notes for demo trip
- Rehearse the full user flow walkthrough
- Prepare talking points: vision, tech choices, database design

### Hour 7:30 – 8:00 | Buffer / Submission | All

- Final bug fixes only — no new features
- Update README with setup instructions
- Deploy or confirm local demo works clean
- Submit project

---

## 4. Screen Specifications

Priority legend: **P0** = Must Have · **P1** = Should Have · **P2** = Nice to Have

---

### Screen 1 — Login / Register | P0 | Owner: Rishab | Effort: 45 min

**Description:** Entry point for users to create or access their account.

**Functionality:**
- Email and password fields with basic validation
- Login button with JWT response stored in localStorage
- Link to Register / Sign Up
- Register form: First Name, Last Name, Email, Phone, City, Country, Additional Info, Profile Photo placeholder
- Protected routes redirect unauthenticated users to login

**API:** `POST /api/auth/login`, `POST /api/auth/register`

---

### Screen 2 — Main Dashboard | P0 | Owner: Rishab | Effort: 45 min

**Description:** Central hub showing upcoming trips, popular destinations, and quick actions.

**Functionality:**
- Banner image (static or placeholder)
- Top Regional Selections section (seeded city cards)
- Previous/Recent Trips list (cards fetched from DB)
- "Plan a Trip" CTA button linking to Create Trip screen
- Group by / Filter / Sort controls on trip list

**API:** `GET /api/trips`, `GET /api/cities?featured=true`

---

### Screen 3 — User Trip Listing | P0 | Owner: Rishab | Effort: 30 min

**Description:** List view of all trips for the logged-in user.

**Functionality:**
- Tabs: Ongoing / Upcoming / Completed (filtered by trip status)
- Trip cards showing trip name, destination, date range, short overview
- Edit and Delete actions per card
- Search bar within the listing

**API:** `GET /api/trips?status=ongoing`, `DELETE /api/trips/:id`

---

### Screen 4 — Create New Trip | P0 | Owner: Swaraj | Effort: 30 min

**Description:** Form to initiate a new personalized trip.

**Functionality:**
- Fields: Trip name, Select a Place (city search), Start Date, End Date
- Suggested places to visit / activities (static or seeded data cards)
- Save button → creates trip record → redirects to Build Itinerary screen

**API:** `POST /api/trips`

---

### Screen 5 — Build Itinerary | P0 | Owner: Swaraj | Effort: 60 min

**Description:** Interface to construct the full trip plan section by section.

**Functionality:**
- Sections list: each section has a title, description, date range, and budget
- Section types: hotel, activity, transport, food
- "Add Another Section" button
- Delete section option
- Sections ordered and associated with the trip

**API:** `POST /api/trips/:id/sections`, `PUT /api/sections/:id`, `DELETE /api/sections/:id`

---

### Screen 6 — Itinerary View + Budget | P0 | Owner: Swaraj | Effort: 60 min

**Description:** Visual day-wise representation of the completed itinerary.

**Functionality:**
- Grouped by Day 1, Day 2, etc.
- Each day shows Physical Activity and Expense columns
- Budget per section displayed inline
- Total budget summary at bottom
- Search and filter controls

**API:** `GET /api/trips/:id/sections`, `GET /api/trips/:id/expenses`

---

### Screen 7 — User Profile | P1 | Owner: Swaraj | Effort: 30 min

**Description:** User settings and profile information page.

**Functionality:**
- Profile photo, name, and user details display
- Edit mode toggle for updating info
- Preplanned Trips section (3 cards with View button)
- Previous Trips section (3 cards with View button)

**API:** `GET /api/users/me`, `PUT /api/users/me`

---

### Screen 8 — Activity / City Search | P1 | Owner: Swaraj | Effort: 45 min

**Description:** Search interface to discover cities and activities.

**Functionality:**
- Search bar with Group by / Filter / Sort controls
- Results list: each result shows option name and details
- Filter by type (city, activity category)
- "Add to Trip" action on each result

**API:** `GET /api/cities?q=`, `GET /api/activities?q=&city_id=&type=`

---

### Screen 9 — Community Tab | P1 | Owner: Rishab | Effort: 30 min

**Description:** Public feed where users can browse shared trip experiences.

**Functionality:**
- List of publicly shared trip cards
- Search, group by, filter, and sort controls
- Each card shows trip summary (destination, duration, user)
- Click through to read-only public itinerary view

**API:** `GET /api/community/trips`

---

### Screen 10 — Packing Checklist | P1 | Owner: Rishab | Effort: 30 min

**Description:** Per-trip checklist to manage packing items.

**Functionality:**
- Add custom checklist items
- Categories: Documents, Clothing, Electronics, Health
- Check off items as packed
- Reset checklist for re-use
- Print Checklist button (window.print())

**API:** `GET/POST/PUT/DELETE /api/trips/:id/checklist`

---

### Screen 11 — Trip Notes / Journal | P1 | Owner: Rishab | Effort: 30 min

**Description:** Note-taking screen tied to a specific trip.

**Functionality:**
- Toggle view: All / By Day / Step-by-step
- Add new note button
- Notes displayed as cards with timestamp
- Example: hotel check-in details, local contacts, day-specific reminders
- Delete note option

**API:** `GET/POST/DELETE /api/trips/:id/notes`

---

### Screen 12 — Admin Dashboard | P2 | Owner: Rituraj | Effort: 45 min

**Description:** Admin-only analytics interface. Build only if time permits.

**Functionality:**
- Tables: Trips Name, Project Name, Pending Actions, User details
- Pie chart and bar chart of platform usage stats
- Top cities and activities data
- User management table

**API:** `GET /api/admin/stats`, `GET /api/admin/users`

---

### Screen 13 — Expense Invoice / Billing | P2 | Owner: Swaraj | Effort: 45 min

**Description:** Detailed invoice view for a trip's expenses. Build only if time permits.

**Functionality:**
- Trip image, invoice ID, associated skills/dates
- Payment status indicator
- Itemized table: Category, Description, Qty/Nights, Unit Cost, Amount
- Budget summary (Total Budget, Amount Spent, Remaining)
- Download Invoice, Export as PDF, Mark as Email buttons

**API:** `GET /api/trips/:id/invoice`

---

## 5. Database Schema

### Table: users

```
id              SERIAL PRIMARY KEY
first_name      VARCHAR(100)
last_name       VARCHAR(100)
email           VARCHAR(255) UNIQUE NOT NULL
password_hash   TEXT NOT NULL
phone           VARCHAR(20)
city            VARCHAR(100)
country         VARCHAR(100)
profile_pic     TEXT
created_at      TIMESTAMP DEFAULT NOW()
```

### Table: trips

```
id              SERIAL PRIMARY KEY
user_id         INTEGER REFERENCES users(id)
name            VARCHAR(255)
place           VARCHAR(255)
start_date      DATE
end_date        DATE
status          VARCHAR(20) DEFAULT 'upcoming'  -- ongoing | upcoming | completed
is_public       BOOLEAN DEFAULT false
cover_photo     TEXT
created_at      TIMESTAMP DEFAULT NOW()
```

### Table: trip_sections

```
id              SERIAL PRIMARY KEY
trip_id         INTEGER REFERENCES trips(id) ON DELETE CASCADE
title           VARCHAR(255)
description     TEXT
date_from       DATE
date_to         DATE
budget          NUMERIC(10,2)
section_type    VARCHAR(50)   -- hotel | activity | transport | food
order_index     INTEGER
```

### Table: expenses

```
id              SERIAL PRIMARY KEY
trip_id         INTEGER REFERENCES trips(id)
section_id      INTEGER REFERENCES trip_sections(id)
category        VARCHAR(100)
description     TEXT
qty             NUMERIC
unit            VARCHAR(50)
unit_cost       NUMERIC(10,2)
amount          NUMERIC(10,2)
created_at      TIMESTAMP DEFAULT NOW()
```

### Table: checklist_items

```
id              SERIAL PRIMARY KEY
trip_id         INTEGER REFERENCES trips(id)
category        VARCHAR(50)   -- documents | clothing | electronics | health
item_name       VARCHAR(255)
is_checked      BOOLEAN DEFAULT false
created_at      TIMESTAMP DEFAULT NOW()
```

### Table: trip_notes

```
id              SERIAL PRIMARY KEY
trip_id         INTEGER REFERENCES trips(id)
day_number      INTEGER
content         TEXT
created_at      TIMESTAMP DEFAULT NOW()
```

### Table: cities

```
id              SERIAL PRIMARY KEY
name            VARCHAR(100)
country         VARCHAR(100)
region          VARCHAR(100)
cost_index      INTEGER
popularity      INTEGER
image_url       TEXT
```

### Table: activities

```
id              SERIAL PRIMARY KEY
city_id         INTEGER REFERENCES cities(id)
name            VARCHAR(255)
type            VARCHAR(100)   -- sightseeing | food | adventure | culture
cost            NUMERIC(10,2)
duration_hours  NUMERIC(4,1)
description     TEXT
image_url       TEXT
```

### Entity Relationships

```
users ──── trips ──── trip_sections
                 ├─── expenses
                 ├─── checklist_items
                 └─── trip_notes

cities ──── activities
```

### Seed Data Required

- 10+ cities: Paris, London, Tokyo, New York, Rome, Barcelona, Bangkok, Dubai, Singapore, Bali
- 3+ activities per city (sightseeing, food, adventure)
- 1 demo user: email `demo@traveloop.com`, password `demo123`
- 2 pre-seeded trips for demo user (1 upcoming Europe trip, 1 completed Asia trip)
- Itinerary sections, checklist items, and notes for demo trips

---

## 6. API Endpoints

Base URL: `http://localhost:5000/api`  
Protected routes require: `Authorization: Bearer <JWT_TOKEN>`  
Content-Type: `application/json`

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /auth/register | No | Register new user |
| POST | /auth/login | No | Login, returns JWT |
| GET | /auth/me | Yes | Get current user |

### Trips

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /trips | Yes | Get all trips for user |
| POST | /trips | Yes | Create new trip |
| GET | /trips/:id | Yes | Get single trip |
| PUT | /trips/:id | Yes | Update trip |
| DELETE | /trips/:id | Yes | Delete trip |

### Sections

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /trips/:id/sections | Yes | Get all sections for trip |
| POST | /trips/:id/sections | Yes | Add section to trip |
| PUT | /sections/:id | Yes | Update section |
| DELETE | /sections/:id | Yes | Delete section |

### Expenses

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /trips/:id/expenses | Yes | Get all expenses for trip |
| POST | /trips/:id/expenses | Yes | Add expense |
| GET | /trips/:id/invoice | Yes | Get full invoice breakdown |

### Checklist

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /trips/:id/checklist | Yes | Get checklist items |
| POST | /trips/:id/checklist | Yes | Add item |
| PUT | /checklist/:id | Yes | Toggle checked / update |
| DELETE | /checklist/:id | Yes | Delete item |

### Notes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /trips/:id/notes | Yes | Get all notes |
| POST | /trips/:id/notes | Yes | Add note |
| DELETE | /notes/:id | Yes | Delete note |

### Discover

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /cities | No | Search cities (?q=, ?featured=true) |
| GET | /activities | No | Search activities (?q=, ?city_id=, ?type=) |
| GET | /community/trips | No | Get public trips |

### Admin

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /admin/stats | Yes (admin) | Platform analytics |
| GET | /admin/users | Yes (admin) | User management list |

### Example: Create Trip

Request:
```json
POST /api/trips
{
  "name": "Europe 2025",
  "place": "Paris",
  "start_date": "2025-06-01",
  "end_date": "2025-06-15",
  "status": "upcoming"
}
```

Response `201 Created`:
```json
{
  "id": 42,
  "user_id": 1,
  "name": "Europe 2025",
  "place": "Paris",
  "start_date": "2025-06-01",
  "end_date": "2025-06-15",
  "status": "upcoming",
  "is_public": false,
  "created_at": "2025-05-10T08:00:00Z"
}
```

---

## 7. MVP Scope & Prioritization

### P0 — Must Ship (Hours 0–4)

These are non-negotiable. If these don't work, the demo fails.

- Login & Register screens with JWT auth
- Dashboard / Main Landing with trip list
- Create New Trip form (saves to DB)
- Build Itinerary (add/remove sections with dates + budget)
- Itinerary View (day-wise layout + budget totals)
- My Trip Listing (Ongoing/Upcoming/Completed tabs)

### P1 — Should Ship (Hours 4–6)

Build these after all P0 flows are stable.

- User Profile screen (view + edit mode)
- Activity / City Search (connected to seeded DB)
- Packing Checklist (add, check off, categorize items)
- Trip Notes / Journal (add and view notes per trip)
- Community Tab (browse public trips, read-only)

### P2 — Nice to Have (Hours 6–8, only if time allows)

Skip these if you're behind on P1.

- Expense Invoice / Billing screen with budget chart
- Admin Analytics Dashboard (charts + user stats)
- Sharing / Public itinerary URL feature

### Hackathon Tips

- Agree on API response shapes in the first 30 minutes — avoids integration pain later
- Use Postman or Thunder Client to test backend before connecting frontend
- Keep state management simple: React Context for auth, local state for everything else
- If backend is blocked, use hardcoded mock data on the frontend and swap in later
- Commit every 30–45 minutes — at least one team member should always have working code
- Stop adding new features at T-30 min and focus purely on the demo flow

---

## 8. Pre-Demo Checklist

Before stepping up to present, verify everything below:

- [ ] Database seeded with 10+ cities and 20+ activities
- [ ] Demo user account works: `demo@traveloop.com` / `demo123`
- [ ] Demo trip (Paris + London, June 2025) exists with full itinerary sections
- [ ] Packing checklist pre-filled for demo trip
- [ ] At least 2 notes added to demo trip
- [ ] All P0 user flows work end-to-end without errors
- [ ] App starts cleanly without `.env` or dependency issues
- [ ] Backup: screenshots or screen recording of each screen saved locally

---

*Traveloop PRD · Odoo × Parul Hackathon · Team: Rishab, Rituraj, Swaraj*
