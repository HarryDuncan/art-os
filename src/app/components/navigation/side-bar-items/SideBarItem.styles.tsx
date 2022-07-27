import styled, { css } from 'styled-components/macro';
import { SIDE_BAR_TRANSITION_SPEED } from '../side-bar/SideBar.styles';

const BORDER_WIDTH = 3;

const activeStyles = css`
  background-color: ${({ theme }) => theme.colors.mono.ui03};
  &::before {
    transform: translateX(0);
  }
`;

const hoverStyles = css`
  background-color: ${({ theme }) => theme.colors.mono.ui03};
`;

const disabledStyles = css`
  cursor: not-allowed;

  &&,
  &&:hover {
    color: ${({ theme }) => theme.colors.mono.text02};
  }

  path {
    fill: ${({ theme }) => theme.colors.mono.text02};
  }
`;

const borderStyles = css`
  &::before {
    content: "";
    width: ${BORDER_WIDTH}px;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.mono.text01};
    transform: translateX(-${BORDER_WIDTH}px);
    transition: transform ${SIDE_BAR_TRANSITION_SPEED}s ease;
  }
`;

export const SideBarLink = styled.a<{
  $isActive?: boolean;
  $isDisabled?: boolean;
}>`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  font-family: "HarryDuncan";
  font-size: 2rem;

  && {
    color: ${({ theme }) => theme.colors.mono.text01};
  }

  &&:hover {
    color: ${({ theme }) => theme.colors.mono.text01};
    ${({ $isActive, $isDisabled }) => !$isActive && !$isDisabled && hoverStyles}
  }

  ${borderStyles}

  ${({ $isActive }) => $isActive && activeStyles}

  ${({ $isDisabled }) => $isDisabled && disabledStyles}

  & + & {
    margin-top: 1px;
  }
`;
