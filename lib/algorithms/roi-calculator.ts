// 40-YEAR ROI WITH NPV

export function calculateROI(profile: any, university: any) {
    const years = university.programDurationMonths / 12;

    const tuition = university.tuitionAnnualUSD * years;
    const living = (university.totalCostAnnualUSD - university.tuitionAnnualUSD) * years;
    const totalCost = tuition + living - (university.avgFinancialAidUSD || 0);

    const currentSalary = estimateCurrentSalary(profile);
    const opportunityCost = currentSalary * years;
    const totalInvestment = totalCost + opportunityCost;

    const year1Salary = university.avgStartingSalaryUSD;
    const growthRate = getGrowthRate(profile.industry);

    const year10 = year1Salary * Math.pow(1 + growthRate, 9);
    const year40 = year1Salary * Math.pow(1 + growthRate, 39);

    const breakEven = calculateBreakEven(
        totalInvestment,
        year1Salary,
        currentSalary,
        growthRate
    );

    const npv = calculateNPV(
        totalInvestment,
        year1Salary,
        currentSalary,
        growthRate,
        0.05,
        40
    );

    const lifetimeEarnings = calculateLifetimeEarnings(year1Salary, growthRate, 40);
    const alternativeEarnings = calculateLifetimeEarnings(currentSalary, 0.03, 40);

    const roi = ((lifetimeEarnings - alternativeEarnings - totalInvestment) / totalInvestment) * 100;

    return {
        totalInvestment: Math.round(totalInvestment),
        expectedSalaryYear1: Math.round(year1Salary),
        expectedSalaryYear10: Math.round(year10),
        expectedSalaryYear40: Math.round(year40),
        netPresentValue: Math.round(npv),
        breakEvenYears: parseFloat(breakEven.toFixed(1)),
        lifetimeROI: Math.round(roi),
        salaryGrowthRate: parseFloat((growthRate * 100).toFixed(1)),
        cumulativeEarnings40: Math.round(lifetimeEarnings),
    };
}

function estimateCurrentSalary(profile: any): number {
    const baseBySalary: { [key: string]: number } = {
        'Technology': 75000,
        'Finance': 85000,
        'Consulting': 80000,
        'Healthcare': 65000,
        'Engineering': 70000,
        'Default': 60000,
    };

    const base = baseBySalary[profile.industry] || baseBySalary.Default;
    const yearsExp = profile.workExperienceMonths / 12;

    return base + (yearsExp * 5000);
}

function getGrowthRate(industry?: string): number {
    const rates: { [key: string]: number } = {
        'Technology': 0.07,
        'Finance': 0.06,
        'Consulting': 0.065,
        'Healthcare': 0.04,
        'Engineering': 0.05,
        'Default': 0.045,
    };

    return (industry && rates[industry]) || rates.Default;
}

function calculateBreakEven(
    investment: number,
    newSalary: number,
    oldSalary: number,
    growthRate: number
): number {
    let years = 0;
    let cumulative = 0;

    while (cumulative < investment && years < 50) {
        const yearSalary = newSalary * Math.pow(1 + growthRate, years);
        const oldYearSalary = oldSalary * Math.pow(1.03, years);
        cumulative += yearSalary - oldYearSalary;
        years++;
    }

    return years;
}

function calculateNPV(
    investment: number,
    startingSalary: number,
    currentSalary: number,
    growthRate: number,
    discountRate: number,
    years: number
): number {
    let npv = -investment;

    for (let year = 1; year <= years; year++) {
        const newJobSalary = startingSalary * Math.pow(1 + growthRate, year - 1);
        const oldJobSalary = currentSalary * Math.pow(1.03, year - 1);
        const cashFlow = newJobSalary - oldJobSalary;
        npv += cashFlow / Math.pow(1 + discountRate, year);
    }

    return npv;
}

function calculateLifetimeEarnings(
    startingSalary: number,
    growthRate: number,
    years: number
): number {
    let total = 0;
    for (let i = 0; i < years; i++) {
        total += startingSalary * Math.pow(1 + growthRate, i);
    }
    return total;
}
