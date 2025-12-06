// Imports
// ------------
import type { Video } from 'react-datocms';

// Exports
// ------------
export interface VideoModalProps {
    modalRef: React.RefObject<HTMLElement | null>;
    modalContentRef: React.RefObject<HTMLDivElement | null>;
    handleCloseModal: () => void;
    video: Video | undefined;
    
}