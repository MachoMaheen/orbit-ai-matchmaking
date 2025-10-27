import { NextRequest, NextResponse } from 'next/server';
import { generateInterviewQuestions } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
    try {
        const { university, program, userProfile } = await req.json();

        if (!university || !program) {
            return NextResponse.json(
                { error: 'University and program are required' },
                { status: 400 }
            );
        }

        const questions = await generateInterviewQuestions(university, program, userProfile);

        return NextResponse.json({
            success: true,
            questions,
        });
    } catch (error) {
        console.error('Interview prep error:', error);
        return NextResponse.json(
            { error: 'Failed to generate interview questions' },
            { status: 500 }
        );
    }
}
