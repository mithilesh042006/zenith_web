"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import { onEventsChange } from "@/lib/firebase/firestore";
import { EventData } from "@/types/event";

export default function NonTechnicalEventsPage() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onEventsChange((evts) => {
            setEvents(evts);
            setLoading(false);
        }, "non-technical");
        return () => unsub();
    }, []);

    return (
        <main className="min-h-screen relative">
            <AnimatedBackground />
            {/* Hero */}
            <section className="pt-32 pb-16 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="text-sm uppercase tracking-[0.3em] text-royal-gold">
                            ZENITH&apos;26
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mt-4 mb-6">
                            Non-Technical <span className="text-gradient">Events</span>
                        </h1>
                        <p className="text-lg text-neutral-light/60 max-w-2xl mx-auto">
                            Unleash your creativity, express yourself, and have fun with events that go beyond code and circuits.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-royal-gold border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-neutral-light/40">No non-technical events available yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    title={event.title}
                                    description={event.description}
                                    date={event.date}
                                    venue={event.venue}
                                    teamSize={event.teamSize}
                                    category="non-technical"
                                    href={`/events/${event.id}`}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                            Ready to Have Fun?
                        </h2>
                        <p className="text-neutral-light/60 mb-8">
                            Register now and showcase your talents at ZENITH&apos;26.
                        </p>
                        <a
                            href="/events"
                            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-royal-gold to-gold-light text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-royal-gold/30"
                        >
                            Browse All Events
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
