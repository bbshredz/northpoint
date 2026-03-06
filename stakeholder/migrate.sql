-- Run once in Supabase SQL Editor
-- Adds new columns to stakeholder_responses for expanded interview capture

alter table stakeholder_responses add column if not exists it_positives    text;
alter table stakeholder_responses add column if not exists systems_used     text;
alter table stakeholder_responses add column if not exists ticket_awareness text;
