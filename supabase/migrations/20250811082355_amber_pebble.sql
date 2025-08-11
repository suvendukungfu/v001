/*
  # Add anon user policy for users table

  1. Security
    - Add policy for anon users to read their own profile during signup
    - This allows the registration process to work properly

  2. Changes
    - Grant SELECT permission to anon role on users table
    - Users can only read their own profile using auth.uid()
*/

-- Add policy for anon users to read own profile during signup
CREATE POLICY "Anon users can read own profile during signup"
  ON users FOR SELECT
  TO anon
  USING (auth.uid() = id);