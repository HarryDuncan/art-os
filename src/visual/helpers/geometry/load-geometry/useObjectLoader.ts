import { useCallback } from "react";
import { Group } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export const useObjectLoader = () => {
  const objectLoader = new OBJLoader();

  return useCallback(
    (url: string) => {
      objectLoader.load(
        url,
        (object: Group) => {
          const result = object;
          return result;
        },
        // On Progress
        () => {},
        // On Error
        () => {
          console.error("error loading object");
        }
      );
    },
    [objectLoader]
  );
};
