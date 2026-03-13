I want to add a new feature to Northpoint called the Data Migration Mapper — an interactive canvas tool that lets our team visually map source system fields (from GP, DocLink, UKG, etc.) to their destination fields in NetSuite. Think of it like a lightweight Miro board, but purpose-built for data migration field mapping.
Here's what the feature needs to do:

Display two panels (source fields on the left, NetSuite destination fields on the right)
Let users draw bezier curve connections between a source field and a destination field by dragging
Let users click on a connection line to add a note (e.g., transformation logic, scripts, dependencies on other integrations)
Auto-save the canvas state (nodes, edges, notes) to Supabase
Support real-time collaboration — multiple users can be on the canvas simultaneously and see each other's changes live (we have Supabase already, so real-time subscriptions are available)
Track who made changes (basic user presence)

Before building anything, I need you to assess the following and give me a clear recommendation:

What is the current architecture of Northpoint? (stack, how it's deployed, GitHub Pages vs. something else)
Is GitHub Pages sufficient for this feature, or do we need to migrate to Netlify (or another host) to support a backend or server-side functions? Keep in mind I already have a Netlify account (currently used for a personal site) and a Supabase project.
If we need to migrate to Netlify, what would that involve and would it break anything currently live on Northpoint?
What is the recommended tech stack for this feature given what Northpoint already uses? If Northpoint is already React/Next.js, I'd like to add this as a new route/page. If it's static HTML, let's discuss the least-disruptive way to add this.
Suggested libraries: I'm thinking xyflow (React Flow) for the canvas and Supabase JS client for persistence + real-time. Do these make sense given the current stack, or do you recommend alternatives?

Please do not make any changes yet — just assess and respond with your findings and a recommended plan of action. I want to review before we build anything.