import { useMemo } from "react";
import { useParams } from "react-router-dom";

const NON_SCENE_ROUTES = [
  "digital-art",
  "geometry-preprocess",
  "view-object",
  "texture-preprocess",
];
export const useIsSceneActive = () => {
  // @ts-ignore
  const { sceneid } = useParams();
  return useMemo(() => {
    return !NON_SCENE_ROUTES.includes(sceneid) && sceneid !== undefined;
  }, [sceneid]);
};
