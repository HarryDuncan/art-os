import React from "react";
import { OBJECT_TYPES } from "../../reactFiberScene.constants";
import { GTLFObject, ReactFiberSceneObjects } from "../../types";
import { GTLFObj } from "./GTLFObj";
import { GTLFObjGroup } from "./GTLFObjGroup";
import { TextObject } from "./TextObject";

interface ObjectsProps {
  objectData: ReactFiberSceneObjects[];
  renderTarget: any;
}
export const Objects = ({ objectData }: ObjectsProps) => {
  return (
    <>
      {objectData.map((data) => {
        switch (data.objectType) {
          case OBJECT_TYPES.GTLF_GROUP: {
            const { objectUrl } = data as GTLFObject;
            return <GTLFObjGroup objectUrl={objectUrl} />;
          }
          case OBJECT_TYPES.GTLF: {
            const { objectUrl } = data as GTLFObject;
            return <GTLFObj objectUrl={objectUrl} />;
          }
          case OBJECT_TYPES.TEXT:
          default:
            return <TextObject />;
        }
      })}
    </>
  );
};
