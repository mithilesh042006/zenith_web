"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";

import AnimatedBackground from "./components/AnimatedBackground";
import KineticMarquee from "./components/KineticMarquee";
import Countdown from "./components/Countdown";
import Footer from "./components/Footer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Pin hero section
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%",
        pin: heroContentRef.current,
        pinSpacing: false,
      });

      // Fade out hero content on scroll
      gsap.to(heroContentRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });

      // About section reveal
      const aboutLines = aboutRef.current?.querySelectorAll(".reveal-line");
      aboutLines?.forEach((line, i) => {
        gsap.from(line, {
          y: "110%",
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <main className="relative">
      <AnimatedBackground />

      {/* Hero Section - 200vh for scroll pinning */}
      <section ref={heroRef} className="relative min-h-[200vh]">
        <div
          ref={heroContentRef}
          className="h-screen flex flex-col items-center justify-center relative"
        >
          {/* Kinetic Marquee Background */}
          <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none">
            <KineticMarquee
              text="ZENITH'26 • RISE OF INNOVATION"
              speed={40}
              direction="left"
              className="mb-8"
            />
            <KineticMarquee
              text="JEPPIAAR ENGINEERING COLLEGE"
              speed={35}
              direction="right"
            />
          </div>

          {/* Floating UI Content */}
          <div className="relative z-10 text-center px-6">
            {/* Pre-title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <Sparkles size={18} className="text-accent-orange" />
              <span className="text-sm md:text-base uppercase tracking-[0.3em] text-neutral-light/60">
                Jeppiaar Engineering College presents
              </span>
              <Sparkles size={18} className="text-accent-orange" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold font-display mb-4"
            >
              <span className="text-gradient text-glow-red">ZENITH&apos;26</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl font-display text-neutral-light/80 mb-12"
            >
              Rise of Innovation
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-12"
            >
              <Countdown />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/technical-events"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-royal-gold to-gold-light text-black font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-royal-gold/30"
              >
                Explore Events
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full glass text-neutral-light font-semibold text-lg transition-all duration-300 hover:bg-white/10"
              >
                Register Now
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-neutral-light/40"
              >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ArrowDown size={20} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="relative py-32 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-accent-orange">
              About the Event
            </span>
          </motion.div>

          <div className="space-y-6 text-3xl md:text-4xl lg:text-5xl font-display leading-tight">
            <div className="overflow-hidden">
              <p className="reveal-line text-neutral-light">
                ZENITH&apos;26 is the flagship technical symposium
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="reveal-line text-neutral-light/80">
                of Jeppiaar Engineering College,
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="reveal-line text-neutral-light/60">
                bringing together brilliant minds
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="reveal-line text-gradient">
                to innovate, compete, and celebrate technology.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "20+", label: "Events" },
              { number: "5K+", label: "Participants" },
              { number: "₹2L+", label: "Prize Pool" },
              { number: "50+", label: "Colleges" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold font-display text-gradient">
                  {stat.number}
                </p>
                <p className="text-sm text-neutral-light/60 mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event Categories Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-accent-orange">
              Explore
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mt-4">
              Event Categories
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Events Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/technical-events" className="block group">
                <div className="glass-card p-8 md:p-12 h-full transition-all duration-300 hover:shadow-xl hover:shadow-highlight-red/10 hover:border-highlight-red/30">
                  <div className="h-2 w-16 bg-gradient-to-r from-highlight-red to-accent-orange rounded-full mb-6" />
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-neutral-light mb-4 group-hover:text-gradient transition-all">
                    Technical Events
                  </h3>
                  <p className="text-neutral-light/60 leading-relaxed mb-6">
                    Challenge your coding skills, showcase your technical prowess, and compete in hackathons, debugging contests, and more.
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent-orange font-semibold group-hover:gap-4 transition-all">
                    View Events <ArrowDown className="rotate-[-90deg]" size={18} />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Non-Technical Events Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/non-technical-events" className="block group">
                <div className="glass-card p-8 md:p-12 h-full transition-all duration-300 hover:shadow-xl hover:shadow-accent-orange/10 hover:border-accent-orange/30">
                  <div className="h-2 w-16 bg-gradient-to-r from-accent-orange to-yellow-500 rounded-full mb-6" />
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-neutral-light mb-4 group-hover:text-gradient transition-all">
                    Non-Technical Events
                  </h3>
                  <p className="text-neutral-light/60 leading-relaxed mb-6">
                    Express your creativity through art, music, drama, and fun-filled activities that bring out the best in you.
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent-orange font-semibold group-hover:gap-4 transition-all">
                    View Events <ArrowDown className="rotate-[-90deg]" size={18} />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Divider */}
      <div className="py-16 border-y border-white/5">
        <KineticMarquee
          text="REGISTER NOW • ZENITH'26 • RISE OF INNOVATION • MARCH 2026"
          speed={60}
          direction="left"
        />
      </div>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Ready to <span className="text-gradient">Rise</span>?
            </h2>
            <p className="text-xl text-neutral-light/60 mb-12 max-w-2xl mx-auto">
              Join thousands of innovators at ZENITH&apos;26. Register now and be part of the biggest technical symposium of the year.
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-5 rounded-full bg-gradient-to-r from-highlight-red to-accent-orange text-white font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-highlight-red/30"
            >
              Register Now
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
