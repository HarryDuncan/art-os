import { StyledHorizontalDraw } from "app/components/drawer/horizontal-drawer/HorizontalDrawer.styles";
import { useKeyListener } from "interaction/internal/useSetUpKeyListener";
import { ReactNode, useCallback, useState } from "react";
import { DRAWER_POSITIONS } from "../drawer.consts";

interface HorizontalDrawProps {
  keyCode: string;
  children: ReactNode;
  verticalPosition?: string;
}

export const HorizontalDraw = ({
  keyCode,
  children,
  verticalPosition = DRAWER_POSITIONS.TOP,
}: HorizontalDrawProps) => {
  const isVisible = useIsHorizontalDrawVisible(keyCode);
  return (
    <StyledHorizontalDraw
      $isVisible={isVisible}
      $drawerVerticalPosition={verticalPosition}
    >
      {children}
    </StyledHorizontalDraw>
  );
};

const useIsHorizontalDrawVisible = (toolbarKeyCode: string) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const onTabPress = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, [setIsVisible]);
  useKeyListener(toolbarKeyCode, onTabPress);
  return isVisible;
};
