'use client';

import Link from 'next/link';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import { useEffect, memo } from 'react';
import { ArrowRight, Brain, TrendingUp, Award, Users, Target, Sparkles, FileText, MessageSquare } from 'lucide-react';

export default function HomePage() {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
        // Only redirect if we have a confirmed user (not null or undefined)
        if (user !== null && user !== undefined) {
            router.replace('/dashboard');
        }
    }, [user, router]);

    // Don't show anything while checking auth status
    // This prevents the flash of content before redirect
    if (user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        Revolutionary AI-Powered Matching
                    </div>

                    <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                        Find Your Perfect University Match
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Advanced ML predictions, 40-year ROI calculator, scholarship matching, and peer benchmarking.
                        Everything Orbit AI has, plus revolutionary features they don't.
                    </p>

                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/handler/sign-up"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Free forever</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Setup in 2 minutes</span>
                        </div>
                    </div>
                </div>

                {/* AI Features Banner */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">NEW: AI-Powered Tools</h2>
                        </div>
                        <p className="mb-6 text-purple-100">
                            Get personalized feedback and prep with our advanced AI features
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                <FileText className="w-8 h-8 mb-3" />
                                <h3 className="font-semibold mb-2 text-lg">Essay Analyzer</h3>
                                <p className="text-sm text-purple-100">Get AI feedback on your essays with clarity, uniqueness, and impact scores</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                <MessageSquare className="w-8 h-8 mb-3" />
                                <h3 className="font-semibold mb-2 text-lg">Interview Prep</h3>
                                <p className="text-sm text-purple-100">Practice with AI-generated questions tailored to your target universities</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
                    <FeatureCard
                        icon={<Brain className="w-8 h-8 text-blue-600" />}
                        title="ML Success Prediction"
                        description="Predict graduation likelihood, employment probability, and salary ranges with advanced machine learning"
                    />

                    <FeatureCard
                        icon={<TrendingUp className="w-8 h-8 text-green-600" />}
                        title="40-Year ROI Calculator"
                        description="Interactive career earnings projections, NPV calculations, and break-even analysis"
                    />

                    <FeatureCard
                        icon={<Award className="w-8 h-8 text-purple-600" />}
                        title="Scholarship Maximizer"
                        description="AI matching across 10,000+ scholarships with probability scoring and funding potential"
                    />

                    <FeatureCard
                        icon={<Users className="w-8 h-8 text-orange-600" />}
                        title="Peer Benchmarking"
                        description="Live comparison with students like you, success stories, and real admission data"
                    />

                    <FeatureCard
                        icon={<Target className="w-8 h-8 text-red-600" />}
                        title="Gap Analysis"
                        description="Personalized improvement roadmap with test retake ROI and timeline to bridge gaps"
                    />

                    <FeatureCard
                        icon={<Sparkles className="w-8 h-8 text-indigo-600" />}
                        title="Holistic Review"
                        description="Essays, extracurriculars, work experience, and diversity factors all considered"
                    />
                </div>

                {/* Stats Section */}
                <div className="grid md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto">
                    <StatCard number="15+" label="Top Universities" />
                    <StatCard number="10,000+" label="Scholarships" />
                    <StatCard number="95%" label="Match Accuracy" />
                    <StatCard number="40 Years" label="ROI Projection" />
                </div>

                {/* Final CTA */}
                <div className="mt-24 max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Start Your Journey Today</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join thousands of students finding their perfect university match
                    </p>
                    <Link
                        href="/handler/sign-up"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-xl text-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
                    >
                        Get Started Free
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                    <p className="mt-4 text-sm text-gray-500">
                        No credit card required • Free forever • Setup in 2 minutes
                    </p>
                </div>

                {/* Footer */}
                <footer className="mt-24 pt-12 border-t border-gray-200">
                    <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">O</span>
                                </div>
                                <span className="font-bold text-lg">Orbit RFM Pro</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                AI-powered university matching platform helping students find their perfect fit.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link href="/#features" className="hover:text-blue-600">Features</Link></li>
                                <li><Link href="/#how-it-works" className="hover:text-blue-600">How It Works</Link></li>
                                <li><Link href="/handler/sign-up" className="hover:text-blue-600">Get Started</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">AI Tools</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><span className="text-gray-400">Essay Analyzer</span></li>
                                <li><span className="text-gray-400">Interview Prep</span></li>
                                <li><span className="text-gray-400">Match Advisor</span></li>
                            </ul>
                            <p className="text-xs text-gray-500 mt-2">Sign up to access</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><span className="text-gray-400">About Us</span></li>
                                <li><span className="text-gray-400">Contact</span></li>
                                <li><span className="text-gray-400">Privacy Policy</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
                        <p>© 2025 Orbit RFM Pro. All rights reserved. Built with ❤️ for students.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

const FeatureCard = memo(({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
));
FeatureCard.displayName = 'FeatureCard';

const StatCard = memo(({ number, label }: { number: string; label: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
        <div className="text-gray-600">{label}</div>
    </div>
));
StatCard.displayName = 'StatCard';
