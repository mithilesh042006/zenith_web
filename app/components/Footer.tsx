import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-deep-charcoal border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold font-display text-gradient">
                            ZENITH&apos;26
                        </h3>
                        <p className="text-neutral-light/60 text-sm leading-relaxed">
                            Rise of Innovation. The premier technical symposium of Jeppiaar Engineering College.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-neutral-light">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {[
                                { href: "/technical-events", label: "Technical Events" },
                                { href: "/non-technical-events", label: "Non-Technical Events" },
                                { href: "/coordinators", label: "Coordinators" },
                                { href: "/contact", label: "Contact" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-light/60 hover:text-accent-orange transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-neutral-light">
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-neutral-light/60 text-sm">
                                <Mail size={16} className="text-royal-gold" />
                                zenith@jeppiaar.ac.in
                            </li>
                            <li className="flex items-center gap-3 text-neutral-light/60 text-sm">
                                <Phone size={16} className="text-royal-gold" />
                                +91 98765 43210
                            </li>
                            <li className="flex items-start gap-3 text-neutral-light/60 text-sm">
                                <MapPin size={16} className="text-royal-gold mt-0.5" />
                                <span>
                                    Jeppiaar Engineering College,<br />
                                    Chennai, Tamil Nadu
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-neutral-light">
                            Follow Us
                        </h4>
                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, href: "#", label: "Instagram" },
                                { icon: Linkedin, href: "#", label: "LinkedIn" },
                                { icon: Youtube, href: "#", label: "YouTube" },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-neutral-light/60 hover:text-royal-gold hover:border-royal-gold/50 transition-all duration-300"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-neutral-light/40 text-sm">
                        © 2026 ZENITH - Jeppiaar Engineering College. All rights reserved.
                    </p>
                    <p className="text-neutral-light/40 text-sm">
                        Designed with ❤️ for Innovation
                    </p>
                </div>
            </div>
        </footer>
    );
}
