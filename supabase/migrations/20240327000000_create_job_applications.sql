-- Create a secure bucket for storing resumes
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', true);
-- Create policy to allow authenticated users to upload resumes
create policy "Allow authenticated users to upload resumes" on storage.objects for
insert to authenticated with check (
        bucket_id = 'resumes'
        AND (storage.foldername(name)) [1] != 'private'
    );
-- Create policy to allow public access to resumes
create policy "Allow public access to resumes" on storage.objects for
select to public using (bucket_id = 'resumes');
-- Create job applications table
create table public.job_applications (
    id uuid default gen_random_uuid() primary key,
    job_id uuid references public.jobs(id) on delete cascade,
    full_name text not null,
    email text not null,
    phone text not null,
    resume_url text not null,
    cover_letter text,
    status text default 'pending' check (
        status in ('pending', 'reviewed', 'accepted', 'rejected')
    ),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable RLS
alter table public.job_applications enable row level security;
-- Create policy to allow authenticated users to insert applications
create policy "Allow users to submit applications" on public.job_applications for
insert to public with check (true);
-- Create policy to allow authenticated users to view their own applications
create policy "Allow users to view their own applications" on public.job_applications for
select using (
        auth.uid() in (
            select auth.uid()
            from auth.users
            where auth.users.email = job_applications.email
        )
    );
-- Create updated_at trigger
create trigger set_updated_at before
update on public.job_applications for each row execute function public.set_updated_at();