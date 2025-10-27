import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import {
    predictGraduationLikelihood,
    predictEmploymentLikelihood,
    predictSalaryRange,
    predictSuccess,
} from '@/lib/algorithms/success-predictor';

export async function POST(request: NextRequest) {
    try {
        const { profile, universityId } = await request.json();

        const university = await prisma.university.findUnique({
            where: { id: universityId },
        });

        if (!university) {
            return NextResponse.json(
                { error: 'University not found' },
                { status: 404 }
            );
        }

        const predictions = {
            graduationLikelihood: predictGraduationLikelihood(profile, university),
            employmentLikelihood: predictEmploymentLikelihood(profile, university),
            salaryRange: predictSalaryRange(profile, university),
            successScore: predictSuccess(profile, university),
        };

        return NextResponse.json({
            success: true,
            predictions,
        });
    } catch (error) {
        console.error('Success prediction API error:', error);
        return NextResponse.json(
            { error: 'Failed to generate predictions' },
            { status: 500 }
        );
    }
}
