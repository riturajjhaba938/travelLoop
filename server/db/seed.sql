-- Clean up existing data
TRUNCATE activities, cities, trip_notes, checklist_items, expenses, trip_sections, trips, users CASCADE;

-- Seed Cities
INSERT INTO cities (id, name, country, region, cost_index, popularity, image_url) VALUES
(1, 'Paris', 'France', 'Europe', 4, 5, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'),
(2, 'London', 'UK', 'Europe', 4, 5, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'),
(3, 'Tokyo', 'Japan', 'Asia', 4, 5, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'),
(4, 'New York', 'USA', 'North America', 5, 5, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'),
(5, 'Rome', 'Italy', 'Europe', 3, 5, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5'),
(6, 'Barcelona', 'Spain', 'Europe', 3, 4, 'https://images.unsplash.com/photo-1583422409516-2895a77efded'),
(7, 'Bangkok', 'Thailand', 'Asia', 2, 5, 'https://images.unsplash.com/photo-1508009603885-50cf7c579367'),
(8, 'Dubai', 'UAE', 'Middle East', 5, 5, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'),
(9, 'Singapore', 'Singapore', 'Asia', 4, 5, 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1ec6'),
(10, 'Bali', 'Indonesia', 'Asia', 2, 5, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4');

-- Seed Activities (3 per city)
-- Paris (1)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(1, 'Eiffel Tower Visit', 'sightseeing', 25.00, 2, 'Iconic iron lattice tower on the Champ de Mars.'),
(1, 'Louvre Museum Tour', 'culture', 17.00, 4, 'The world''s largest art museum and a historic monument.'),
(1, 'Seine River Cruise', 'adventure', 15.00, 1, 'Bateaux-Mouches cruise along the heart of Paris.');
-- London (2)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(2, 'London Eye', 'sightseeing', 30.00, 1, 'Giant Ferris wheel on the South Bank of the River Thames.'),
(2, 'British Museum', 'culture', 0.00, 3, 'Public institution dedicated to human history, art and culture.'),
(2, 'Borough Market Food Tour', 'food', 40.00, 2, 'One of the largest and oldest food markets in London.');
-- Tokyo (3)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(3, 'Shibuya Crossing Walk', 'sightseeing', 0.00, 0.5, 'The world''s busiest pedestrian crossing.'),
(3, 'Robot Restaurant Show', 'culture', 80.00, 2, 'High-energy show with robots, dragons and neon lights.'),
(3, 'Tsukiji Outer Market Sushi', 'food', 50.00, 1.5, 'Fresh seafood and traditional Japanese breakfast.');
-- New York (4)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(4, 'Empire State Building', 'sightseeing', 42.00, 1.5, '102-story Art Deco skyscraper in Midtown Manhattan.'),
(4, 'Metropolitan Museum of Art', 'culture', 25.00, 4, 'The largest art museum in the Americas.'),
(4, 'Central Park Bike Tour', 'adventure', 35.00, 2, 'Explore the most visited urban park in the United States.');
-- Rome (5)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(5, 'Colosseum & Forum', 'sightseeing', 16.00, 3, 'Oval amphitheatre in the centre of the city of Rome.'),
(5, 'Vatican Museums', 'culture', 17.00, 4, 'Christian and art museums located within Vatican City.'),
(5, 'Trastevere Pasta Tour', 'food', 60.00, 3, 'Guided food tour through Rome''s most charming neighborhood.');
-- Barcelona (6)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(6, 'Sagrada Família', 'sightseeing', 26.00, 2, 'Large unfinished Roman Catholic minor basilica.'),
(6, 'Park Güell', 'culture', 10.00, 2, 'Publicised park system composed of gardens and architectural elements.'),
(6, 'La Boqueria Market', 'food', 0.00, 1.5, 'Large public market in the Ciutat Vella district.');
-- Bangkok (7)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(7, 'Grand Palace', 'sightseeing', 15.00, 3, 'Complex of buildings at the heart of Bangkok.'),
(7, 'Wat Arun Visit', 'culture', 3.00, 1, 'Buddhist temple on the west bank of the Chao Phraya River.'),
(7, 'Street Food Adventure', 'food', 20.00, 3, 'Evening tour of Bangkok''s legendary street food.');
-- Dubai (8)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(8, 'Burj Khalifa Observation', 'sightseeing', 40.00, 2, 'World''s tallest building with observation decks.'),
(8, 'Desert Safari', 'adventure', 55.00, 6, 'Dune bashing, camel riding, and dinner in the desert.'),
(8, 'Dubai Mall Aquarium', 'sightseeing', 35.00, 2, 'One of the largest suspended aquariums in the world.');
-- Singapore (9)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(9, 'Gardens by the Bay', 'sightseeing', 20.00, 3, 'Nature park spanning 101 hectares in the Central Region.'),
(9, 'Sentosa Island Visit', 'adventure', 45.00, 5, 'Island resort with beaches and Universal Studios.'),
(9, 'Hawker Centre Feast', 'food', 15.00, 2, 'Authentic local dining experience at Maxwell or Newton.');
-- Bali (10)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(10, 'Ubud Monkey Forest', 'sightseeing', 5.00, 2, 'Sanctuary and natural habitat of the Balinese long-tailed monkey.'),
(10, 'Tegalalang Rice Terrace', 'sightseeing', 2.00, 1.5, 'Famous terraced rice paddies in Ubud.'),
(10, 'Surfing at Kuta Beach', 'adventure', 25.00, 2, 'Beginner-friendly surf lessons in Bali''s iconic beach.');

-- Seed Users
-- password is 'demo123'
INSERT INTO users (id, first_name, last_name, email, password_hash, is_admin) VALUES
(1, 'Demo', 'User', 'demo@traveloop.com', '$2a$10$wrg9uFK7PIE6cqsH/rQ.WefEKccbE5P2WEGkJZZy.oLJSUxUN4FqG', false),
(2, 'Admin', 'Traveloop', 'admin@traveloop.com', '$2a$10$wrg9uFK7PIE6cqsH/rQ.WefEKccbE5P2WEGkJZZy.oLJSUxUN4FqG', true);

-- Seed Trips for User 1
-- Trip 1: Europe 2025 (Upcoming)
INSERT INTO trips (id, user_id, name, place, start_date, end_date, status, is_public, cover_photo) VALUES
(1, 1, 'Summer Europe Trip', 'Paris & London', '2025-06-01', '2025-06-15', 'upcoming', true, 'https://images.unsplash.com/photo-1431274172761-fca41d930114');

-- Trip 2: Asia 2024 (Completed)
INSERT INTO trips (id, user_id, name, place, start_date, end_date, status, is_public, cover_photo) VALUES
(2, 1, 'Japan Discovery', 'Tokyo', '2024-03-10', '2024-03-20', 'completed', false, 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e');

-- Seed Sections for Trip 1 (Europe)
INSERT INTO trip_sections (id, trip_id, title, description, date_from, date_to, budget, section_type, order_index) VALUES
(1, 1, 'Hotel Pullman Paris', 'Stay near Eiffel Tower', '2025-06-01', '2025-06-05', 1200.00, 'hotel', 1),
(2, 1, 'Eurostar to London', 'Train across the channel', '2025-06-05', '2025-06-05', 150.00, 'transport', 2);

-- Seed Sections for Trip 2 (Japan)
INSERT INTO trip_sections (id, trip_id, title, description, date_from, date_to, budget, section_type, order_index) VALUES
(3, 2, 'Park Hyatt Tokyo', 'Lost in Translation hotel', '2024-03-10', '2024-03-15', 2500.00, 'hotel', 1),
(4, 2, 'Shinkansen Pass', 'Bullet train access', '2024-03-15', '2024-03-20', 400.00, 'transport', 2);

-- Seed Checklist for Trip 1
INSERT INTO checklist_items (trip_id, category, item_name, is_checked) VALUES
(1, 'documents', 'Passport', true),
(1, 'documents', 'Travel Insurance', false),
(1, 'electronics', 'Universal Adapter', false);

-- Seed Checklist for Trip 2
INSERT INTO checklist_items (trip_id, category, item_name, is_checked) VALUES
(2, 'documents', 'Passport', true),
(2, 'clothing', 'Winter Jacket', true),
(2, 'electronics', 'Pocket Wi-Fi', true);

-- Seed Notes for Trip 1
INSERT INTO trip_notes (trip_id, day_number, content) VALUES
(1, 1, 'Arrive at CDG airport, take RER B to city center.'),
(1, 5, 'Eurostar departs from Gare du Nord at 10:30 AM.');

-- Seed Notes for Trip 2
INSERT INTO trip_notes (trip_id, day_number, content) VALUES
(2, 1, 'Land at Narita, take Nex to Shinjuku.'),
(2, 3, 'Dinner reservation at Sukiyabashi Jiro.');

-- Seed Expenses for Trip 1
INSERT INTO expenses (trip_id, section_id, category, description, qty, unit, unit_cost, amount) VALUES
(1, 1, 'Accommodation', 'Pullman Paris Deposit', 1, 'booking', 400.00, 400.00),
(1, 2, 'Transport', 'Eurostar Ticket', 1, 'person', 150.00, 150.00);

-- Seed Expenses for Trip 2
INSERT INTO expenses (trip_id, section_id, category, description, qty, unit, unit_cost, amount) VALUES
(2, 3, 'Accommodation', 'Hotel Final Payment', 1, 'stay', 2500.00, 2500.00),
(2, 4, 'Transport', 'JR Pass Purchase', 1, 'pass', 400.00, 400.00);

-- Reset Serial Sequences
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips));
SELECT setval('cities_id_seq', (SELECT MAX(id) FROM cities));
SELECT setval('activities_id_seq', (SELECT MAX(id) FROM activities));
SELECT setval('trip_sections_id_seq', (SELECT MAX(id) FROM trip_sections));
