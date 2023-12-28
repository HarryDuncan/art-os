import styled from "styled-components";
import { DrawComponent } from "../DrawComponent.styles";

const TOP_BAR_HEIGHT = 100;
export const StyledTopBar = styled(DrawComponent)`
  height: ${({ $isVisible }) => ($isVisible ? TOP_BAR_HEIGHT : 0)}px;
  width: 100vw;
  button {
    display: ${({ $isVisible }) => ($isVisible ? "none" : "flex")};
  }
`;
