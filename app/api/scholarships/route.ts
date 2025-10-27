import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { matchScholarships, calculateScholarshipPotential } from '@/lib/algorithms/scholarship-matcher';

export async function POST(request: NextRequest) {
    try {
        const { profile } = await request.json();

        const scholarships = await prisma.scholarship.findMany({
            where: {
                deadline: { gte: new Date() },
            },
            include: {
                university: true,
            },
        });

        const matches = matchScholarships(profile, scholarships);
        const potentialFunding = calculateScholarshipPotential(matches);

        return NextResponse.json({
            success: true,
            matches,
            potentialFunding,
        });
    } catch (error) {
        console.error('Scholarship API error:', error);
        return NextResponse.json(
            { error: 'Failed to match scholarships' },
            { status: 500 }
        );
    }
}
