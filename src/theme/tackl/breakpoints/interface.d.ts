// Breakpoints Types / Interfaces
// ------------
import { theme } from '@theme';
import { css } from 'styled-components';


// SECTION • Breakpoints
// NOTE — The main breakpoints object structure
export type Sizes = typeof theme.grid.breakpoints;
export type BreakpointKey = keyof Sizes;
export type MediaQueries = Record<BreakpointKey, string>;
export type BreakpointFunction = (...args: Parameters<typeof css>) => ReturnType<typeof css>;
export type BreakpointMap = Record<BreakpointKey, BreakpointFunction>;