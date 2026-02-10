"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { signIn, onAuthChange, isAdmin } from "@/lib/firebase/auth";
import { Lock, Mail, KeyRound, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (user && isAdmin(user)) {
                router.push("/admin/dashboard");
            }
            setChecking(false);
        });
        return () => unsubscribe();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const user = await signIn(email, password);
            if (!isAdmin(user)) {
                setError("You do not have admin access.");
                setLoading(false);
                return;
            }
            router.push("/admin/dashboard");
        } catch (err: any) {
            if (err.code === "auth/invalid-credential") {
                setError("Invalid email or password.");
            } else if (err.code === "auth/too-many-requests") {
                setError("Too many attempts. Try again later.");
            } else {
                setError("Login failed. Please try again.");
            }
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="w-10 h-10 border-2 border-royal-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-royal-gold/10 border border-royal-gold/20 mb-4">
                        <Lock className="text-royal-gold" size={28} />
                    </div>
                    <h1 className="text-2xl font-bold font-display text-neutral-light">
                        Admin Panel
                    </h1>
                    <p className="text-neutral-light/50 text-sm mt-1">
                        ZENITH&apos;26 Event Management
                    </p>
                </div>

                {/* Login Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#111] border border-white/10 rounded-2xl p-8 space-y-6"
                >
                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-neutral-light/70 mb-2"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light/30"
                                size={18}
                            />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0a0a0a] border border-white/10 text-neutral-light placeholder:text-neutral-light/30 focus:outline-none focus:border-royal-gold/50 transition-colors"
                                placeholder="admin@zenith26.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-neutral-light/70 mb-2"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <KeyRound
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light/30"
                                size={18}
                            />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0a0a0a] border border-white/10 text-neutral-light placeholder:text-neutral-light/30 focus:outline-none focus:border-royal-gold/50 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-royal-gold to-gold-light text-black font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-royal-gold/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                Signing in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <p className="text-center text-neutral-light/30 text-xs mt-6">
                    Authorized personnel only
                </p>
            </div>
        </div>
    );
}
