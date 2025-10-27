'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@stackframe/stack';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2, GraduationCap, Briefcase, MapPin, DollarSign } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function MatchPage() {
    const user = useUser({ or: 'redirect' }); // Redirect if not authenticated
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        gpa: 3.5,
        gmatScore: 700,
        greVerbal: 0,
        greQuant: 0,
        workExperienceMonths: 48,
        targetProgram: 'MBA',
        industry: 'Technology',
        budgetMax: 150000,
        preferredLocations: [] as string[],
        leadership: '',
        extracurriculars: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                sessionStorage.setItem('matchResults', JSON.stringify(result));
                sessionStorage.setItem('userProfile', JSON.stringify(formData));
                toast.success(`Found ${result.matchCount} matching universities!`);
                router.push('/results');
            } else {
                toast.error(result.error || 'Failed to find matches');
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
            <div className="container mx-auto max-w-3xl px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Find Your Perfect University Match
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Answer a few questions and we'll match you with universities where you'll succeed
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Academic Information */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold">Academic Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">GPA (0.0 - 4.0)</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="4"
                                    value={formData.gpa}
                                    onChange={(e) => updateField('gpa', parseFloat(e.target.value))}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">GMAT Score (Optional)</label>
                                <Input
                                    type="number"
                                    min="200"
                                    max="800"
                                    value={formData.gmatScore === 0 ? '' : formData.gmatScore}
                                    onChange={(e) => updateField('gmatScore', e.target.value ? parseInt(e.target.value) : 0)}
                                    placeholder="e.g., 700"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">GRE Verbal (Optional)</label>
                                <Input
                                    type="number"
                                    min="130"
                                    max="170"
                                    value={formData.greVerbal === 0 ? '' : formData.greVerbal}
                                    onChange={(e) => updateField('greVerbal', e.target.value ? parseInt(e.target.value) : 0)}
                                    placeholder="e.g., 160"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">GRE Quant (Optional)</label>
                                <Input
                                    type="number"
                                    min="130"
                                    max="170"
                                    value={formData.greQuant === 0 ? '' : formData.greQuant}
                                    onChange={(e) => updateField('greQuant', e.target.value ? parseInt(e.target.value) : 0)}
                                    placeholder="e.g., 165"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Work Experience */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Briefcase className="w-5 h-5 text-green-600" />
                            <h2 className="text-xl font-semibold">Work Experience</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Work Experience (months)</label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={formData.workExperienceMonths}
                                    onChange={(e) => updateField('workExperienceMonths', parseInt(e.target.value))}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {Math.floor(formData.workExperienceMonths / 12)} years, {formData.workExperienceMonths % 12} months
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Industry</label>
                                <select
                                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    value={formData.industry}
                                    onChange={(e) => updateField('industry', e.target.value)}
                                >
                                    <option value="Technology">Technology</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Consulting">Consulting</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    {/* Preferences */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-purple-600" />
                            <h2 className="text-xl font-semibold">Preferences</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Target Program</label>
                                <select
                                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    value={formData.targetProgram}
                                    onChange={(e) => updateField('targetProgram', e.target.value)}
                                    required
                                >
                                    <option value="MBA">MBA</option>
                                    <option value="MS">MS</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Budget (USD)</label>
                                <Input
                                    type="number"
                                    min="0"
                                    step="1000"
                                    value={formData.budgetMax === 0 ? '' : formData.budgetMax}
                                    onChange={(e) => updateField('budgetMax', e.target.value ? parseInt(e.target.value) : 0)}
                                    placeholder="e.g., 150000"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Preferred Locations (comma-separated)</label>
                            <Input
                                type="text"
                                placeholder="e.g., California, Massachusetts, New York"
                                onChange={(e) => updateField('preferredLocations', e.target.value.split(',').map(s => s.trim()))}
                            />
                        </div>
                    </Card>

                    {/* Holistic Factors */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="w-5 h-5 text-orange-600" />
                            <h2 className="text-xl font-semibold">Holistic Factors (Optional)</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Leadership Experience</label>
                                <textarea
                                    className="w-full min-h-[80px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    placeholder="Describe your leadership roles and impact..."
                                    value={formData.leadership}
                                    onChange={(e) => updateField('leadership', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Extracurricular Activities</label>
                                <textarea
                                    className="w-full min-h-[80px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    placeholder="Describe your extracurricular activities..."
                                    value={formData.extracurriculars}
                                    onChange={(e) => updateField('extracurriculars', e.target.value)}
                                />
                            </div>
                        </div>
                    </Card>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Finding Your Matches...
                            </>
                        ) : (
                            'Find My Matches'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
