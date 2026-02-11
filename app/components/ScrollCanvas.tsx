"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 240;

// Frame paths: ezgif-frame-001.jpg through ezgif-frame-240.jpg (1-indexed)
const framePaths: string[] = Array.from(
    { length: FRAME_COUNT },
    (_, i) => `/bg_frame_720/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`
);

export default function ScrollCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const rafIdRef = useRef(0);
    const [loaded, setLoaded] = useState(false);

    // Draw a specific frame to canvas, covering the viewport (like background-size: cover)
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete) return;

        const cw = canvas.width;
        const ch = canvas.height;

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cw / ch;

        let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

        if (imgRatio > canvasRatio) {
            sw = img.naturalHeight * canvasRatio;
            sx = (img.naturalWidth - sw) / 2;
        } else {
            sh = img.naturalWidth / canvasRatio;
            sy = (img.naturalHeight - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }, []);

    // Resize canvas to viewport
    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        drawFrame(currentFrameRef.current);
    }, [drawFrame]);

    // Preload all images
    useEffect(() => {
        let cancelled = false;
        let loadedCount = 0;
        const images: HTMLImageElement[] = new Array(FRAME_COUNT);

        const onLoad = () => {
            loadedCount++;
            if (loadedCount >= FRAME_COUNT && !cancelled) {
                imagesRef.current = images;
                setLoaded(true);
            }
        };

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = framePaths[i];
            img.onload = onLoad;
            img.onerror = onLoad;
            images[i] = img;
        }

        return () => { cancelled = true; };
    }, []);

    // Scroll → frame mapping with smooth interpolation
    useEffect(() => {
        if (!loaded) return;

        resize();
        window.addEventListener("resize", resize);

        let targetFrame = 0;
        let displayFrame = 0;

        const onScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScroll <= 0) return;

            const scrollFraction = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
            targetFrame = Math.min(
                Math.floor(scrollFraction * FRAME_COUNT),
                FRAME_COUNT - 1
            );
        };

        const render = () => {
            // Lerp for smooth frame transitions
            const diff = targetFrame - displayFrame;
            if (Math.abs(diff) > 0.5) {
                displayFrame += diff * 0.15;
            } else {
                displayFrame = targetFrame;
            }

            const frameIdx = Math.round(displayFrame);
            if (frameIdx !== currentFrameRef.current) {
                currentFrameRef.current = frameIdx;
                drawFrame(frameIdx);
            }

            rafIdRef.current = requestAnimationFrame(render);
        };

        // Initial state
        onScroll();
        displayFrame = targetFrame;
        currentFrameRef.current = targetFrame;
        drawFrame(targetFrame);

        window.addEventListener("scroll", onScroll, { passive: true });
        rafIdRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafIdRef.current);
        };
    }, [loaded, resize, drawFrame]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 -z-20 pointer-events-none"
                aria-hidden="true"
                style={{ willChange: "contents" }}
            />
            {/* Slight overlay for content readability */}
            <div
                className="fixed inset-0 -z-10 pointer-events-none bg-black/40"
                aria-hidden="true"
            />
        </>
    );
}
