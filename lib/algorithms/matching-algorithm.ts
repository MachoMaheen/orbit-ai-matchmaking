// 5D MATCHING WITH ML

import { UserProfile, University, MatchResult, FitScore } from '@/types';
import { calculateROI } from './roi-calculator';
import { predictSuccess } from './success-predictor';

interface CalculatedScores {
    academic: number;
    financial: number;
    career: number;
    cultural: number;
    success: number;
}

export function convertGREtoGMAT(verbal?: number, quant?: number): number {
    if (!verbal || !quant) return 0;
    const greTotal = verbal + quant;
    return Math.max(200, Math.min(800, Math.round((greTotal - 260) * 7.5 + 200)));
}

export function calculateFitScore(
    profile: any,
    university: any
): FitScore {
    const scores: CalculatedScores = {
        academic: calculateAcademicFit(profile, university),
        financial: calculateFinancialFit(profile, university),
        career: calculateCareerFit(profile, university),
        cultural: calculateCulturalFit(profile, university),
        success: calculateSuccessProbability(profile, university),
    };

    const overall =
        scores.academic * 0.30 +
        scores.financial * 0.25 +
        scores.career * 0.20 +
        scores.cultural * 0.15 +
        scores.success * 0.10;

    return {
        academic: Math.round(scores.academic),
        financial: Math.round(scores.financial),
        career: Math.round(scores.career),
        cultural: Math.round(scores.cultural),
        success: Math.round(scores.success),
        overall: Math.round(overall),
    };
}

function calculateAcademicFit(profile: any, university: any): number {
    let score = 50;

    const effectiveGMAT = profile.gmatScore ||
        convertGREtoGMAT(profile.greVerbal, profile.greQuant);

    if (effectiveGMAT && university.avgGmat) {
        const diff = Math.abs(effectiveGMAT - university.avgGmat);
        const testMatch = Math.max(0, 100 - (diff / 8));
        score += (testMatch - 50) * 0.6;
    }

    if (profile.gpa && university.avgGpa) {
        const diff = Math.abs(profile.gpa - university.avgGpa);
        const gpaMatch = Math.max(0, 100 - (diff * 50));
        score += (gpaMatch - 50) * 0.4;
    }

    return Math.max(0, Math.min(100, score));
}

function calculateFinancialFit(profile: any, university: any): number {
    let score = 75;

    if (profile.budgetMax) {
        const totalCost = university.totalCostAnnualUSD - (university.avgFinancialAidUSD || 0);

        if (totalCost <= profile.budgetMax) {
            score = 100;
        } else if (totalCost <= profile.budgetMax * 1.2) {
            score = 80;
        } else if (totalCost <= profile.budgetMax * 1.5) {
            score = 60;
        } else {
            score = Math.max(20, 100 - ((totalCost - profile.budgetMax) / 100000) * 10);
        }
    }

    return score;
}

function calculateCareerFit(profile: any, university: any): number {
    let score = 0;

    score += university.employmentRate * 100 * 0.5;
    score += Math.min(100, (university.avgStartingSalaryUSD / 250000) * 100) * 0.3;
    score += 20;

    return score;
}

function calculateCulturalFit(profile: any, university: any): number {
    let score = 60;

    if (profile.preferredLocations?.length > 0) {
        const match = profile.preferredLocations.some((loc: string) =>
            university.state.toLowerCase().includes(loc.toLowerCase()) ||
            university.location.toLowerCase().includes(loc.toLowerCase())
        );
        score += match ? 30 : -15;
    }

    return Math.min(100, Math.max(0, score));
}

function calculateSuccessProbability(profile: any, university: any): number {
    return predictSuccess(profile, university);
}

export function calculateAdmissionProbability(
    profile: any,
    university: any,
    fitScore: FitScore
): number {
    const effectiveGMAT = profile.gmatScore ||
        convertGREtoGMAT(profile.greVerbal, profile.greQuant);

    const z = -3.5 +
        ((effectiveGMAT / (university.avgGmat || 650)) * 2.5) +
        ((profile.gpa / university.avgGpa) * 2) +
        ((profile.workExperienceMonths / (university.avgWorkExpMonths || 60)) * 1.5) +
        (university.acceptanceRate * 6) +
        (fitScore.overall / 40);

    const probability = (1 / (1 + Math.exp(-z))) * 100;
    return Math.max(1, Math.min(99, Math.round(probability)));
}

export function categorizeMatch(probability: number): 'SAFETY' | 'TARGET' | 'REACH' {
    if (probability >= 70) return 'SAFETY';
    if (probability >= 40) return 'TARGET';
    return 'REACH';
}

export async function rankUniversities(
    profile: any,
    universities: any[]
): Promise<any[]> {
    const results = universities
        .filter(uni => uni.programType === profile.targetProgram)
        .map(university => {
            const fitScore = calculateFitScore(profile, university);
            const admissionProbability = calculateAdmissionProbability(profile, university, fitScore);
            const category = categorizeMatch(admissionProbability);
            const roiMetrics = calculateROI(profile, university);

            return {
                university,
                fitScore,
                admissionProbability,
                category,
                roiMetrics,
                scoreBreakdown: {
                    academicFit: fitScore.academic,
                    financialFit: fitScore.financial,
                    careerFit: fitScore.career,
                    culturalFit: fitScore.cultural,
                    successProbability: fitScore.success,
                }
            };
        });

    return results.sort((a, b) => b.fitScore.overall - a.fitScore.overall);
}
