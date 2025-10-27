import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const programType = searchParams.get('programType');

        const where = programType ? { programType } : {};

        const universities = await prisma.university.findMany({
            where,
            include: {
                specializations: true,
                scholarships: true,
            },
            orderBy: {
                overallRanking: 'asc',
            },
        });

        return NextResponse.json({
            success: true,
            count: universities.length,
            universities,
        });
    } catch (error) {
        console.error('Universities API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch universities' },
            { status: 500 }
        );
    }
}
