"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

export default function AnimatedBackground() {
    const baseCanvasRef = useRef<HTMLCanvasElement>(null);
    const foregroundCanvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>(0);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;

        const baseCanvas = baseCanvasRef.current;
        const foregroundCanvas = foregroundCanvasRef.current;
        if (!baseCanvas || !foregroundCanvas) return;

        const baseCtx = baseCanvas.getContext("2d");
        const fgCtx = foregroundCanvas.getContext("2d");
        if (!baseCtx || !fgCtx) return;

        // Set canvas size
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            baseCanvas.width = width * dpr;
            baseCanvas.height = height * dpr;
            baseCanvas.style.width = `${width}px`;
            baseCanvas.style.height = `${height}px`;
            baseCtx.scale(dpr, dpr);

            foregroundCanvas.width = width * dpr;
            foregroundCanvas.height = height * dpr;
            foregroundCanvas.style.width = `${width}px`;
            foregroundCanvas.style.height = `${height}px`;
            fgCtx.scale(dpr, dpr);

            initParticles();
        };

        // Initialize particles
        const initParticles = () => {
            const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
            particlesRef.current = Array.from({ length: particleCount }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: Math.random() > 0.7 ? "#D73A2F" : "#D4AF37",
            }));
        };

        // Draw base canvas - gradient & noise
        const drawBase = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Dark gradient background
            const gradient = baseCtx.createRadialGradient(
                width / 2,
                height / 2,
                0,
                width / 2,
                height / 2,
                Math.max(width, height) * 0.8
            );
            // gradient.addColorStop(0, "#1a1a1f");
            // gradient.addColorStop(0.5, "#0F0F14");
            // gradient.addColorStop(1, "#0a0a0f");
            gradient.addColorStop(0, "#000000ff");
            gradient.addColorStop(0.5, "#000000ff");
            gradient.addColorStop(1, "#000000ff");

            baseCtx.fillStyle = gradient;
            baseCtx.fillRect(0, 0, width, height);

            // Subtle noise overlay
            // const imageData = baseCtx.getImageData(0, 0, width, height);
            // const data = imageData.data;
            // for (let i = 0; i < data.length; i += 4) {
            //     const noise = (Math.random() - 0.5) * 10;
            //     data[i] = Math.max(0, Math.min(255, data[i] + noise));
            //     data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
            //     data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
            // }
            // baseCtx.putImageData(imageData, 0, 0);
        };

        // Draw foreground - particles and light streaks
        const drawForeground = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            fgCtx.clearRect(0, 0, width, height);

            // Update and draw particles
            particlesRef.current.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = width;
                if (particle.x > width) particle.x = 0;
                if (particle.y < 0) particle.y = height;
                if (particle.y > height) particle.y = 0;

                // Draw particle with glow
                fgCtx.beginPath();
                fgCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                fgCtx.fillStyle = particle.color;
                fgCtx.globalAlpha = particle.opacity;
                fgCtx.shadowBlur = 15;
                fgCtx.shadowColor = particle.color;
                fgCtx.fill();
                fgCtx.globalAlpha = 1;
                fgCtx.shadowBlur = 0;
            });

            // Draw subtle light streaks
            const time = Date.now() * 0.001;
            fgCtx.globalAlpha = 0.03;
            for (let i = 0; i < 3; i++) {
                const x = (Math.sin(time + i) * 0.5 + 0.5) * width;
                const gradient = fgCtx.createLinearGradient(x - 200, 0, x + 200, height);
                gradient.addColorStop(0, "transparent");
                gradient.addColorStop(0.5, "#D4AF37");
                gradient.addColorStop(1, "transparent");
                fgCtx.fillStyle = gradient;
                fgCtx.fillRect(x - 200, 0, 400, height);
            }
            fgCtx.globalAlpha = 1;
        };

        // Animation loop
        const animate = () => {
            drawForeground();
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        resize();
        drawBase();
        animate();

        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [prefersReducedMotion]);

    if (prefersReducedMotion) {
        return (
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1a1a1f] via-[#0F0F14] to-[#0a0a0f]" />
        );
    }

    return (
        <>
            {/* Base Canvas - Fixed background */}
            <canvas
                ref={baseCanvasRef}
                className="fixed inset-0 -z-20 pointer-events-none"
                aria-hidden="true"
            />
            {/* Foreground Canvas - Particles and effects */}
            <canvas
                ref={foregroundCanvasRef}
                className="fixed inset-0 -z-10 pointer-events-none"
                aria-hidden="true"
            />
        </>
    );
}
