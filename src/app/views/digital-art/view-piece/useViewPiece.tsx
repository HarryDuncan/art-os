import React, { useMemo } from "react";
import * as VisualComponents from "visual/visual-components";
import { useGalleryScenes } from "scenes/useGalleryScenes";
import { DigitalPiece } from "../context/Context";
import { useAppDispatch } from "app/redux/store";
import { setVisualData } from "app/redux/visual/actions";

export const useViewPiece = (
  digitalPieces: DigitalPiece[],
  index: number | null
) => {
  const getGalleryScene = useGalleryScenes();
  const dispatch = useAppDispatch();
  return useMemo(() => {
    if (index === null) return { component: null };
    const { sceneId, title, componentId } = digitalPieces[index];
    const sceneProps = getGalleryScene(sceneId);
    const SceneComponent = VisualComponents[componentId] as React.ElementType;
    dispatch(setVisualData(sceneProps));
    if (!SceneComponent) {
      alert(`invalid scene component "${componentId}" - check component id`);
      return {
        component: null,
        title,
      };
    }
    return {
      component: <SceneComponent {...sceneProps} />,
      title,
    };
  }, [index]);
};
