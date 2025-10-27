'use client';

import { MatchResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp, DollarSign, Award } from 'lucide-react';

export function UniversityCard({ match }: { match: MatchResult }) {
    const { university, fitScore, admissionProbability, category, roiMetrics } = match;

    const categoryColors = {
        SAFETY: 'bg-green-100 text-green-800 border-green-300',
        TARGET: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        REACH: 'bg-orange-100 text-orange-800 border-orange-300',
    };

    return (
        <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{university.name}</CardTitle>
                    <Badge className={categoryColors[category]}>{category}</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {university.location}, {university.state}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Admission Probability */}
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Admission Probability</span>
                        <span className="font-semibold">{admissionProbability}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full ${admissionProbability >= 70
                                    ? 'bg-green-500'
                                    : admissionProbability >= 40
                                        ? 'bg-yellow-500'
                                        : 'bg-orange-500'
                                }`}
                            style={{ width: `${admissionProbability}%` }}
                        />
                    </div>
                </div>

                {/* Overall Fit Score */}
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Overall Fit</span>
                        <span className="font-semibold">{fitScore.overall}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${fitScore.overall}%` }}
                        />
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <div>
                            <p className="text-xs text-gray-600">Employment</p>
                            <p className="text-sm font-semibold">{(university.employmentRate * 100).toFixed(0)}%</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <div>
                            <p className="text-xs text-gray-600">Avg Salary</p>
                            <p className="text-sm font-semibold">${(university.avgStartingSalaryUSD / 1000).toFixed(0)}k</p>
                        </div>
                    </div>
                </div>

                {/* ROI Highlight */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-900 dark:text-blue-100">ROI Metrics</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <p className="text-gray-600">Break-even</p>
                            <p className="font-semibold">{roiMetrics.breakEvenYears} years</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Lifetime ROI</p>
                            <p className="font-semibold text-green-600">{roiMetrics.lifetimeROI}%</p>
                        </div>
                    </div>
                </div>

                {/* Fit Breakdown */}
                <div className="pt-2 border-t">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Fit Breakdown</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Academic</span>
                            <span className="font-semibold">{fitScore.academic}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Financial</span>
                            <span className="font-semibold">{fitScore.financial}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Career</span>
                            <span className="font-semibold">{fitScore.career}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Cultural</span>
                            <span className="font-semibold">{fitScore.cultural}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
