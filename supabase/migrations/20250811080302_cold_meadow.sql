/*
  # Seed Sample Data for QuickCourt

  1. Sample Data
    - Sample facilities with different sports
    - Sample courts for each facility
    - Sample bookings and reviews
    - Sample time slots

  2. Test Users
    - Regular user account
    - Facility owner account
    - Admin account
*/

-- Insert sample facilities (these will be created by facility owners)
INSERT INTO facilities (
  id,
  name,
  description,
  address,
  owner_id,
  sports,
  amenities,
  photos,
  rating,
  review_count,
  status,
  price_min,
  price_max,
  latitude,
  longitude
) VALUES 
(
  'f1e1e1e1-1111-1111-1111-111111111111',
  'Elite Sports Complex',
  'Premium sports facility with state-of-the-art equipment and professional courts.',
  '123 Sports Avenue, Downtown City',
  '00000000-0000-0000-0000-000000000002', -- This should match a facility owner user ID
  ARRAY['Badminton', 'Tennis', 'Basketball'],
  ARRAY['Parking', 'Locker Rooms', 'Cafeteria', 'Air Conditioning', 'Wi-Fi'],
  ARRAY[
    'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg',
    'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg',
    'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg'
  ],
  4.8,
  124,
  'approved',
  25.00,
  45.00,
  40.7128,
  -74.0060
),
(
  'f2e2e2e2-2222-2222-2222-222222222222',
  'City Badminton Center',
  'Specialized badminton facility with 8 professional courts and expert coaching.',
  '456 Racket Road, Sports District',
  '00000000-0000-0000-0000-000000000002',
  ARRAY['Badminton'],
  ARRAY['Parking', 'Equipment Rental', 'Coaching', 'Air Conditioning'],
  ARRAY[
    'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg',
    'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg'
  ],
  4.6,
  89,
  'approved',
  20.00,
  35.00,
  40.7580,
  -73.9855
),
(
  'f3e3e3e3-3333-3333-3333-333333333333',
  'Green Turf Grounds',
  'Large outdoor turf facility perfect for football and cricket matches.',
  '789 Field Lane, Green Valley',
  '00000000-0000-0000-0000-000000000002',
  ARRAY['Football', 'Cricket'],
  ARRAY['Parking', 'Flood Lights', 'Changing Rooms', 'Spectator Seating'],
  ARRAY[
    'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg',
    'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg'
  ],
  4.4,
  67,
  'approved',
  50.00,
  80.00,
  40.6892,
  -74.0445
),
(
  'f4e4e4e4-4444-4444-4444-444444444444',
  'Metro Tennis Club',
  'Premium tennis facility with both indoor and outdoor courts.',
  '321 Tennis Court, Uptown',
  '00000000-0000-0000-0000-000000000002',
  ARRAY['Tennis'],
  ARRAY['Parking', 'Pro Shop', 'Coaching', 'Restaurant', 'Swimming Pool'],
  ARRAY[
    'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg'
  ],
  4.9,
  156,
  'approved',
  30.00,
  60.00,
  40.7831,
  -73.9712
);

-- Insert sample courts
INSERT INTO courts (
  id,
  facility_id,
  name,
  sport_type,
  price_per_hour,
  operating_hours_start,
  operating_hours_end,
  is_active
) VALUES 
-- Elite Sports Complex courts
('c1111111-1111-1111-1111-111111111111', 'f1e1e1e1-1111-1111-1111-111111111111', 'Badminton Court 1', 'Badminton', 25.00, '06:00', '22:00', true),
('c2222222-2222-2222-2222-222222222222', 'f1e1e1e1-1111-1111-1111-111111111111', 'Badminton Court 2', 'Badminton', 25.00, '06:00', '22:00', true),
('c3333333-3333-3333-3333-333333333333', 'f1e1e1e1-1111-1111-1111-111111111111', 'Tennis Court 1', 'Tennis', 45.00, '06:00', '22:00', true),
('c4444444-4444-4444-4444-444444444444', 'f1e1e1e1-1111-1111-1111-111111111111', 'Basketball Court 1', 'Basketball', 35.00, '06:00', '23:00', true),

-- City Badminton Center courts
('c5555555-5555-5555-5555-555555555555', 'f2e2e2e2-2222-2222-2222-222222222222', 'Court A', 'Badminton', 20.00, '05:00', '23:00', true),
('c6666666-6666-6666-6666-666666666666', 'f2e2e2e2-2222-2222-2222-222222222222', 'Court B', 'Badminton', 20.00, '05:00', '23:00', true),
('c7777777-7777-7777-7777-777777777777', 'f2e2e2e2-2222-2222-2222-222222222222', 'Premium Court', 'Badminton', 35.00, '06:00', '22:00', true),

-- Green Turf Grounds courts
('c8888888-8888-8888-8888-888888888888', 'f3e3e3e3-3333-3333-3333-333333333333', 'Main Field', 'Football', 80.00, '06:00', '21:00', true),
('c9999999-9999-9999-9999-999999999999', 'f3e3e3e3-3333-3333-3333-333333333333', 'Practice Ground', 'Cricket', 50.00, '06:00', '20:00', true),

-- Metro Tennis Club courts
('c1010101-1010-1010-1010-101010101010', 'f4e4e4e4-4444-4444-4444-444444444444', 'Center Court', 'Tennis', 60.00, '06:00', '22:00', true),
('c1111111-1111-1111-1111-111111111112', 'f4e4e4e4-4444-4444-4444-444444444444', 'Court 2', 'Tennis', 45.00, '06:00', '22:00', true),
('c1212121-1212-1212-1212-121212121212', 'f4e4e4e4-4444-4444-4444-444444444444', 'Court 3', 'Tennis', 30.00, '06:00', '22:00', true);

-- Insert sample bookings (these will reference actual user IDs when users are created)
-- Note: These will be inserted after users sign up through the application

-- Insert sample reviews (these will also reference actual user IDs)
-- Note: These will be inserted after users sign up and make bookings

-- Generate time slots for the next 30 days for all courts
DO $$
DECLARE
  court_record RECORD;
  slot_date DATE;
  slot_time TIME;
  end_time TIME;
BEGIN
  -- Loop through all courts
  FOR court_record IN SELECT id, operating_hours_start, operating_hours_end FROM courts LOOP
    -- Loop through next 30 days
    FOR i IN 0..29 LOOP
      slot_date := CURRENT_DATE + i;
      slot_time := court_record.operating_hours_start;
      
      -- Generate hourly slots for each day
      WHILE slot_time < court_record.operating_hours_end LOOP
        end_time := slot_time + INTERVAL '1 hour';
        
        -- Only insert if end time doesn't exceed operating hours
        IF end_time <= court_record.operating_hours_end THEN
          INSERT INTO time_slots (
            court_id,
            slot_date,
            start_time,
            end_time,
            is_available,
            is_blocked
          ) VALUES (
            court_record.id,
            slot_date,
            slot_time,
            end_time,
            true,
            false
          );
        END IF;
        
        slot_time := slot_time + INTERVAL '1 hour';
      END LOOP;
    END LOOP;
  END LOOP;
END $$;