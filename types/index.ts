// TypeScript Types

export interface UserProfile {
    gmatScore?: number;
    greVerbal?: number;
    greQuant?: number;
    gpa: number;
    undergraduateMajor?: string;
    undergraduateSchool?: string;
    workExperienceMonths: number;
    industry?: string;
    currentRole?: string;
    yearsLeadership?: number;
    targetProgram: string;
    targetSpecialization?: string;
    preferredLocations?: string[];
    budgetMax?: number;
    extracurriculars?: string;
    leadership?: string;
    uniqueFactors?: string;
}

export interface University {
    id: string;
    name: string;
    location: string;
    state: string;
    country: string;
    website?: string;
    overallRanking?: number;
    programRanking?: number;
    acceptanceRate: number;
    avgGmat?: number;
    avgGreVerbal?: number;
    avgGreQuant?: number;
    avgGpa: number;
    avgWorkExpMonths: number;
    programType: string;
    programDurationMonths: number;
    classSize?: number;
    internationalPercent?: number;
    womenPercent?: number;
    tuitionAnnualUSD: number;
    totalCostAnnualUSD: number;
    avgFinancialAidUSD?: number;
    needBlind: boolean;
    avgStartingSalaryUSD: number;
    avg10YearSalaryUSD: number;
    employmentRate: number;
    topRecruiters: string[];
    studentToFaculty?: number;
    diversityScore?: number;
    campusType?: string;
    successProbability: number;
    studentSatisfaction: number;
    specializations?: UniversitySpecialization[];
    scholarships?: Scholarship[];
}

export interface UniversitySpecialization {
    id: string;
    universityId: string;
    specialization: string;
    ranking?: number;
}

export interface Scholarship {
    id: string;
    universityId?: string;
    name: string;
    provider: string;
    amountUSD: number;
    type: string;
    description: string;
    eligibility: string;
    requirements: string[];
    minGpa?: number;
    minGmat?: number;
    targetDemographic?: string;
    deadline?: Date;
    renewable: boolean;
    applicationUrl?: string;
    applicationDifficulty: number;
    successRate: number;
}

export interface FitScore {
    academic: number;
    financial: number;
    career: number;
    cultural: number;
    success: number;
    overall: number;
}

export interface ROIMetrics {
    totalInvestment: number;
    expectedSalaryYear1: number;
    expectedSalaryYear10: number;
    expectedSalaryYear40: number;
    netPresentValue: number;
    breakEvenYears: number;
    lifetimeROI: number;
    salaryGrowthRate: number;
    cumulativeEarnings40: number;
}

export interface MatchResult {
    university: University;
    fitScore: FitScore;
    admissionProbability: number;
    category: 'SAFETY' | 'TARGET' | 'REACH';
    roiMetrics: ROIMetrics;
    scoreBreakdown: {
        academicFit: number;
        financialFit: number;
        careerFit: number;
        culturalFit: number;
        successProbability: number;
    };
    scholarships?: any[];
    gapAnalysis?: any;
}

export interface GapAnalysis {
    gaps: Gap[];
    strengths: string[];
    recommendations: Recommendation[];
    overallReadiness: string;
    timeToReady: string;
}

export interface Gap {
    area: string;
    current: any;
    target: any;
    gap: any;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    impact: string;
}

export interface Recommendation {
    action: string;
    timeline: string;
    resources: string[];
    estimatedCost: string;
    roiScore: number;
}

export interface PeerComparison {
    yourProfile: any;
    similarProfiles: any[];
    admissionRates: any;
    scholarshipData: any;
    successStories: any[];
}
