"use client";

import { motion } from "framer-motion";
import CoordinatorCard from "../components/CoordinatorCard";
import Footer from "../components/Footer";

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

export default function StaffCoordinatorsPage() {
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
                        <span className="text-sm uppercase tracking-[0.3em] text-highlight-red">
                            ZENITH&apos;26
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mt-4 mb-6">
                            Staff <span className="text-gradient">Coordinators</span>
                        </h1>
                        <p className="text-lg text-neutral-light/60 max-w-2xl mx-auto">
                            Meet the faculty members guiding ZENITH&apos;26 to success.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Coordinators Grid */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
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

            <Footer />
        </main>
    );
}
