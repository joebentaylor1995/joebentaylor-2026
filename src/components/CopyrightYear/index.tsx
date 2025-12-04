'use client';

// Imports
// ------------
import { useState, useEffect } from 'react';

// Component
// ------------
const CopyrightYear = ({ }) => {
    // States
    const [currentYear, setCurrentYear] = useState<number | null>(2026);

    // OnMount
    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);
    
    
    return currentYear;
}

// Exports
// ------------
CopyrightYear.displayName = 'CopyrightYear';
export default CopyrightYear;