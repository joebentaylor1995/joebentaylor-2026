// Imports
// ------------
import '@/theme/tackl/waffl/WebComponent';
import Client from './Client';
import Server from './Server';
import type { Viewport } from "next";

// Styles
// ------------
import '@css/global.css';

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};



// Component
// ------------
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Client>
            <Server>{children}</Server>
        </Client>
    );
};


// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';
export default RootLayout;
