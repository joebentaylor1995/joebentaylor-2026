// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, getGlobal, getEase, getGap } from '@tackl';
import { bodyL } from '@tackl/type';
import Link from 'next/link';

// Exports
// ------------
export const Jacket = styled.ul(
	props => css`
		/*  */
	`
);

export const Social = styled.li(
	props => css`
		/*  */
		border-bottom: 1px solid ${getGlobal('white', 20)};
	`
);

export const SocialLink = styled(Link)<{ $isResume?: boolean }>(
	({ $isResume }) => css`
		--speed: 0.35s;
		--ease: ${getEase('bezzy2')};

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: ${getGap('s')};
		padding-block: ${getGap('s')};

		@media (hover: hover) and (pointer: fine) {
			cursor: pointer;

			&:hover .letter {
				animation: moveSocialUp var(--speed) var(--ease) both;
			}

			&:not(:hover) .letter {
				animation: moveSocialDown var(--speed) var(--ease) both;
			}

			&:hover svg {
				opacity: 0.4;
			}
		}

		svg {
			transition: opacity 0.5s ${getEase('bezzy2')};
		}

		> span {
			${bodyL}
			display: block;
			position: relative;
			overflow: clip;

			> span {
				display: block;
			}

			@keyframes moveSocialUp {
				from {
					transform: translateY(0%);
				}
				to {
					transform: translateY(-100%);
				}
			}

			@keyframes moveSocialDown {
				from {
					transform: translateY(-100%);
				}
				to {
					transform: translateY(0%);
				}
			}

			.letter {
				--speed: 0.35s;
				--ease: ${getEase('bezzy2')};

				display: inline-block;
				vertical-align: middle;
				color: ${getGlobal('white')};
				transition: transform var(--speed) var(--ease);

				${[...Array(12)]
					.map(
						(_, i) =>
							`&:nth-child(${i + 1}) {
							animation-delay: ${i * 0.01}s;
						}`
					)
					.join('\n')}

				${bp.l`
                    text-shadow: 0 1.1em 0 ${getGlobal('white', 60)};
                `}
			}
		}

		svg {
			--size: 1.8rem;

			width: var(--size);
			height: var(--size);
			fill: ${$isResume ? 'none' : getGlobal('white')};
			stroke: ${$isResume ? getGlobal('white') : 'none'};
		}
	`
);
