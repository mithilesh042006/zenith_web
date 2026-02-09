"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";

interface KineticMarqueeProps {
    text?: string;
    speed?: number;
    direction?: "left" | "right";
    className?: string;
}

export default function KineticMarquee({
    text = "ZENITH'26",
    speed = 50,
    direction = "left",
    className = "",
}: KineticMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !trackRef.current) return;

        const track = trackRef.current;
        const trackWidth = track.scrollWidth / 2;

        // Set initial position
        gsap.set(track, {
            x: direction === "left" ? 0 : -trackWidth,
        });

        // Create infinite scroll animation
        const animation = gsap.to(track, {
            x: direction === "left" ? -trackWidth : 0,
            duration: trackWidth / speed,
            ease: "none",
            repeat: -1,
        });

        return () => {
            animation.kill();
        };
    }, [speed, direction, prefersReducedMotion]);

    // Create repeated text for seamless loop
    const repeatedText = Array(6).fill(text).join(" • ");

    if (prefersReducedMotion) {
        return (
            <div className={`overflow-hidden ${className}`}>
                <div className="kinetic-text text-neutral-light/10 whitespace-nowrap font-display">
                    {text}
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden ${className}`}
        >
            <div
                ref={trackRef}
                className="flex whitespace-nowrap gpu-accelerated"
            >
                <span className="kinetic-text text-neutral-light/10 font-display">
                    {repeatedText}&nbsp;
                </span>
                <span className="kinetic-text text-neutral-light/10 font-display">
                    {repeatedText}&nbsp;
                </span>
            </div>
        </div>
    );
}
