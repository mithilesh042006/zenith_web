"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { onEventsChange } from "@/lib/firebase/firestore";
import { EventData } from "@/types/event";
import AnimatedBackground from "@/app/components/AnimatedBackground";
import Footer from "@/app/components/Footer";
import {
    Calendar,
    MapPin,
    Users,
    ArrowRight,
    Search,
} from "lucide-react";

export default function EventsPage() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "technical" | "non-technical">("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const unsub = onEventsChange((evts) => {
            setEvents(evts);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const filteredEvents = events.filter((e) => {
        const matchesFilter = filter === "all" || e.category === filter;
        const matchesSearch =
            search === "" ||
            e.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <main className="min-h-screen relative">
            <AnimatedBackground />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6 relative">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-royal-gold text-sm tracking-[0.3em] uppercase mb-4"
                    >
                        ZENITH&apos;26
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-display text-neutral-light"
                    >
                        All <span className="text-royal-gold">Events</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-light/60 mt-4 max-w-xl mx-auto"
                    >
                        Browse and register for technical and non-technical events
                    </motion.p>
                </div>
            </section>

            {/* Filters */}
            <section className="px-6 pb-8">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 max-w-md w-full">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light/30"
                            size={16}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search events..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-neutral-light placeholder:text-neutral-light/30 focus:outline-none focus:border-royal-gold/50 transition-colors text-sm"
                        />
                    </div>
                    <div className="flex gap-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-1">
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
            </section>

            {/* Events Grid */}
            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20 text-neutral-light/40 text-sm">
                            Loading events...
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-neutral-light/40 text-sm">
                                {events.length === 0
                                    ? "No events available yet. Check back soon!"
                                    : "No events match your search."}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={`/events/${event.id}`}
                                        className="block bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-royal-gold/30 hover:bg-black/60 transition-all group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full border ${event.category === "technical"
                                                        ? "bg-blue-400/10 text-blue-400 border-blue-400/20"
                                                        : "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                                                    }`}
                                            >
                                                {event.category === "technical" ? "Technical" : "Non-Technical"}
                                            </span>
                                            <ArrowRight
                                                size={16}
                                                className="text-neutral-light/20 group-hover:text-royal-gold group-hover:translate-x-1 transition-all"
                                            />
                                        </div>

                                        <h3 className="text-lg font-semibold text-neutral-light mb-2 group-hover:text-royal-gold transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-neutral-light/50 line-clamp-2 mb-4">
                                            {event.description}
                                        </p>

                                        <div className="space-y-1.5 text-xs text-neutral-light/40">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={12} />
                                                {event.venue}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users size={12} />
                                                {event.teamSize}
                                            </div>
                                        </div>

                                        {!event.registrationOpen && (
                                            <div className="mt-4">
                                                <span className="text-xs text-red-400/70 bg-red-500/10 px-3 py-1 rounded-full">
                                                    Registration Closed
                                                </span>
                                            </div>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
