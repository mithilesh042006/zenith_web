"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

interface CoordinatorCardProps {
    name: string;
    role: string;
    department?: string;
    image?: string;
    email?: string;
    phone?: string;
    type?: "staff" | "student";
    index?: number;
}

export default function CoordinatorCard({
    name,
    role,
    department,
    image,
    email,
    phone,
    type = "staff",
    index = 0,
}: CoordinatorCardProps) {
    const typeStyles = {
        staff: {
            accent: "from-royal-gold to-gold-light",
            border: "hover:border-royal-gold/30",
            glow: "group-hover:shadow-royal-gold/10",
        },
        student: {
            accent: "from-blood-red to-royal-gold",
            border: "hover:border-blood-red/30",
            glow: "group-hover:shadow-blood-red/10",
        },
    };

    const styles = typeStyles[type];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="group"
        >
            <div
                className={`glass-card overflow-hidden transition-all duration-300 ${styles.border} ${styles.glow} hover:shadow-xl`}
            >
                {/* Armor-plate inspired top accent */}
                <div className={`h-1.5 bg-gradient-to-r ${styles.accent}`} />

                <div className="p-6">
                    {/* Avatar */}
                    <div className="relative w-24 h-24 mx-auto mb-4">
                        <div
                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${styles.accent} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`}
                        />
                        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10">
                            {image ? (
                                <Image
                                    src={image}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-deep-charcoal flex items-center justify-center">
                                    <span className="text-2xl font-bold text-neutral-light/40">
                                        {name.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="text-center">
                        <h3 className="text-lg font-bold font-display text-neutral-light group-hover:text-gradient transition-all">
                            {name}
                        </h3>
                        <p className={`text-sm font-medium bg-gradient-to-r ${styles.accent} bg-clip-text text-transparent`}>
                            {role}
                        </p>
                        {department && (
                            <p className="text-xs text-neutral-light/50 mt-1">{department}</p>
                        )}
                    </div>

                    {/* Contact */}
                    {(email || phone) && (
                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-center gap-4">
                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                    className="p-2 rounded-full glass hover:border-royal-gold/30 transition-colors"
                                    aria-label={`Email ${name}`}
                                >
                                    <Mail size={16} className="text-neutral-light/60 hover:text-royal-gold" />
                                </a>
                            )}
                            {phone && (
                                <a
                                    href={`tel:${phone}`}
                                    className="p-2 rounded-full glass hover:border-royal-gold/30 transition-colors"
                                    aria-label={`Call ${name}`}
                                >
                                    <Phone size={16} className="text-neutral-light/60 hover:text-royal-gold" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
