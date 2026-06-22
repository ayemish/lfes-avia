# LFES Avia — Phase 1 Scope Document

## Project Overview

LFES Avia Phase 1 is the lean launch version of the LFES Avia platform.

The goal of Phase 1 is to build a functional, scalable, and commercially usable foundation for an aviation marketplace and business-development ecosystem. This phase will not attempt to build the full long-term LFES Avia vision at once. Instead, it will focus on the core marketplace structure, request flows, admin CRM-style management, AI Concierge v1, TG bot intake/notification flow, and a clean architecture that can support future modules without major rebuilding.

Phase 1 should be treated as the foundation of the platform, not a temporary prototype. The product will be built lean, but the database, codebase, roles, workflows, and integration structure should be prepared for future expansion.

---

# 1. Phase 1 Main Objective

The main objective of Phase 1 is to create a working launch-ready platform where users can:

- Discover LFES Avia
- Sign up or log in
- Browse aviation-related listings, deals, companies, and categories
- Submit structured requests
- Interact with the AI Concierge
- Receive updates and notifications through the platform and TG bot
- Allow the admin team to manage users, requests, listings, categories, and follow-ups from one central admin area

The platform should also give the founder/admin team enough control to manually support early users, manage inquiries, review marketplace activity, and validate the business model before investing into larger future modules.

---

# 2. Recommended Tech Stack

Phase 1 should be built using custom code, not primarily no-code.

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS or similar modern UI framework
- Responsive web design for desktop and mobile browsers

## Backend / Database

- Supabase
- PostgreSQL
- Supabase Auth or custom auth layer using Supabase
- Row-level security / role-based access structure where needed
- API-first structure for future mobile apps and integrations

## AI Layer

- OpenAI / GPT-based AI model
- Prompt-based aviation-aware AI Concierge v1
- Connection to structured marketplace data, requests, categories, and admin workflows where possible

## Bot / Notification Layer

- TG bot integration for basic request intake and notifications
- Backend webhooks or API routes for bot-to-platform communication
- Notification logic connected to platform events

## Deployment

- Vercel for frontend / Next.js deployment
- Supabase hosted database
- Environment variables configured securely
- GitHub repository connected from day one

---

# 5. Timeline

Estimated Phase 1 timeline: **approximately 3 weeks**

The timeline depends on:

- Contract start date
- Speed of feedback
- Final scope confirmation
- Availability of branding/content
- Access to GitHub, Supabase, OpenAI, domain, and bot credentials

## Week 1 — Planning, Architecture, Setup

Focus:

- Finalize Phase 1 scope
- Confirm user roles
- Confirm core aviation categories
- Set up GitHub repository
- Set up project foundation
- Set up Next.js / React frontend
- Set up Supabase backend
- Create initial database schema
- Prepare authentication and role structure
- Prepare core UI layout
- Prepare admin structure foundation

Expected output:

- Project repository active
- Initial project deployed or deploy-ready
- Database schema draft created
- Basic app structure prepared
- Core frontend layout started

## Week 2 — Marketplace Core, Admin CRM, Request Flows

Focus:

- Build public/user-side marketplace pages
- Build user dashboard
- Build listing/deal browsing
- Build listing/deal detail pages
- Build request forms
- Build company directory base
- Build admin dashboard
- Build admin request management
- Build admin listing management
- Build admin user management
- Connect core frontend flows to database

Expected output:

- Working marketplace flow
- Working request submission flow
- Working admin management flow
- Staging version available for review
- Client can test key flows

## Week 3 — AI Concierge, TG Bot, Automations, Testing, Deployment

Focus:

- Implement AI Concierge v1
- Connect AI Concierge to relevant platform workflows
- Add AI-assisted request guidance
- Add AI-assisted categorization / summary logic where practical
- Implement TG bot request intake
- Implement notification flows
- Implement admin notifications
- Add testing and bug fixing
- Deploy live/staging version
- Prepare handover documentation

