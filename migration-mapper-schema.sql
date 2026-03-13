-- Data Migration Mapper — Supabase schema
-- Run this once in Supabase SQL Editor before using the mapper tool.

CREATE TABLE IF NOT EXISTS migration_mappings (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_field     text NOT NULL,
  target_field     text NOT NULL,
  notes            text DEFAULT '',
  created_by       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by_name  text,
  updated_by       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by_name  text,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

-- Prevent exact duplicate mappings (same source → same target)
CREATE UNIQUE INDEX IF NOT EXISTS migration_mappings_unique_pair
  ON migration_mappings (source_field, target_field);

-- RLS: authenticated users can read/write; anon cannot
ALTER TABLE migration_mappings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read mappings"
  ON migration_mappings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert mappings"
  ON migration_mappings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update mappings"
  ON migration_mappings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (auth.uid() = updated_by);

CREATE POLICY "Authenticated users can delete mappings"
  ON migration_mappings FOR DELETE
  TO authenticated
  USING (true);

-- Enable Realtime on this table (also enable in Supabase dashboard → Database → Replication)
-- ALTER PUBLICATION supabase_realtime ADD TABLE migration_mappings;
