/*
  # Create booking transaction function

  1. Function
    - `create_booking_transaction` - Atomically creates a booking and updates time slot availability
    
  2. Security
    - Function runs with security definer to ensure proper access control
*/

CREATE OR REPLACE FUNCTION create_booking_transaction(
  p_user_id uuid,
  p_facility_id uuid,
  p_court_id uuid,
  p_booking_date date,
  p_start_time time,
  p_end_time time,
  p_total_price numeric
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  booking_id uuid;
  slot_exists boolean;
BEGIN
  -- Check if the time slot is available
  SELECT EXISTS(
    SELECT 1 FROM time_slots 
    WHERE court_id = p_court_id 
    AND slot_date = p_booking_date 
    AND start_time = p_start_time 
    AND end_time = p_end_time
    AND is_available = true 
    AND is_blocked = false
  ) INTO slot_exists;
  
  IF NOT slot_exists THEN
    RAISE EXCEPTION 'Time slot is not available';
  END IF;
  
  -- Create the booking
  INSERT INTO bookings (
    user_id,
    facility_id,
    court_id,
    booking_date,
    start_time,
    end_time,
    total_price,
    status,
    payment_status
  ) VALUES (
    p_user_id,
    p_facility_id,
    p_court_id,
    p_booking_date,
    p_start_time,
    p_end_time,
    p_total_price,
    'confirmed',
    'pending'
  ) RETURNING id INTO booking_id;
  
  -- Mark the time slot as unavailable
  UPDATE time_slots 
  SET is_available = false 
  WHERE court_id = p_court_id 
  AND slot_date = p_booking_date 
  AND start_time = p_start_time 
  AND end_time = p_end_time;
  
  RETURN booking_id;
END;
$$;