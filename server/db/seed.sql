-- Clean up existing data
TRUNCATE activities, cities, trip_notes, checklist_items, expenses, trip_sections, trips, users CASCADE;

-- Seed Users
INSERT INTO users (first_name, last_name, email, password_hash, city, country) VALUES
('Demo', 'User', 'demo@traveloop.com', '$2a$10$7vC/Y/lO.D/qJ/v/w/k.O.a/m.l/m/l/m/l/m/l/m/l/m/l/m/l/m/l/m/l/m', 'New York', 'USA'),
('Admin', 'Traveloop', 'admin@traveloop.com', '$2a$10$7vC/Y/lO.D/qJ/v/w/k.O.a/m.l/m/l/m/l/m/l/m/l/m/l/m/l/m/l/m/l/m', 'London', 'UK');

-- Seed Cities
INSERT INTO cities (name, country, region, cost_index, popularity, image_url) VALUES
('Paris', 'France', 'Europe', 4, 5, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'),
('London', 'UK', 'Europe', 4, 5, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'),
('Tokyo', 'Japan', 'Asia', 4, 5, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'),
('New York', 'USA', 'North America', 5, 5, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'),
('Rome', 'Italy', 'Europe', 3, 5, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5'),
('Barcelona', 'Spain', 'Europe', 3, 4, 'https://images.unsplash.com/photo-1583422409516-2895a77efded'),
('Bangkok', 'Thailand', 'Asia', 2, 5, 'https://images.unsplash.com/photo-1508009603885-50cf7c579367'),
('Dubai', 'UAE', 'Middle East', 5, 4, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'),
('Singapore', 'Singapore', 'Asia', 4, 4, 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fd6'),
('Bali', 'Indonesia', 'Asia', 2, 5, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4');

-- Seed Activities (3 per city = 30 total)
-- Paris (ID 1)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(1, 'Eiffel Tower Visit', 'Sightseeing', 25.00, 2.0, 'Iconic landmark with city views.'),
(1, 'Louvre Museum Tour', 'Culture', 17.00, 4.0, 'World largest art museum.'),
(1, 'Seine River Cruise', 'Relaxation', 15.00, 1.0, 'Beautiful boat ride through the city heart.');

-- London (ID 2)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(2, 'London Eye', 'Sightseeing', 30.00, 1.0, 'Giant Ferris wheel on the South Bank.'),
(2, 'British Museum', 'Culture', 0.00, 3.0, 'Dedicated to human history, art and culture.'),
(2, 'Afternoon Tea at The Ritz', 'Food', 60.00, 2.0, 'Traditional British tea experience.');

-- Tokyo (ID 3)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(3, 'Shibuya Crossing Walk', 'Sightseeing', 0.00, 0.5, 'The world busiest pedestrian crossing.'),
(3, 'Tsukiji Outer Market', 'Food', 20.00, 2.0, 'Fresh seafood and Japanese delicacies.'),
(3, 'Akihabara Tech Tour', 'Shopping', 0.00, 3.0, 'Electronic and anime hub.');

-- New York (ID 4)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(4, 'Statue of Liberty Ferry', 'Sightseeing', 24.00, 3.0, 'Visit the symbol of freedom.'),
(4, 'Central Park Bike Ride', 'Adventure', 15.00, 2.0, 'Explore the green heart of Manhattan.'),
(4, 'Broadway Show', 'Entertainment', 120.00, 3.0, 'World-class musical performance.');

-- Rome (ID 5)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(5, 'Colosseum Tour', 'History', 16.00, 2.0, 'Ancient gladiatorial arena.'),
(5, 'Vatican Museums', 'Culture', 17.00, 4.0, 'Home to the Sistine Chapel.'),
(5, 'Trastevere Food Walk', 'Food', 45.00, 3.0, 'Taste authentic Roman pasta and gelato.');

-- Barcelona (ID 6)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(6, 'Sagrada Familia', 'Architecture', 26.00, 2.0, 'Gaudis unfinished masterpiece.'),
(6, 'Park Guell', 'Relaxation', 10.00, 2.0, 'Whimsical park with mosaic views.'),
(6, 'Tapas Tour in Gothic Quarter', 'Food', 50.00, 3.0, 'Traditional Spanish snacks and wine.');

-- Bangkok (ID 7)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(7, 'Grand Palace', 'Culture', 15.00, 3.0, 'Official residence of the Kings of Siam.'),
(7, 'Wat Arun Temple', 'Sightseeing', 2.00, 1.0, 'Stunning riverside temple.'),
(7, 'Chatuchak Weekend Market', 'Shopping', 0.00, 4.0, 'One of the worlds largest outdoor markets.');

-- Dubai (ID 8)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(8, 'Burj Khalifa Top Floor', 'Sightseeing', 45.00, 2.0, 'The worlds tallest building.'),
(8, 'Desert Safari', 'Adventure', 60.00, 6.0, 'Dune bashing and camel rides.'),
(8, 'Dubai Mall Aquarium', 'Entertainment', 35.00, 2.0, 'Huge underwater zoo.');

-- Singapore (ID 9)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(9, 'Gardens by the Bay', 'Nature', 20.00, 3.0, 'Futuristic park with Supertree Grove.'),
(9, 'Marina Bay Sands View', 'Sightseeing', 25.00, 1.0, 'Iconic hotel with rooftop observation.'),
(9, 'Hawker Center Food Tour', 'Food', 15.00, 2.0, 'Diverse street food at low prices.');

-- Bali (ID 10)
INSERT INTO activities (city_id, name, type, cost, duration_hours, description) VALUES
(10, 'Uluwatu Temple Sunset', 'Culture', 5.00, 2.0, 'Cliffside temple with Kecak dance.'),
(10, 'Tegalalang Rice Terrace', 'Nature', 2.00, 2.0, 'Stunning terraced landscapes.'),
(10, 'Surfing at Kuta Beach', 'Adventure', 20.00, 2.0, 'Learn to surf in tropical waters.');

-- Seed initial trips for Demo User (ID 1)
INSERT INTO trips (user_id, name, place, start_date, end_date, status) VALUES
(1, 'European Dream', 'Paris & London', '2026-06-01', '2026-06-15', 'upcoming'),
(1, 'Tokyo Explorer', 'Tokyo', '2026-04-10', '2026-04-20', 'completed');
