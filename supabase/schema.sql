-- Apply in a Supabase project. Auth identities are managed by Supabase Auth.
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  careers_url text
);
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id),
  title text not null,
  description text,
  location text,
  source_url text not null,
  official_url text,
  verification_status text not null default 'unverified',
  confidence_score integer not null default 0 check (confidence_score between 0 and 100),
  first_seen_at timestamptz not null default now(),
  last_checked_at timestamptz
);
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  job_id uuid not null references public.jobs(id),
  status text not null default 'saved',
  cv_url text,
  applied_at timestamptz
);
create table if not exists public.job_verifications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id),
  checked_at timestamptz not null default now(),
  official_listing_found boolean,
  duplicate_detected boolean,
  verification_notes text
);
alter table public.companies enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.job_verifications enable row level security;
create policy "Users read own applications" on public.applications for select to authenticated using (auth.uid() = user_id);
create policy "Users create own applications" on public.applications for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own applications" on public.applications for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- No public access to jobs/companies/verifications until ingestion and moderation are implemented.
