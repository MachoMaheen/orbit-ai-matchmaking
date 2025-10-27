'use client';

import { useUser } from '@stackframe/stack';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { memo } from 'react';
import {
    GraduationCap,
    FileText,
    MessageSquare,
    Clock,
    AlertCircle,
    BarChart3,
} from 'lucide-react';

const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
        </div>
    </div>
);

const StatCard = memo(({ title, value, subtitle, icon: Icon, iconColor }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: any;
    iconColor: string;
}) => (
    <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">{title}</span>
            <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </Card>
));
StatCard.displayName = 'StatCard';

const QuickActionCard = memo(({ href, icon: Icon, title, subtitle, bgColor, iconBg, textColor }: {
    href: string;
    icon: any;
    title: string;
    subtitle: string;
    bgColor: string;
    iconBg: string;
    textColor: string;
}) => (
    <Link
        href={href}
        className={`flex items-center justify-between p-4 ${bgColor} rounded-lg transition-colors group`}
    >
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
                <div className="font-semibold text-gray-900">{title}</div>
                <div className="text-sm text-gray-600">{subtitle}</div>
            </div>
        </div>
        <div className={`${textColor} group-hover:translate-x-1 transition-transform`}>→</div>
    </Link>
));
QuickActionCard.displayName = 'QuickActionCard';

export default function DashboardPage() {
    const user = useUser();

    if (!user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user.displayName || 'Student'}
                    </h1>
                    <p className="text-gray-600">Here's your university application overview</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Universities Matched"
                        value={0}
                        subtitle="Start matching to see results"
                        icon={GraduationCap}
                        iconColor="text-blue-600"
                    />
                    <StatCard
                        title="Essays Analyzed"
                        value={0}
                        subtitle="Get AI feedback on essays"
                        icon={FileText}
                        iconColor="text-green-600"
                    />
                    <StatCard
                        title="Interview Prep"
                        value={0}
                        subtitle="Practice sessions completed"
                        icon={MessageSquare}
                        iconColor="text-purple-600"
                    />
                    <StatCard
                        title="Profile Strength"
                        value="0%"
                        subtitle="Complete your profile"
                        icon={BarChart3}
                        iconColor="text-orange-600"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <QuickActionCard
                                    href="/match"
                                    icon={GraduationCap}
                                    title="Find University Matches"
                                    subtitle="Get AI-powered recommendations"
                                    bgColor="bg-blue-50 hover:bg-blue-100"
                                    iconBg="bg-blue-600"
                                    textColor="text-blue-600"
                                />
                                <QuickActionCard
                                    href="/essay-analyzer"
                                    icon={FileText}
                                    title="Analyze Your Essay"
                                    subtitle="Get instant AI feedback"
                                    bgColor="bg-green-50 hover:bg-green-100"
                                    iconBg="bg-green-600"
                                    textColor="text-green-600"
                                />
                                <QuickActionCard
                                    href="/interview-prep"
                                    icon={MessageSquare}
                                    title="Practice Interviews"
                                    subtitle="Prepare with AI coach"
                                    bgColor="bg-purple-50 hover:bg-purple-100"
                                    iconBg="bg-purple-600"
                                    textColor="text-purple-600"
                                />
                            </div>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="p-6 mt-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                            <div className="text-center py-12 text-gray-500">
                                <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                <p>No recent activity yet</p>
                                <p className="text-sm mt-1">Start using the tools to see your activity here</p>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Application Progress */}
                        <Card className="p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Application Progress</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">Complete Profile</div>
                                        <div className="text-xs text-gray-600">Add your academic info</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">Find Matches</div>
                                        <div className="text-xs text-gray-600">Discover universities</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-gray-400 text-sm">Prepare Essays</div>
                                        <div className="text-xs text-gray-500">Get feedback</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-gray-400 text-sm">Interview Prep</div>
                                        <div className="text-xs text-gray-500">Practice responses</div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Tips */}
                        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                            <h3 className="font-bold text-gray-900 mb-3">💡 Pro Tip</h3>
                            <p className="text-sm text-gray-700">
                                Start by finding your university matches. Our AI analyzes 15+ factors to recommend the best fit for you.
                            </p>
                            <Link
                                href="/match"
                                className="inline-block mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Get Started →
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
