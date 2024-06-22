import { DRAWER_POSITIONS } from "app/components/drawer/drawer.consts";
import SideBar from "app/components/drawer/vertical-drawer/VerticalDrawer";
import { KEYS } from "interaction/interactions.consts";
import { useKeyListener } from "interaction/internal/useSetUpKeyListener";
import { useCallback, useState } from "react";

export const SceneEditor = () => {
  const isVisible = useSideBarVisibility();

  return (
    <SideBar isSidebarVisible={isVisible} drawerSide={DRAWER_POSITIONS.RIGHT}>
      <EditorContent />
    </SideBar>
  );
};

const EditorContent = () => {
  return <div />;
};

const useSideBarVisibility = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const toggleSideBarVisibility = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, [setIsSidebarVisible]);

  useKeyListener(KEYS.F1, toggleSideBarVisibility);
  return isSidebarVisible;
};