Expected output:

- Phase 1 complete
- AI Concierge v1 working
- TG bot basic flow working
- Main automations working
- Final deployed version delivered
- Documentation and handover prepared

---

# 6. Pages / Screens Included in Phase 1

## Public Website / User Side

### 1. Landing Page

The landing page will introduce LFES Avia and explain the platform clearly.

It should include:

- Hero section
- Platform value proposition
- Core categories / marketplace areas
- Explanation of how LFES Avia works
- Request / concierge call-to-action
- Basic trust-building sections
- Contact or inquiry CTA
- Sign up / login links

Purpose:

The landing page should make the platform look credible and help convert visitors into early users, request submitters, or potential partners.

---

### 2. Sign Up Page

Users should be able to create an account.

Included:

- Name
- Email
- Password
- Company name if needed
- User type if needed
- Basic validation
- Account creation flow

---

### 3. Login Page

Users should be able to log into their account.

Included:

- Email login
- Password login
- Error handling
- Redirect to dashboard after login

---

### 4. User Dashboard

The user dashboard should give users a simple overview of their activity.

Included:

- Submitted requests
- Saved or interested listings
- Recent notifications
- AI Concierge access
- Profile/account access

---

### 5. Create Request Flow

Users should be able to submit structured aviation-related requests.

Initial request types should include:

- Deal request
- Document request
- Concierge request

The request form should capture useful structured information such as:

- Request type
- Category
- Company/user details
- Description
- Urgency
- Budget or commercial interest if relevant
- Contact preference
- Additional notes

Purpose:

The request flow should help convert vague user interest into structured admin-manageable data.

---

### 6. Browse Listings / Deals

Users should be able to browse available listings or deals.

Included:

- Listing cards
- Basic category filtering
- Basic search
- Listing/deal status
- Key summary information
- Call-to-action to view details or express interest

---

### 7. Listing / Deal Details Page

Each listing or deal should have a details page.

Included:

- Title
- Category
- Description
- Key data fields
- Company/profile connection where relevant
- Status
- Inquiry / interest button
- Request or concierge CTA

---

### 8. Company Directory Base

Phase 1 should include the foundation for a company directory.

Included:

- Company profile structure
- Basic company information
- Category or service type
- Contact or inquiry option
- Admin-manageable company records

This does not need to be a fully advanced verified directory in Phase 1, but the structure should be ready for future verification and trust layers.

---

### 9. Saved / Interested Items

Users should be able to save or show interest in listings/deals.

Included:

- Save listing/deal
- View saved items from dashboard
- Admin visibility into interested users or inquiries where needed

---

### 10. Messages / Conversation View

Phase 1 can include a simple conversation or communication view.

Included:

- Basic inquiry conversation structure
- User/admin message visibility
- Connection to request or listing where relevant

This does not need to be a full advanced private messaging or secure deal room system in Phase 1.

---

### 11. Profile / Account Settings

Users should be able to manage basic profile details.

Included:

- Name
- Email
- Company
- User role/type if applicable
- Password/account options depending on auth setup

---

# 7. Admin Functions Included in Phase 1

## 1. Admin Dashboard

The admin dashboard should provide a simple overview of platform activity.

Included:

- New users
- New requests
- New inquiries
- Listings/deals count
- Recent activity
- AI/bot related activity where practical

---

## 2. User Management

Admin should be able to view and manage users.

Included:

- View user list
- View user details
- See user role/type
- See user requests or activity
- Basic account status management if needed

---

## 3. Listings / Deals Management

Admin should be able to manage marketplace listings and deals.

Included:

- Create listing/deal
- Edit listing/deal
- Delete or archive listing/deal
- Assign category
- Update status
- Manage visibility
- View interested users or inquiries

---

## 4. Request Management

Admin should be able to manage all user requests.

Included:

- View submitted requests
- Filter by request type
- Filter by status
- Assign status such as new, reviewing, contacted, closed
- Add internal admin notes
- Track follow-up status
- View user/contact details
- Connect request to concierge/admin workflow

