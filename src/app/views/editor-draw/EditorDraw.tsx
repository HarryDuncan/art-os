import SideBar from "app/components/draw-components/side-bar/SideBar";
import { useCallback, useEffect, useState } from "react";

export const EditorDraw = () => {
  const isVisible = useSideBarVisibility();
  return (
    <SideBar isSidebarVisible={isVisible}>
      <EditorContent />
    </SideBar>
  );
};

export const EditorContent = () => {
  return <div />;
};

const useSideBarVisibility = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const toggleSideBarVisibility = useCallback((visibility: boolean) => {
    setIsSidebarVisible(visibility);
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key) {
        console.log(event.key);
      }
    },
    [toggleSideBarVisibility]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  return isSidebarVisible;
};
