'use client';

import { MatchResult } from '@/types';
import { Card } from '@/components/ui/card';
import { TrendingUp, Target, Award, DollarSign } from 'lucide-react';

export function ResultsSummary({ matches }: { matches: MatchResult[] }) {
    const safetyCount = matches.filter(m => m.category === 'SAFETY').length;
    const targetCount = matches.filter(m => m.category === 'TARGET').length;
    const reachCount = matches.filter(m => m.category === 'REACH').length;

    const avgAdmissionProb = Math.round(
        matches.reduce((sum, m) => sum + m.admissionProbability, 0) / matches.length
    );

    const avgROI = Math.round(
        matches.reduce((sum, m) => sum + m.roiMetrics.lifetimeROI, 0) / matches.length
    );

    const bestROI = matches.reduce((best, m) =>
        m.roiMetrics.lifetimeROI > best.roiMetrics.lifetimeROI ? m : best
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Match Distribution</p>
                        <p className="text-2xl font-bold">{matches.length} Schools</p>
                    </div>
                </div>
                <div className="flex gap-2 text-xs mt-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                        {safetyCount} Safety
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                        {targetCount} Target
                    </span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">
                        {reachCount} Reach
                    </span>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Avg Admission Chance</p>
                        <p className="text-2xl font-bold">{avgAdmissionProb}%</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                    Based on your profile and historical data
                </p>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Average ROI</p>
                        <p className="text-2xl font-bold">{avgROI}%</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                    40-year career return on investment
                </p>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                        <Award className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Best ROI School</p>
                        <p className="text-lg font-bold truncate">{bestROI.university.name.split(' ')[0]}</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                    {bestROI.roiMetrics.lifetimeROI}% lifetime ROI
                </p>
            </Card>
        </div>
    );
}
