import { useMemo } from "react";
import { DEFAULT_THREE_JS } from "./three-js/defaultThreeJS";

export const useDefaultConfig = () =>
  useMemo(
    () => ({
      threeJsParams: DEFAULT_THREE_JS,
      assets: [],
      events: [],
    }),
    []
  );
