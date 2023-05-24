import styled from "styled-components";
import { Link } from "react-router-dom";

export const SIDE_BAR_WIDTH = 110;
export const SIDE_BAR_TRANSITION_SPEED = 0.2;
const SIDE_BAR_WIDTH_OPEN = 120;
const SIDE_BAR_LINK_HEIGHT = 65;
const SIDE_BAR_LINK_FONT_SIZE = "1.6rem";
const LOGO_HEIGHT = 40;

export const StyledSideBar = styled.nav<{ $isVisible: boolean }>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.mono.ui02};
  width: ${({ $isVisible }) => ($isVisible ? SIDE_BAR_WIDTH : 0)}px;
  height: 100vh;
  display: flex;
  z-index: 500;
  flex-direction: column;
  transition: width ${SIDE_BAR_TRANSITION_SPEED}s ease-out,
    box-shadow ${SIDE_BAR_TRANSITION_SPEED}s ease-out;
  &:hover {
    width: ${SIDE_BAR_WIDTH_OPEN}px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.4), 1px 0 5px rgba(0, 0, 0, 0.15);
  }
`;

export const SideBarTitleContainer = styled.div`
  flex: 0 0 ${SIDE_BAR_WIDTH};
  width: ${LOGO_HEIGHT}px;
  height: ${LOGO_HEIGHT}px;
  margin: ${({ theme }) => theme.spacing(2)}px;
  position: relative;
  ${StyledSideBar}:hover & {
    width: 100%;
  }
`;

export const LogoLink = styled(Link)`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
`;

// export const Logo = styled(LogoSvg)`
//   fill: white;
//   width: ${LOGO_WIDTH}px;
//   height: ${LOGO_HEIGHT}px;
//   .logo-wording {
//     ${textHiddenStyles}
//   }
//   ${StyledSideBar}:hover & {
//     .logo-wording {
//       ${textVisibleStyles}
//     }
//   }
// `;

export const SideBarIcon = styled.div<{ $isExternal?: boolean }>`
  height: ${SIDE_BAR_LINK_HEIGHT}px;
  min-width: ${SIDE_BAR_WIDTH}px;
  max-width: ${SIDE_BAR_WIDTH}px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export const SideBarLinkList = styled.div`
  flex: 1 1 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  a {
    text-decoration: none;
  }
`;

export const SideBarLinkTitle = styled.span`
  flex: 1 1 1px;
  white-space: nowrap;
  overflow: hidden;
  font-family: ${({ theme }) => theme.font.default.family}
  font-size: ${SIDE_BAR_LINK_FONT_SIZE};
`;
