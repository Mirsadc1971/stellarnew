/*
  # Create Board Nominations Table

  1. New Tables
    - `board_nominations`
      - `id` (uuid, primary key) - Unique identifier for each nomination
      - `nominee_name` (text) - Full name of the nominee
      - `nominee_email` (text) - Email address of the nominee
      - `nominee_phone` (text) - Phone number of the nominee
      - `nominee_unit_address` (text) - Unit address of the nominee
      - `years_at_property` (text) - How long they've lived at the property
      - `ownership_type` (text) - Owner or renter status
      - `current_employment` (text) - Current job/profession
      - `previous_board_experience` (text) - Past board experience
      - `relevant_skills` (text) - Skills and expertise relevant to board service
      - `motivation` (text) - Why they want to serve on the board
      - `time_commitment` (text) - Whether they can commit to monthly meetings
      - `nominee_references` (text) - References provided
      - `signature` (text) - Digital signature
      - `acknowledged_terms` (boolean) - Acknowledged fiduciary duties
      - `acknowledged_commitment` (boolean) - Acknowledged time commitment
      - `acknowledged_attendance` (boolean) - Acknowledged attendance requirement
      - `created_at` (timestamptz) - When the nomination was submitted
      
  2. Security
    - Enable RLS on `board_nominations` table
    - Add policy for public inserts (anyone can submit a nomination)
    - Add policy for authenticated users to view all nominations (admin access)
*/

CREATE TABLE IF NOT EXISTS board_nominations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nominee_name text NOT NULL,
  nominee_email text NOT NULL,
  nominee_phone text NOT NULL,
  nominee_unit_address text NOT NULL,
  years_at_property text NOT NULL,
  ownership_type text NOT NULL DEFAULT 'owner',
  current_employment text DEFAULT '',
  previous_board_experience text DEFAULT '',
  relevant_skills text NOT NULL,
  motivation text NOT NULL,
  time_commitment text NOT NULL DEFAULT 'yes',
  nominee_references text DEFAULT '',
  signature text NOT NULL,
  acknowledged_terms boolean NOT NULL DEFAULT false,
  acknowledged_commitment boolean NOT NULL DEFAULT false,
  acknowledged_attendance boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE board_nominations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit board nominations"
  ON board_nominations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view board nominations"
  ON board_nominations
  FOR SELECT
  TO authenticated
  USING (true);