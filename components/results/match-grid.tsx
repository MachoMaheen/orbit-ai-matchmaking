'use client';

import { MatchResult } from '@/types';
import { UniversityCard } from './university-card';
import { motion } from 'framer-motion';

export function MatchGrid({ matches }: { matches: MatchResult[] }) {
    const safetySchools = matches.filter(m => m.category === 'SAFETY');
    const targetSchools = matches.filter(m => m.category === 'TARGET');
    const reachSchools = matches.filter(m => m.category === 'REACH');

    return (
        <div className="space-y-12">
            {/* Safety Schools */}
            {safetySchools.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Safety Schools ({safetySchools.length})
                        </h2>
                        <p className="text-sm text-green-600 dark:text-green-400">70%+ admission probability</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {safetySchools.map((match, idx) => (
                            <motion.div
                                key={match.university.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <UniversityCard match={match} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Target Schools */}
            {targetSchools.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Target Schools ({targetSchools.length})
                        </h2>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">40-70% admission probability</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {targetSchools.map((match, idx) => (
                            <motion.div
                                key={match.university.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <UniversityCard match={match} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Reach Schools */}
            {reachSchools.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Reach Schools ({reachSchools.length})
                        </h2>
                        <p className="text-sm text-orange-600 dark:text-orange-400">&lt;40% admission probability</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reachSchools.map((match, idx) => (
                            <motion.div
                                key={match.university.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <UniversityCard match={match} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
