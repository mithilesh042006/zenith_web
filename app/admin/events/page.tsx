"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onEventsChange, deleteEvent } from "@/lib/firebase/firestore";
import { EventData } from "@/types/event";
import {
    Plus,
    Pencil,
    Trash2,
    Users,
    Calendar,
    MapPin,
    Search,
} from "lucide-react";

export default function AdminEventsPage() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "technical" | "non-technical">("all");
    const [search, setSearch] = useState("");
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        const unsub = onEventsChange((evts) => {
            setEvents(evts);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event? All registrations will also be deleted.")) return;
        setDeleting(id);
        try {
            await deleteEvent(id);
        } catch (error) {
            console.error("Error deleting event:", error);
        }
        setDeleting(null);
    };

    const filteredEvents = events.filter((e) => {
        const matchesFilter = filter === "all" || e.category === filter;
        const matchesSearch =
            search === "" ||
            e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.venue.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-display text-neutral-light">
                        Events
                    </h1>
                    <p className="text-neutral-light/50 text-sm mt-1">
                        Manage symposium events
                    </p>
                </div>
                <Link
                    href="/admin/events/create"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-royal-gold to-gold-light text-black font-semibold text-sm hover:scale-105 transition-transform"
                >
                    <Plus size={16} />
                    Create Event
                </Link>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-xs">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light/30"
                        size={16}
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search events..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#111] border border-white/10 text-neutral-light placeholder:text-neutral-light/30 focus:outline-none focus:border-royal-gold/50 transition-colors text-sm"
                    />
                </div>
                <div className="flex gap-1 bg-[#111] border border-white/10 rounded-lg p-1">
                    {(["all", "technical", "non-technical"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${filter === f
                                    ? "bg-royal-gold/20 text-royal-gold"
                                    : "text-neutral-light/50 hover:text-neutral-light"
                                }`}
                        >
                            {f === "all" ? "All" : f === "technical" ? "Technical" : "Non-Technical"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Events Table */}
            {loading ? (
                <div className="bg-[#111] border border-white/10 rounded-xl p-10 text-center text-neutral-light/40 text-sm">
                    Loading events...
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="bg-[#111] border border-white/10 rounded-xl p-10 text-center">
                    <p className="text-neutral-light/40 text-sm mb-4">
                        {events.length === 0
                            ? "No events created yet"
                            : "No events match your search"}
                    </p>
                    {events.length === 0 && (
                        <Link
                            href="/admin/events/create"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-royal-gold/10 text-royal-gold text-sm border border-royal-gold/20"
                        >
                            <Plus size={14} />
                            Create your first event
                        </Link>
                    )}
                </div>
            ) : (
                <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                    Event
                                </th>
                                <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                    Category
                                </th>
                                <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                    Date
                                </th>
                                <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                    Venue
                                </th>
                                <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                    Status
                                </th>
                                <th className="text-right text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4">
                                        <p className="text-sm font-medium text-neutral-light">
                                            {event.title}
                                        </p>
                                        <p className="text-xs text-neutral-light/40 mt-0.5">
                                            {event.teamSize}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full border ${event.category === "technical"
                                                    ? "bg-blue-400/10 text-blue-400 border-blue-400/20"
                                                    : "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                                                }`}
                                        >
                                            {event.category}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1.5 text-sm text-neutral-light/60">
                                            <Calendar size={13} />
                                            {event.date}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1.5 text-sm text-neutral-light/60">
                                            <MapPin size={13} />
                                            {event.venue}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full ${event.registrationOpen
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-red-500/10 text-red-400"
                                                }`}
                                        >
                                            {event.registrationOpen ? "Open" : "Closed"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/events/${event.id}/registrations`}
                                                className="p-2 rounded-lg text-purple-400 hover:bg-purple-500/10 transition-colors"
                                                title="View Registrations"
                                            >
                                                <Users size={16} />
                                            </Link>
                                            <Link
                                                href={`/admin/events/${event.id}/edit`}
                                                className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors"
                                                title="Edit Event"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(event.id!)}
                                                disabled={deleting === event.id}
                                                className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                                title="Delete Event"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
