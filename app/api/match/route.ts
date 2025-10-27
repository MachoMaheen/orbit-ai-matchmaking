import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { rankUniversities } from '@/lib/algorithms/matching-algorithm';
import { matchScholarships } from '@/lib/algorithms/scholarship-matcher';
import { performGapAnalysis } from '@/lib/algorithms/gap-analyzer';

export async function POST(request: NextRequest) {
    try {
        const profile = await request.json();

        // Validate profile
        if (!profile.gpa || !profile.targetProgram) {
            return NextResponse.json(
                { error: 'Missing required fields: gpa, targetProgram' },
                { status: 400 }
            );
        }

        // Fetch universities
        const universities = await prisma.university.findMany({
            where: { programType: profile.targetProgram },
            include: { specializations: true, scholarships: true },
        });

        if (universities.length === 0) {
            return NextResponse.json(
                { error: 'No universities found for selected program' },
                { status: 404 }
            );
        }

        // Run matching algorithm
        const matches = await rankUniversities(profile, universities);

        // Enrich with additional data
        const enrichedMatches = matches.map(match => {
            const scholarships = matchScholarships(profile, match.university.scholarships || []);
            const gapAnalysis = performGapAnalysis(profile, match.university);

            return {
                ...match,
                scholarships: scholarships.slice(0, 5),
                gapAnalysis,
            };
        });

        return NextResponse.json({
            success: true,
            matchCount: enrichedMatches.length,
            matches: enrichedMatches,
        });

    } catch (error) {
        console.error('Match API error:', error);
        return NextResponse.json(
            { error: 'Failed to generate matches' },
            { status: 500 }
        );
    }
}
