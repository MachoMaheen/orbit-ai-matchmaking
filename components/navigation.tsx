'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Sparkles, Menu, X } from 'lucide-react';
import { UserButton, useUser } from '@stackframe/stack';
import { useState, memo, useCallback } from 'react';

const NavLink = memo(({ href, label, icon: Icon, isActive }: {
    href: string;
    label: string;
    icon?: any;
    isActive: boolean;
}) => (
    <Link
        href={href}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive
            ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
    >
        {Icon && <Icon className="w-4 h-4" />}
        {label}
    </Link>
));
NavLink.displayName = 'NavLink';

export function Navigation() {
    const pathname = usePathname();
    const user = useUser({ or: null });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    // Public navigation items (shown to everyone)
    const publicNavItems = [
        { href: '/', label: 'Home' },
        { href: '/#features', label: 'Features' },
        { href: '/#how-it-works', label: 'How It Works' },
    ];

    // Protected navigation items (shown only to authenticated users)
    const protectedNavItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/match', label: 'Find Matches' },
        { href: '/essay-analyzer', label: 'Essay Analyzer' },
        { href: '/interview-prep', label: 'Interview Prep' },
    ];

    const navItems = user ? protectedNavItems : publicNavItems;

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                            <span className="text-white font-bold text-lg">O</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Orbit RFM Pro
                            </span>
                            {user && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Sparkles className="w-3 h-3" />
                                    <span>AI-Powered</span>
                                </div>
                            )}
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                isActive={pathname === item.href}
                            />
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <UserButton />
                        ) : (
                            <>
                                <Link
                                    href="/handler/sign-in"
                                    className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100 h-9 px-4 py-2"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/handler/sign-up"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md h-9 px-4 py-2"
                                >
                                    Get Started Free
                                </Link>
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-600" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="container mx-auto px-4 py-4 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-blue-50 text-blue-600 font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {Icon && <Icon className="w-5 h-5" />}
                                    {item.label}
                                </Link>
                            );
                        })}
                        {!user && (
                            <div className="pt-4 border-t border-gray-200 space-y-2">
                                <Link
                                    href="/handler/sign-in"
                                    onClick={closeMobileMenu}
                                    className="block w-full text-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/handler/sign-up"
                                    onClick={closeMobileMenu}
                                    className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md"
                                >
                                    Get Started Free
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
