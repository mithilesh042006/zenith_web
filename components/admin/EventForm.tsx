"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventData, EventCategory } from "@/types/event";
import { Save, Plus, X, Loader2 } from "lucide-react";

interface EventFormProps {
    initialData?: EventData;
    onSubmit: (data: Omit<EventData, "id" | "createdAt">) => Promise<void>;
    isEdit?: boolean;
}

export default function EventForm({
    initialData,
    onSubmit,
    isEdit = false,
}: EventFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        category: (initialData?.category || "technical") as EventCategory,
        description: initialData?.description || "",
        rules: initialData?.rules || [""],
        date: initialData?.date || "",
        time: initialData?.time || "",
        venue: initialData?.venue || "",
        teamSize: initialData?.teamSize || "",
        registrationOpen: initialData?.registrationOpen ?? true,
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleRuleChange = (index: number, value: string) => {
        const newRules = [...formData.rules];
        newRules[index] = value;
        setFormData((prev) => ({ ...prev, rules: newRules }));
    };

    const addRule = () => {
        setFormData((prev) => ({ ...prev, rules: [...prev.rules, ""] }));
    };

    const removeRule = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            rules: prev.rules.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({
                ...formData,
                rules: formData.rules.filter((r) => r.trim() !== ""),
            });
            router.push("/admin/events");
        } catch (error) {
            console.error("Error saving event:", error);
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-white/10 text-neutral-light placeholder:text-neutral-light/30 focus:outline-none focus:border-royal-gold/50 transition-colors text-sm";
    const labelClass = "block text-sm font-medium text-neutral-light/70 mb-2";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {/* Title */}
            <div>
                <label htmlFor="title" className={labelClass}>
                    Event Title *
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g., Code Sprint"
                    required
                />
            </div>

            {/* Category */}
            <div>
                <label htmlFor="category" className={labelClass}>
                    Category *
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="technical">Technical</option>
                    <option value="non-technical">Non-Technical</option>
                </select>
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className={labelClass}>
                    Description *
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe the event..."
                    required
                />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="date" className={labelClass}>
                        Date *
                    </label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g., March 15, 2026"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time" className={labelClass}>
                        Time *
                    </label>
                    <input
                        type="text"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g., 10:00 AM - 1:00 PM"
                        required
                    />
                </div>
            </div>

            {/* Venue & Team Size */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="venue" className={labelClass}>
                        Venue *
                    </label>
                    <input
                        type="text"
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g., Lab Complex"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="teamSize" className={labelClass}>
                        Team Size *
                    </label>
                    <input
                        type="text"
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g., 1-2 members"
                        required
                    />
                </div>
            </div>

            {/* Rules */}
            <div>
                <label className={labelClass}>Rules</label>
                <div className="space-y-3">
                    {formData.rules.map((rule, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={rule}
                                onChange={(e) => handleRuleChange(index, e.target.value)}
                                className={`${inputClass} flex-1`}
                                placeholder={`Rule ${index + 1}`}
                            />
                            {formData.rules.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeRule(index)}
                                    className="p-3 rounded-lg border border-white/10 text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addRule}
                        className="flex items-center gap-2 text-sm text-royal-gold hover:text-gold-light transition-colors"
                    >
                        <Plus size={14} />
                        Add Rule
                    </button>
                </div>
            </div>

            {/* Registration Open */}
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="registrationOpen"
                    name="registrationOpen"
                    checked={formData.registrationOpen}
                    onChange={handleChange}
                    className="w-4 h-4 accent-royal-gold"
                />
                <label htmlFor="registrationOpen" className="text-sm text-neutral-light/70">
                    Registration Open
                </label>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-royal-gold to-gold-light text-black font-semibold text-sm hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Save size={16} />
                    )}
                    {isEdit ? "Update Event" : "Create Event"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-lg border border-white/10 text-neutral-light/60 text-sm hover:bg-white/5 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
