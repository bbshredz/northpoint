-- ── SWOT Items ────────────────────────────────────────────────────────

CREATE TABLE swot_items (
  id          uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now(),
  quadrant    char(1) NOT NULL CHECK (quadrant IN ('s','w','o','t')),
  label       text    NOT NULL,
  description text,
  priority    text    NOT NULL DEFAULT 'medium'
                      CHECK (priority IN ('critical','high','medium','low')),
  sort_order  integer DEFAULT 0,
  is_active   boolean DEFAULT true
);

ALTER TABLE swot_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read_auth"  ON swot_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "write_auth" ON swot_items FOR ALL    TO authenticated USING (true) WITH CHECK (true);


-- ── SWOT Strategy notes ────────────────────────────────────────────────

CREATE TABLE swot_strategy (
  id         text PRIMARY KEY,  -- 'so' | 'st' | 'wo' | 'wt'
  notes      text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE swot_strategy ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read_auth"  ON swot_strategy FOR SELECT TO authenticated USING (true);
CREATE POLICY "write_auth" ON swot_strategy FOR ALL    TO authenticated USING (true) WITH CHECK (true);

INSERT INTO swot_strategy (id) VALUES ('so'),('st'),('wo'),('wt') ON CONFLICT DO NOTHING;


-- ── Seed existing items ────────────────────────────────────────────────

INSERT INTO swot_items (quadrant, label, description, priority, sort_order) VALUES
-- Strengths
('s','Institutional Knowledge','7+ years of continuity. Deep familiarity with NACS systems, facilities, vendor relationships, and operational history that no new hire can replicate quickly.','high',1),
('s','Cross-Domain Leadership','Anthony owns MDM, telephony migration, software governance, vendor relations, and NetSuite project coordination — breadth that spans the full IT stack.','high',2),
('s','Customer-Facing Excellence','Francis recognized by peers for communication and service quality. Strongest help desk presence on the team; natural trainer and future team lead.','high',3),
('s','Infrastructure & Security Expertise','Geremia manages network, servers, and on-prem security. Owns UniFi infrastructure and firewall policy across all facilities.','high',4),
('s','Systems & Directory Depth','Tom owns Active Directory, Group Policy, and the M365 environment. Deep technical contributor best utilized in a backend, non-field-facing role.','medium',5),
('s','Device Fleet Visibility','1,669+ devices managed across NinjaOne (753), ABM (502), and UniFi (414). Strong tooling baseline with centralized visibility across all facilities.','medium',6),
('s','Software Governance (Emerging)','Formal vendor ownership and SaaS governance now being established. No formal owner for this function existed until recently; the gap is now being closed.','medium',7),

-- Weaknesses
('w','Geographic Coverage Gaps','North region is under-resourced. Geremia covers 4 facilities up to 4 hrs away with no formal backup protocol. Facilities experience inconsistent response.','high',1),
('w','No Formal Specialization Structure','Function ownership is implied, not documented. Creates single points of failure and no accountability when coverage lapses.','high',2),
('w','Compensation Below Market','3 of 6 team members are compensated below market rate for their actual scope. Morale impact is documented; attrition risk is active.','critical',3),
('w','No Succession Plan','Key-person dependency on Anthony and Geremia. No defined protocol if either is unavailable for an extended period. "Hit by a bus" risk is unmitigated.','high',4),
('w','No SLAs Defined','Facilities lack clear response-time expectations. The gap between IT effort and user perception is widening without a formal service standard.','medium',5),
('w','No Network Detection & Response','No real-time threat visibility across the environment. Security exposure grows with each new facility added without a detection layer.','high',6),
('w','IT Budget Not Broken Out','IT spend is not cleanly separated by department or entity. Difficult to track actuals, justify investment, or surface redundant spend.','medium',7),

-- Opportunities
('o','4 Incoming Facilities','Growth window to build a scalable structure before adding load. Significantly less expensive to build right now than to retrofit at 16 or 20 facilities.','high',1),
('o','Regional MSP Partnership','A contracted MSP for on-site field coverage reduces geographic dependency on Geremia and enables the team to scale without a proportional headcount increase.','high',2),
('o','AI / L0 Helpdesk Automation','Chat-based tier-0 support can deflect routine tickets and extend IT capacity. Francis is positioned to own, configure, and train around this system.','medium',3),
('o','NetSuite & Analytics Platform','Incoming data warehouse creates a formal IT stewardship role. Opportunity to establish structured business systems ownership under IT.','medium',4),
('o','Formal Specialization = Retention Tool','Defining career paths and domain ownership gives team members a reason to stay and grow. Dual function: succession framework and morale lever.','high',5),
('o','Stakeholder Input Loop','1-on-1s with facility admins and ticketing data analysis can surface high-impact quick wins, reset perception, and build goodwill at low cost.','medium',6),
('o','Ensign-Class IT Posture','Opportunity to model the department after operators that are already running specialized, structured IT at scale — before that gap becomes a competitive disadvantage.','medium',7),

-- Threats
('t','Attrition','Francis and Geremia are both below market. The longer compensation gaps go unaddressed, the more likely NACS loses talent it cannot easily replace.','critical',1),
('t','Key-Person Dependency','Anthony or Geremia unavailable means coverage failure. No redundancy is built into critical functions at current staffing structure.','critical',2),
('t','Security Breach Without NDR','No detection capability for lateral movement, ransomware staging, or unauthorized access. Exposure is compounding as facility count and device count grow.','high',3),
('t','Coverage Failure at Scale','Current coverage model is not designed for 16+ facilities. Without structural change, the gap between demand and capacity grows with each addition.','high',4),
('t','Competitive Lag (AI & Automation)','Operators like Ensign are investing in AI-driven IT tools. Without a roadmap, NACS risks falling a full technology cycle behind peer operators.','medium',5),
('t','Facility Perception Erosion','Without SLAs and proactive communication, facilities interpret slow or inconsistent response as indifference. Perception compounds and is hard to reverse.','medium',6),
('t','Budget Opacity','Without department-level cost visibility, IT investment decisions lack a defensible baseline. Difficult to advocate for resources without clean numbers to present.','medium',7);
