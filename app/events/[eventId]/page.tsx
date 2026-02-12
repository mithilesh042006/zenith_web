"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getEvent, registerForEvent } from "@/lib/firebase/firestore";
import { EventData } from "@/types/event";
import AnimatedBackground from "@/app/components/AnimatedBackground";
import Footer from "@/app/components/Footer";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    CheckCircle,
    ArrowLeft,
    Loader2,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function EventDetailPage() {
    const params = useParams();
    const eventId = params.eventId as string;
    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        participantName: "",
        email: "",
        phone: "",
        department: "",
        college: "",
        teamMembers: "",
    });

    useEffect(() => {
        const fetch = async () => {
            const data = await getEvent(eventId);
            setEvent(data);
            setLoading(false);
        };
        fetch();
    }, [eventId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            await registerForEvent(eventId, {
                participantName: form.participantName,
                email: form.email,
                phone: form.phone,
                department: form.department,
                college: form.college,
                teamMembers: form.teamMembers
                    ? form.teamMembers.split(",").map((m) => m.trim())
                    : [],
            });
            setSuccess(true);
            setForm({
                participantName: "",
                email: "",
                phone: "",
                department: "",
                college: "",
                teamMembers: "",
            });
        } catch (err) {
            setError("Registration failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass =
        "w-full px-4 py-3 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-neutral-light placeholder:text-neutral-light/30 focus:outline-none focus:border-royal-gold/50 transition-colors text-sm";

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

    return (
        <main className="min-h-screen relative">
            <AnimatedBackground />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-1 text-sm text-neutral-light/50 hover:text-neutral-light mb-8 transition-colors"
                    >
                        <ArrowLeft size={14} />
                        Back to Events
                    </Link>

                    <div className="space-y-8">
                        {/* Event Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div>
                                <span
                                    className={`text-xs px-3 py-1 rounded-full border ${event.category === "technical"
                                        ? "bg-blue-400/10 text-blue-400 border-blue-400/20"
                                        : "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                                        }`}
                                >
                                    {event.category === "technical" ? "Technical" : "Non-Technical"}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold font-display text-neutral-light">
                                {event.title}
                            </h1>

                            {/* Event Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-royal-gold mb-1.5">
                                        <Calendar size={16} />
                                        <span className="text-xs font-medium uppercase tracking-wider">Date</span>
                                    </div>
                                    <p className="text-sm text-neutral-light font-medium">{event.date}</p>
                                </div>
                                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-royal-gold mb-1.5">
                                        <Clock size={16} />
                                        <span className="text-xs font-medium uppercase tracking-wider">Time</span>
                                    </div>
                                    <p className="text-sm text-neutral-light font-medium">{event.time}</p>
                                </div>
                                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-royal-gold mb-1.5">
                                        <MapPin size={16} />
                                        <span className="text-xs font-medium uppercase tracking-wider">Venue</span>
                                    </div>
                                    <p className="text-sm text-neutral-light font-medium">{event.venue}</p>
                                </div>
                                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-royal-gold mb-1.5">
                                        <Users size={16} />
                                        <span className="text-xs font-medium uppercase tracking-wider">Participants</span>
                                    </div>
                                    <p className="text-sm text-neutral-light font-medium">{event.teamSize}</p>
                                </div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-neutral-light mb-3">
                                    About the Event
                                </h2>
                                <p className="text-neutral-light/60 text-sm leading-relaxed whitespace-pre-wrap">
                                    {event.description}
                                </p>
                            </div>

                            {event.rules && event.rules.length > 0 && (
                                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                    <h2 className="text-lg font-semibold text-neutral-light mb-3">
                                        Rules
                                    </h2>
                                    <ul className="space-y-2">
                                        {event.rules.map((rule, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-2 text-sm text-neutral-light/60"
                                            >
                                                <span className="text-royal-gold mt-0.5">•</span>
                                                {rule}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Coordinators */}
                            {((event.staffCoordinators && event.staffCoordinators.length > 0) || (event.coordinators && event.coordinators.length > 0)) && (
                                <Link
                                    href={`/events/${eventId}/coordinators`}
                                    className="block bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-royal-gold/30 transition-all duration-300 group"
                                >
                                    <div className="space-y-4">
                                        {/* Staff Coordinators */}
                                        {event.staffCoordinators && event.staffCoordinators.length > 0 && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex -space-x-2">
                                                        {event.staffCoordinators.slice(0, 3).map((coord, i) => (
                                                            coord.photo ? (
                                                                <div key={i} className="w-10 h-10 rounded-full overflow-hidden border-2 border-black">
                                                                    <img src={coord.photo} alt={coord.name} className="w-full h-full object-cover" />
                                                                </div>
                                                            ) : (
                                                                <div key={i} className="w-10 h-10 rounded-full bg-royal-gold/10 border-2 border-black flex items-center justify-center">
                                                                    <Users size={14} className="text-royal-gold" />
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-neutral-light">
                                                            Staff Coordinator{event.staffCoordinators.length > 1 ? "s" : ""}
                                                        </p>
                                                        <p className="text-xs text-neutral-light/40">
                                                            {event.staffCoordinators.map(c => c.name).join(", ")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Divider if both exist */}
                                        {event.staffCoordinators && event.staffCoordinators.length > 0 && event.coordinators && event.coordinators.length > 0 && (
                                            <div className="border-t border-white/5" />
                                        )}

                                        {/* Event Coordinators */}
                                        {event.coordinators && event.coordinators.length > 0 && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex -space-x-2">
                                                        {event.coordinators.slice(0, 3).map((coord, i) => (
                                                            coord.photo ? (
                                                                <div key={i} className="w-10 h-10 rounded-full overflow-hidden border-2 border-black">
                                                                    <img src={coord.photo} alt={coord.name} className="w-full h-full object-cover" />
                                                                </div>
                                                            ) : (
                                                                <div key={i} className="w-10 h-10 rounded-full bg-royal-gold/10 border-2 border-black flex items-center justify-center">
                                                                    <Users size={14} className="text-royal-gold" />
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-neutral-light">
                                                            Event Coordinator{event.coordinators.length > 1 ? "s" : ""}
                                                        </p>
                                                        <p className="text-xs text-neutral-light/40">
                                                            {event.coordinators.map(c => c.name).join(", ")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* View arrow */}
                                    <div className="flex justify-end mt-3">
                                        <span className="text-royal-gold text-sm font-medium group-hover:translate-x-1 transition-transform">
                                            View All →
                                        </span>
                                    </div>
                                </Link>
                            )}
                        </motion.div>

                        {/* Registration Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-4xl"
                        >
                            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-neutral-light mb-1">
                                    Register Now
                                </h2>
                                <p className="text-xs text-neutral-light/40 mb-6">
                                    Fill in your details to register
                                </p>

                                {success ? (
                                    <div className="text-center py-8">
                                        <CheckCircle className="mx-auto text-green-400 mb-4" size={48} />
                                        <h3 className="text-lg font-semibold text-neutral-light mb-2">
                                            Registration Successful!
                                        </h3>
                                        <p className="text-sm text-neutral-light/50 mb-6">
                                            You have been registered for {event.title}
                                        </p>
                                        <button
                                            onClick={() => setSuccess(false)}
                                            className="text-sm text-royal-gold hover:underline"
                                        >
                                            Register another participant
                                        </button>
                                    </div>
                                ) : !event.registrationOpen ? (
                                    <div className="text-center py-8">
                                        <AlertCircle className="mx-auto text-red-400/50 mb-4" size={40} />
                                        <p className="text-neutral-light/40 text-sm">
                                            Registration is currently closed for this event
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {error && (
                                            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg">
                                                {error}
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-xs font-medium text-neutral-light/60 mb-1.5">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="participantName"
                                                value={form.participantName}
                                                onChange={handleChange}
                                                className={inputClass}
                                                placeholder="Your full name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-neutral-light/60 mb-1.5">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                className={inputClass}
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-neutral-light/60 mb-1.5">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                className={inputClass}
                                                placeholder="+91 98765 43210"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-neutral-light/60 mb-1.5">
                                                Department *
                                            </label>
                                            <input
                                                type="text"
                                                name="department"
                                                value={form.department}
                                                onChange={handleChange}
                                                className={inputClass}
                                                placeholder="e.g., Computer Science"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-neutral-light/60 mb-1.5">
                                                College *
                                            </label>
                                            <input
                                                type="text"
                                                name="college"
                                                value={form.college}
                                                onChange={handleChange}
                                                className={inputClass}
                                                placeholder="Your college name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-neutral-light/60 mb-1.5">
                                                Team Members (comma separated)
                                            </label>
                                            <input
                                                type="text"
                                                name="teamMembers"
                                                value={form.teamMembers}
                                                onChange={handleChange}
                                                className={inputClass}
                                                placeholder="e.g., John, Jane, Doe"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full py-3 rounded-lg bg-gradient-to-r from-royal-gold to-gold-light text-black font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-royal-gold/20 disabled:opacity-50 disabled:hover:scale-100 mt-2"
                                        >
                                            {submitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Loader2 size={16} className="animate-spin" />
                                                    Registering...
                                                </span>
                                            ) : (
                                                "Register"
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
