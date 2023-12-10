import { useCallback, useState } from "react";
import {
  SideBarLinkList,
  SideBarTitleContainer,
} from "../../components/side-bar/side-bar/SideBar.styles";
import { NavItem } from "./nav-item/NavItem";
import { useIdleTimer } from "react-idle-timer";
import SideBar from "app/components/side-bar/side-bar/SideBar";

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
export function Navigation() {
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
}

const useNavigationBarVisibility = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const toggleSideBarVisibility = useCallback((visibility: boolean) => {
    setIsSidebarVisible(visibility);
  }, []);

  useIdleTimer({
    timeout: IDLE_TIMER_TIMEOUT,
    onAction: () => toggleSideBarVisibility(true),
    onActive: () => toggleSideBarVisibility(true),
    onIdle: () => toggleSideBarVisibility(false),
  });

  return isSidebarVisible;
};
