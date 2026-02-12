import { Timestamp } from "firebase/firestore";

export type EventCategory = "technical" | "non-technical";

export interface Coordinator {
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface EventData {
    id?: string;
    title: string;
    category: EventCategory;
    description: string;
    rules: string[];
    date: string;
    time: string;
    venue: string;
    teamSize: string;
    registrationOpen: boolean;
    coordinators?: Coordinator[];
    staffCoordinators?: Coordinator[];
    createdAt?: Timestamp;
}

export interface Registration {
    id?: string;
    participantName: string;
    email: string;
    phone: string;
    department: string;
    college: string;
    teamMembers?: string[];
    registeredAt?: Timestamp;
}

export interface ContactMessage {
    id?: string;
    name: string;
    email: string;
    college: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt?: Timestamp;
}
