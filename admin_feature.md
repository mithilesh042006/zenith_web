# ZENITH'26 – Admin Panel & Event Management System

## Overview
This document defines the **Admin Panel architecture**, **Firebase integration**, **authentication system**, and **real-time event & registration management workflow** for the ZENITH'26 symposium website.

The admin panel is part of the **same Next.js application** and is accessible via `/admin`.

---

## Objectives

### Admin Capabilities
- Securely authenticate as an admin
- Create, edit, and delete symposium events
- Manage both **Technical** and **Non-Technical** events
- View participant registrations **in real time**
- Monitor live registration counts

### Participant Capabilities
- View all available events
- View detailed event information
- Register for specific events
- Receive confirmation after successful registration

---

## Route Structure

| Route | Access | Description |
|------|------|-------------|
| `/` | Public | Main symposium website |
| `/events` | Public | All events listing |
| `/events/[eventId]` | Public | Event details & registration |
| `/admin` | Admin | Admin login & dashboard |
| `/admin/events` | Admin | Create, edit, delete events |
| `/admin/events/[eventId]` | Admin | View registrations for an event |

---

## Tech Stack

### Frontend
- **Next.js (App Router)**
- **Tailwind CSS**
- **shadcn/ui**
- Client Components for admin routes

### Backend & Services
- **Firebase**
  - Firebase Authentication
  - Cloud Firestore
  - Firestore real-time listeners
  - Firebase Security Rules

---

## Authentication & Authorization

### Admin Authentication
- Firebase **Email & Password Authentication**
- Only authorized admin emails allowed

### Authentication Flow
1. Admin visits `/admin`
2. If not authenticated → redirected to login screen
3. Firebase validates credentials
4. Admin session persists via Firebase Auth
5. Unauthorized users are blocked from admin routes

### Route Protection
- Admin routes wrapped with an `AdminGuard`
- Non-admin users redirected to home or login page

---

## Firebase Data Model

---

### 1. Events Collection

```js
events (collection)
 └── eventId (document)
     ├── title: string
     ├── category: "technical" | "non-technical"
     ├── description: string
     ├── rules: string[]
     ├── date: string
     ├── time: string
     ├── venue: string
     ├── teamSize: string
     ├── registrationOpen: boolean
     ├── createdAt: timestamp

Registrations Subcollection
events
 └── eventId
     └── registrations (subcollection)
         └── registrationId
             ├── participantName: string
             ├── email: string
             ├── phone: string
             ├── department: string
             ├── college: string
             ├── registeredAt: timestamp

