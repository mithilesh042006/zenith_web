"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { onAuthChange, isAdmin } from "@/lib/firebase/auth";

interface AdminGuardProps {
    children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthChange((currentUser) => {
            setUser(currentUser);
            if (currentUser && isAdmin(currentUser)) {
                setAuthorized(true);
            } else if (currentUser && !isAdmin(currentUser)) {
                setAuthorized(false);
                router.push("/admin");
            } else {
                setAuthorized(false);
                router.push("/admin");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-royal-gold border-t-transparent rounded-full animate-spin" />
                    <p className="text-neutral-light/60 text-sm">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!authorized) {
        return null;
    }

    return <>{children}</>;
}
