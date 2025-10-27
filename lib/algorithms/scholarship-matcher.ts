// AI SCHOLARSHIP MATCHING ENGINE

export function matchScholarships(profile: any, scholarships: any[]) {
    return scholarships
        .map(scholarship => {
            const matchScore = calculateScholarshipMatch(profile, scholarship);
            const probability = calculateWinProbability(profile, scholarship);

            return {
                ...scholarship,
                matchScore,
                probability,
                estimatedValue: scholarship.amountUSD,
                applicationDifficulty: scholarship.applicationDifficulty || 5,
                deadline: scholarship.deadline,
                priorityScore: (matchScore * probability * scholarship.amountUSD) / 1000000
            };
        })
        .filter(s => s.matchScore > 40)
        .sort((a, b) => b.priorityScore - a.priorityScore);
}

function calculateScholarshipMatch(profile: any, scholarship: any): number {
    let score = 50;

    // GPA match
    if (scholarship.minGpa) {
        if (profile.gpa >= scholarship.minGpa + 0.3) {
            score += 20;
        } else if (profile.gpa >= scholarship.minGpa) {
            score += 10;
        } else {
            return 0; // Not eligible
        }
    }

    // Test score match
    if (scholarship.minGmat) {
        const effectiveGMAT = profile.gmatScore || 0;
        if (effectiveGMAT >= scholarship.minGmat + 50) {
            score += 20;
        } else if (effectiveGMAT >= scholarship.minGmat) {
            score += 10;
        } else {
            return 0; // Not eligible
        }
    }

    // Demographic match
    if (scholarship.targetDemographic) {
        // This would need more profile data
        score += 10;
    }

    // Type match
    if (scholarship.type === 'Merit' && profile.gpa > 3.7) {
        score += 10;
    }

    return Math.min(100, score);
}

function calculateWinProbability(profile: any, scholarship: any): number {
    let probability = scholarship.successRate || 0.15;

    // Adjust based on profile strength
    if (profile.gpa > 3.8) probability *= 1.3;
    if (profile.gmatScore > 720) probability *= 1.2;
    if (profile.leadership && profile.leadership.length > 100) probability *= 1.1;

    // Adjust based on competition
    if (scholarship.applicationDifficulty < 5) probability *= 1.2;
    if (scholarship.applicationDifficulty > 7) probability *= 0.8;

    return Math.min(0.95, probability);
}

export function calculateScholarshipPotential(matches: any[]) {
    const total = matches.reduce((sum, s) => sum + s.estimatedValue, 0);
    const weighted = matches.reduce((sum, s) => sum + (s.estimatedValue * s.probability), 0);
    const topFive = matches.slice(0, 5).reduce((sum, s) => sum + s.estimatedValue, 0);

    return {
        totalPotential: Math.round(total),
        weightedExpected: Math.round(weighted),
        topFiveTotal: Math.round(topFive),
        matchCount: matches.length,
        highProbability: matches.filter(s => s.probability > 0.5).length
    };
}
