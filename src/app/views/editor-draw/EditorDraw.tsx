import SideBar from "app/components/draw-components/side-bar/SideBar";
import { DRAWER_SIDES } from "app/components/draw-components/side-bar/sideBar.consts";
import { KEYS } from "interaction/interactions.consts";
import { useKeyListener } from "interaction/internal/useSetUpKeyListener";
import { useCallback, useState } from "react";

export const EditorDraw = () => {
  const isVisible = useSideBarVisibility();

  return (
    <SideBar isSidebarVisible={isVisible} drawerSide={DRAWER_SIDES.RIGHT}>
      <EditorContent />
    </SideBar>
  );
};

const EditorContent = () => {
  return <div />;
};

const useSideBarVisibility = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const toggleSideBarVisibility = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, [setIsSidebarVisible]);

  useKeyListener(KEYS.F1, toggleSideBarVisibility);
  return isSidebarVisible;
};
