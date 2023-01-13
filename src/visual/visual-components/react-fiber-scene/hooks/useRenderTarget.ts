import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import { CubeCamera } from "three";

function useRenderTarget(settings = {}) {
  const renderTarget = useMemo(() => {
    const renderTargetSettings = {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
    };

    return new THREE.WebGLCubeRenderTarget(1024, {
      ...renderTargetSettings,
      ...settings,
    });
  }, [settings]);

  const cubeCamera = useRef<CubeCamera>();

  useFrame(({ gl, scene }) => {
    if (!cubeCamera.current) return;
    // @ts-ignore
    cubeCamera.current.update(gl, scene);
  });

  return { cubeCamera, renderTarget };
}

export default useRenderTarget;
