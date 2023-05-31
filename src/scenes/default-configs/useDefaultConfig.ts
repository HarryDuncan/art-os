import { useMemo } from "react";
import { DEFAULT_THREE_JS } from "visual/set-up/config/default-configs/defaultThreeJS";

export const useDefaultConfig = () =>
  useMemo(
    () => ({
      threeJsParams: DEFAULT_THREE_JS,
      assets: [],
      events: [],
    }),
    []
  );
