"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import Footer from "../components/Footer";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-primary-black">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="text-sm uppercase tracking-[0.3em] text-accent-orange">
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
                                            <Mail className="text-highlight-red" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-light">Email</h3>
                                            <a
                                                href="mailto:zenith@jeppiaar.ac.in"
                                                className="text-neutral-light/60 hover:text-accent-orange transition-colors"
                                            >
                                                zenith@jeppiaar.ac.in
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg glass">
                                            <Phone className="text-highlight-red" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-light">Phone</h3>
                                            <a
                                                href="tel:+919876543210"
                                                className="text-neutral-light/60 hover:text-accent-orange transition-colors"
                                            >
                                                +91 98765 43210
                                            </a>
                                            <br />
                                            <a
                                                href="tel:+919876543211"
                                                className="text-neutral-light/60 hover:text-accent-orange transition-colors"
                                            >
                                                +91 98765 43211
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg glass">
                                            <MapPin className="text-highlight-red" size={24} />
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
                                            <Clock className="text-highlight-red" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-light">Event Date</h3>
                                            <p className="text-neutral-light/60">
                                                March 15-16, 2026<br />
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
                                <form className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-neutral-light/80 mb-2"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="w-full px-4 py-3 rounded-lg bg-deep-charcoal border border-white/10 text-neutral-light placeholder:text-neutral-light/40 focus:outline-none focus:border-highlight-red/50 transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-neutral-light/80 mb-2"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="w-full px-4 py-3 rounded-lg bg-deep-charcoal border border-white/10 text-neutral-light placeholder:text-neutral-light/40 focus:outline-none focus:border-highlight-red/50 transition-colors"
                                                placeholder="your@email.com"
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
                                            name="college"
                                            className="w-full px-4 py-3 rounded-lg bg-deep-charcoal border border-white/10 text-neutral-light placeholder:text-neutral-light/40 focus:outline-none focus:border-highlight-red/50 transition-colors"
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
                                            name="subject"
                                            className="w-full px-4 py-3 rounded-lg bg-deep-charcoal border border-white/10 text-neutral-light focus:outline-none focus:border-highlight-red/50 transition-colors"
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
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg bg-deep-charcoal border border-white/10 text-neutral-light placeholder:text-neutral-light/40 focus:outline-none focus:border-highlight-red/50 transition-colors resize-none"
                                            placeholder="Your message..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-highlight-red to-accent-orange text-white font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-highlight-red/30"
                                    >
                                        <Send size={20} />
                                        Send Message
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
