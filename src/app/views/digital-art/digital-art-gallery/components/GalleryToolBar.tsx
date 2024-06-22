import { HorizontalDraw } from "app/components/drawer/horizontal-drawer/HorizontalDrawer";
import { Dropdown } from "app/components/inputs/dropdown/Dropdown";
import { setWorkspaceId } from "app/redux/scene-data/actions";
import { useAppDispatch } from "app/redux/store";
import { KEYS } from "interaction/interactions.consts";
import { useCallback } from "react";
import { GalleryToolbarContainer } from "./GalleryToolBar.styles";
import { IStackTokens, Stack } from "@fluentui/react/lib/Stack";

const stackTokens: IStackTokens = { childrenGap: 20 };

export const GalleryToolBar = () => {
  return (
    <HorizontalDraw keyCode={KEYS.F1}>
      <GalleryToolbarContainer>
        <SelectWorkspace />
      </GalleryToolbarContainer>
    </HorizontalDraw>
  );
};

const WORKSPACE_OPTIONS = [
  { key: "barba", text: "Barba" },
  { key: "hjd-art", text: "HJD Experiments" },
  { key: "hjd-website", text: "HJD Production" },
  { key: "blackout", text: "Blackout" },
  { key: "others", text: "Others" },
];
const SelectWorkspace = () => {
  const dispatch = useAppDispatch();

  const onSelect = useCallback(
    (workspaceKey) => {
      dispatch(setWorkspaceId(workspaceKey));
    },
    [dispatch]
  );
  return (
    <Stack tokens={stackTokens}>
      <Dropdown options={WORKSPACE_OPTIONS} onSelect={onSelect} />
    </Stack>
  );
};
