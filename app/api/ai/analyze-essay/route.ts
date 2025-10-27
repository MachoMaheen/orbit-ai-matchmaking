import { NextRequest, NextResponse } from 'next/server';
import { analyzeEssay } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
    try {
        const { essay } = await req.json();

        if (!essay || essay.trim().length < 50) {
            return NextResponse.json(
                { error: 'Essay must be at least 50 characters long' },
                { status: 400 }
            );
        }

        const analysis = await analyzeEssay(essay);

        return NextResponse.json({
            success: true,
            analysis,
        });
    } catch (error) {
        console.error('Essay analysis error:', error);
        return NextResponse.json(
            { error: 'Failed to analyze essay' },
            { status: 500 }
        );
    }
}
