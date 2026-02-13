"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 240;

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
    const [progress, setProgress] = useState(0);

    /*
        ✅ MOBILE CONTROLS (MAGIC ZONE)
    */
    const MOBILE_FOCAL_X = 0.62;
    const MOBILE_FOCAL_Y = 0.5;
    const MOBILE_SCALE = 0.88;   // ✅ ZOOM OUT CONTROL

    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        ctx.clearRect(0, 0, cw, ch);

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, cw, ch);

        const imgRatio = iw / ih;
        const canvasRatio = cw / ch;

        let dw: number, dh: number;

        if (imgRatio > canvasRatio) {
            dh = ch;
            dw = ch * imgRatio;
        } else {
            dw = cw;
            dh = cw / imgRatio;
        }

        const isMobile = window.innerWidth <= 768;

        /*
            ✅ APPLY MOBILE SCALE (ZOOM OUT)
        */
        if (isMobile) {
            dw *= MOBILE_SCALE;
            dh *= MOBILE_SCALE;
        }

        let dx: number, dy: number;

        if (isMobile) {
            dx = cw * 0.5 - dw * MOBILE_FOCAL_X;
            dy = ch * 0.5 - dh * MOBILE_FOCAL_Y;
        } else {
            dx = (cw - dw) / 2;
            dy = (ch - dh) / 2;
        }

        ctx.drawImage(img, dx, dy, dw, dh);
    }, []);

    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const w = window.innerWidth;
        const h = window.innerHeight;

        const maxDpr = w <= 768 ? 1.5 : 2;
        const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        drawFrame(currentFrameRef.current);
    }, [drawFrame]);

    useEffect(() => {
        let cancelled = false;
        let loadedCount = 0;
        const images: HTMLImageElement[] = new Array(FRAME_COUNT);

        const onLoad = () => {
            loadedCount++;
            if (!cancelled) {
                setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));

                if (loadedCount >= FRAME_COUNT) {
                    imagesRef.current = images;
                    setLoaded(true);
                }
            }
        };

        const loadBatch = (start: number, end: number) => {
            for (let i = start; i < end && i < FRAME_COUNT; i++) {
                const img = new Image();
                img.src = framePaths[i];
                img.onload = onLoad;
                img.onerror = onLoad;
                images[i] = img;
            }
        };

        loadBatch(0, 30);

        const timeout = setTimeout(() => {
            loadBatch(30, FRAME_COUNT);
        }, 100);

        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (!loaded) return;

        resize();

        let targetFrame = 0;
        let displayFrame = 0;

        const onScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll =
                document.documentElement.scrollHeight - window.innerHeight;

            if (maxScroll <= 0) return;

            const scrollFraction = Math.min(
                Math.max(scrollTop / maxScroll, 0),
                1
            );

            targetFrame = Math.min(
                Math.floor(scrollFraction * FRAME_COUNT),
                FRAME_COUNT - 1
            );
        };

        const render = () => {
            const isMobile = window.innerWidth <= 768;
            const lerpFactor = isMobile ? 0.25 : 0.15;

            const diff = targetFrame - displayFrame;

            if (Math.abs(diff) > 0.5) {
                displayFrame += diff * lerpFactor;
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

        onScroll();
        displayFrame = targetFrame;
        currentFrameRef.current = targetFrame;
        drawFrame(targetFrame);

        window.addEventListener("resize", resize);
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
            {!loaded && (
                <div className="fixed inset-0 -z-20 bg-black flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-2 border-royal-gold/30 border-t-royal-gold rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-xs text-neutral-light/30">
                            {progress}%
                        </p>
                    </div>
                </div>
            )}

            <div className="fixed inset-0 -z-20 pointer-events-none">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                    style={{ willChange: "contents" }}
                />
            </div>

            <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-black/30 via-black/40 to-black/60 md:from-black/20 md:via-black/30 md:to-black/50" />
        </>
    );
}