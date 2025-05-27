-- Enable RLS
alter table job_applications enable row level security;
-- Create storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', true) on conflict (id) do nothing;
-- Policy for uploading resumes (anyone can upload)
create policy "Anyone can upload resumes" on storage.objects for
insert to public with check (
        bucket_id = 'resumes'
        and (storage.foldername(name)) [1] != 'private'
    );
-- Policy for reading resumes (anyone can read)
create policy "Anyone can read resumes" on storage.objects for
select to public using (bucket_id = 'resumes');
-- Policy for inserting job applications
create policy "Anyone can submit job applications" on public.job_applications for
insert to public with check (true);
-- Policy for reading own job applications
create policy "Users can read their own applications" on public.job_applications for
select to public using (email = auth.jwt()->>'email');
-- Create job_applications table if it doesn't exist
create table if not exists public.job_applications (
    id uuid default gen_random_uuid() primary key,
    job_id uuid references jobs(id),
    full_name text not null,
    email text not null,
    phone text not null,
    resume_url text not null,
    cover_letter text,
    status text default 'pending',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);