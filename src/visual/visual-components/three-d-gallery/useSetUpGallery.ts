import { useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import { Object3D, Scene } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { CardItem } from "./types";

export const useSetUpGallery = (cardItems, scene: Scene) =>
  useMemo(() => {
    const galleryItems: CSS3DObject[] = [];
    const galleryObjects: Object3D[] = [];
    cardItems.forEach((card: CardItem, index: number) => {
      const element = document.createElement("div");
      element.className = "element";
      element.innerHTML = ReactDOMServer.renderToString(card.cardFace);

      const objectCSS = new CSS3DObject(element);
      objectCSS.position.x = Math.random() * 4000 - 2000;
      objectCSS.position.y = Math.random() * 4000 - 2000;
      objectCSS.position.z = Math.random() * 4000 - 2000;
      scene.add(objectCSS);
      galleryItems.push(objectCSS);

      const object = new Object3D();
      object.position.x = (index % 4) * 440 - 1330;
      object.position.y = -(Math.floor(index / 4) * 680) + 1090;
      galleryObjects.push(object);
    });

    return { galleryItems, galleryObjects };
  }, [cardItems, scene]);
