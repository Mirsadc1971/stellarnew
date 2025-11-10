/*
  # Contact Forms Database Schema

  1. New Tables
    - `contact_inquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text, optional)
      - `company` (text, optional)
      - `inquiry_type` (text) - general, property_management, quote, maintenance
      - `property_address` (text, optional)
      - `number_of_units` (integer, optional)
      - `message` (text)
      - `created_at` (timestamp)
      - `status` (text) - new, contacted, resolved
      
  2. Security
    - Enable RLS on `contact_inquiries` table
    - Add policy for public inserts (anyone can submit a form)
    - Add policy for authenticated admin users to view all inquiries
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  inquiry_type text NOT NULL DEFAULT 'general',
  property_address text,
  number_of_units integer,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
  ON contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);