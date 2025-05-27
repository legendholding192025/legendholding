-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow users to submit applications" ON public.job_applications;
DROP POLICY IF EXISTS "Allow users to view their own applications" ON public.job_applications;
-- Recreate policies with updated conditions
CREATE POLICY "Allow users to submit applications" ON public.job_applications FOR
INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow users to view their own applications" ON public.job_applications FOR
SELECT USING (
        auth.uid() IN (
            SELECT auth.uid()
            FROM auth.users
            WHERE auth.users.email = job_applications.email
        )
    );
-- Ensure the storage bucket exists
DO $$ BEGIN
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true) ON CONFLICT (id) DO NOTHING;
END $$;
-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to resumes" ON storage.objects;
-- Recreate storage policies
CREATE POLICY "Allow authenticated users to upload resumes" ON storage.objects FOR
INSERT TO authenticated WITH CHECK (
        bucket_id = 'resumes'
        AND (storage.foldername(name)) [1] != 'private'
    );
CREATE POLICY "Allow public access to resumes" ON storage.objects FOR
SELECT TO public USING (bucket_id = 'resumes');