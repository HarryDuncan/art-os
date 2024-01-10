import { SIDE_BAR_TRANSITION_SPEED } from "app/components/draw-components/DrawComponent.styles";
import styled, { css } from "styled-components/macro";

const BORDER_WIDTH = 3;

const activeStyles = css`
  background-color: ${({ theme }) => theme.colors.mono.lightGray};
  &::before {
    transform: translateX(0);
  }
`;

const hoverStyles = css`
  background-color: ${({ theme }) => theme.colors.mono.lightGray};
`;

const disabledStyles = css`
  cursor: not-allowed;

  &&,
  &&:hover {
    color: ${({ theme }) => theme.colors.mono.lightGray};
  }

  path {
    fill: ${({ theme }) => theme.colors.mono.background};
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
    background-color: ${({ theme }) => theme.colors.mono.background};
    transform: translateX(-${BORDER_WIDTH}px);
    transition: transform ${SIDE_BAR_TRANSITION_SPEED}s ease;
  }
`;

export const NavLink = styled.a<{
  $isActive?: boolean;
  $isDisabled?: boolean;
}>`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  font-family: "HarryDuncan";
  font-size: 1.5rem;
  padding-left: 1rem;
  && {
    color: ${({ theme }) => theme.colors.mono.lightText};
  }

  &&:hover {
    color: ${({ theme }) => theme.colors.mono.darkText};
    ${({ $isActive, $isDisabled }) => !$isActive && !$isDisabled && hoverStyles}
  }

  ${borderStyles}

  ${({ $isActive }) => $isActive && activeStyles}

  ${({ $isDisabled }) => $isDisabled && disabledStyles}

  & + & {
    margin-top: 1px;
  }
`;
