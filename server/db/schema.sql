DROP TABLE IF EXISTS activities, cities, trip_notes, checklist_items, expenses, trip_sections, trips, users CASCADE;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100),
    country VARCHAR(100),
    profile_pic TEXT,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Trips Table
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255),
    place VARCHAR(255),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'upcoming',
    is_public BOOLEAN DEFAULT false,
    cover_photo TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Trip Sections Table
CREATE TABLE trip_sections (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    date_from DATE,
    date_to DATE,
    budget NUMERIC(10,2),
    section_type VARCHAR(50),
    order_index INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Expenses Table
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    section_id INTEGER REFERENCES trip_sections(id) ON DELETE SET NULL,
    category VARCHAR(100),
    description TEXT,
    qty NUMERIC,
    unit VARCHAR(50),
    unit_cost NUMERIC(10,2),
    amount NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Checklist Items Table
CREATE TABLE checklist_items (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    category VARCHAR(50),
    item_name VARCHAR(255),
    is_checked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Trip Notes Table
CREATE TABLE trip_notes (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    day_number INTEGER,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Cities Table
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    country VARCHAR(100),
    region VARCHAR(100),
    cost_index INTEGER,
    popularity INTEGER,
    image_url TEXT
);

-- Activities Table
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
    name VARCHAR(255),
    type VARCHAR(100),
    cost NUMERIC(10,2),
    duration_hours NUMERIC(4,1),
    description TEXT,
    image_url TEXT
);

-- Indexes for performance
CREATE INDEX idx_trips_user_id ON trips(user_id);
CREATE INDEX idx_trip_sections_trip_id ON trip_sections(trip_id);
CREATE INDEX idx_expenses_trip_id ON expenses(trip_id);
CREATE INDEX idx_checklist_items_trip_id ON checklist_items(trip_id);
CREATE INDEX idx_trip_notes_trip_id ON trip_notes(trip_id);
CREATE INDEX idx_activities_city_id ON activities(city_id);
