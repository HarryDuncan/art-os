import styled from "styled-components";
import { DrawComponent } from "../DrawComponent.styles";
import { NavLink } from "app/views/navigation/nav-item/NavItem.styles";

const TOP_BAR_HEIGHT = 100;
export const StyledTopBar = styled(DrawComponent)`
  height: ${({ $isVisible }) => ($isVisible ? TOP_BAR_HEIGHT : 0)}px;
  width: 100vw;
  & ${NavLink} {
    position: relative;
  }
`;
