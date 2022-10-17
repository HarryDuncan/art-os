import { useMemo } from "react";
import { DEFAULT_THREE_JS } from "./three-js/defaultThreeJS";
import { UPDATE_TIME_UNIFORM } from "./material-functions/updateTimeUniform";
export const useDefaultConfig = () =>
  useMemo(
    () => ({
      threeJsParams: DEFAULT_THREE_JS,
      materialFunctions: UPDATE_TIME_UNIFORM,
      assets: [],
    }),
    []
  );
