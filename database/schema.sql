create extension if not exists "pgcrypto";

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  business_type text not null,
  use_case text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.outreach_leads (
  id uuid primary key default gen_random_uuid(),
  business text not null,
  contact text not null,
  category text not null default 'Local business',
  status text not null default 'Queued',
  last_touch date not null default current_date,
  use_case text not null,
  created_at timestamptz not null default now()
);

alter table public.demo_requests enable row level security;
alter table public.outreach_leads enable row level security;

create policy "service role can manage demo requests"
  on public.demo_requests
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "service role can manage outreach leads"
  on public.outreach_leads
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create index if not exists demo_requests_created_at_idx
  on public.demo_requests (created_at desc);

create index if not exists outreach_leads_created_at_idx
  on public.outreach_leads (created_at desc);
