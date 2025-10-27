// GAP ANALYSIS WITH ACTION PLANS

export function performGapAnalysis(profile: any, university: any) {
    const gaps = [];
    const strengths = [];
    const recommendations = [];

    // Test Score Gap
    const effectiveGMAT = profile.gmatScore || 0;
    if (effectiveGMAT && university.avgGmat) {
        const diff = university.avgGmat - effectiveGMAT;
        if (diff > 50) {
            gaps.push({
                area: 'Test Score',
                current: effectiveGMAT,
                target: university.avgGmat,
                gap: diff,
                priority: 'HIGH',
                impact: 'Significant impact on admission probability'
            });
            recommendations.push({
                action: 'Retake GMAT/GRE',
                timeline: '3-6 months',
                resources: ['Manhattan Prep', 'Official GMAT Guide', 'Target Test Prep'],
                estimatedCost: '$500-1500',
                roiScore: calculateRetakeROI(diff)
            });
        } else if (diff > 0) {
            recommendations.push({
                action: 'Consider retaking test',
                timeline: '2-3 months',
                resources: ['Practice tests', 'Focused prep'],
                estimatedCost: '$200-500',
                roiScore: calculateRetakeROI(diff)
            });
        } else {
            strengths.push('Test score above average');
        }
    }

    // GPA Gap
    if (profile.gpa < university.avgGpa - 0.3) {
        gaps.push({
            area: 'GPA',
            current: profile.gpa,
            target: university.avgGpa,
            gap: university.avgGpa - profile.gpa,
            priority: 'MEDIUM',
            impact: 'Can be offset with strong test scores and experience'
        });
        recommendations.push({
            action: 'Strengthen other application areas',
            timeline: 'Ongoing',
            resources: ['Leadership roles', 'Professional certifications', 'Strong essays'],
            estimatedCost: '$0-1000',
            roiScore: 7
        });
    } else {
        strengths.push('GPA competitive');
    }

    // Work Experience Gap
    const expDiff = (university.avgWorkExpMonths || 60) - profile.workExperienceMonths;
    if (expDiff > 12) {
        gaps.push({
            area: 'Work Experience',
            current: `${Math.floor(profile.workExperienceMonths / 12)} years`,
            target: `${Math.floor(university.avgWorkExpMonths / 12)} years`,
            gap: `${Math.floor(expDiff / 12)} years`,
            priority: 'LOW',
            impact: 'Consider applying after gaining more experience'
        });
        recommendations.push({
            action: 'Gain additional work experience',
            timeline: `${Math.floor(expDiff / 12)} years`,
            resources: ['Leadership opportunities', 'Project management roles'],
            estimatedCost: '$0',
            roiScore: 8
        });
    } else {
        strengths.push('Work experience adequate');
    }

    // Holistic Factors
    if (!profile.leadership || profile.leadership.length < 50) {
        gaps.push({
            area: 'Leadership Experience',
            current: 'Limited documentation',
            target: 'Strong leadership narrative',
            gap: 'Need to develop/document leadership',
            priority: 'MEDIUM',
            impact: 'Important for holistic review'
        });
        recommendations.push({
            action: 'Document leadership experiences',
            timeline: '1-2 months',
            resources: ['Essay workshops', 'Career counseling'],
            estimatedCost: '$100-500',
            roiScore: 9
        });
    }

    return {
        gaps,
        strengths,
        recommendations,
        overallReadiness: calculateReadiness(gaps),
        timeToReady: estimateTimeToReady(recommendations)
    };
}

function calculateRetakeROI(scoreDiff: number): number {
    // Higher score difference = higher ROI for retaking
    if (scoreDiff > 100) return 10;
    if (scoreDiff > 50) return 8;
    if (scoreDiff > 30) return 6;
    return 4;
}

function calculateReadiness(gaps: any[]): string {
    const highPriority = gaps.filter(g => g.priority === 'HIGH').length;
    const mediumPriority = gaps.filter(g => g.priority === 'MEDIUM').length;

    if (highPriority === 0 && mediumPriority === 0) return 'READY';
    if (highPriority === 0 && mediumPriority <= 1) return 'NEARLY_READY';
    if (highPriority <= 1) return 'NEEDS_WORK';
    return 'SIGNIFICANT_GAPS';
}

function estimateTimeToReady(recommendations: any[]): string {
    const timelines = recommendations.map(r => {
        const match = r.timeline.match(/(\d+)/);
        return match ? parseInt(match[0]) : 0;
    });

    const maxTime = Math.max(...timelines, 0);
    if (maxTime === 0) return 'Ready now';
    if (maxTime <= 3) return `${maxTime} months`;
    if (maxTime <= 12) return `${maxTime} months`;
    return `${Math.floor(maxTime / 12)} years`;
}
