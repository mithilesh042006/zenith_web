"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EventCardProps {
    title: string;
    description: string;
    date?: string;
    venue?: string;
    teamSize?: string;
    category?: "technical" | "non-technical";
    href?: string;
    index?: number;
}

export default function EventCard({
    title,
    description,
    date,
    venue,
    teamSize,
    category = "technical",
    href = "#",
    index = 0,
}: EventCardProps) {
    const categoryColors = {
        technical: {
            gradient: "from-highlight-red to-accent-orange",
            glow: "hover:shadow-highlight-red/20",
            border: "hover:border-highlight-red/30",
        },
        "non-technical": {
            gradient: "from-accent-orange to-yellow-500",
            glow: "hover:shadow-accent-orange/20",
            border: "hover:border-accent-orange/30",
        },
    };

    const colors = categoryColors[category];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <Link href={href} className="block group">
                <div
                    className={`glass-card p-6 h-full transition-all duration-300 ${colors.glow} ${colors.border} hover:shadow-xl hover:-translate-y-1`}
                >
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${colors.gradient} text-white`}
                        >
                            {category === "technical" ? "Technical" : "Non-Technical"}
                        </span>
                        <ArrowRight
                            size={18}
                            className="text-neutral-light/40 group-hover:text-accent-orange group-hover:translate-x-1 transition-all"
                        />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-display text-neutral-light mb-3 group-hover:text-gradient transition-all">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-light/60 text-sm leading-relaxed mb-4 line-clamp-3">
                        {description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-white/5">
                        {date && (
                            <div className="flex items-center gap-1.5 text-xs text-neutral-light/50">
                                <Calendar size={14} className="text-highlight-red" />
                                {date}
                            </div>
                        )}
                        {venue && (
                            <div className="flex items-center gap-1.5 text-xs text-neutral-light/50">
                                <MapPin size={14} className="text-highlight-red" />
                                {venue}
                            </div>
                        )}
                        {teamSize && (
                            <div className="flex items-center gap-1.5 text-xs text-neutral-light/50">
                                <Users size={14} className="text-highlight-red" />
                                {teamSize}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