Purpose:

This is one of the most important Phase 1 areas because early marketplace success depends on fast manual follow-up and strong handling of demand.

---

## 5. CRM-Style Request Handling

Phase 1 should include a lightweight CRM-style flow.

Included:

- Request status tracking
- Inquiry pipeline-style management
- Admin notes
- Basic priority or category tagging
- Follow-up visibility
- Activity tracking where practical

This is not a full CRM system, but it should help the founder/admin manage early demand properly.

---

## 6. Content / Category Management

Admin should be able to manage core marketplace categories.

Included:

- Aviation categories
- Listing categories
- Request categories
- Basic category status or visibility
- Category labels used across listings and requests

The category structure should be prepared for future expansion into aircraft, helicopters, engines, components, services, documents, inspections, leasing, ACMI, and other aviation-related areas.

---

## 7. Basic Analytics / Activity Tracking

Phase 1 should include basic analytics or activity visibility.

Included:

- Number of users
- Number of requests
- Number of listings
- Number of inquiries
- Recent admin/user activity
- Basic conversion/activity tracking where practical

This does not need to be advanced BI in Phase 1.

---

## 8. AI / Bot Monitoring Panel

Admin should have basic visibility into AI Concierge and TG bot activity.

Included:

- AI request summaries where practical
- Bot-submitted requests
- AI-generated or AI-assisted classifications
- Admin review of AI/bot interactions where needed

---

## 9. Notification Management

Admin should be able to trigger or manage basic notifications.

Included:

- New listing/deal alerts
- Request status updates
- Admin notifications for new activity
- User follow-up notifications where practical

---

# 8. AI Concierge v1

Phase 1 AI should be practical and workflow-connected. It should not attempt to become a deeply specialized aviation intelligence system yet.

## AI Concierge Phase 1 Purpose

The AI Concierge v1 should help users move through the platform faster and help admin manage requests more efficiently.

## Included AI Concierge Features

### 1. Guided Request Submission

The AI Concierge can help users describe what they need and guide them toward the correct request type.

Example use cases:

- User wants help finding an aircraft-related deal
- User wants to request documents
- User wants to ask for concierge support
- User does not know which category to select

---

### 2. Request Qualification

The AI can help convert user input into a more structured format.

For example:

- Request type
- Category
- Urgency
- Key details
- Missing information
- Suggested next step

---

### 3. Listing / Deal Suggestions

The AI Concierge can suggest relevant listings, deals, or categories based on available platform data.

This should be basic in Phase 1 and improve later as the platform accumulates more data.

---

### 4. Common Platform Questions

The AI can answer basic questions about how LFES Avia works.

Examples:

- How to submit a request
- How to browse listings
- How to contact the platform
- What the concierge does
- What types of aviation requests are supported

---

### 5. Admin-Side Summaries

The AI can help summarize inquiries or user-submitted requests for admin review.

Example:

A long user request can be summarized into:

- Main need
- Category
- Priority
- Suggested admin action
- Missing information

---

### 6. Aviation-Aware Prompting

Even though Phase 1 will use a standard AI model, the AI should be configured with aviation-aware prompts and structured platform categories.

This means Phase 1 AI should feel aligned with aviation use cases, even though it is not yet a fully specialized aviation AI model.

---

## What AI Concierge v1 Will Not Include

Phase 1 will not include:

- Deep aviation document intelligence
- Custom-trained aviation model
- Advanced AI scoring
- Advanced buyer/seller matching engine
- AI trading/deal risk engine
- Full document analysis
- Legal/compliance decision-making
- Fully autonomous deal negotiation
- Advanced AI agents
- Proprietary aviation intelligence layer

Those should be considered later-phase features.

---

# 9. TG Bot Functions Included in Phase 1

The TG bot should work as an extension of the platform, not as a disconnected separate tool.

## Included TG Bot Features

### 1. Receive User Requests

