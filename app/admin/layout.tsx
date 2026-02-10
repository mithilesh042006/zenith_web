"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/firebase/auth";
import {
    LayoutDashboard,
    Calendar,
    LogOut,
    ChevronLeft,
} from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";

const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/events", label: "Events", icon: Calendar },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    // Don't wrap the login page with AdminGuard
    if (pathname === "/admin") {
        return <>{children}</>;
    }

    const handleSignOut = async () => {
        await signOut();
        router.push("/admin");
    };

    return (
        <AdminGuard>
            <div className="min-h-screen bg-[#0a0a0a] flex">
                {/* Sidebar */}
                <aside className="w-64 bg-[#111] border-r border-white/10 flex flex-col fixed h-full z-50">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <h1 className="text-lg font-bold font-display text-royal-gold">
                            ZENITH&apos;26
                        </h1>
                        <p className="text-xs text-neutral-light/40 mt-1">Admin Panel</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? "bg-royal-gold/10 text-royal-gold border border-royal-gold/20"
                                            : "text-neutral-light/60 hover:text-neutral-light hover:bg-white/5"
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/10 space-y-2">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-light/60 hover:text-neutral-light hover:bg-white/5 transition-all"
                        >
                            <ChevronLeft size={18} />
                            Back to Site
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-8">{children}</main>
            </div>
        </AdminGuard>
    );
}
