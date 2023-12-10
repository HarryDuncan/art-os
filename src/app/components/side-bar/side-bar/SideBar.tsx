import { ReactNode } from "react";
import { StyledSideBar } from "./SideBar.styles";

interface ISideBarProps {
  children: ReactNode;
  isSidebarVisible: boolean;
}

function SideBar({ children, isSidebarVisible }: ISideBarProps) {
  return (
    <StyledSideBar $isVisible={isSidebarVisible ?? true}>
      {children}
    </StyledSideBar>
  );
}

export default SideBar;
