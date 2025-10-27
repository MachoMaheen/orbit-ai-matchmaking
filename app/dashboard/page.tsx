'use client';

import { useUser } from '@stackframe/stack';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
    GraduationCap,
    FileText,
    MessageSquare,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
    BarChart3,
} from 'lucide-react';

export default function DashboardPage() {
    const user = useUser();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
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
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm">Universities Matched</span>
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">0</div>
                        <p className="text-xs text-gray-500 mt-1">Start matching to see results</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm">Essays Analyzed</span>
                            <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">0</div>
                        <p className="text-xs text-gray-500 mt-1">Get AI feedback on essays</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm">Interview Prep</span>
                            <MessageSquare className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">0</div>
                        <p className="text-xs text-gray-500 mt-1">Practice sessions completed</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm">Profile Strength</span>
                            <BarChart3 className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">0%</div>
                        <p className="text-xs text-gray-500 mt-1">Complete your profile</p>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <Link
                                    href="/match"
                                    className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <GraduationCap className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Find University Matches</div>
                                            <div className="text-sm text-gray-600">Get AI-powered recommendations</div>
                                        </div>
                                    </div>
                                    <div className="text-blue-600 group-hover:translate-x-1 transition-transform">→</div>
                                </Link>

                                <Link
                                    href="/essay-analyzer"
                                    className="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Analyze Your Essay</div>
                                            <div className="text-sm text-gray-600">Get instant AI feedback</div>
                                        </div>
                                    </div>
                                    <div className="text-green-600 group-hover:translate-x-1 transition-transform">→</div>
                                </Link>

                                <Link
                                    href="/interview-prep"
                                    className="flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                            <MessageSquare className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Practice Interviews</div>
                                            <div className="text-sm text-gray-600">Prepare with AI coach</div>
                                        </div>
                                    </div>
                                    <div className="text-purple-600 group-hover:translate-x-1 transition-transform">→</div>
                                </Link>
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
