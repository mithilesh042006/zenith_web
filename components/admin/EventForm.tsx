"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { EventData, EventCategory, Coordinator } from "@/types/event";
import { Save, Plus, X, Loader2, Upload, User, Users, Trash2 } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";

interface EventFormProps {
    initialData?: EventData;
    onSubmit: (data: Omit<EventData, "id" | "createdAt">) => Promise<void>;
    isEdit?: boolean;
}

const emptyCoordinator: Coordinator = { name: "", phone: "", email: "", photo: "" };

export default function EventForm({
    initialData,
    onSubmit,
    isEdit = false,
}: EventFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState<string | null>(null); // "coord-0", "staff-1", etc.
    const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
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
        coordinators: initialData?.coordinators?.length
            ? initialData.coordinators
            : [{ ...emptyCoordinator }],
        staffCoordinators: initialData?.staffCoordinators?.length
            ? initialData.staffCoordinators
            : [{ ...emptyCoordinator }],
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

    // Generic coordinator helpers for both types
    const updateCoordinator = (
        type: "coordinators" | "staffCoordinators",
        index: number,
        field: keyof Coordinator,
        value: string
    ) => {
        setFormData((prev) => {
            const updated = [...prev[type]];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, [type]: updated };
        });
    };

    const addCoordinatorEntry = (type: "coordinators" | "staffCoordinators") => {
        setFormData((prev) => ({
            ...prev,
            [type]: [...prev[type], { ...emptyCoordinator }],
        }));
    };

    const removeCoordinatorEntry = (type: "coordinators" | "staffCoordinators", index: number) => {
        setFormData((prev) => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index),
        }));
    };

    const handlePhotoUpload = async (
        type: "coordinators" | "staffCoordinators",
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert("Image must be less than 10MB");
            return;
        }

        const key = `${type === "coordinators" ? "coord" : "staff"}-${index}`;
        setUploadingIndex(key);
        try {
            const url = await uploadToCloudinary(file);
            updateCoordinator(type, index, "photo", url);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload photo. Please try again.");
        } finally {
            setUploadingIndex(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const cleanCoordinators = formData.coordinators.filter(
                (c) => c.name.trim() !== ""
            );
            const cleanStaffCoordinators = formData.staffCoordinators.filter(
                (c) => c.name.trim() !== ""
            );
            await onSubmit({
                ...formData,
                rules: formData.rules.filter((r) => r.trim() !== ""),
                coordinators: cleanCoordinators,
                staffCoordinators: cleanStaffCoordinators,
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

    // Reusable coordinator section renderer
    const renderCoordinatorSection = (
        type: "coordinators" | "staffCoordinators",
        title: string,
        icon: React.ReactNode,
        prefix: string
    ) => {
        const list = formData[type];
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-neutral-light flex items-center gap-2">
                        {icon}
                        {title}
                    </h3>
                    <button
                        type="button"
                        onClick={() => addCoordinatorEntry(type)}
                        className="flex items-center gap-1.5 text-sm text-royal-gold hover:text-gold-light transition-colors"
                    >
                        <Plus size={14} />
                        Add {type === "staffCoordinators" ? "Staff" : "Coordinator"}
                    </button>
                </div>

                {list.map((coord, idx) => {
                    const refKey = `${prefix}-${idx}`;
                    const isUploading = uploadingIndex === refKey;

                    return (
                        <div
                            key={idx}
                            className="border border-white/10 rounded-xl p-5 space-y-4 bg-white/[0.02] relative"
                        >
                            {list.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeCoordinatorEntry(type, idx)}
                                    className="absolute top-3 right-3 p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                    title="Remove"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}

                            <p className="text-xs text-neutral-light/40 font-medium uppercase tracking-wider">
                                {type === "staffCoordinators" ? "Staff" : "Coordinator"} {idx + 1}
                            </p>

                            {/* Photo Upload */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 bg-[#0a0a0a] flex items-center justify-center flex-shrink-0">
                                    {coord.photo ? (
                                        <Image
                                            src={coord.photo}
                                            alt="Photo"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <User size={24} className="text-neutral-light/20" />
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        ref={(el) => { fileInputRefs.current[refKey] = el; }}
                                        onChange={(e) => handlePhotoUpload(type, idx, e)}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRefs.current[refKey]?.click()}
                                        disabled={uploadingIndex !== null}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-xs text-neutral-light/70 hover:bg-white/5 transition-colors disabled:opacity-50"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 size={12} className="animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={12} />
                                                Upload Photo
                                            </>
                                        )}
                                    </button>
                                    {coord.photo && (
                                        <button
                                            type="button"
                                            onClick={() => updateCoordinator(type, idx, "photo", "")}
                                            className="text-[10px] text-red-400/50 hover:text-red-400 mt-1 block transition-colors"
                                        >
                                            Remove photo
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className={labelClass}>Name</label>
                                <input
                                    type="text"
                                    value={coord.name}
                                    onChange={(e) => updateCoordinator(type, idx, "name", e.target.value)}
                                    className={inputClass}
                                    placeholder={type === "staffCoordinators" ? "e.g., Prof. Jane Smith" : "e.g., John Doe"}
                                />
                            </div>

                            {/* Phone & Email */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Contact Number</label>
                                    <input
                                        type="tel"
                                        value={coord.phone}
                                        onChange={(e) => updateCoordinator(type, idx, "phone", e.target.value)}
                                        className={inputClass}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Email</label>
                                    <input
                                        type="email"
                                        value={coord.email}
                                        onChange={(e) => updateCoordinator(type, idx, "email", e.target.value)}
                                        className={inputClass}
                                        placeholder="coordinator@email.com"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
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

            {/* Staff Coordinators Section */}
            {renderCoordinatorSection(
                "staffCoordinators",
                "Staff Coordinators",
                <Users size={16} className="text-royal-gold" />,
                "staff"
            )}

            {/* Event Coordinators Section */}
            {renderCoordinatorSection(
                "coordinators",
                "Event Coordinators",
                <User size={16} className="text-royal-gold" />,
                "coord"
            )}

            {/* Submit */}
            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={loading || uploadingIndex !== null}
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
