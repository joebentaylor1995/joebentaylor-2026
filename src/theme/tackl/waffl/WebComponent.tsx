'use client';

import React, {
	PropsWithChildren,
	HTMLAttributes,
	useEffect,
	useState,
} from 'react';

// Register the custom element only on the client
if (typeof window !== 'undefined' && !customElements.get('waffl-grid')) {
	class WafflGridElement extends window.HTMLElement {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			if (this.shadowRoot) {
				this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: grid;
                            contain: layout;
                            margin-inline: auto;
                        }
                    </style>
                    <slot></slot>
                `;
			}
		}
	}
	customElements.define('waffl-grid', WafflGridElement);
}

// React wrapper component
type GridProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

const Grid: React.FC<GridProps> = ({ children, ...props }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// On server or before mount, render as a regular div with the same styles
	// This prevents hydration mismatch
	if (!isMounted || typeof window === 'undefined') {
		return React.createElement(
			'div',
			{
				...props,
				style: {
					...(props.style as React.CSSProperties),
					display: 'grid',
					contain: 'layout',
					marginInline: 'auto',
				},
			},
			children
		);
	}

	// Once mounted on client, use the custom element
	return React.createElement('waffl-grid', props, children);
};

export default Grid;
