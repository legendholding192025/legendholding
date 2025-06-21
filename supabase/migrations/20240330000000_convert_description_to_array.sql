-- Convert description field from TEXT to TEXT[] to support bullet points
-- First, add a new column with the array type
ALTER TABLE jobs ADD COLUMN description_array TEXT[];

-- Copy existing description data to the new array column
-- Split by newlines and filter out empty lines
UPDATE jobs 
SET description_array = (
  SELECT array_agg(trim(line))
  FROM (
    SELECT unnest(string_to_array(description, E'\n')) as line
  ) t
  WHERE trim(line) != ''
);

-- Drop the old description column
ALTER TABLE jobs DROP COLUMN description;

-- Rename the new column to description
ALTER TABLE jobs RENAME COLUMN description_array TO description;

-- Add NOT NULL constraint back
ALTER TABLE jobs ALTER COLUMN description SET NOT NULL;

-- Add default empty array
ALTER TABLE jobs ALTER COLUMN description SET DEFAULT '{}'; 