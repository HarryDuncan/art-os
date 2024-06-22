import { SIDE_BAR_WIDTH } from "app/components/drawer/vertical-drawer/VerticalDrawer.styles";
import styled from "styled-components/macro";

export const LandingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.mono.darkText};
  padding-left: ${SIDE_BAR_WIDTH};
`;

export const LandingPageTitle = styled.h1`
  position: absolute;
  z-index: 100;
  top: 30%;
  left: 30%;
  font-size: 5rem;
  width: 40%;
  color: white;
`;
