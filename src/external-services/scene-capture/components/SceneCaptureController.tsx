import { useCallback, useState } from "react";
import { RunCaptureRequest } from "../protos/sceneCapture_pb";
import {
  SCENE_CAPTURE_SERVICE,
  SCENE_CAPTURE_STATES,
} from "../sceneCapture.constants";
import { useSceneCapture } from "../useSceneCapture";

export const SceneCaptureController = () => {
  useSceneCapture();
  const { screenCaptureState, toggleSceneRecording } = useStartStop();
  return (
    <div>
      <button onClick={toggleSceneRecording}>
        Capture Scene : {screenCaptureState}
      </button>
    </div>
  );
};

const useStartStop = () => {
  const [screenCaptureState, setSceneCaptureState] = useState<string>(
    SCENE_CAPTURE_STATES.STOPPED
  );

  const startCapture = useCallback(() => {
    const request = new RunCaptureRequest();
    const client = SCENE_CAPTURE_SERVICE;
    client.runCapture(request);
  }, []);

  const stopCapture = useCallback(() => {}, []);
  const toggleSceneRecording = useCallback(() => {
    if (screenCaptureState === SCENE_CAPTURE_STATES.STOPPED) {
      setSceneCaptureState(SCENE_CAPTURE_STATES.RECORDING);
      startCapture();
    } else {
      setSceneCaptureState(SCENE_CAPTURE_STATES.STOPPED);
      stopCapture;
    }
  }, [screenCaptureState, startCapture, stopCapture]);
  return { screenCaptureState, toggleSceneRecording };
};
