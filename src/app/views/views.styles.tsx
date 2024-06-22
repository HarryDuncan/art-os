import { SIDE_BAR_WIDTH } from "app/components/drawer/vertical-drawer/VerticalDrawer.styles";
import styled from "styled-components/macro";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  padding-left: ${SIDE_BAR_WIDTH}px;
  position: relative;
`;
