/*
  # Violation Reports Database Schema

  1. New Tables
    - `violation_reports`
      - `id` (uuid, primary key)
      - `reporter_name` (text)
      - `reporter_unit_address` (text)
      - `reporter_contact` (text) - phone or email
      - `report_date` (date)
      - `violator_name` (text, optional)
      - `violator_unit` (text, optional)
      - `violation_types` (text[]) - array of violation types
      - `violation_details` (text)
      - `reported_before` (boolean)
      - `requested_action` (text)
      - `signature` (text)
      - `acknowledged_sharing` (boolean)
      - `certified_accurate` (boolean)
      - `acknowledged_contact` (boolean)
      - `status` (text) - new, under_investigation, resolved
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on `violation_reports` table
    - Add policy for public inserts (anyone can submit a report)
    - Add policy for authenticated admin users to view all reports
*/

CREATE TABLE IF NOT EXISTS violation_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name text NOT NULL,
  reporter_unit_address text NOT NULL,
  reporter_contact text NOT NULL,
  report_date date NOT NULL,
  violator_name text,
  violator_unit text,
  violation_types text[] NOT NULL,
  violation_details text NOT NULL,
  reported_before boolean NOT NULL DEFAULT false,
  requested_action text NOT NULL,
  signature text NOT NULL,
  acknowledged_sharing boolean NOT NULL DEFAULT false,
  certified_accurate boolean NOT NULL DEFAULT false,
  acknowledged_contact boolean NOT NULL DEFAULT false,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE violation_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit violation reports"
  ON violation_reports
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all reports"
  ON violation_reports
  FOR SELECT
  TO authenticated
  USING (true);