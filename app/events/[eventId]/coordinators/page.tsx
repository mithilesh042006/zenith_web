"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getEvent } from "@/lib/firebase/firestore";
import { EventData, Coordinator } from "@/types/event";
import AnimatedBackground from "@/app/components/AnimatedBackground";
import Footer from "@/app/components/Footer";
import { ArrowLeft, Phone, Mail, Users, User } from "lucide-react";
import Link from "next/link";

function CoordinatorCard({ coord, index }: { coord: Coordinator; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-royal-gold/20 transition-all duration-300"
        >
            {/* Photo */}
            <div className="mx-auto mb-4">
                {coord.photo ? (
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-royal-gold/30 shadow-lg shadow-royal-gold/10">
                        <img
                            src={coord.photo}
                            alt={coord.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-24 h-24 mx-auto rounded-full bg-royal-gold/10 border-3 border-royal-gold/30 flex items-center justify-center">
                        <Users size={32} className="text-royal-gold" />
                    </div>
                )}
            </div>

            {/* Name */}
            <h3 className="text-lg font-semibold text-neutral-light mb-3">
                {coord.name}
            </h3>

            {/* Contact Details */}
            <div className="space-y-2">
                {coord.phone && (
                    <a
                        href={`tel:${coord.phone}`}
                        className="flex items-center justify-center gap-2 text-sm text-neutral-light/50 hover:text-royal-gold transition-colors"
                    >
                        <Phone size={14} className="text-royal-gold/60" />
                        {coord.phone}
                    </a>
                )}
                {coord.email && (
                    <a
                        href={`mailto:${coord.email}`}
                        className="flex items-center justify-center gap-2 text-sm text-neutral-light/50 hover:text-royal-gold transition-colors break-all"
                    >
                        <Mail size={14} className="text-royal-gold/60 flex-shrink-0" />
                        {coord.email}
                    </a>
                )}
            </div>
        </motion.div>
    );
}

export default function EventCoordinatorsPage() {
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
            <main className="min-h-screen relative">
                <AnimatedBackground />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-10 h-10 border-2 border-royal-gold border-t-transparent rounded-full animate-spin" />
                </div>
            </main>
        );
    }

    if (!event) {
        return (
            <main className="min-h-screen relative">
                <AnimatedBackground />
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <p className="text-neutral-light/40 mb-4">Event not found</p>
                    <Link href="/events" className="text-royal-gold text-sm">
                        ← Back to Events
                    </Link>
                </div>
            </main>
        );
    }

    const staffCoordinators = event.staffCoordinators || [];
    const coordinators = event.coordinators || [];
    const hasStaff = staffCoordinators.length > 0;
    const hasCoordinators = coordinators.length > 0;

    return (
        <main className="min-h-screen relative">
            <AnimatedBackground />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href={`/events/${eventId}`}
                        className="inline-flex items-center gap-1 text-sm text-neutral-light/50 hover:text-neutral-light mb-8 transition-colors"
                    >
                        <ArrowLeft size={14} />
                        Back to {event.title}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <span
                            className={`text-xs px-3 py-1 rounded-full border ${event.category === "technical"
                                ? "bg-blue-400/10 text-blue-400 border-blue-400/20"
                                : "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                                }`}
                        >
                            {event.category === "technical" ? "Technical" : "Non-Technical"}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold font-display text-neutral-light mt-4">
                            Coordinators
                        </h1>
                        <p className="text-neutral-light/40 text-sm mt-2">
                            {event.title}
                        </p>
                    </motion.div>

                    {/* Staff Coordinators Section */}
                    {hasStaff && (
                        <div className="mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 mb-6"
                            >
                                <Users size={18} className="text-royal-gold" />
                                <h2 className="text-xl font-semibold text-neutral-light">
                                    Staff Coordinators
                                </h2>
                            </motion.div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {staffCoordinators.map((coord, i) => (
                                    <CoordinatorCard key={`staff-${i}`} coord={coord} index={i} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Event Coordinators Section */}
                    {hasCoordinators && (
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: hasStaff ? 0.2 : 0 }}
                                className="flex items-center gap-2 mb-6"
                            >
                                <User size={18} className="text-royal-gold" />
                                <h2 className="text-xl font-semibold text-neutral-light">
                                    Event Coordinators
                                </h2>
                            </motion.div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {coordinators.map((coord, i) => (
                                    <CoordinatorCard key={`coord-${i}`} coord={coord} index={i} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty state */}
                    {!hasStaff && !hasCoordinators && (
                        <div className="text-center py-20">
                            <Users size={48} className="mx-auto text-neutral-light/15 mb-4" />
                            <p className="text-neutral-light/40">
                                No coordinators listed for this event
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
