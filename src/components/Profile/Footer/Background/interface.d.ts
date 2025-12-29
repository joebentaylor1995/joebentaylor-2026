// Exports
// ------------
export interface BackgroundProps {
	imageUrls: string[];
	rows: number;
	itemsPerRow: number;
	rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
	gridRef: React.RefObject<HTMLDivElement | null>;
	introSectionRef: React.RefObject<HTMLDivElement | null>;
	isActive?: boolean;
}

