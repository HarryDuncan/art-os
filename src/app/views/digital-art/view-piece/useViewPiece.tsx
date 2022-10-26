import React, { useMemo } from "react";
import * as VisualComponents from "visual/visual-components";
import { useGalleryScenes } from "scenes/gallery-scenes/useGalleryScenes";
import { DigitalPiece } from "../context/Context";

export const useViewPiece = (
  digitalPieces: DigitalPiece[],
  index: number | null
) => {
  if (index === null) return { component: null };
  const { sceneId, title, componentId } = digitalPieces[index];
  const getGalleryScene = useGalleryScenes();
  const currentSceneParams = useMemo(() => getGalleryScene(sceneId), [
    sceneId,
    getGalleryScene,
  ]);
  const SceneComponent = VisualComponents[componentId] as React.ElementType;
  if (!SceneComponent) {
    alert(`invalid scene component "${componentId}" - check component id`);
    return {
      component: <></>,
      title,
    };
  }
  return {
    component: <SceneComponent params={currentSceneParams} />,
    title,
  };
};
