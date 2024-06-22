import styled from "styled-components/macro";
import { DrawComponent } from "../DrawerComponent.styles";
import { DRAWER_POSITIONS } from "../drawer.consts";

const TOP_BAR_HEIGHT = 100;

export const StyledHorizontalDraw = styled(DrawComponent)`
  height: ${({ $isVisible }) => ($isVisible ? TOP_BAR_HEIGHT : 0)}px;
  width: 100vw;
  display: flex;
  ${({ $drawerVerticalPosition }) => {
    if ($drawerVerticalPosition) {
      return $drawerVerticalPosition === DRAWER_POSITIONS.TOP
        ? "top : 0px"
        : "bottom : 0px";
    }
  }}
  div {
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  }
`;

export const TopBarItem = styled.div`
  min-width: 40px;
  padding: 1rem;
`;
