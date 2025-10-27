'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('App error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="text-center max-w-md mx-auto p-8">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Something went wrong!
                </h2>
                <p className="text-gray-600 mb-6">
                    {error.message || 'An unexpected error occurred'}
                </p>
                <Button
                    onClick={reset}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                >
                    Try again
                </Button>
            </div>
        </div>
    );
}
