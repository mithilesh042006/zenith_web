"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEvent, updateEvent } from "@/lib/firebase/firestore";
import { EventData } from "@/types/event";
import EventForm from "@/components/admin/EventForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditEventPage() {
    const params = useParams();
    const eventId = params.eventId as string;
    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const data = await getEvent(eventId);
            setEvent(data);
            setLoading(false);
        };
        fetch();
    }, [eventId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-royal-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="text-center py-20">
                <p className="text-neutral-light/40">Event not found</p>
                <Link href="/admin/events" className="text-royal-gold text-sm mt-4 inline-block">
                    Back to Events
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/events"
                    className="inline-flex items-center gap-1 text-sm text-neutral-light/50 hover:text-neutral-light mb-4 transition-colors"
                >
                    <ArrowLeft size={14} />
                    Back to Events
                </Link>
                <h1 className="text-2xl font-bold font-display text-neutral-light">
                    Edit Event
                </h1>
                <p className="text-neutral-light/50 text-sm mt-1">
                    Update &ldquo;{event.title}&rdquo;
                </p>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <EventForm
                    initialData={event}
                    isEdit
                    onSubmit={async (data) => { await updateEvent(eventId, data); }}
                />
            </div>
        </div>
    );
}
