'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

const TabsContext = React.createContext<{
    value: string;
    onValueChange: (value: string) => void;
}>({ value: '', onValueChange: () => { } });

export function Tabs({
    defaultValue,
    value: controlledValue,
    onValueChange,
    children,
    className,
}: {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}) {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = (newValue: string) => {
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    };

    return (
        <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500',
                className
            )}
        >
            {children}
        </div>
    );
}

export function TabsTrigger({
    value,
    children,
    className,
}: {
    value: string;
    children: React.ReactNode;
    className?: string;
}) {
    const context = React.useContext(TabsContext);

    return (
        <button
            onClick={() => context.onValueChange(value)}
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                context.value === value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900',
                className
            )}
        >
            {children}
        </button>
    );
}

export function TabsContent({
    value,
    children,
    className,
}: {
    value: string;
    children: React.ReactNode;
    className?: string;
}) {
    const context = React.useContext(TabsContext);

    if (context.value !== value) return null;

    return <div className={className}>{children}</div>;
}
