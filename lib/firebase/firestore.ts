import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    Unsubscribe,
} from "firebase/firestore";
import { db } from "./config";
import { EventData, Registration, EventCategory, ContactMessage } from "@/types/event";

// ==========================================
// Events CRUD
// ==========================================

export const createEvent = async (event: Omit<EventData, "id" | "createdAt">) => {
    try {
        const docRef = await addDoc(collection(db, "events"), {
            ...event,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

export const updateEvent = async (id: string, event: Partial<EventData>) => {
    try {
        const docRef = doc(db, "events", id);
        await updateDoc(docRef, event);
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

export const deleteEvent = async (id: string) => {
    try {
        // Delete all registrations first
        const regsSnapshot = await getDocs(
            collection(db, "events", id, "registrations")
        );
        const deletePromises = regsSnapshot.docs.map((d) => deleteDoc(d.ref));
        await Promise.all(deletePromises);

        // Delete the event
        await deleteDoc(doc(db, "events", id));
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};

export const getEvent = async (id: string): Promise<EventData | null> => {
    const docSnap = await getDoc(doc(db, "events", id));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as EventData;
};

export const getEvents = async (category?: EventCategory): Promise<EventData[]> => {
    let q;
    if (category) {
        q = query(
            collection(db, "events"),
            where("category", "==", category),
            orderBy("createdAt", "desc")
        );
    } else {
        q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as EventData));
};

// Real-time events listener
export const onEventsChange = (
    callback: (events: EventData[]) => void,
    category?: EventCategory
): Unsubscribe => {
    let q;
    if (category) {
        q = query(
            collection(db, "events"),
            where("category", "==", category)
        );
    } else {
        q = query(collection(db, "events"));
    }
    return onSnapshot(
        q,
        (snapshot) => {
            const events = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as EventData));
            // Sort client-side to avoid requiring a Firestore index
            events.sort((a, b) => {
                const aTime = a.createdAt?.seconds || 0;
                const bTime = b.createdAt?.seconds || 0;
                return bTime - aTime;
            });
            callback(events);
        },
        (error) => {
            console.error("Events listener error:", error);
            callback([]);
        }
    );
};

// ==========================================
// Registrations
// ==========================================

export const registerForEvent = async (
    eventId: string,
    registration: Omit<Registration, "id" | "registeredAt">
) => {
    try {
        const docRef = await addDoc(
            collection(db, "events", eventId, "registrations"),
            {
                ...registration,
                registeredAt: serverTimestamp(),
            }
        );
        return docRef.id;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
};

export const getRegistrations = async (eventId: string): Promise<Registration[]> => {
    const snapshot = await getDocs(
        collection(db, "events", eventId, "registrations")
    );
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Registration));
};

// Real-time registrations listener
export const onRegistrationsChange = (
    eventId: string,
    callback: (registrations: Registration[]) => void
): Unsubscribe => {
    return onSnapshot(
        collection(db, "events", eventId, "registrations"),
        (snapshot) => {
            const registrations = snapshot.docs.map(
                (d) => ({ id: d.id, ...d.data() } as Registration)
            );
            // Sort client-side
            registrations.sort((a, b) => {
                const aTime = a.registeredAt?.seconds || 0;
                const bTime = b.registeredAt?.seconds || 0;
                return bTime - aTime;
            });
            callback(registrations);
        },
        (error) => {
            console.error("Registrations listener error:", error);
            callback([]);
        }
    );
};

// Get registration count for an event
export const getRegistrationCount = async (eventId: string): Promise<number> => {
    const snapshot = await getDocs(
        collection(db, "events", eventId, "registrations")
    );
    return snapshot.size;
};

// Real-time count listener
export const onRegistrationCountChange = (
    eventId: string,
    callback: (count: number) => void
): Unsubscribe => {
    return onSnapshot(
        collection(db, "events", eventId, "registrations"),
        (snapshot) => {
            callback(snapshot.size);
        },
        (error) => {
            console.error("Registration count listener error:", error);
            callback(0);
        }
    );
};

// ==========================================
// Contact Messages
// ==========================================

export const createMessage = async (msg: Omit<ContactMessage, "id" | "createdAt" | "read">) => {
    try {
        const docRef = await addDoc(collection(db, "messages"), {
            ...msg,
            read: false,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

export const onMessagesChange = (
    callback: (messages: ContactMessage[]) => void
): Unsubscribe => {
    return onSnapshot(
        collection(db, "messages"),
        (snapshot) => {
            const messages = snapshot.docs.map(
                (d) => ({ id: d.id, ...d.data() } as ContactMessage)
            );
            messages.sort((a, b) => {
                const aTime = (a.createdAt as unknown as { seconds: number })?.seconds || 0;
                const bTime = (b.createdAt as unknown as { seconds: number })?.seconds || 0;
                return bTime - aTime;
            });
            callback(messages);
        },
        (error) => {
            console.error("Messages listener error:", error);
            callback([]);
        }
    );
};

export const markMessageRead = async (id: string) => {
    try {
        await updateDoc(doc(db, "messages", id), { read: true });
    } catch (error) {
        console.error("Error marking message read:", error);
        throw error;
    }
};

export const deleteMessage = async (id: string) => {
    try {
        await deleteDoc(doc(db, "messages", id));
    } catch (error) {
        console.error("Error deleting message:", error);
        throw error;
    }
};
