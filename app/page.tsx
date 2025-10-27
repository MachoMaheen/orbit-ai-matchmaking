import Link from 'next/link';
import { ArrowRight, Brain, TrendingUp, Award, Users, Target, Sparkles } from 'lucide-react';

export default function HomePage() {
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
                            href="/match"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Start Matching
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                            Learn More
                        </Link>
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
                    <StatCard number="50+" label="Top Universities" />
                    <StatCard number="10,000+" label="Scholarships" />
                    <StatCard number="95%" label="Match Accuracy" />
                    <StatCard number="40 Years" label="ROI Projection" />
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
            <div className="text-gray-600">{label}</div>
        </div>
    );
}
