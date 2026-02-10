"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownProps {
    targetDate?: string;
    className?: string;
}

// Default target date as string to avoid reference issues
const DEFAULT_TARGET_DATE = "2026-03-04T09:00:00";

export default function Countdown({
    targetDate = DEFAULT_TARGET_DATE,
    className = "",
}: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [mounted, setMounted] = useState(false);

    // Memoize the target date to prevent reference changes
    const targetTimestamp = useMemo(() => {
        return new Date(targetDate).getTime();
    }, [targetDate]);

    useEffect(() => {
        setMounted(true);

        const calculateTimeLeft = (): TimeLeft => {
            const difference = targetTimestamp - Date.now();

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTimestamp]);

    if (!mounted) {
        return (
            <div className={`flex gap-4 md:gap-8 ${className}`}>
                {["Days", "Hours", "Mins", "Secs"].map((label) => (
                    <div key={label} className="text-center">
                        <div className="glass-card px-4 md:px-6 py-3 md:py-4 min-w-[70px] md:min-w-[90px]">
                            <span className="text-3xl md:text-5xl font-bold font-display tabular-nums text-gradient">
                                00
                            </span>
                        </div>
                        <p className="mt-2 text-xs md:text-sm text-neutral-light/60 uppercase tracking-wider">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    const timeUnits = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
    ];

    return (
        <div className={`flex gap-4 md:gap-8 ${className}`}>
            {timeUnits.map(({ label, value }) => (
                <div key={label} className="text-center">
                    <div className="glass-card px-4 md:px-6 py-3 md:py-4 min-w-[70px] md:min-w-[90px] overflow-hidden">
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={value}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="block text-3xl md:text-5xl font-bold font-display tabular-nums text-gradient"
                            >
                                {String(value).padStart(2, "0")}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <p className="mt-2 text-xs md:text-sm text-neutral-light/60 uppercase tracking-wider">
                        {label}
                    </p>
                </div>
            ))}
        </div>
    );
}
