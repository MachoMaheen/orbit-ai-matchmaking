'use client';

import { useState } from 'react';
import { useUser } from '@stackframe/stack';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, FileText, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function EssayAnalyzerPage() {
    const user = useUser({ or: 'redirect' }); // Redirect if not authenticated
    const [essay, setEssay] = useState('');
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const analyzeEssay = async () => {
        if (essay.trim().length < 50) {
            toast.error('Essay must be at least 50 characters long');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/ai/analyze-essay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ essay }),
            });

            const data = await res.json();
            if (data.success) {
                setAnalysis(data.analysis);
                toast.success('Essay analyzed successfully!');
            } else {
                toast.error(data.error || 'Failed to analyze essay');
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
            <div className="container mx-auto max-w-6xl px-4">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        AI Essay Analyzer
                    </h1>
                    <p className="text-gray-600">
                        Get instant feedback on your college application essay with AI-powered analysis
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-purple-600" />
                            <h2 className="text-xl font-semibold">Your Essay</h2>
                        </div>

                        <textarea
                            className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                            placeholder="Paste your college application essay here...

Example: 'The moment I realized I wanted to pursue business was when I led my first team project...'

Minimum 50 characters required."
                            value={essay}
                            onChange={(e) => setEssay(e.target.value)}
                        />

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                {essay.length} characters
                            </span>
                            <Button
                                onClick={analyzeEssay}
                                disabled={loading || essay.length < 50}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    'Analyze Essay'
                                )}
                            </Button>
                        </div>
                    </Card>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {!analysis && !loading && (
                            <Card className="p-8 text-center">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">
                                    Your essay analysis will appear here
                                </p>
                            </Card>
                        )}

                        {loading && (
                            <Card className="p-8 text-center">
                                <Loader2 className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-spin" />
                                <p className="text-gray-600">Analyzing your essay...</p>
                            </Card>
                        )}

                        {analysis && (
                            <>
                                {/* Scores */}
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Essay Scores</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <ScoreCard label="Clarity" score={analysis.clarityScore} />
                                        <ScoreCard label="Uniqueness" score={analysis.uniquenessScore} />
                                        <ScoreCard label="Emotional Impact" score={analysis.emotionalImpact} />
                                        <ScoreCard label="Overall" score={analysis.overallScore} />
                                    </div>
                                </Card>

                                {/* Strengths */}
                                {analysis.strengths?.length > 0 && (
                                    <Card className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <h3 className="text-lg font-semibold">Strengths</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {analysis.strengths.map((strength: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-1">✓</span>
                                                    <span className="text-gray-700">{strength}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                )}

                                {/* Improvements */}
                                {analysis.improvements?.length > 0 && (
                                    <Card className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Lightbulb className="w-5 h-5 text-yellow-600" />
                                            <h3 className="text-lg font-semibold">Suggested Improvements</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {analysis.improvements.map((improvement: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-yellow-600 mt-1">💡</span>
                                                    <span className="text-gray-700">{improvement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                )}

                                {/* Weaknesses */}
                                {analysis.weaknesses?.length > 0 && (
                                    <Card className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <AlertCircle className="w-5 h-5 text-orange-600" />
                                            <h3 className="text-lg font-semibold">Areas to Address</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {analysis.weaknesses.map((weakness: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-orange-600 mt-1">⚠</span>
                                                    <span className="text-gray-700">{weakness}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                )}

                                {/* Clichés */}
                                {analysis.cliches?.length > 0 && (
                                    <Card className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">Clichés to Avoid</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis.cliches.map((cliche: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                                                >
                                                    {cliche}
                                                </span>
                                            ))}
                                        </div>
                                    </Card>
                                )}

                                {/* Summary */}
                                {analysis.summary && (
                                    <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
                                        <h3 className="text-lg font-semibold mb-2">Overall Assessment</h3>
                                        <p className="text-gray-700">{analysis.summary}</p>
                                    </Card>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
    const getColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-50';
        if (score >= 60) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    return (
        <div className={`p-4 rounded-lg ${getColor(score)}`}>
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-sm font-medium">{label}</div>
        </div>
    );
}
