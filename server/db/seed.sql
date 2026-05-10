-- Seed Cities
INSERT INTO cities (name, country, region, cost_index, popularity, image_url) VALUES
('Paris', 'France', 'Europe', 4, 5, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'),
('London', 'UK', 'Europe', 4, 5, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'),
('Tokyo', 'Japan', 'Asia', 4, 5, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf');

-- Seed User
INSERT INTO users (first_name, last_name, email, password_hash) VALUES
('Demo', 'User', 'demo@traveloop.com', '$2a$10$7vC/Y/lO.D/qJ/v/w/k.O.a/m.l/m/l/m/l/m/l/m/l/m/l/m/l/m/l/m/l/m'); -- hash for 'demo123'
