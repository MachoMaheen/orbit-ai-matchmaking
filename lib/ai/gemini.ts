import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function analyzeEssay(essay: string) {
    const prompt = `You are an expert college admissions essay reviewer. Analyze this college application essay and provide detailed feedback.

Essay:
${essay}

Provide your analysis in the following JSON format:
{
  "clarityScore": <number 0-100>,
  "uniquenessScore": <number 0-100>,
  "emotionalImpact": <number 0-100>,
  "overallScore": <number 0-100>,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "improvements": ["specific improvement 1", "specific improvement 2", "specific improvement 3"],
  "cliches": ["cliche phrase 1", "cliche phrase 2"],
  "summary": "2-3 sentence overall assessment"
}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }

    return {
        clarityScore: 0,
        uniquenessScore: 0,
        emotionalImpact: 0,
        overallScore: 0,
        strengths: [],
        weaknesses: [],
        improvements: [],
        cliches: [],
        summary: response
    };
}

export async function generateInterviewQuestions(university: string, program: string, userProfile: any) {
    const prompt = `Generate 10 likely interview questions for ${university} ${program} program.

Student Profile:
- GPA: ${userProfile.gpa}
- Test Scores: GMAT ${userProfile.gmatScore || 'N/A'}, GRE V${userProfile.greVerbal || 'N/A'}/Q${userProfile.greQuant || 'N/A'}
- Work Experience: ${userProfile.workExperienceMonths} months in ${userProfile.industry}
- Background: ${userProfile.leadership || 'Not provided'}

Provide response in JSON format:
{
  "questions": [
    {
      "question": "Question text",
      "category": "behavioral/technical/situational",
      "tips": "How to approach this question",
      "sampleAnswer": "Example of a strong answer"
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }

    return { questions: [] };
}

export async function chatAboutMatches(userMessage: string, userProfile: any, matches: any[]) {
    const matchSummary = matches.map(m =>
        `${m.university.name}: ${m.category} school, ${m.admissionProbability}% admission chance, $${m.roi.totalInvestment} cost`
    ).join('\n');

    const prompt = `You are an expert college admissions advisor. Answer the student's question about their university matches.

Student Profile:
- GPA: ${userProfile.gpa}
- Test Scores: GMAT ${userProfile.gmatScore || 'N/A'}, GRE V${userProfile.greVerbal || 'N/A'}/Q${userProfile.greQuant || 'N/A'}
- Work Experience: ${userProfile.workExperienceMonths} months in ${userProfile.industry}
- Target Program: ${userProfile.targetProgram}

Matched Universities:
${matchSummary}

Student Question: ${userMessage}

Provide a helpful, specific answer based on their profile and matches. Be conversational and encouraging.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

export async function improveProfileText(fieldName: string, currentText: string, userProfile: any) {
    const prompt = `Help improve this ${fieldName} section for a college application.

Current text: ${currentText || 'Not provided yet'}

Student context:
- Industry: ${userProfile.industry}
- Work Experience: ${userProfile.workExperienceMonths} months
- Target Program: ${userProfile.targetProgram}

Provide 3 improved versions that are:
1. More specific and quantifiable
2. Show impact and leadership
3. Avoid clichés

Return as JSON:
{
  "suggestions": ["version 1", "version 2", "version 3"],
  "tips": ["tip 1", "tip 2"]
}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }

    return { suggestions: [], tips: [] };
}
