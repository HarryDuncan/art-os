import { ReactNode } from "react";
import { StyledSideBar } from "./SideBar.styles";
import { DRAWER_SIDES } from "./sideBar.consts";

interface ISideBarProps {
  children: ReactNode;
  isSidebarVisible: boolean;
  drawerSide?: string;
}

function SideBar({
  children,
  isSidebarVisible,
  drawerSide = DRAWER_SIDES.LEFT,
}: ISideBarProps) {
  return (
    <StyledSideBar $drawerSide={drawerSide} $isVisible={isSidebarVisible}>
      {children}
    </StyledSideBar>
  );
}

export default SideBar;
