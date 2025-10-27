'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MatchGrid } from '@/components/results/match-grid';
import { ResultsSummary } from '@/components/results/results-summary';
import { PeerComparison } from '@/components/results/peer-comparison';
import { ROISimulator } from '@/components/results/roi-simulator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ResultsPage() {
    const router = useRouter();
    const [matches, setMatches] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedResults = sessionStorage.getItem('matchResults');
        const storedProfile = sessionStorage.getItem('userProfile');

        if (!storedResults || !storedProfile) {
            router.push('/match');
            return;
        }

        try {
            setMatches(JSON.parse(storedResults).matches || []);
            setProfile(JSON.parse(storedProfile));
        } catch (error) {
            toast.error('Failed to load results');
            router.push('/match');
        } finally {
            setLoading(false);
        }
    }, [router]);

    const handleExportPDF = () => {
        toast.success('PDF export coming soon!');
    };

    const handleShare = () => {
        toast.success('Share functionality coming soon!');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading your matches...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/match')}
                            className="mb-4"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Form
                        </Button>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Your University Matches
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {matches.length} universities matched to your profile
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleExportPDF}>
                            <Download className="mr-2 h-4 w-4" />
                            Export PDF
                        </Button>
                        <Button variant="outline" onClick={handleShare}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                    </div>
                </div>

                <ResultsSummary matches={matches} />

                <Tabs defaultValue="matches" className="mt-8">
                    <TabsList>
                        <TabsTrigger value="matches">All Matches</TabsTrigger>
                        <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
                        <TabsTrigger value="peers">Peer Comparison</TabsTrigger>
                        <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
                    </TabsList>

                    <TabsContent value="matches" className="mt-6">
                        <MatchGrid matches={matches} />
                    </TabsContent>

                    <TabsContent value="roi" className="mt-6">
                        <ROISimulator matches={matches} profile={profile} />
                    </TabsContent>

                    <TabsContent value="peers" className="mt-6">
                        <PeerComparison profile={profile} />
                    </TabsContent>

                    <TabsContent value="scholarships" className="mt-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
                            <h3 className="text-xl font-semibold mb-2">Scholarship Matching</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Detailed scholarship matching coming soon!
                            </p>
                            <p className="text-sm text-gray-500">
                                We're working on matching you with 10,000+ scholarships
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
