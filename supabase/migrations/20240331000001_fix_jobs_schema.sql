-- Fix jobs table schema to match TypeScript interface
-- Add company column if it doesn't exist
DO $$ BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'jobs' AND column_name = 'company'
  ) THEN
    ALTER TABLE jobs ADD COLUMN company TEXT;
  END IF;
END $$;

-- Rename 'type' column to 'job_type' if it exists and 'job_type' doesn't exist
DO $$ BEGIN 
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'jobs' AND column_name = 'type'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'jobs' AND column_name = 'job_type'
  ) THEN
    ALTER TABLE jobs RENAME COLUMN type TO job_type;
  END IF;
END $$;

-- Add job_type column if it doesn't exist (in case 'type' was already renamed)
DO $$ BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'jobs' AND column_name = 'job_type'
  ) THEN
    ALTER TABLE jobs ADD COLUMN job_type TEXT DEFAULT 'Full-time';
  END IF;
END $$;

-- Update any existing rows to have default values
UPDATE jobs SET company = 'Legend Holding Group' WHERE company IS NULL;
UPDATE jobs SET job_type = 'Full-time' WHERE job_type IS NULL;

-- Make company column NOT NULL after setting default values
ALTER TABLE jobs ALTER COLUMN company SET NOT NULL;
ALTER TABLE jobs ALTER COLUMN job_type SET NOT NULL; 