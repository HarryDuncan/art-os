import { Stack } from "@fluentui/react";
import { CameraControls } from "./CameraControls";
import { useState } from "react";

export const EditorComponent = () => {
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: -1, z: 50 });
  const [zoom, setZoom] = useState<number>(50);
  return (
    <Stack>
      <CameraControls
        cameraPosition={cameraPosition}
        setCameraPosition={setCameraPosition}
        zoom={zoom}
        setZoom={setZoom}
      />
    </Stack>
  );
};

const MeshControls = () => {};
