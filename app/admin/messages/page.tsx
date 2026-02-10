"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, Eye, EyeOff, Clock, User, Building, Tag } from "lucide-react";
import { onMessagesChange, markMessageRead, deleteMessage } from "@/lib/firebase/firestore";
import { ContactMessage } from "@/types/event";

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

    useEffect(() => {
        const unsub = onMessagesChange((msgs) => {
            setMessages(msgs);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const handleSelectMessage = async (msg: ContactMessage) => {
        setSelectedMessage(msg);
        if (!msg.read && msg.id) {
            await markMessageRead(msg.id);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this message?")) {
            await deleteMessage(id);
            if (selectedMessage?.id === id) {
                setSelectedMessage(null);
            }
        }
    };

    const filteredMessages = messages.filter((msg) => {
        if (filter === "unread") return !msg.read;
        if (filter === "read") return msg.read;
        return true;
    });

    const unreadCount = messages.filter((m) => !m.read).length;

    const formatDate = (timestamp: unknown) => {
        if (!timestamp) return "Just now";
        const ts = timestamp as { seconds: number };
        if (!ts.seconds) return "Just now";
        return new Date(ts.seconds * 1000).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const subjectLabels: Record<string, string> = {
        registration: "Event Registration",
        sponsorship: "Sponsorship Inquiry",
        technical: "Technical Query",
        other: "Other",
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-royal-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold font-display text-neutral-light">
                        Messages
                    </h1>
                    <p className="text-neutral-light/40 text-sm mt-1">
                        {unreadCount > 0
                            ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
                            : "No unread messages"}
                    </p>
                </div>

                {/* Filter */}
                <div className="flex gap-2">
                    {(["all", "unread", "read"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                                    ? "bg-royal-gold/10 text-royal-gold border border-royal-gold/20"
                                    : "text-neutral-light/60 hover:bg-white/5"
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                            {f === "unread" && unreadCount > 0 && (
                                <span className="ml-1.5 px-1.5 py-0.5 bg-royal-gold text-black text-xs rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {filteredMessages.length === 0 ? (
                <div className="text-center py-20">
                    <Mail size={48} className="mx-auto text-neutral-light/20 mb-4" />
                    <p className="text-neutral-light/40">
                        {filter === "all"
                            ? "No messages yet"
                            : `No ${filter} messages`}
                    </p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-5 gap-6">
                    {/* Message List */}
                    <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-2">
                        {filteredMessages.map((msg) => (
                            <button
                                key={msg.id}
                                onClick={() => handleSelectMessage(msg)}
                                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${selectedMessage?.id === msg.id
                                        ? "bg-royal-gold/10 border-royal-gold/30"
                                        : !msg.read
                                            ? "bg-white/5 border-white/10 hover:bg-white/10"
                                            : "bg-transparent border-white/5 hover:bg-white/5"
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            {!msg.read && (
                                                <div className="w-2 h-2 rounded-full bg-royal-gold flex-shrink-0" />
                                            )}
                                            <p className={`text-sm font-medium truncate ${!msg.read ? "text-neutral-light" : "text-neutral-light/60"
                                                }`}>
                                                {msg.name}
                                            </p>
                                        </div>
                                        <p className="text-xs text-neutral-light/40 mt-1 truncate">
                                            {subjectLabels[msg.subject] || msg.subject}
                                        </p>
                                        <p className="text-xs text-neutral-light/30 mt-1 line-clamp-1">
                                            {msg.message}
                                        </p>
                                    </div>
                                    <span className="text-[10px] text-neutral-light/30 flex-shrink-0">
                                        {formatDate(msg.createdAt)}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-3">
                        {selectedMessage ? (
                            <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
                                {/* Message Header */}
                                <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
                                    <div>
                                        <h2 className="text-lg font-bold text-neutral-light">
                                            {subjectLabels[selectedMessage.subject] || selectedMessage.subject}
                                        </h2>
                                        <p className="text-xs text-neutral-light/40 mt-1">
                                            {formatDate(selectedMessage.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDelete(selectedMessage.id!)}
                                            className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                            title="Delete message"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Sender Info */}
                                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5">
                                            <User size={14} className="text-royal-gold" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-light/40">Name</p>
                                            <p className="text-sm text-neutral-light">{selectedMessage.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5">
                                            <Mail size={14} className="text-royal-gold" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-light/40">Email</p>
                                            <a
                                                href={`mailto:${selectedMessage.email}`}
                                                className="text-sm text-royal-gold hover:underline"
                                            >
                                                {selectedMessage.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5">
                                            <Building size={14} className="text-royal-gold" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-light/40">College</p>
                                            <p className="text-sm text-neutral-light">{selectedMessage.college || "Not specified"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5">
                                            <Tag size={14} className="text-royal-gold" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-light/40">Subject</p>
                                            <p className="text-sm text-neutral-light">
                                                {subjectLabels[selectedMessage.subject] || selectedMessage.subject}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Body */}
                                <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                    <p className="text-sm text-neutral-light/80 whitespace-pre-wrap leading-relaxed">
                                        {selectedMessage.message}
                                    </p>
                                </div>

                                {/* Reply Button */}
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${subjectLabels[selectedMessage.subject] || selectedMessage.subject} - ZENITH'26`}
                                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-royal-gold/10 text-royal-gold text-sm font-medium hover:bg-royal-gold/20 transition-all"
                                >
                                    <Mail size={14} />
                                    Reply via Email
                                </a>
                            </div>
                        ) : (
                            <div className="border border-white/5 rounded-lg p-12 text-center">
                                <Mail size={48} className="mx-auto text-neutral-light/10 mb-4" />
                                <p className="text-neutral-light/30 text-sm">
                                    Select a message to read
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
