import { useMemo } from 'react';
import { Scene } from 'three';

export const useScene = () => useMemo(() => {
  const scene = new Scene();
  return scene;
}, []);
