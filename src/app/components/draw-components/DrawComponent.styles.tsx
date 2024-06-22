import styled from "styled-components/macro";

export const SIDE_BAR_TRANSITION_SPEED = 0.2;

export const DrawComponent = styled.nav<{
  $isVisible: boolean;
  $drawerSide: string;
}>`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.mono.darkText};
  z-index: 500;
  display: flex;

  transition: width ${SIDE_BAR_TRANSITION_SPEED}s ease-out,
    box-shadow ${SIDE_BAR_TRANSITION_SPEED}s ease-out;
  div {
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  }
`;
