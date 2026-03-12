-- ================================================================
-- FACILITY CONTACT LIST -- stakeholder_contacts SQL
-- Generated from FACILITY CONTACT LIST.xlsx (updated Apr 2025)
-- ================================================================

-- ADMINS: update phone numbers for existing contacts ---------------
UPDATE stakeholder_contacts SET phone = '562-810-5215' WHERE name ILIKE '%Fernan Tolentino%';
UPDATE stakeholder_contacts SET phone = '323-559-1515' WHERE name ILIKE '%Heidi Alipio%';
UPDATE stakeholder_contacts SET phone = '707-755-0837' WHERE name ILIKE '%Brent Marshall%';
UPDATE stakeholder_contacts SET phone = '949-981-2235' WHERE name ILIKE '%Brenden Dahl%';
UPDATE stakeholder_contacts SET phone = '530-908-1766' WHERE name ILIKE '%James Ellis-Sherinian%';
UPDATE stakeholder_contacts SET phone = '707-718-8857' WHERE name ILIKE '%Joanne Lane%';
UPDATE stakeholder_contacts SET phone = '310-291-3067' WHERE name ILIKE '%Weaver%';
UPDATE stakeholder_contacts SET phone = '949-601-6656' WHERE name ILIKE '%Taylor Ellis-Sherinian%';
UPDATE stakeholder_contacts SET phone = '714-904-8437' WHERE name ILIKE '%Franklin Hughes%';
UPDATE stakeholder_contacts SET phone = '626-318-2162' WHERE name ILIKE '%Larry Lewis%';
UPDATE stakeholder_contacts SET phone = '760-333-8739' WHERE name ILIKE '%Mahesh Bhambi%';
UPDATE stakeholder_contacts SET phone = '707-385-6338' WHERE name ILIKE '%Robert Armstrong%';

-- DON: update phone numbers for existing contacts ------------------
UPDATE stakeholder_contacts SET phone = '707-327-6227' WHERE name ILIKE '%Brendalee%' AND name ILIKE '%Ventura%';
UPDATE stakeholder_contacts SET phone = '626-665-3697' WHERE name ILIKE '%Jocelyn%' AND name ILIKE '%Tan%';
UPDATE stakeholder_contacts SET phone = '424-744-0634' WHERE name ILIKE '%Mitchell%' AND name ILIKE '%Taylor%';
UPDATE stakeholder_contacts SET phone = '562-306-7539' WHERE name ILIKE '%Jenina%' AND name ILIKE '%Jorge%';
UPDATE stakeholder_contacts SET phone = '323-559-7843' WHERE name ILIKE '%Heide%' AND name ILIKE '%Sibonga%';
UPDATE stakeholder_contacts SET phone = '702-556-3615' WHERE name ILIKE '%Tessie%' AND name ILIKE '%Hecht%';
UPDATE stakeholder_contacts SET phone = '650-242-2280' WHERE name ILIKE '%Alicia%' AND (name ILIKE '%McDaniel%' OR name ILIKE '%Moderat%' OR name ILIKE '%Moderal%');
UPDATE stakeholder_contacts SET phone = '707-802-4337' WHERE name ILIKE '%Marian%' AND name ILIKE '%Diamond%';
UPDATE stakeholder_contacts SET phone = '714-335-9332' WHERE name ILIKE '%Grace%' AND name ILIKE '%Chavez%';
UPDATE stakeholder_contacts SET phone = '760-861-4169' WHERE name ILIKE '%Kavita%' AND name ILIKE '%Joshi%';
UPDATE stakeholder_contacts SET phone = '760-552-2820' WHERE name ILIKE '%Pamela%' AND name ILIKE '%Telesford%';

-- DOR: update email only (no phone numbers in source) --------------
-- Darlene Moreda -- dmoreda@applevalleyrehab.com
-- Raquel Mayoralgo -- rmayoralgo@beaconhealthcarecenter.com
-- Farnoush Arastehmanesh -- farastehmanesh@brentwoodnursing.com
-- Kimberly Towns -- ktowns@courtyardcarecenter.com
-- ErinKominomi -- ekominami@firesidecare.com
-- Aileen Concha -- aconcha@lincolnsquarerehab.com
-- Vivian Fong -- vfong@lindamarrehab.com
-- Karen C Hoyles -- khoyles@rockypointcarecenter.com
-- Abelardo Torres Jr. -- atorres@terraceviewcare.com
-- Susan Kay Anderson -- SAnderson@valenciagardenshealth.com
-- Christopher De Vera -- cdevera@villahealthcare.com
-- Nathan Andrade -- nandrade@woodcrestpostacuterehab.com

