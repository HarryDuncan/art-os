// @ts-nocheck
import { useEffect, useRef } from "react";

function useLayers(layers = [0]) {
  const ref = useRef<any>();

  useEffect(() => {
    if (ref.current.layers) {
      ref.current.layers.disableAll();
      layers.sort().forEach((layer) => {
        ref.current.layers.enable(layer);
      });
    }
  });

  return ref;
}

export default useLayers;
