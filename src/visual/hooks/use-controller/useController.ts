import { useState } from "react";
import { IController } from "./types";

export const useController = () => {
  const initialController = { isInitialized: false, isRunningThread: false };
  const [controller, updateController] = useState<IController>(
    initialController
  );
  return { controller, updateController };
};
