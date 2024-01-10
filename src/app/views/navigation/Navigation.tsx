import { useCallback, useMemo, useState } from "react";

import { NavItem } from "./nav-item/NavItem";
import { useIdleTimer } from "react-idle-timer";
import SideBar from "app/components/draw-components/side-bar/SideBar";
import { useIsSceneActive } from "app/hooks/useIsSceneActive";
import {
  SideBarLinkList,
  SideBarTitleContainer,
} from "app/components/draw-components/side-bar/SideBar.styles";

const IDLE_TIMER_TIMEOUT = 5000;
const NAVIGATION_ITEMS = [
  {
    key: "digital-art",
    title: "Scenes",
    link: "digital-art",
  },
  {
    key: "geometry-preprocess",
    title: "Geometry Preprocess",
    link: "geometry-preprocess",
  },
  {
    key: "view-object",
    title: "View Object",
    link: "view-object",
  },
  {
    key: "texture-preprocess",
    title: "Texture Preprocess",
    link: "geometry-preprocess",
  },
  {
    key: "sandbox",
    title: "Sandbox",
    link: "sandbox",
  },
];
export const Navigation = () => {
  const isNavVisible = useNavigationBarVisibility();
  return (
    <SideBar isSidebarVisible={isNavVisible}>
      <SideBarTitleContainer>Art OS</SideBarTitleContainer>
      <SideBarLinkList>
        {NAVIGATION_ITEMS.map((link) => (
          <NavItem {...link} key={link.key} />
        ))}
      </SideBarLinkList>
    </SideBar>
  );
};

const useNavigationBarVisibility = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const toggleSideBarVisibility = useCallback((visibility: boolean) => {
    setIsSidebarVisible(visibility);
  }, []);
  const isSceneActive = useIsSceneActive();
  useIdleTimer({
    timeout: IDLE_TIMER_TIMEOUT,
    onAction: () => toggleSideBarVisibility(true),
    onActive: () => toggleSideBarVisibility(true),
    onIdle: () => toggleSideBarVisibility(false),
  });

  return useMemo(() => (isSceneActive ? false : isSidebarVisible), [
    isSceneActive,
    isSidebarVisible,
  ]);
};
