"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getEvent, onRegistrationsChange } from "@/lib/firebase/firestore";
import { EventData, Registration } from "@/types/event";
import { ArrowLeft, Download, Users, Clock, Mail, Phone, Building2 } from "lucide-react";

export default function RegistrationsPage() {
    const params = useParams();
    const eventId = params.eventId as string;
    const [event, setEvent] = useState<EventData | null>(null);
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await getEvent(eventId);
            setEvent(data);
        };
        fetchEvent();

        const unsub = onRegistrationsChange(eventId, (regs) => {
            setRegistrations(regs);
            setLoading(false);
        });
        return () => unsub();
    }, [eventId]);

    const exportCSV = () => {
        if (registrations.length === 0) return;
        const headers = ["Name", "Email", "Phone", "Department", "College", "Team Members", "Registered At"];
        const rows = registrations.map((r) => [
            r.participantName,
            r.email,
            r.phone,
            r.department,
            r.college,
            r.teamMembers?.join("; ") || "",
            r.registeredAt?.toDate?.()?.toLocaleString() || "",
        ]);
        const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${event?.title || "registrations"}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Link
                    href="/admin/events"
                    className="inline-flex items-center gap-1 text-sm text-neutral-light/50 hover:text-neutral-light mb-4 transition-colors"
                >
                    <ArrowLeft size={14} />
                    Back to Events
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold font-display text-neutral-light">
                            Registrations
                        </h1>
                        <p className="text-neutral-light/50 text-sm mt-1">
                            {event?.title || "Loading..."} —{" "}
                            <span className="text-royal-gold font-medium">
                                {registrations.length}
                            </span>{" "}
                            {registrations.length === 1 ? "participant" : "participants"}
                        </p>
                    </div>
                    {registrations.length > 0 && (
                        <button
                            onClick={exportCSV}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-neutral-light/60 text-sm hover:bg-white/5 transition-colors"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>
                    )}
                </div>
            </div>

            {/* Registrations Table */}
            {loading ? (
                <div className="bg-[#111] border border-white/10 rounded-xl p-10 text-center text-neutral-light/40 text-sm">
                    Loading registrations...
                </div>
            ) : registrations.length === 0 ? (
                <div className="bg-[#111] border border-white/10 rounded-xl p-10 text-center">
                    <Users className="mx-auto text-neutral-light/20 mb-3" size={40} />
                    <p className="text-neutral-light/40 text-sm">
                        No registrations yet for this event
                    </p>
                </div>
            ) : (
                <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                        #
                                    </th>
                                    <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                        Name
                                    </th>
                                    <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                        Email
                                    </th>
                                    <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                        Phone
                                    </th>
                                    <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                        Department
                                    </th>
                                    <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                        College
                                    </th>
                                    <th className="text-left text-xs font-medium text-neutral-light/40 uppercase tracking-wider px-5 py-3">
                                        Registered
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {registrations.map((reg, index) => (
                                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-5 py-4 text-sm text-neutral-light/40">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-4 text-sm font-medium text-neutral-light">
                                            {reg.participantName}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-neutral-light/60">
                                                <Mail size={13} />
                                                {reg.email}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-neutral-light/60">
                                                <Phone size={13} />
                                                {reg.phone}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-neutral-light/60">
                                            {reg.department}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-neutral-light/60">
                                                <Building2 size={13} />
                                                {reg.college}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-neutral-light/40">
                                                <Clock size={13} />
                                                {reg.registeredAt?.toDate?.()?.toLocaleDateString() || "—"}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
