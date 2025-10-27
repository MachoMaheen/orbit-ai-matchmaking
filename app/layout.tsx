import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Navigation } from '@/components/navigation';
import { StackProvider, StackTheme } from '@stackframe/stack';
import { stackServerApp } from '@/stack';
import { Suspense } from 'react';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    preload: true,
});

export const metadata: Metadata = {
    title: 'Orbit RFM Pro - Revolutionary University Matching',
    description: 'AI-powered university matching with ML predictions, ROI calculator, and scholarship matching',
};

function NavigationSkeleton() {
    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl animate-pulse"></div>
                        <div className="hidden sm:block w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StackProvider app={stackServerApp}>
                    <StackTheme>
                        <Suspense fallback={<NavigationSkeleton />}>
                            <Navigation />
                        </Suspense>
                        {children}
                        <Toaster position="top-right" />
                    </StackTheme>
                </StackProvider>
            </body>
        </html>
    );
}
