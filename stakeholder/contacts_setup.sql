-- stakeholder_contacts table
-- Seed this with the people Monique needs to call.
-- Status: 'pending' (to call) | 'called' (called, response not yet logged) | 'logged' (response on record)

CREATE TABLE IF NOT EXISTS public.stakeholder_contacts (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    name        text        NOT NULL,
    title       text,
    facility    text,
    region      text,
    status      text        DEFAULT 'pending',
    notes       text,
    sort_order  integer     DEFAULT 0,
    created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.stakeholder_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_all" ON public.stakeholder_contacts
    FOR ALL TO authenticated
    USING (true) WITH CHECK (true);


-- ── Auto-create user_roles on first sign-in ────────────────────────────────
-- Run this once. Fixes the IAM "user doesn't appear" issue.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role, modules)
    VALUES (NEW.id, 'staff', '{}')
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ── Example seed data (edit names/titles/facilities as needed) ─────────────
-- INSERT INTO public.stakeholder_contacts (name, title, facility, region, sort_order) VALUES
--     ('Jane Smith',   'Director of Nursing',      'Facility Name Here', 'west',      1),
--     ('John Doe',     'Administrator',             'Facility Name Here', 'north',     2),
--     ('Sarah Jones',  'Regional VP',               'Corporate',          'corporate', 3);
