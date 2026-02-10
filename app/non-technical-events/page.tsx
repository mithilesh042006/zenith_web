"use client";

import { motion } from "framer-motion";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";

const nonTechnicalEvents = [
    {
        title: "Treasure Hunt",
        description: "Follow cryptic clues across the campus to find hidden treasures. Team coordination and quick thinking are your best weapons.",
        date: "March 15, 2026",
        venue: "Campus",
        teamSize: "4-5 members",
    },
    {
        title: "IPL Auction",
        description: "Build your dream cricket team within a budget. Strategy, negotiation, and cricket knowledge will determine the winner.",
        date: "March 15, 2026",
        venue: "Seminar Hall",
        teamSize: "3-4 members",
    },
    {
        title: "Photography Contest",
        description: "Capture the essence of the symposium through your lens. Theme-based photography with prizes for the best shots.",
        date: "March 15-16, 2026",
        venue: "Campus",
        teamSize: "Individual",
    },
    {
        title: "Dance Battle",
        description: "Show off your dance moves in this high-energy competition. Solo or group performances welcome across all dance styles.",
        date: "March 16, 2026",
        venue: "Main Stage",
        teamSize: "1-8 members",
    },
    {
        title: "Mime Act",
        description: "Express without words. Perform a silent act that tells a story and captivates the audience.",
        date: "March 16, 2026",
        venue: "Auditorium",
        teamSize: "1-4 members",
    },
    {
        title: "Short Film Festival",
        description: "Submit your short films and compete for the best director, actor, and overall film awards.",
        date: "March 15, 2026",
        venue: "AV Hall",
        teamSize: "3-6 members",
    },
    {
        title: "Stand-up Comedy",
        description: "Make the audience laugh with your wit and humor. Original content gets bonus points!",
        date: "March 16, 2026",
        venue: "Open Air Theatre",
        teamSize: "Individual",
    },
    {
        title: "Gaming Arena",
        description: "Compete in popular games like Valorant, FIFA, and BGMI. Show your gaming skills and claim victory.",
        date: "March 15-16, 2026",
        venue: "Gaming Zone",
        teamSize: "Varies",
    },
];

export default function NonTechnicalEventsPage() {
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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {nonTechnicalEvents.map((event, index) => (
                            <EventCard
                                key={event.title}
                                title={event.title}
                                description={event.description}
                                date={event.date}
                                venue={event.venue}
                                teamSize={event.teamSize}
                                category="non-technical"
                                index={index}
                            />
                        ))}
                    </div>
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
                            href="/contact"
                            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-royal-gold to-gold-light text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-royal-gold/30"
                        >
                            Register Now
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
