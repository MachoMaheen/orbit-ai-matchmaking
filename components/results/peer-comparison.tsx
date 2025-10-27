'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';
import { Users, TrendingUp, Award } from 'lucide-react';

export function PeerComparison({ profile }: any) {
    const [peerData, setPeerData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPeerData();
    }, []);

    const fetchPeerData = async () => {
        try {
            // Mock data for now - replace with actual API call
            const mockData = {
                similarProfiles: 247,
                topUniversities: [
                    'Harvard Business School',
                    'Stanford GSB',
                    'Wharton School',
                    'MIT Sloan',
                    'Columbia Business School'
                ],
                successStories: [
                    {
                        gmatRange: '710-730',
                        gpaRange: '3.5-3.7',
                        admitted: ['Harvard', 'Stanford', 'Wharton'],
                        scholarship: 45000
                    },
                    {
                        gmatRange: '700-720',
                        gpaRange: '3.4-3.6',
                        admitted: ['MIT Sloan', 'Columbia', 'NYU Stern'],
                        scholarship: 35000
                    },
                    {
                        gmatRange: '690-710',
                        gpaRange: '3.3-3.5',
                        admitted: ['Duke Fuqua', 'Michigan Ross', 'Berkeley Haas'],
                        scholarship: 28000
                    }
                ],
                admissionRates: [
                    { university: 'Harvard', yourChance: 45, peerAverage: 38 },
                    { university: 'Stanford', yourChance: 42, peerAverage: 35 },
                    { university: 'Wharton', yourChance: 58, peerAverage: 52 },
                    { university: 'MIT', yourChance: 52, peerAverage: 48 },
                    { university: 'Columbia', yourChance: 61, peerAverage: 55 }
                ]
            };

            setPeerData(mockData);
        } catch (error) {
            toast.error('Failed to load peer comparisons');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
                <div className="flex items-center gap-3 mb-2">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold">How You Compare to Peers</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    {peerData?.similarProfiles || 0} students with similar profiles found
                </p>
            </Card>

            <Card className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Your Admission Chances vs Peer Average
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={peerData?.admissionRates || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="university" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="yourChance" fill="#3b82f6" name="Your Chance %" />
                        <Bar dataKey="peerAverage" fill="#94a3b8" name="Peer Average %" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card className="p-6">
                <h4 className="font-semibold mb-4">Top Universities for Similar Students</h4>
                <div className="space-y-2">
                    {peerData?.topUniversities?.slice(0, 5).map((uni: string, idx: number) => (
                        <div key={uni} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <span className="text-sm font-semibold text-blue-600">{idx + 1}</span>
                            </div>
                            <span className="font-medium">{uni}</span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Success Stories from Similar Profiles
                </h4>
                <div className="space-y-4">
                    {peerData?.successStories?.map((story: any, idx: number) => (
                        <div key={idx} className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                                <strong>GMAT {story.gmatRange}</strong> • <strong>GPA {story.gpaRange}</strong>
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                Admitted to: {story.admitted.slice(0, 3).join(', ')}
                            </p>
                            <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                                💰 ${story.scholarship.toLocaleString()} in scholarships
                            </p>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-6 bg-blue-50 dark:bg-blue-900/20">
                <h4 className="font-semibold mb-2">💡 Insights</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Your profile is <strong>above average</strong> compared to peers</li>
                    <li>• Students like you typically receive <strong>$30k-50k</strong> in scholarships</li>
                    <li>• <strong>85%</strong> of similar profiles were admitted to at least one top-10 school</li>
                    <li>• Average application count: <strong>6-8 schools</strong></li>
                </ul>
            </Card>
        </div>
    );
}
