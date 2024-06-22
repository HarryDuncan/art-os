import { ReactNode } from "react";
import { StyledSideBar } from "./VerticalDrawer.styles";
import { DRAWER_POSITIONS } from "../drawer.consts";

interface ISideBarProps {
  children: ReactNode;
  isSidebarVisible: boolean;
  drawerSide?: string;
}

function SideBar({
  children,
  isSidebarVisible,
  drawerSide = DRAWER_POSITIONS.LEFT,
}: ISideBarProps) {
  return (
    <StyledSideBar
      $drawerHorizontalPosition={drawerSide}
      $isVisible={isSidebarVisible}
    >
      {children}
    </StyledSideBar>
  );
}

export default SideBar;
