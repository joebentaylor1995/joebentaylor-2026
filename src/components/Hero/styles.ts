// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, getBrand, getGlobal, getEase, getGap } from '@tackl';
import { } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {

}

// Exports
// ------------
export const Jacket = styled(Section)(
  props => css`
      width: 100%;
      height: 100svh;
    `
);


export const Background = styled.div(
  props => css`
    position: fixed;
    inset: 0;
    z-index: -1;
  `
);