import { useCallback } from "react";
import { PlaneGeometry } from "three";
import { InteractiveParam } from "visual/components/interactive-material/types";
import { Asset } from "visual/hooks/use-assets/types";

export const useFormatWebGL = (
  initializedAssets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: InteractiveParam
) => {
  const { uniforms, shaders } = materialParams;
  const formatUniformsAndGeometry = useCallback(
    (assets: Asset[], uniforms): { geometry; uniforms; shaders } => {
      const geometry = new PlaneGeometry(2, 2);
      return { geometry, uniforms, shaders };
    },
    [shaders]
  );
  return formatUniformsAndGeometry(initializedAssets, uniforms);
};
