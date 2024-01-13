import { useAppDispatch } from "app/redux/store";
import { getResponseValue } from "utils/grpc/getResponseValue";
import { mapResponseToObject } from "utils/grpc/mapResponseToObject";
import { setInitialization } from "app/redux/interaction/actions";
import { useEffect } from "react";
import { SCENE_CAPTURE_SERVICE } from "./sceneCapture.constants";
import { InitializeSceneCaptureRequest } from "./protos/sceneCapture_pb";

const initializeResponseObj = {
  isInitialized: false,
};
export const useSceneCapture = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const client = SCENE_CAPTURE_SERVICE;
    const request = new InitializeSceneCaptureRequest();
    try {
      client.initializeSceneCapture(request, {}, (err, response) => {
        if (err) {
          console.error(err);
        }
        if (response) {
          const values = getResponseValue(response);
          const formatted = mapResponseToObject(values, initializeResponseObj);
          dispatch(setInitialization(formatted as { isInitialized: boolean }));
        }
      });
    } catch {
      console.warn("scene capture not connected");
    }
  }, []);
};
