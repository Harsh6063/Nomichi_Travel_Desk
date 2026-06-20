# Nomichi Admin CRM & Trip Management System

A custom-built admin dashboard for **Nomichi**, designed to manage trips, leads, enquiries, ownership assignment, pipeline tracking, and traveller communication.

---

# Features

## Dashboard

Provides a complete overview of business operations.

### Metrics

* Total Leads
* New Leads
* Confirmed Leads
* Open Trips
* Leads per Trip
* Team Workload
* Pipeline Statistics

---

## Lead Management

Manage traveller enquiries from a single dashboard.

### Lead Information

* Name
* Phone Number
* Email
* Group Type
* Preferred Month
* Trip Feeling / Vibe
* Trip Interested In
* Lead Source
* Created Date

### Lead Actions

* View Lead Details
* Assign Lead Owner
* Update Pipeline Stage
* Add Notes
* View Notes History
* Generate WhatsApp Message
* Call Lead
* Send Email
* Open WhatsApp Chat

---

## Lead Pipeline

Available stages:

* NEW
* CONTACTED
* QUALIFIED
* VIBE_CHECK_SENT
* CONFIRMED
* NOT_A_FIT

Pipeline updates are stored in the database.

---

## Owner Assignment

Leads can be assigned only to Admin users.

Supports:

* Unassigned
* Admin Assignment
* Owner Reassignment

---

## Notes System

Store communication history.

Each note contains:

* Note
* Next Action
* Lead
* Author
* Created Date

Used for:

* Call Notes
* Follow-ups
* Team Handover
* Lead History

---

## WhatsApp Generator

AI-powered first message generation.

Generates personalized outreach using:

* Lead Name
* Group Type
* Preferred Month
* Trip Information
* Traveller Preferences

---

## Trip Management

Full trip management dashboard.

### Create Trip

Fields:

* Name
* Destination
* Journey Type
* Duration
* Image
* Start Date
* End Date
* Price
* Total Seats
* Description
* Status

### Edit Trip

Update all trip details.

### Trip Status

* OPEN
* CLOSED

---

## Authentication

Protected Admin Dashboard.

Supports:

* Admin Login
* JWT Authentication
* Protected Routes
* Session Validation

---

# Database

Built using PostgreSQL + Prisma ORM.

## Tables

### User

Stores admin users.

Fields:

* id
* name
* email
* password
* role

---

### Trip

Stores all trips.

Fields:

* id
* name
* destination
* journeyType
* duration
* image
* startDate
* endDate
* priceGST
* totalSeats
* bookedSeats
* status
* description

---

### Lead

Stores traveller enquiries.

Fields:

* id
* name
* phone
* email
* groupType
* preferredMonth
* tripFeeling
* status
* tripId
* ownerId
* createdAt

---

### Note

Stores lead notes.

Fields:

* id
* note
* nextAction
* leadId
* userId
* createdAt

---

# Tech Stack

## Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Lucide React

---

## Backend

* Next.js Route Handlers
* Prisma ORM
* PostgreSQL

---

## Authentication

* JWT
* Cookies
* Middleware Protection

---

## Deployment

Recommended:

* Vercel
* Neon PostgreSQL

---

# Project Structure

src/

├── app/

│ ├── admin/

│ ├── api/

│ ├── login/

│

├── components/

│ ├── lead-detail-client.tsx

│ ├── leads-list-client.tsx

│ ├── trip-form.tsx

│ ├── whatsapp-generator.tsx

│

├── lib/

│ ├── prisma.ts

│ ├── auth.ts

│

├── prisma/

│ ├── schema.prisma

│

└── types/

---

# Admin Credentials

Update these values according to your setup.

Email:

[admin@nomichi.com](mailto:admin@nomichi.com)

Password:

---

(Stored securely in database)

---

# Environment Variables

Create a .env file.

DATABASE_URL=

JWT_SECRET=

NEXT_PUBLIC_APP_URL=

---

# Installation

Clone Repository

```bash
git clone <repo-url>
```

Install Dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Start Development Server

```bash
npm run dev
```

---

# Future Improvements

* AI Lead Scoring
* Email Automation
* WhatsApp Automation
* Trip Seat Tracking
* Payment Integration
* CRM Analytics
* Lead Activity Timeline
* Admin Roles & Permissions
* Notification Center
* Reporting Dashboard

---

Built for Nomichi

Wander. Connect. Belong.
