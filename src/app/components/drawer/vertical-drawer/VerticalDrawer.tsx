import { ReactNode } from "react";
import { StyledSideBar } from "./VerticalDrawer.styles";
import { DRAWER_POSITIONS } from "../drawer.consts";

interface ISideBarProps {
  children: ReactNode;
  isSidebarVisible: boolean;
  drawerSide?: string;
  width?: number;
}

function SideBar({
  children,
  isSidebarVisible,
  width,
  drawerSide = DRAWER_POSITIONS.LEFT,
}: ISideBarProps) {
  return (
    <StyledSideBar
      $drawerHorizontalPosition={drawerSide}
      $isVisible={isSidebarVisible}
      $width={width}
    >
      {children}
    </StyledSideBar>
  );
}

export default SideBar;