Users should be able to submit basic requests through the bot.

The bot should collect key information and sync the request back to the main platform/admin panel.

---

### 2. Send New Listing / Deal Alerts

The bot should be able to notify users about new listings or deals where relevant.

Phase 1 alerts can be basic and category-based.

---

### 3. Send Status Updates / Notifications

The bot can notify users about:

- Request received
- Request status update
- Admin follow-up
- New listing/deal alert
- Concierge-related update

---

### 4. Basic User Communication

The bot should support simple user communication flows.

This can include:

- Basic guided replies
- Request follow-up prompts
- Simple platform help
- Direction back to the main platform where needed

---

### 5. Connect with AI Concierge

The bot should connect with the AI Concierge for guided replies where practical.

For example:

- User submits a vague request through the bot
- AI helps structure the request
- Request is saved into the platform
- Admin can review it inside the admin panel

---

### 6. Sync Key Actions Back to Platform

Important bot actions should sync back to the platform.

Examples:

- New request submitted
- User response received
- Notification sent
- Concierge conversation summary saved where practical

---

# 10. Automations Included in Phase 1

Phase 1 should include only the key automations needed for launch.

## Included Automations

### 1. Request Capture and Routing

When a user submits a request, it should be saved in the database and visible to admin.

The request should include:

- User details
- Request type
- Category
- Message/details
- Status
- Timestamp
- Source, such as web form or bot

---

### 2. Listing / Deal Alert Notifications

When a new listing or deal is added, users may receive alerts depending on the configured logic.

Phase 1 can keep this simple.

---

### 3. User Follow-Up Flows

Basic follow-up logic should help admin or the system track whether a user needs a response.

This may include:

- Status update notification
- Admin follow-up reminder
- Basic user notification

---

### 4. Admin Notifications

Admin should receive or see notifications for important events.

Examples:

- New user signup
- New request
- New inquiry
- New bot-submitted request
- New AI Concierge interaction where relevant

---

### 5. Basic Lead / Inquiry Status Updates

Requests and inquiries should have clear status tracking.

Example statuses:

- New
- Reviewing
- Contacted
- In progress
- Waiting for user
- Closed

---

# 11. Database and Architecture Requirements

Phase 1 database should be designed carefully so future aviation-specific modules can be added without major redesign.

## Phase 1 Core Database Areas

The database should include tables/structures for:

- Users
- Roles
- Companies
- Listings
- Deals
- Categories
- Requests
- Saved items / interests
- Messages or inquiry conversations
- Notifications
- AI Concierge logs or summaries
- Bot interactions
- Admin notes
- Activity tracking
- Basic status fields
- Environment/config structure where needed

---

## Future-Ready Database Considerations

During Milestone 1, the database should be planned with future expansion in mind.

It should be able to support future modules such as:

- Aircraft records
- Helicopter records
- Engine records
- Component records
- Serial-based records
- Asset variants
- Modifications
- Certifications
- Document access layers
- NDA workflows
- LOI workflows
- Verification levels
- Membership plans
- Company trust profiles
- Deal room workflows
- Investor pipeline
- Leasing / ACMI workflows
- Inspection requests
- Sales intelligence layer
- CRM integrations
- Mobile applications
- API integrations
- BI/reporting tools

These future modules do not need to be fully built in Phase 1, but the Phase 1 architecture should not block them.

---

# 12. Scalability and Future Integrations

Phase 1 should be built as a scalable platform foundation.

The architecture should be ready for future integration with:

- Mobile apps for iOS and Android
- External APIs
- CRM systems
- AI services and AI agents
- Aviation data providers
- Payment systems
- Future LFES ecosystem modules
- Business intelligence tools
- Lead generation tools
- Sales intelligence platforms
- Outreach platforms
- Additional marketplace categories

The goal is that future expansion should mostly mean adding modules and integrations, not rebuilding the core platform.

---

# 13. Security and Access Control

Phase 1 should include basic but clean security foundations.

