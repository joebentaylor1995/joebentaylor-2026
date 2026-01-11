'use client';

// Imports
// ------------
import { createContext, useMemo, useEffect, useState } from 'react';

// Context Definition
// ------------
export const PerformanceContext = createContext({
    isReducedMotion: false,
    isLowPowerMode: false,
    devicePixelRatio: 1,
});

// Component
// ------------
export const PerformanceProvider = ({ children }: { children: React.ReactNode }) => {
    const [performanceState, setPerformanceState] = useState({
        isReducedMotion: false,
        isLowPowerMode: false,
        devicePixelRatio: 1,
    });

    useEffect(() => {
        // Check if we're on client side
        if (typeof window === 'undefined') return;

        // Initial state setup
        const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const updatePerformanceState = () => {
            setPerformanceState({
                isReducedMotion: reducedMotionMediaQuery.matches,
                isLowPowerMode: navigator?.userAgent.includes('Low-Power') || false,
                devicePixelRatio: window.devicePixelRatio,
            });
        };

        // Set initial state
        updatePerformanceState();

        // Listen for changes to reduced motion preference
        // Use modern addEventListener with fallback for older browsers
        if (reducedMotionMediaQuery.addEventListener) {
            reducedMotionMediaQuery.addEventListener('change', updatePerformanceState);
        } else {
            // Fallback for older browsers (deprecated but some may still need it)
            reducedMotionMediaQuery.addListener(updatePerformanceState);
        }

        // Cleanup function
        return () => {
            if (reducedMotionMediaQuery.removeEventListener) {
                reducedMotionMediaQuery.removeEventListener('change', updatePerformanceState);
            } else {
                // Fallback for older browsers
                reducedMotionMediaQuery.removeListener(updatePerformanceState);
            }
        };
    }, []);

    const value = useMemo(() => performanceState, [performanceState]);

    return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
};

// For documentation, see `docs/PerformanceContext.md`
