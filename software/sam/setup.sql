-- Run once in Supabase SQL Editor
-- NorthPoint — Software Asset Management table

create table if not exists software_assets (
  id                 uuid primary key default gen_random_uuid(),
  software_name      text not null,
  vendor             text,
  status             text default 'Unknown'
                       check (status in (
                         'In service','Under Review','Upcoming Renewal',
                         'Archived','EOL Approaching','Unknown'
                       )),
  system_owner       text,
  facility           text,
  summary_verified   boolean default false,
  software_summary   text,
  aliases            text,
  tags               text,
  price              numeric,
  term               text,
  term_start         date,
  term_end           date,
  licenses           text,
  contract_invoice   text,
  notes              text,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

alter table software_assets enable row level security;

create policy "authenticated_all" on software_assets
  for all
  using (auth.role() = 'authenticated');

-- Import the CSV:
-- 1. After running this SQL, go to Supabase → Table Editor → software_assets
-- 2. Click "Import data from CSV" (top right)
-- 3. Upload SAM DB 2025 - Software.csv from the repo /software/sam/ folder
-- 4. Map columns: Software Name → software_name, Vendor → vendor, Status → status,
--    System Owner → system_owner, Facility → facility,
--    Software Summary Verified → summary_verified, Software Summary → software_summary,
--    Alias(es) → aliases, Tags → tags, Price → price, Term → term,
--    Term Start → term_start, Term End → term_end,
--    Contract/Invoice → contract_invoice, Notes → notes
-- 5. Leave id, created_at, updated_at unset (auto-populated)