Included:

- Secure user authentication
- Admin/user role separation
- Protected admin routes
- Secure environment variable handling
- Database access rules where practical
- Basic audit/activity tracking
- Secure API route structure
- No hardcoded private keys or secrets
- Clean GitHub repository structure

Phase 1 is not expected to include enterprise-grade compliance or advanced security auditing, but it should be built responsibly from the beginning.

---

# 14. Live Development Environment

A live staging/development version should be available from Week 2.

The client should be able to:

- Test user flows
- Review pages
- Submit test requests
- Review admin features
- Provide feedback during development
- Track progress before final delivery

The staging environment should be separate from final production settings if possible.

---

# 15. GitHub, Ownership, and Delivery

All code should be pushed regularly to the client’s private GitHub repository from day one.

The client will own:

- Source code
- Database structure
- Documentation
- Deployment setup
- UI assets created for the project
- Project configuration
- Related deliverables

The developer should work inside the client-owned repository or a repository transferred to the client.

At completion, the client should have full visibility and ownership of the project.

---

# 16. Documentation and Handover

At the end of Phase 1, the following handover materials should be provided:

- GitHub repository access
- Deployment instructions
- Environment variables structure
- Supabase setup overview
- Database structure overview
- Admin usage notes
- AI Concierge setup notes
- TG bot setup notes
- Basic maintenance instructions
- Notes for future developers
- Known limitations or recommended next steps

The documentation does not need to be extremely long, but it should be clear enough for another developer to continue later without rebuilding.

---

# 17. Testing and QA

Phase 1 should include basic testing and quality assurance before final delivery.

Testing should cover:

- User signup/login
- User dashboard
- Create request flow
- Browse listings/deals
- Listing details
- Save/interested items
- Admin login/access
- Admin user management
- Admin listing management
- Admin request management
- AI Concierge core flow
- TG bot intake flow
- Notifications
- Database write/read operations
- Deployment functionality
- Mobile responsiveness basics

---

# 18. Post-Launch Bug Fix Period

A standard 14-day bug-fix period is included after Milestone 3 is completed and the platform is successfully deployed.

This bug-fix period covers issues related to the agreed Phase 1 scope.

Included:

- Fixing broken agreed features
- Fixing functional bugs
- Fixing deployment-related issues
- Fixing obvious UI/flow issues from the agreed build
- Minor adjustments related to completed scope

Not included:

- New features
- Major redesign
- Large scope changes
- New integrations not included in Phase 1
- New modules from later phases

---

# 19. What Is Not Included in Phase 1

To keep Phase 1 lean and realistic, the following items are not included in the Phase 1 scope.

## Not Included

- Full secure deal room
- Advanced private messaging system
- Full NDA workflow
- Full LOI workflow
- Advanced document permission system
- Advanced verification back office
- Membership program
- Investor pipeline
- Jobs marketplace
- Inspection network exchange
- Field service / AOG operations
- Advanced AI scoring
- Advanced AI matching engine
- Full aviation document analysis
- Mobile app
- Payment system
- Subscription billing
- Full CRM system
- Advanced BI dashboards
- Full sales intelligence layer
- Apollo / Sales Navigator / Clay / Instantly / Smartlead / RocketReach / ZoomInfo integrations
- Advanced external aviation data provider integrations
- Full API product for third-party developers
- Complex compliance/legal workflows
- Marketplace liquidity automation
- Multi-language system unless separately agreed

These features can be planned for later phases.

---

# 20. Phase 1 Success Criteria

Phase 1 should be considered successful if:

- The platform has a working public-facing landing page
- Users can sign up and log in
- Users can browse listings/deals
- Users can submit structured requests
- Admin can manage users, listings, deals, and requests
- Admin has a lightweight CRM-style request handling flow
- AI Concierge v1 can support guided request and platform workflows
- TG bot can support basic request intake and notifications
- Core automations are working
- The project is deployed and testable
- Code is pushed to GitHub
- Database structure is documented
- Handover notes are provided
- The system is ready to expand into Phase 2 without major rebuilding

