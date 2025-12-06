// Semantics Types / Interfaces
// ------------
import { Breakpoints } from '@theme/grid/interface';

// Generate grid props from breakpoints
type GridProps = {
    [K in keyof Breakpoints as `$${K}`]?: string;
};

// SECTION • Semantics
// NOTE — The main semantics object structure
export interface SemanticProps extends GridProps {
    children?: React.ReactNode;
    ref?: React.Ref<unknown>;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    $marBottom?: boolean;
    $marTop?: boolean;
    $mar?: boolean;
    $mpad?: boolean;
    $padBottom?: boolean;
    $padTop?: boolean;
    $pad?: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    role?: string;
    tabIndex?: number;
    'aria-label'?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
}