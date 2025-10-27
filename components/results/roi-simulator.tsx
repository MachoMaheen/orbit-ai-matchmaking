'use client';

import { useState } from 'react';
import { MatchResult } from '@/types';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils/formatters';

export function ROISimulator({ matches, profile }: any) {
    const [selectedMatches, setSelectedMatches] = useState<string[]>(
        matches.slice(0, 3).map((m: MatchResult) => m.university.id)
    );
    const [investmentYears, setInvestmentYears] = useState(2);

    const chartData = generateROIChartData(matches, selectedMatches, investmentYears);

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Interactive ROI Simulator</h3>

                <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">Program Duration (years)</label>
                    <Slider
                        value={[investmentYears]}
                        onValueChange={(val) => setInvestmentYears(val[0])}
                        min={1}
                        max={4}
                        step={0.5}
                        className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-2">{investmentYears} year program</p>
                </div>

                <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Select Universities to Compare</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {matches.slice(0, 5).map((match: MatchResult) => (
                            <label key={match.university.id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedMatches.includes(match.university.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedMatches([...selectedMatches, match.university.id]);
                                        } else {
                                            setSelectedMatches(selectedMatches.filter(id => id !== match.university.id));
                                        }
                                    }}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">{match.university.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">40-Year Career Earnings Projection</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                        {selectedMatches.map((uniId, idx) => {
                            const match = matches.find((m: MatchResult) => m.university.id === uniId);
                            return (
                                <Line
                                    key={uniId}
                                    type="monotone"
                                    dataKey={`uni_${idx}`}
                                    name={match?.university.name || `University ${idx + 1}`}
                                    stroke={getColor(idx)}
                                    strokeWidth={2}
                                />
                            );
                        })}
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matches
                    .filter((m: MatchResult) => selectedMatches.includes(m.university.id))
                    .map((match: MatchResult) => (
                        <Card key={match.university.id} className="p-6">
                            <h4 className="font-semibold mb-4">{match.university.name}</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Investment:</span>
                                    <span className="font-semibold">{formatCurrency(match.roiMetrics.totalInvestment)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Year 1 Salary:</span>
                                    <span className="font-semibold">{formatCurrency(match.roiMetrics.expectedSalaryYear1)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Year 10 Salary:</span>
                                    <span className="font-semibold">{formatCurrency(match.roiMetrics.expectedSalaryYear10)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Break-Even:</span>
                                    <span className="font-semibold">{match.roiMetrics.breakEvenYears} years</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">40-Year ROI:</span>
                                    <span className="font-semibold text-green-600">{match.roiMetrics.lifetimeROI}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">NPV:</span>
                                    <span className="font-semibold">{formatCurrency(match.roiMetrics.netPresentValue)}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
            </div>
        </div>
    );
}

function generateROIChartData(matches: MatchResult[], selectedUniIds: string[], years: number) {
    const data = [];
    for (let year = 0; year <= 40; year += 2) {
        const dataPoint: any = { year };
        selectedUniIds.forEach((uniId, idx) => {
            const match = matches.find((m: MatchResult) => m.university.id === uniId);
            if (match) {
                const salary = match.roiMetrics.expectedSalaryYear1 * Math.pow(1.05, year);
                dataPoint[`uni_${idx}`] = salary;
            }
        });
        data.push(dataPoint);
    }
    return data;
}

function getColor(idx: number): string {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
    return colors[idx % colors.length];
}
