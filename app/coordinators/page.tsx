"use client";

import { motion } from "framer-motion";
import CoordinatorCard from "../components/CoordinatorCard";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";

const staffCoordinators = [
    {
        name: "Dr. S. Ramesh Kumar",
        role: "Chief Coordinator",
        department: "Computer Science & Engineering",
        email: "ramesh.kumar@jeppiaar.ac.in",
        phone: "+91 98765 43210",
    },
    {
        name: "Dr. M. Priya Dharshini",
        role: "Technical Head",
        department: "Information Technology",
        email: "priya.dharshini@jeppiaar.ac.in",
        phone: "+91 98765 43211",
    },
    {
        name: "Prof. K. Arun Kumar",
        role: "Event Coordinator",
        department: "Electronics & Communication",
        email: "arun.kumar@jeppiaar.ac.in",
        phone: "+91 98765 43212",
    },
    {
        name: "Dr. R. Lakshmi",
        role: "Non-Technical Head",
        department: "Electrical & Electronics",
        email: "lakshmi.r@jeppiaar.ac.in",
        phone: "+91 98765 43213",
    },
    {
        name: "Prof. V. Senthil Nathan",
        role: "Sponsorship Head",
        department: "Mechanical Engineering",
        email: "senthil.nathan@jeppiaar.ac.in",
        phone: "+91 98765 43214",
    },
    {
        name: "Dr. P. Kavitha",
        role: "Registration Head",
        department: "Computer Science & Engineering",
        email: "kavitha.p@jeppiaar.ac.in",
        phone: "+91 98765 43215",
    },
];

const studentCoordinators = [
    {
        name: "Aravind Shankar",
        role: "Overall Student Coordinator",
        department: "CSE - Final Year",
        email: "aravind.s@student.jeppiaar.ac.in",
        phone: "+91 99887 76655",
    },
    {
        name: "Priyanka Raj",
        role: "Technical Lead",
        department: "IT - Final Year",
        email: "priyanka.r@student.jeppiaar.ac.in",
        phone: "+91 99887 76656",
    },
    {
        name: "Mohammed Ashik",
        role: "Event Manager",
        department: "ECE - Final Year",
        email: "ashik.m@student.jeppiaar.ac.in",
        phone: "+91 99887 76657",
    },
    {
        name: "Swetha Krishnan",
        role: "Non-Technical Lead",
        department: "EEE - Third Year",
        email: "swetha.k@student.jeppiaar.ac.in",
        phone: "+91 99887 76658",
    },
    {
        name: "Karthik Subramanian",
        role: "Design & Media Head",
        department: "CSE - Third Year",
        email: "karthik.s@student.jeppiaar.ac.in",
        phone: "+91 99887 76659",
    },
    {
        name: "Divya Lakshmi",
        role: "Marketing Lead",
        department: "IT - Third Year",
        email: "divya.l@student.jeppiaar.ac.in",
        phone: "+91 99887 76660",
    },
    {
        name: "Vikram Rajan",
        role: "Sponsorship Coordinator",
        department: "MECH - Final Year",
        email: "vikram.r@student.jeppiaar.ac.in",
        phone: "+91 99887 76661",
    },
    {
        name: "Nithya Shree",
        role: "Registration Coordinator",
        department: "CSE - Third Year",
        email: "nithya.s@student.jeppiaar.ac.in",
        phone: "+91 99887 76662",
    },
];

export default function CoordinatorsPage() {
    return (
        <main className="min-h-screen relative">
            <AnimatedBackground />
            {/* Hero */}
            <section className="pt-32 pb-16 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="text-sm uppercase tracking-[0.3em] text-royal-gold">
                            ZENITH&apos;26
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mt-4 mb-6">
                            Our <span className="text-gradient">Coordinators</span>
                        </h1>
                        <p className="text-lg text-neutral-light/60 max-w-2xl mx-auto">
                            Meet the dedicated team behind ZENITH&apos;26
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Staff Coordinators */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-center">
                            <span className="text-gradient">Staff</span> Coordinators
                        </h2>
                        <p className="text-neutral-light/60 text-center mt-4">
                            Faculty members guiding ZENITH&apos;26 to success
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {staffCoordinators.map((coordinator, index) => (
                            <CoordinatorCard
                                key={coordinator.name}
                                name={coordinator.name}
                                role={coordinator.role}
                                department={coordinator.department}
                                email={coordinator.email}
                                phone={coordinator.phone}
                                type="staff"
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Student Coordinators */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-center">
                            <span className="text-gradient">Student</span> Coordinators
                        </h2>
                        <p className="text-neutral-light/60 text-center mt-4">
                            The passionate student leaders driving ZENITH&apos;26 forward
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {studentCoordinators.map((coordinator, index) => (
                            <CoordinatorCard
                                key={coordinator.name}
                                name={coordinator.name}
                                role={coordinator.role}
                                department={coordinator.department}
                                email={coordinator.email}
                                phone={coordinator.phone}
                                type="student"
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
