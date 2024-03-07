import styled from "styled-components/macro";
import { DrawComponent } from "../DrawComponent.styles";

const TOP_BAR_HEIGHT = 100;
export const StyledTopBar = styled(DrawComponent)`
  height: ${({ $isVisible }) => ($isVisible ? TOP_BAR_HEIGHT : 0)}px;
  width: 100vw;
  display: flex;
  div {
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  }
`;

export const TopBarItem = styled.div`
  min-width: 40px;
  padding: 1rem;
`;
