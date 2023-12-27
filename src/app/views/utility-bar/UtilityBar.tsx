import { StyledTopBar } from "app/components/draw-components/top-bar/TopBar.styles";
import { KEYS } from "interaction/interactions.consts";
import { useKeyListener } from "interaction/internal/useSetUpKeyListener";
import { useCallback, useMemo, useState } from "react";
import { NavItem } from "../navigation/nav-item/NavItem";

const BACK = {
  key: "digital-art",
  title: "Back",
  link: "/digital-art",
};

export const UtilityBar = () => {
  const isUtilityBarVisible = useIsUtilityBarVisible();
  return (
    <StyledTopBar $isVisible={isUtilityBarVisible}>
      <NavItem key={BACK.key} title={BACK.title} link={BACK.link} />
    </StyledTopBar>
  );
};

const useIsUtilityBarVisible = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const onTabPress = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible, setIsVisible]);

  useKeyListener(KEYS.TAB, onTabPress);

  return useMemo(() => isVisible, [isVisible]);
};
