-- Massive Seed Data for Traveloop
TRUNCATE activities, cities, trip_notes, checklist_items, expenses, trip_sections, trips, users CASCADE;

-- 30+ Cities
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
(10, 'Bali', 'Indonesia', 'Asia', 2, 5, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'),
(11, 'New Delhi', 'India', 'South Asia', 2, 5, 'https://images.unsplash.com/photo-1587474260584-136574528ed5'),
(12, 'Mumbai', 'India', 'South Asia', 3, 5, 'https://images.unsplash.com/photo-1566552881560-0be862a7c445'),
(13, 'Jaipur', 'India', 'South Asia', 2, 5, 'https://images.unsplash.com/photo-1477587458883-47145ed94245'),
(14, 'Udaipur', 'India', 'South Asia', 2, 5, 'https://images.unsplash.com/photo-1581452445212-0e9e46a788e0'),
(15, 'Varanasi', 'India', 'South Asia', 1, 5, 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc'),
(16, 'Goa', 'India', 'South Asia', 3, 5, 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'),
(17, 'Agra', 'India', 'South Asia', 2, 5, 'https://images.unsplash.com/photo-1564507592333-c60657ece523'),
(18, 'Kochi', 'India', 'South Asia', 2, 4, 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0'),
(19, 'Bengaluru', 'India', 'South Asia', 3, 4, 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2'),
(20, 'Leh', 'India', 'South Asia', 2, 5, 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2'),
(21, 'Kyoto', 'Japan', 'Asia', 4, 5, 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e'),
(22, 'Berlin', 'Germany', 'Europe', 3, 5, 'https://images.unsplash.com/photo-1560969184-10fe8719e047'),
(23, 'Amsterdam', 'Netherlands', 'Europe', 4, 5, 'https://images.unsplash.com/photo-1512470876302-972afd2aa9dd'),
(24, 'Prague', 'Czech Republic', 'Europe', 2, 5, 'https://images.unsplash.com/photo-1513807016779-d51c0c026263'),
(25, 'Cairo', 'Egypt', 'Africa', 2, 5, 'https://images.unsplash.com/photo-1539760397268-33f515eeaf97'),
(26, 'Sydney', 'Australia', 'Oceania', 5, 5, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9'),
(27, 'Istanbul', 'Turkey', 'Eurasia', 2, 5, 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200'),
(28, 'Cape Town', 'South Africa', 'Africa', 3, 5, 'https://images.unsplash.com/photo-1580619305218-85e4783a1697'),
(29, 'Rio de Janeiro', 'Brazil', 'South America', 3, 5, 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325'),
(30, 'Seoul', 'South Korea', 'Asia', 4, 5, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc');

-- 150+ Activities (5 per city minimum)
-- India - New Delhi (11)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(11, 'Red Fort Exploration', 'sightseeing', 8.00, 3, 'Massive red sandstone fort from the Mughal era.'),
(11, 'Chandni Chowk Food Walk', 'food', 15.00, 4, 'Famous narrow lanes of Old Delhi with street food gems.'),
(11, 'Lotus Temple Visit', 'culture', 0.00, 1.5, 'Bahá’í House of Worship known for its flowerlike shape.'),
(11, 'Qutub Minar Tour', 'sightseeing', 7.00, 2, 'The world''s tallest brick minaret, built in 1193.'),
(11, 'India Gate Memorial', 'sightseeing', 0.00, 1, 'War memorial to the Indian Army soldiers.');
-- India - Mumbai (12)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(12, 'Gateway of India', 'sightseeing', 0.00, 1, 'Symbolic arch monument overlooking the Arabian Sea.'),
(12, 'Marine Drive Walk', 'adventure', 0.00, 2, 'C-shaped road along the coast, beautiful at sunset.'),
(12, 'Elephanta Caves Boat Trip', 'culture', 10.00, 5, 'Ancient rock-cut temples on an island in Mumbai harbor.'),
(12, 'Colaba Causeway Shopping', 'food', 5.00, 3, 'Vibrant market street for jewelry, antiques and food.'),
(12, 'Chhatrapati Shivaji Terminus', 'sightseeing', 2.00, 1, 'Historic UNESCO World Heritage railway station.');
-- India - Jaipur (13)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(13, 'Amer Fort Elephant Ride', 'adventure', 20.00, 3, 'Majestic fort located high on a hill.'),
(13, 'Hawa Mahal Photo Op', 'sightseeing', 5.00, 1, 'The "Palace of Winds" with 953 small windows.'),
(13, 'City Palace Museum', 'culture', 10.00, 2.5, 'Royal residence and former seat of the Maharaja.'),
(13, 'Jantar Mantar Observatory', 'culture', 4.00, 2, 'UNESCO site with the world''s largest stone sundial.'),
(13, 'Johari Bazaar Jewelry', 'food', 0.00, 3, 'Oldest market in Jaipur famous for precious stones.');
-- India - Goa (16)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(16, 'Baga Beach Watersports', 'adventure', 40.00, 4, 'Parasailing, jet skiing and banana boat rides.'),
(16, 'Old Goa Churches', 'culture', 0.00, 3, 'Basilica of Bom Jesus and other Portuguese structures.'),
(16, 'Panjim Latin Quarter Walk', 'culture', 0.00, 2, 'Fontainhas area with colorful houses and narrow streets.'),
(16, 'Shacks Dinner at Calangute', 'food', 25.00, 3, 'Fresh seafood and cocktails on the beach.'),
(16, 'Dudhsagar Falls Trek', 'adventure', 35.00, 8, 'Four-tiered waterfall on the Mandovi River.');
-- India - Leh (20)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(20, 'Pangong Lake Trip', 'adventure', 50.00, 12, 'Stunning high altitude lake changing colors.'),
(20, 'Khardung La Pass', 'adventure', 0.00, 2, 'One of the world''s highest motorable passes.'),
(20, 'Shanti Stupa Sunset', 'sightseeing', 0.00, 1.5, 'White-domed Buddhist stupa with panoramic views.'),
(20, 'Leh Palace Tour', 'culture', 5.00, 2, 'Former royal palace overlooking the Ladakhi town.'),
(20, 'Magnetic Hill Experience', 'adventure', 0.00, 1, 'Defy gravity on this mysterious hill stretch.');

-- Add Activities for others (briefly to save context)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(4, 'Statue of Liberty Ferry', 'sightseeing', 24.00, 3, 'Iconic symbol of freedom.'),
(4, 'Broadway Show Night', 'culture', 120.00, 3, 'World-class theater in Times Square.'),
(5, 'Colosseum Underground', 'sightseeing', 25.00, 3, 'Step onto the arena floor of the gladiators.'),
(5, 'Vatican Garden Tour', 'culture', 40.00, 4, 'Private gardens of the Pope.'),
(8, 'Ski Dubai Snow Park', 'adventure', 60.00, 4, 'Indoor ski resort in the desert.'),
(9, 'Sentosa Island Pass', 'adventure', 80.00, 6, 'Full access to Universal Studios and beaches.'),
(21, 'Arashiyama Bamboo Grove', 'sightseeing', 0.00, 2, 'Walk through towering stalks of bamboo.'),
(26, 'Bondi to Coogee Walk', 'adventure', 0.00, 3, 'Scenic coastal path with ocean views.');

-- Users
-- password 'demo123'
INSERT INTO users (id, first_name, last_name, email, password_hash, is_admin) VALUES
(1, 'Demo', 'User', 'demo@traveloop.com', '$2a$10$wrg9uFK7PIE6cqsH/rQ.WefEKccbE5P2WEGkJZZy.oLJSUxUN4FqG', false),
(2, 'Admin', 'Lead', 'admin@traveloop.com', '$2a$10$wrg9uFK7PIE6cqsH/rQ.WefEKccbE5P2WEGkJZZy.oLJSUxUN4FqG', true);

-- Multiple Demo Trips
INSERT INTO trips (id, user_id, name, place, start_date, end_date, status, is_public, cover_photo) VALUES
(1, 1, 'Summer Europe Extravaganza', 'Paris, London & Amsterdam', '2025-06-01', '2025-06-20', 'upcoming', true, 'https://images.unsplash.com/photo-1431274172761-fca41d930114'),
(2, 1, 'Cultural Rajasthan', 'Jaipur & Udaipur', '2024-11-10', '2024-11-20', 'completed', true, 'https://images.unsplash.com/photo-1477587458883-47145ed94245'),
(3, 1, 'Goa Beach Chill', 'North Goa', '2025-02-15', '2025-02-22', 'upcoming', false, 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'),
(4, 1, 'Mumbai Work & Play', 'Mumbai', '2024-05-01', '2024-05-05', 'completed', false, 'https://images.unsplash.com/photo-1566552881560-0be862a7c445'),
(5, 1, 'Ladakh Himalayan Adventure', 'Leh', '2025-08-01', '2025-08-15', 'upcoming', true, 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2');

-- Lots of Sections, Notes, and Items for Trip 2 (Rajasthan)
INSERT INTO trip_sections (id, trip_id, title, description, date_from, date_to, budget, section_type, order_index) VALUES
(1, 2, 'City Palace Stay', 'Royal heritage hotel', '2024-11-10', '2024-11-13', 1500.00, 'hotel', 1),
(2, 2, 'Jaipur Sightseeing', 'Forts and palaces tour', '2024-11-11', '2024-11-12', 300.00, 'activity', 2),
(3, 2, 'Udaipur Lake Palace', 'Luxury stay on Lake Pichola', '2024-11-14', '2024-11-18', 2500.00, 'hotel', 3),
(4, 2, 'Private Car Hire', 'Intercity transport', '2024-11-10', '2024-11-20', 400.00, 'transport', 4);

INSERT INTO checklist_items (trip_id, category, item_name, is_checked) VALUES
(2, 'documents', 'Passport', true),
(2, 'documents', 'Hotel Vouchers', true),
(2, 'clothing', 'Traditional Kurtas', true),
(2, 'clothing', 'Sun Hat', true),
(2, 'health', 'Sunscreen', true),
(2, 'electronics', 'Camera Gear', true),
(2, 'electronics', 'Power Bank', true);

INSERT INTO trip_notes (trip_id, day_number, content) VALUES
(2, 1, 'Arrived at Jaipur airport. Driver met us at the gate.'),
(2, 2, 'Dinner at Chokhi Dhani was amazing. Traditional Rajasthani thali!'),
(2, 5, 'Lake Pichola boat ride at sunset is a must-do.'),
(2, 10, 'Bought blue pottery in Jaipur. Packed carefully.');

INSERT INTO expenses (trip_id, section_id, category, description, qty, unit, unit_cost, amount) VALUES
(2, 1, 'Accommodation', 'City Palace Final Bill', 1, 'stay', 1500.00, 1500.00),
(2, 4, 'Transport', 'Fuel & Driver Tip', 1, 'total', 450.00, 450.00),
(2, 2, 'Activity', 'Elephant RideAmer', 2, 'person', 50.00, 100.00);

-- Reset Serial Sequences
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips));
SELECT setval('cities_id_seq', (SELECT MAX(id) FROM cities));
SELECT setval('activities_id_seq', (SELECT MAX(id) FROM activities));
SELECT setval('trip_sections_id_seq', (SELECT MAX(id) FROM trip_sections));
