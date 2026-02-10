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

// FlipCard component for About section background
function FlipCard({ index }: { index: number }) {
  return (
    <motion.div
      className="relative aspect-square perspective-1000"
      whileHover="flipped"
      initial="closed"
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        variants={{
          closed: { rotateY: 0 },
          flipped: { rotateY: 180 },
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front - Closed card */}
        <div
          className="absolute inset-0 rounded-lg bg-[#0a0a0a] border border-white/5 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 rounded border border-white/10" />
          </div>
        </div>

        {/* Back - Image revealed */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img
            src="/default.jpg"
            alt="Event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Circular text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 relative"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <path
                    id={`circle-${index}`}
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  />
                </defs>
                <text fill="#D4AF37" fontSize="8" fontWeight="bold">
                  <textPath href={`#circle-${index}`}>
                    RISE • REVEL • RUSH • RISE • REVEL • RUSH •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-royal-gold" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
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
        end: "+=20%",
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

      {/* Hero Section - reduced height for less gap */}
      <section ref={heroRef} className="relative min-h-[120vh]">
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
              {/* <Sparkles size={18} className="text-accent-orange" /> */}
              <span className="text-sm md:text-base uppercase tracking-[0.3em] text-neutral-light/60">
                Computer Science And Engineering presents
              </span>
              {/* <Sparkles size={18} className="text-accent-orange" /> */}
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
                href="/events"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-royal-gold to-gold-light text-black font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-royal-gold/30"
              >
                Explore Events
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full glass text-neutral-light font-semibold text-lg transition-all duration-300 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            {/* <motion.div
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
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* About Section with Flip Card Background */}
      <section
        ref={aboutRef}
        className="relative py-32 px-6 overflow-hidden"
      >
        {/* Flip Card Grid Background */}
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 opacity-60 content-start">
          {Array.from({ length: 15 }).map((_, i) => (
            <FlipCard key={i} index={i} />
          ))}
        </div>

        {/* Content Overlay - pointer-events-none allows hover to pass through to flip cards */}
        <div className="relative z-10 max-w-5xl mx-auto pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="inline-block px-4 py-2 rounded-full glass text-xs uppercase tracking-[0.3em] text-royal-gold border border-royal-gold/20">
              About the Event
            </span>
          </motion.div>

          <div className="text-center space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight"
            >
              <span className="text-neutral-light">Where </span>
              <span className="text-gradient">Innovation</span>
              <span className="text-neutral-light"> Meets </span>
              <span className="text-gradient">Excellence</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed"
            >
              ZENITH&apos;26 is the flagship technical symposium of Jeppiaar Engineering College,
              uniting the brightest minds from across the nation. Experience two days of intense
              competition, groundbreaking ideas, and limitless opportunities to showcase your talent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 text-sm text-neutral-light/50"
            >
              {["🚀 Technical Events", "🎭 Cultural Events", "🏆 Mega Prizes", "🤝 Networking"].map((item, i) => (
                <span key={i} className="px-4 py-2 glass rounded-full border border-white/5">
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { number: "20+", label: "Events", icon: "🎯" },
              { number: "5000+", label: "Participants", icon: "👥" },
              { number: "₹2L+", label: "Prize Pool", icon: "💰" },
              { number: "50+", label: "Colleges", icon: "🎓" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center group cursor-pointer border border-white/5 hover:border-royal-gold/30 transition-all duration-300"
              >
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <p className="text-3xl md:text-4xl font-bold font-display text-gradient">
                  {stat.number}
                </p>
                <p className="text-sm text-neutral-light/60 mt-2 group-hover:text-royal-gold transition-colors">
                  {stat.label}
                </p>
              </motion.div>
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
              initial={{ opacity: 0, scale: 0.85, x: -40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
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
              initial={{ opacity: 0, scale: 0.85, x: 40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link href="/non-technical-events" className="block group">
                <div className="glass-card p-8 md:p-12 h-full transition-all duration-300 hover:shadow-xl hover:shadow-accent-orange/10 hover:border-accent-orange/30">
                  <div className="h-8.5 w-16 bg-gradient-to-r from-accent-orange to-yellow-500 rounded-full mb-6" />
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
              href="/events"
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
