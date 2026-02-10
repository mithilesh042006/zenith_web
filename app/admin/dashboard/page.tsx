"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onEventsChange } from "@/lib/firebase/firestore";
import { EventData } from "@/types/event";
import { Calendar, Users, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export default function AdminDashboard() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [totalRegistrations, setTotalRegistrations] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubEvents = onEventsChange((evts) => {
            setEvents(evts);
            setLoading(false);
        });

        // Listen to all registrations across all events
        const unsubRegs = onSnapshot(collection(db, "events"), async (snapshot) => {
            let total = 0;
            const promises = snapshot.docs.map(async (doc) => {
                const regsSnap = await new Promise<number>((resolve) => {
                    const unsub = onSnapshot(
                        collection(db, "events", doc.id, "registrations"),
                        (regSnapshot) => {
                            resolve(regSnapshot.size);
                            unsub();
                        }
                    );
                });
                return regsSnap;
            });
            const counts = await Promise.all(promises);
            total = counts.reduce((a, b) => a + b, 0);
            setTotalRegistrations(total);
        });

        return () => {
            unsubEvents();
            unsubRegs();
        };
    }, []);

    const technicalCount = events.filter((e) => e.category === "technical").length;
    const nonTechnicalCount = events.filter((e) => e.category === "non-technical").length;

    const stats = [
        {
            label: "Total Events",
            value: events.length,
            icon: Calendar,
            color: "text-royal-gold",
            bg: "bg-royal-gold/10",
            border: "border-royal-gold/20",
        },
        {
            label: "Technical",
            value: technicalCount,
            icon: TrendingUp,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20",
        },
        {
            label: "Non-Technical",
            value: nonTechnicalCount,
            icon: Users,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            border: "border-emerald-400/20",
        },
        {
            label: "Registrations",
            value: totalRegistrations,
            icon: Users,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            border: "border-purple-400/20",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-display text-neutral-light">
                        Dashboard
                    </h1>
                    <p className="text-neutral-light/50 text-sm mt-1">
                        Welcome back, Admin
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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className={`${stat.bg} border ${stat.border} rounded-xl p-5`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <stat.icon className={stat.color} size={20} />
                        </div>
                        <p className="text-2xl font-bold text-neutral-light">
                            {loading ? "—" : stat.value}
                        </p>
                        <p className="text-sm text-neutral-light/50 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Events */}
            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-neutral-light">
                        Recent Events
                    </h2>
                    <Link
                        href="/admin/events"
                        className="text-royal-gold text-sm flex items-center gap-1 hover:underline"
                    >
                        View All <ArrowRight size={14} />
                    </Link>
                </div>
                {loading ? (
                    <div className="p-10 text-center text-neutral-light/40 text-sm">
                        Loading events...
                    </div>
                ) : events.length === 0 ? (
                    <div className="p-10 text-center">
                        <p className="text-neutral-light/40 text-sm mb-4">
                            No events created yet
                        </p>
                        <Link
                            href="/admin/events/create"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-royal-gold/10 text-royal-gold text-sm border border-royal-gold/20 hover:bg-royal-gold/20 transition-colors"
                        >
                            <Plus size={14} />
                            Create your first event
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {events.slice(0, 5).map((event) => (
                            <Link
                                key={event.id}
                                href={`/admin/events/${event.id}/registrations`}
                                className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                            >
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-light">
                                        {event.title}
                                    </h3>
                                    <p className="text-xs text-neutral-light/40 mt-1">
                                        {event.date} · {event.venue}
                                    </p>
                                </div>
                                <span
                                    className={`text-xs px-3 py-1 rounded-full border ${event.category === "technical"
                                            ? "bg-blue-400/10 text-blue-400 border-blue-400/20"
                                            : "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                                        }`}
                                >
                                    {event.category}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