-- BOM: INSERT Business Office Manager contacts (new role) ----------
-- Uses WHERE NOT EXISTS to avoid duplicates
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Sally Ocampo', 'Business Office Manager', 'Courtyard Care Center', 'South East', 'pending', '310-748-1039'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Sally%' AND name ILIKE '%Ocampo%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Sindy Castillo', 'Business Office Manager', 'Fireside Health Care Center', 'South East', 'pending', '424-346-4591'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Sindy%' AND name ILIKE '%Castillo%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Amber Ramos', 'Business Office Manager', 'Apple Valley Post-Acute Rehabilitation', 'North', 'pending', '707-978-8462'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Amber%' AND name ILIKE '%Ramos%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Laura Gonzales', 'Business Office Manager', 'Terrace View Care Center', 'South East', 'pending', '562-489-3798'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Laura%' AND name ILIKE '%Gonzales%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Sally Thompson', 'Business Office Manager', 'Villa Health Care Center', 'South East', 'pending', '951-217-9295'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Sally%' AND name ILIKE '%Thompson%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Marilyn Carraway', 'Business Office Manager', 'Linda Mar Rehabilitation', 'North', 'pending', NULL
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Marilyn%' AND name ILIKE '%Carraway%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Malou Portugal', 'Business Office Manager', 'Brentwood Health Care Center', 'South East', 'pending', '661-219-4995'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Malou%' AND name ILIKE '%Portugal%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Julianna Valdes', 'Business Office Manager', 'Lincoln Square Post-Acute Care', 'South East', 'pending', '209-715-1649'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Julianna%' AND name ILIKE '%Valdes%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Jenny Moroyoqui', 'Business Office Manager', 'Valencia Gardens Health Care Center', 'South East', 'pending', '951-722-0009'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Jenny%' AND name ILIKE '%Moroyoqui%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Renee Giron', 'Business Office Manager', 'Beacon Healthcare Center', 'South East', 'pending', '626-318-2162'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Renee%' AND name ILIKE '%Giron%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Laurie Whiddon', 'Business Office Manager', 'Woodcrest Post Acute Rehabilitation', 'South East', 'pending', '916-214-9588'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Laurie%' AND name ILIKE '%Whiddon%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Herbert Pineda', 'Business Office Manager', 'Rocky Point Care Center', 'North', 'pending', '650-636-6043'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Herbert%' AND name ILIKE '%Pineda%');

-- ADMINS: INSERT if missing ----------------------------------------
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Fernan Tolentino', 'Administrator', 'Courtyard Care Center', 'South East', 'pending', '562-810-5215'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Fernan%' AND name ILIKE '%Tolentino%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Heidi Alipio', 'Administrator', 'Fireside Health Care Center', 'South East', 'pending', '323-559-1515'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Heidi%' AND name ILIKE '%Alipio%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Brent Marshall', 'Administrator', 'Apple Valley Post-Acute Rehabilitation', 'North', 'pending', '707-755-0837'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Brent%' AND name ILIKE '%Marshall%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Brenden Dahl', 'Administrator', 'Terrace View Care Center', 'South East', 'pending', '949-981-2235'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Brenden%' AND name ILIKE '%Dahl%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'James Ellis-Sherinian', 'Administrator', 'Villa Health Care Center', 'South East', 'pending', '530-908-1766'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%James%' AND name ILIKE '%Ellis-Sherinian%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Joanne Lane', 'Administrator', 'Linda Mar Rehabilitation', 'North', 'pending', '707-718-8857'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Joanne%' AND name ILIKE '%Lane%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'DJ Weaver', 'Administrator', 'Brentwood Health Care Center', 'South East', 'pending', '310-291-3067'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%DJ%' AND name ILIKE '%Weaver%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Taylor Ellis-Sherinian', 'Administrator', 'Lincoln Square Post-Acute Care', 'South East', 'pending', '949-601-6656'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Taylor%' AND name ILIKE '%Ellis-Sherinian%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Franklin Hughes', 'Administrator', 'Valencia Gardens Health Care Center', 'South East', 'pending', '714-904-8437'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Franklin%' AND name ILIKE '%Hughes%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Larry Lewis', 'Administrator', 'Beacon Healthcare Center', 'South East', 'pending', '626-318-2162'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Larry%' AND name ILIKE '%Lewis%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Mahesh Bhambi', 'Administrator', 'Woodcrest Post Acute Rehabilitation', 'South East', 'pending', '760-333-8739'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Mahesh%' AND name ILIKE '%Bhambi%');
INSERT INTO stakeholder_contacts (name, title, facility, region, status, phone)
  SELECT 'Robert Armstrong', 'Administrator', 'Rocky Point Care Center', 'North', 'pending', '707-385-6338'
  WHERE NOT EXISTS (SELECT 1 FROM stakeholder_contacts WHERE name ILIKE '%Robert%' AND name ILIKE '%Armstrong%');