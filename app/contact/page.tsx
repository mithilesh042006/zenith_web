"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import { createMessage } from "@/lib/firebase/firestore";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        college: "",
        subject: "",
        message: "",
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setError("Please fill in Name, Email, and Message.");
            return;
        }
        setError("");
        setSending(true);
        try {
            await createMessage(formData);
            setSent(true);
            setFormData({ name: "", email: "", college: "", subject: "", message: "" });
            setTimeout(() => setSent(false), 4000);
        } catch (err) {
            console.error(err);
            setError("Failed to send message. Please try again.");
        } finally {
            setSending(false);
        }
    };

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
                            Get in <span className="text-gradient">Touch</span>
                        </h1>
                        <p className="text-lg text-neutral-light/60 max-w-2xl mx-auto">
                            Have questions? We&apos;d love to hear from you. Reach out to us for registrations, sponsorships, or any inquiries.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl font-bold font-display mb-6">
                                    Contact Information
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg glass">
                                            <Mail className="text-royal-gold" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-light">Email</h3>
                                            <a
                                                href="mailto:zenith@jeppiaar.ac.in"
                                                className="text-neutral-light/60 hover:text-royal-gold transition-colors"
                                            >
                                                zenith@jeppiaar.ac.in
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg glass">
                                            <Phone className="text-royal-gold" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-light">Phone</h3>
                                            <a
                                                href="tel:+919876543210"
                                                className="text-neutral-light/60 hover:text-royal-gold transition-colors"
                                            >
                                                +91 9629287989
                                            </a>
                                            <br />
                                            <a
                                                href="tel:+919876543211"
                                                className="text-neutral-light/60 hover:text-royal-gold transition-colors"
                                            >
                                                +91 9894954524
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg glass">
                                            <MapPin className="text-royal-gold" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-light">Address</h3>
                                            <p className="text-neutral-light/60">
                                                Jeppiaar Engineering College<br />
                                                Old Mahabalipuram Road<br />
                                                Chennai - 600 119<br />
                                                Tamil Nadu, India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg glass">
                                            <Clock className="text-royal-gold" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-light">Event Date</h3>
                                            <p className="text-neutral-light/60">
                                                March 04, 2026<br />
                                                9:00 AM - 6:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="glass-card p-4 h-64 flex items-center justify-center">
                                <p className="text-neutral-light/40 text-center">
                                    <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                                    Interactive Map<br />
                                    <span className="text-sm">Coming Soon</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="glass-card p-8">
                                <h2 className="text-2xl font-bold font-display mb-6">
                                    Send us a Message
                                </h2>

                                {sent && (
                                    <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                                        <CheckCircle className="text-green-400" size={20} />
                                        <p className="text-green-400 text-sm">Message sent successfully! We&apos;ll get back to you soon.</p>
                                    </div>
                                )}

                                {error && (
                                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-neutral-light/80 mb-2"
                                            >
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-deep-charcoal border border-white/10 text-neutral-light placeholder:text-neutral-light/40 focus:outline-none focus:border-royal-gold/50 transition-colors"
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-neutral-light/80 mb-2"
                                            >
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-deep-charcoal border border-white/10 text-neutral-light placeholder:text-neutral-light/40 focus:outline-none focus:border-royal-gold/50 transition-colors"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="college"
                                            className="block text-sm font-medium text-neutral-light/80 mb-2"
                                        >
                                            College / Institution
                                        </label>
                                        <input
                                            type="text"
                                            id="college"
                                            value={formData.college}
                                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-deep-charcoal border border-white/10 text-neutral-light placeholder:text-neutral-light/40 focus:outline-none focus:border-royal-gold/50 transition-colors"
                                            placeholder="Your college name"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block text-sm font-medium text-neutral-light/80 mb-2"
                                        >
                                            Subject
                                        </label>
                                        <select
                                            id="subject"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-deep-charcoal border border-white/10 text-neutral-light focus:outline-none focus:border-royal-gold/50 transition-colors"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="registration">Event Registration</option>
                                            <option value="sponsorship">Sponsorship Inquiry</option>
                                            <option value="technical">Technical Query</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-neutral-light/80 mb-2"
                                        >
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-deep-charcoal border border-white/10 text-neutral-light placeholder:text-neutral-light/40 focus:outline-none focus:border-royal-gold/50 transition-colors resize-none"
                                            placeholder="Your message..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-royal-gold to-gold-light text-black font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-royal-gold/30 disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        {sending ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
