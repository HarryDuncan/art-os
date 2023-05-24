import { useAppDispatch, useAppSelector } from "app/redux/store";
import { useCallback } from "react";
import { setSelectedConfigId } from "app/redux/scene-data/actions";

export const useOnCardClick = () => {
  const { configuredScenes } = useAppSelector((state) => state.sceneData);
  const appDispatch = useAppDispatch();

  return useCallback(
    (index) => {
      const selectedPiece = configuredScenes[index];
      appDispatch(setSelectedConfigId(selectedPiece?.configId ?? null));
    },
    [appDispatch, configuredScenes]
  );
};
