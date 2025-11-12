/*
  # Create Form Submissions Tables

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `company` (text)
      - `inquiry_type` (text)
      - `property_address` (text)
      - `number_of_units` (text)
      - `board_position` (text)
      - `years_at_property` (text)
      - `previous_experience` (text)
      - `message` (text)
      - `created_at` (timestamptz)
    
    - `violation_submissions`
      - `id` (uuid, primary key)
      - `reporter_name` (text)
      - `reporter_unit_address` (text)
      - `reporter_contact` (text)
      - `report_date` (date)
      - `violator_name` (text)
      - `violator_unit` (text)
      - `violation_types` (text)
      - `violation_details` (text)
      - `reported_before` (text)
      - `requested_action` (text)
      - `signature` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Add policy for public insert access (form submissions)
    - Add policy for authenticated read access (admin view)

  3. Important Notes
    - Forms are publicly accessible for submission
    - Only authenticated users can view submissions
    - All submissions are timestamped automatically
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  inquiry_type text NOT NULL,
  property_address text,
  number_of_units text,
  board_position text,
  years_at_property text,
  previous_experience text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS violation_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name text NOT NULL,
  reporter_unit_address text NOT NULL,
  reporter_contact text NOT NULL,
  report_date date NOT NULL,
  violator_name text,
  violator_unit text,
  violation_types text NOT NULL,
  violation_details text NOT NULL,
  reported_before text NOT NULL,
  requested_action text NOT NULL,
  signature text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE violation_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can submit violation report"
  ON violation_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view violation submissions"
  ON violation_submissions
  FOR SELECT
  TO authenticated
  USING (true);
