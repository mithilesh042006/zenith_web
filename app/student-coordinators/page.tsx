"use client";

import { motion } from "framer-motion";
import CoordinatorCard from "../components/CoordinatorCard";
import Footer from "../components/Footer";

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

export default function StudentCoordinatorsPage() {
    return (
        <main className="min-h-screen bg-primary-black">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="text-sm uppercase tracking-[0.3em] text-accent-orange">
                            ZENITH&apos;26
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mt-4 mb-6">
                            Student <span className="text-gradient">Coordinators</span>
                        </h1>
                        <p className="text-lg text-neutral-light/60 max-w-2xl mx-auto">
                            The passionate student leaders driving ZENITH&apos;26 forward.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Coordinators Grid */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
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
