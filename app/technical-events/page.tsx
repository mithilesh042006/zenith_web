"use client";

import { motion } from "framer-motion";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";

const technicalEvents = [
    {
        title: "Code Sprint",
        description: "A 3-hour competitive programming challenge where participants solve algorithmic problems against the clock. Test your logic and coding efficiency.",
        date: "March 15, 2026",
        venue: "Lab Complex",
        teamSize: "1-2 members",
    },
    {
        title: "Hackathon",
        description: "Build innovative solutions to real-world problems in this 24-hour coding marathon. Pitch your prototype to industry experts.",
        date: "March 15-16, 2026",
        venue: "Seminar Hall",
        teamSize: "3-4 members",
    },
    {
        title: "Debug It",
        description: "Find and fix bugs in complex code snippets. Race against time and other teams to debug the most code correctly.",
        date: "March 15, 2026",
        venue: "Lab 1",
        teamSize: "2 members",
    },
    {
        title: "Paper Presentation",
        description: "Present your research papers on emerging technologies. Showcase your knowledge and communication skills to a panel of experts.",
        date: "March 16, 2026",
        venue: "Conference Hall",
        teamSize: "1-2 members",
    },
    {
        title: "Web Design Challenge",
        description: "Design and develop a responsive website on a given theme within the time limit. Creativity and functionality both count.",
        date: "March 15, 2026",
        venue: "Lab 2",
        teamSize: "2 members",
    },
    {
        title: "Circuit Design",
        description: "Design and simulate electronic circuits to solve given problems. Perfect for electronics enthusiasts.",
        date: "March 16, 2026",
        venue: "ECE Lab",
        teamSize: "2-3 members",
    },
    {
        title: "Quiz Wizard",
        description: "Test your technical knowledge across various domains including programming, networks, databases, and more.",
        date: "March 15, 2026",
        venue: "Auditorium",
        teamSize: "2 members",
    },
    {
        title: "Robo Race",
        description: "Build and race your robot through a challenging obstacle course. Speed and precision win the race.",
        date: "March 16, 2026",
        venue: "Ground Floor",
        teamSize: "3-4 members",
    },
];

export default function TechnicalEventsPage() {
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
                            Technical <span className="text-gradient">Events</span>
                        </h1>
                        <p className="text-lg text-neutral-light/60 max-w-2xl mx-auto">
                            Challenge your technical skills, compete with the best, and showcase your expertise in coding, robotics, and problem-solving.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {technicalEvents.map((event, index) => (
                            <EventCard
                                key={event.title}
                                title={event.title}
                                description={event.description}
                                date={event.date}
                                venue={event.venue}
                                teamSize={event.teamSize}
                                category="technical"
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
                            Ready to Compete?
                        </h2>
                        <p className="text-neutral-light/60 mb-8">
                            Register now and secure your spot in ZENITH&apos;26 technical events.
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
