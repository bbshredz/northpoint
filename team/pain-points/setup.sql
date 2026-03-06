-- Run once in Supabase SQL Editor
-- NorthPoint — Leadership Pain Points table

create table if not exists pain_points (
  id            uuid primary key default gen_random_uuid(),
  contact_name  text not null,
  title         text,
  department    text,
  pain_points   text,
  priority      text default 'medium' check (priority in ('high','medium','low')),
  status        text default 'open' check (status in ('open','in-progress','addressed')),
  date_captured date default current_date,
  notes         text,
  created_by    text,
  created_at    timestamptz default now()
);

alter table pain_points enable row level security;

create policy "authenticated_all" on pain_points
  for all
  using (auth.role() = 'authenticated');
