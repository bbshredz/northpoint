CREATE TABLE agreement_governance_votes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  stakeholder_name text,
  department text,
  vote_choice text,
  comments text
);