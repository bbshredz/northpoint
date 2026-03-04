Act as a Senior Full-Stack Engineer and VP of Business Systems. Build a single-page React application (Tailwind CSS + Framer Motion) titled '2026 Software Portfolio Review - Enterprise Agreement Governance.'

The Objective: Create a transparent, interactive comparison between DocuSign and Adobe Sign to facilitate a stakeholder vote on our March 2026 renewal.

1. Data Foundation (Hard Stats):

DocuSign (Current): $19,800/yr base. 20,000 envelope allowance/yr. **$5.80 per envelope overage fee.** > * Adobe Sign (Proposed): Approx. $35/user/month (Enterprise). Focuses on seat-based licensing vs. transaction-heavy models.

2. Interactive UI Components:

The 'Overage' Calculator: A slider labeled 'Projected Monthly Envelopes.' As it passes 1,666 (the monthly limit), show a red 'Budget Bleed' counter calculating the $5.80 fee per additional envelope.

Side-by-Side Matrix: A gritty table comparing: HIPAA/SOC2 Compliance, PointClickCare/MatrixCare Integration, Audit Trail (Certificate of Completion), and 21 CFR Part 11 support.

Stakeholder Input (Supabase Integration): >     * Add a 'Name' and 'Facility/Dept' input field.

Add a 'Sentiment Vote' (Standardize on DocuSign / Switch to Adobe / Consolidate & Move Internal Docs to Policy Tool).

Add a 'Submit Decision' button that pushes name, vote, and timestamp to a Supabase table named agreement_governance_votes.

3. The Strategy Section (Folded):

A collapsed accordion at the bottom labeled: 'VP Perspective: Strategic Consolidation.'

Inside, explain: 'We are currently paying for a "Golden Pen" (DocuSign) and "PDF Power" (Adobe). By standardizing on one and shifting internal policies to an LMS/Compliance tool, we eliminate the $5.80 overage risk entirely.'

4. Visual Style: > * Dark mode, 'Executive Slate' (Slate-900) background.

Use Recharts to show a bar graph of 'Cost vs. Volume.'

High-contrast status indicators (Red for overage risk, Green for potential savings).