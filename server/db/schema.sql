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
    created_at TIMESTAMP DEFAULT NOW()
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
    created_at TIMESTAMP DEFAULT NOW()
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
    order_index INTEGER
);

-- Expenses Table
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id),
    section_id INTEGER REFERENCES trip_sections(id),
    category VARCHAR(100),
    description TEXT,
    qty NUMERIC,
    unit VARCHAR(50),
    unit_cost NUMERIC(10,2),
    amount NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Checklist Items Table
CREATE TABLE checklist_items (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id),
    category VARCHAR(50),
    item_name VARCHAR(255),
    is_checked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Trip Notes Table
CREATE TABLE trip_notes (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id),
    day_number INTEGER,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
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
    city_id INTEGER REFERENCES cities(id),
    name VARCHAR(255),
    type VARCHAR(100),
    cost NUMERIC(10,2),
    duration_hours NUMERIC(4,1),
    description TEXT,
    image_url TEXT
);
