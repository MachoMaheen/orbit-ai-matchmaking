'use client';

import { useState } from 'react';
import { useUser } from '@stackframe/stack';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, MessageSquare, Lightbulb, Target } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function InterviewPrepPage() {
    const user = useUser({ or: 'redirect' }); // Redirect if not authenticated
    const [university, setUniversity] = useState('');
    const [program, setProgram] = useState('MBA');
    const [questions, setQuestions] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

    const userProfile = {
        gpa: 3.6,
        gmatScore: 710,
        workExperienceMonths: 48,
        industry: 'Technology',
        leadership: 'Led team of 5 engineers on cloud migration project',
    };

    const generateQuestions = async () => {
        if (!university.trim()) {
            toast.error('Please enter a university name');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/ai/interview-prep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ university, program, userProfile }),
            });

            const data = await res.json();
            if (data.success) {
                setQuestions(data.questions);
                toast.success('Interview questions generated!');
            } else {
                toast.error(data.error || 'Failed to generate questions');
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
            <div className="container mx-auto max-w-5xl px-4">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        AI Interview Prep
                    </h1>
                    <p className="text-gray-600">
                        Get university-specific interview questions and expert tips
                    </p>
                </div>

                {/* Input Section */}
                <Card className="p-6 mb-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">University Name</label>
                            <Input
                                type="text"
                                placeholder="e.g., Harvard Business School"
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Program</label>
                            <select
                                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                value={program}
                                onChange={(e) => setProgram(e.target.value)}
                            >
                                <option value="MBA">MBA</option>
                                <option value="MS">MS</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>
                    </div>

                    <Button
                        onClick={generateQuestions}
                        disabled={loading}
                        className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating Questions...
                            </>
                        ) : (
                            <>
                                <Target className="mr-2 h-4 w-4" />
                                Generate Interview Questions
                            </>
                        )}
                    </Button>
                </Card>

                {/* Questions Section */}
                {!questions && !loading && (
                    <Card className="p-12 text-center">
                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                            Enter a university and program to generate interview questions
                        </p>
                    </Card>
                )}

                {loading && (
                    <Card className="p-12 text-center">
                        <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
                        <p className="text-gray-600">Generating personalized interview questions...</p>
                    </Card>
                )}

                {questions?.questions && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">Interview Questions</h2>
                            <span className="text-sm text-gray-500">
                                {questions.questions.length} questions generated
                            </span>
                        </div>

                        {questions.questions.map((q: any, index: number) => (
                            <Card key={index} className="p-6">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                    {q.category || 'General'}
                                                </span>
                                                <span className="text-gray-500 text-sm">Question {index + 1}</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {q.question}
                                            </h3>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            {expandedQuestion === index ? '−' : '+'}
                                        </button>
                                    </div>

                                    {expandedQuestion === index && (
                                        <div className="mt-4 space-y-4 border-t pt-4">
                                            {q.tips && (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                                                        <h4 className="font-semibold text-sm">How to Approach</h4>
                                                    </div>
                                                    <p className="text-gray-700 text-sm">{q.tips}</p>
                                                </div>
                                            )}

                                            {q.sampleAnswer && (
                                                <div>
                                                    <h4 className="font-semibold text-sm mb-2">Sample Strong Answer</h4>
                                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                        <p className="text-gray-700 text-sm">{q.sampleAnswer}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
