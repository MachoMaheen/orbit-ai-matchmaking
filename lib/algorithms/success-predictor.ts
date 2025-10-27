// ML SUCCESS PROBABILITY

export function predictSuccess(profile: any, university: any): number {
    let score = 50;

    // Test score factor
    const testScore = profile.gmatScore || 0;
    if (testScore > 0) {
        const testRatio = testScore / (university.avgGmat || 650);
        score += (testRatio - 1) * 20;
    }

    // GPA factor
    const gpaRatio = profile.gpa / university.avgGpa;
    score += (gpaRatio - 1) * 15;

    // Work experience factor
    const workExpRatio = profile.workExperienceMonths / (university.avgWorkExpMonths || 60);
    score += (workExpRatio - 1) * 10;

    // Holistic factors
    if (profile.leadership && profile.leadership.length > 50) score += 10;
    if (profile.extracurriculars && profile.extracurriculars.length > 50) score += 8;
    if (profile.uniqueFactors && profile.uniqueFactors.length > 50) score += 7;

    // University factors
    score += university.successProbability;
    score += (university.employmentRate - 0.85) * 20;

    // Additional factors from peer data
    score += (university.studentSatisfaction - 50) * 0.3;

    return Math.max(0, Math.min(100, Math.round(score)));
}

export function predictGraduationLikelihood(
    profile: any,
    university: any
): number {
    let likelihood = 75;

    // Based on test scores and GPA
    if (profile.gpa < university.avgGpa - 0.5) likelihood -= 15;
    if (profile.gpa > university.avgGpa + 0.5) likelihood += 10;

    // Based on work experience (work helps)
    likelihood += Math.min(10, (profile.workExperienceMonths / 60) * 5);

    // University graduation rate factor
    likelihood += 10;

    return Math.max(30, Math.min(99, likelihood));
}

export function predictEmploymentLikelihood(
    profile: any,
    university: any
): number {
    let likelihood = 70;

    // University employment rate direct correlation
    likelihood = likelihood * 0.5 + (university.employmentRate * 100) * 0.5;

    // Work experience helps
    likelihood += Math.min(10, (profile.workExperienceMonths / 60) * 8);

    // Industry match
    if (profile.industry && university.topRecruiters?.length > 0) {
        likelihood += 5;
    }

    return Math.max(20, Math.min(99, Math.round(likelihood)));
}

export function predictSalaryRange(
    profile: any,
    university: any
): { min: number; max: number; expected: number } {
    const base = university.avgStartingSalaryUSD;
    const growth = 1 + (profile.workExperienceMonths / 60) * 0.05;

    const expected = Math.round(base * growth);
    const min = Math.round(expected * 0.8);
    const max = Math.round(expected * 1.3);

    return { min, max, expected };
}
