/*
  # Add Board Nomination Fields

  1. Changes
    - Add `board_position` (text, optional) - president, vice_president, treasurer, secretary, board_member
    - Add `years_at_property` (numeric, optional) - how many years the applicant has lived at the property
    - Add `previous_experience` (text, optional) - none, some, extensive
  
  2. Notes
    - These fields are used when inquiry_type is 'board_nomination'
    - Fields are nullable as they're only relevant for board nomination inquiries
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_inquiries' AND column_name = 'board_position'
  ) THEN
    ALTER TABLE contact_inquiries ADD COLUMN board_position text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_inquiries' AND column_name = 'years_at_property'
  ) THEN
    ALTER TABLE contact_inquiries ADD COLUMN years_at_property numeric;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_inquiries' AND column_name = 'previous_experience'
  ) THEN
    ALTER TABLE contact_inquiries ADD COLUMN previous_experience text;
  END IF;
END $$;
