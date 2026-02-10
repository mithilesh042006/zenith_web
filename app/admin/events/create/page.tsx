"use client";

import { createEvent } from "@/lib/firebase/firestore";
import EventForm from "@/components/admin/EventForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateEventPage() {
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
                    Create Event
                </h1>
                <p className="text-neutral-light/50 text-sm mt-1">
                    Add a new symposium event
                </p>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <EventForm onSubmit={async (data) => { await createEvent(data); }} />
            </div>
        </div>
    );
}
