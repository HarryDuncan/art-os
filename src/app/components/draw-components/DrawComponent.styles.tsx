import styled from "styled-components";

export const SIDE_BAR_TRANSITION_SPEED = 0.2;

export const DrawComponent = styled.nav<{ $isVisible: boolean }>`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.mono.ui02};
  z-index: 500;
  display: flex;
  transition: width ${SIDE_BAR_TRANSITION_SPEED}s ease-out,
    box-shadow ${SIDE_BAR_TRANSITION_SPEED}s ease-out;
`;
