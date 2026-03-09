-- facility_staff_summary migration
-- Run in Supabase SQL editor

create table if not exists public.facility_staff_summary (
  id                    serial primary key,
  facility_name         text not null unique,
  region                text,
  is_corp               boolean not null default false,
  total_active          integer not null default 0,
  ft_count              integer not null default 0,
  pt_count              integer not null default 0,
  salary_count          integer not null default 0,
  hourly_count          integer not null default 0,
  dedicated_device_count integer not null default 0,
  dept_nursing          integer not null default 0,
  dept_rehab            integer not null default 0,
  dept_admin            integer not null default 0,
  dept_dietary          integer not null default 0,
  dept_maintenance      integer not null default 0,
  dept_housekeeping     integer not null default 0,
  dept_other            integer not null default 0,
  bed_count             integer,
  data_as_of            date,
  updated_at            timestamptz not null default now()
);

-- Enable RLS (read-only for authenticated users)
alter table public.facility_staff_summary enable row level security;
create policy "authenticated read" on public.facility_staff_summary
  for select using (auth.role() = 'authenticated');

-- Seed data (aggregated from UKG export, no PII)
insert into public.facility_staff_summary
  (facility_name, region, is_corp, total_active, ft_count, pt_count, salary_count, hourly_count,
   dedicated_device_count, dept_nursing, dept_rehab, dept_admin, dept_dietary,
   dept_maintenance, dept_housekeeping, dept_other, data_as_of)
values
  ('Apple Valley Post-Acute', 'North', false, 146, 97, 49, 12, 134, 31, 91, 16, 13, 13, 4, 6, 3, '2026-03-08'),
  ('Brentwood Health Care Center', 'South West', false, 160, 102, 58, 12, 148, 45, 92, 25, 18, 14, 5, 5, 1, '2026-03-08'),
  ('Courtyard Care Center', 'South West', false, 117, 75, 42, 8, 109, 26, 70, 13, 11, 11, 7, 2, 3, '2026-03-08'),
  ('Fireside Convalescent Hospital', 'South West', false, 102, 79, 23, 9, 93, 26, 58, 10, 14, 10, 4, 4, 2, '2026-03-08'),
  ('Lincoln Square Post-Acute', 'North', false, 106, 72, 34, 10, 96, 30, 52, 18, 10, 14, 5, 4, 3, '2026-03-08'),
  ('Linda Mar Rehabilitation', 'North', false, 91, 69, 22, 8, 83, 22, 53, 10, 10, 9, 4, 3, 2, '2026-03-08'),
  ('North American Client Services', 'North American Client', true, 50, 47, 3, 39, 11, 50, 0, 0, 50, 0, 0, 0, 0, '2026-03-08'),
  ('Rocky Point', 'North', false, 117, 74, 43, 5, 112, 17, 75, 6, 9, 14, 5, 4, 4, '2026-03-08'),
  ('Terrace View Care Center', 'South East', false, 124, 79, 45, 10, 114, 37, 68, 20, 15, 9, 2, 7, 3, '2026-03-08'),
  ('Valencia Gardens Health Care', 'South East', false, 137, 84, 53, 12, 125, 49, 69, 37, 10, 9, 5, 5, 2, '2026-03-08'),
  ('Villa Health Care Center', 'South East', false, 119, 82, 37, 12, 107, 35, 65, 20, 13, 9, 3, 7, 2, '2026-03-08'),
  ('West Covina Care', 'South East', false, 97, 59, 38, 6, 91, 25, 54, 16, 7, 8, 1, 9, 2, '2026-03-08'),
  ('Woodcrest Post-Acute', 'South East', false, 230, 176, 54, 14, 216, 50, 151, 30, 16, 14, 10, 6, 3, '2026-03-08');

-- NOTE: Update bed_count per facility once verified in facilities table.
-- Example:
-- update facility_staff_summary set bed_count = 120 where facility_name = 'Apple Valley Post-Acute';
