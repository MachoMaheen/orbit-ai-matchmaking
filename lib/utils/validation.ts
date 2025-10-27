import { z } from 'zod';

export const profileSchema = z.object({
    // Academic
    gmatScore: z.number().min(200).max(800).optional(),
    greVerbal: z.number().min(130).max(170).optional(),
    greQuant: z.number().min(130).max(170).optional(),
    gpa: z.number().min(0).max(4.0),
    undergraduateMajor: z.string().optional(),
    undergraduateSchool: z.string().optional(),

    // Professional
    workExperienceMonths: z.number().min(0).max(600),
    industry: z.string().optional(),
    currentRole: z.string().optional(),
    yearsLeadership: z.number().min(0).optional(),

    // Preferences
    targetProgram: z.string(),
    targetSpecialization: z.string().optional(),
    preferredLocations: z.array(z.string()).optional(),
    budgetMax: z.number().min(0).optional(),

    // Holistic
    extracurriculars: z.string().optional(),
    leadership: z.string().optional(),
    uniqueFactors: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
