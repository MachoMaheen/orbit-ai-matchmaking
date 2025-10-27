import { NextRequest, NextResponse } from 'next/server';
import { chatAboutMatches } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
    try {
        const { message, userProfile, matches } = await req.json();

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        const response = await chatAboutMatches(message, userProfile, matches);

        return NextResponse.json({
            success: true,
            response,
        });
    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json(
            { error: 'Failed to process chat message' },
            { status: 500 }
        );
    }
}
