import { Timestamp } from "firebase/firestore";

export type EventCategory = "technical" | "non-technical";

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