---

# 21. Milestone Breakdown

## Milestone 1

### Focus

Project kickoff, architecture planning, database structure, and project setup.

### Deliverables

- Final Phase 1 scope confirmation
- GitHub repository setup
- Next.js / React project setup
- Supabase project setup
- Initial database planning
- User roles planning
- Core architecture plan
- Initial UI structure
- Environment setup
- Basic deployment preparation

### Acceptance Criteria

Milestone 1 is complete when:

- Project repo is active
- Project foundation is created
- Initial database structure is planned
- Core architecture direction is confirmed
- Developer and client are aligned on Phase 1 build structure

---

## Milestone 2

### Focus

Main backend/database foundation, marketplace core, admin CRM panel, and request flows.

### Deliverables

- User authentication
- User dashboard
- Landing page
- Browse listings/deals
- Listing/deal details
- Company directory base
- Create request flow
- Admin dashboard
- User management
- Listing/deal management
- Request management
- CRM-style status handling
- Category management
- Database connected to main flows
- Staging environment access from Week 2

### Acceptance Criteria

Milestone 2 is complete when:

- Users can access main platform flows
- Requests can be submitted
- Admin can view and manage requests
- Admin can manage listings/deals
- Core database/backend foundation is working
- Client can test the platform on staging

---

## Milestone 3

### Focus

AI Concierge, TG bot integration, automations, testing, deployment, and final handover.

### Deliverables

- AI Concierge v1
- AI-guided request support
- AI request summary/classification support where practical
- TG bot request intake
- TG bot notifications
- Basic listing/deal alerts
- Admin notifications
- User follow-up/status flows
- Testing and bug fixes
- Final deployment
- Environment variable structure
- Handover documentation
- 14-day bug-fix period after deployment

### Acceptance Criteria

Milestone 3 is complete when:

- AI Concierge v1 is working
- TG bot basic flow is working
- Core automations are working
- Platform is deployed
- Client can test final Phase 1 flows
- Code and documentation are delivered
- Handover is completed

---

# 22. Phase 1 Founder Priorities After Launch

After Phase 1 launch, the most important priorities should be:

## 1. Supply Quality

Focus on a small number of high-quality listings, companies, partners, and aviation-related opportunities.

A smaller marketplace with credible data is better than a large marketplace with weak or empty listings.

## 2. Manual Concierge Execution

The founder/admin team should manually support early users, requests, and matches.

This helps understand what users actually need before automating too much.

## 3. Trust and Distribution

The first 90 days should focus on making the platform feel alive and credible.

This includes:

- Direct outreach
- Partner onboarding
- Category-specific landing pages
- Early listings
- Early request handling
- User feedback
- Basic trust signals
- Strong follow-up process

---

# 23. Phase 2 Readiness

Phase 1 should prepare the platform for Phase 2, which may include:

- Deeper user profiles
- Saved searches
- Smart alerts
- Verification back office
- Hidden deals
- Reverse RFQ logic
- Jobs
- Inspection request handling
- More advanced trust layers
- More structured company profiles

Phase 1 should not build all of these, but it should avoid architectural decisions that make them difficult later.

---

# 24. Final Confirmation Statement

Phase 1 will be a lean but properly structured launch version of LFES Avia.

The platform will be built with custom code using Next.js / React and Supabase, with OpenAI-powered AI Concierge v1, TG bot integration, core automations, admin CRM-style management, and a scalable database architecture.

All source code, database structure, documentation, and related assets will belong fully to the client from day one and will be pushed to the client’s private GitHub repository regularly.

Phase 1 will be delivered in approximately 3 weeks, assuming timely feedback, access, and scope lock.

A 14-day post-launch bug-fix period will be included after final deployment.

The goal is to launch a real working foundation that can validate LFES Avia in the market and support future phases without requiring a major rebuild.
