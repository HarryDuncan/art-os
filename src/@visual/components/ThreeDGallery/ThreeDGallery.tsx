import * as THREE from "three";
import React, { useRef, useEffect, useState, FC } from "react";
// @ts-ignore
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import ReactDOMServer from "react-dom/server";
import { formatPositionsToSphere, formatPositionsToHelix } from "./functions";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import {
  CSS3DRenderer,
  CSS3DObject
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

import { IThreeDCard } from "./interfaces";

interface IThreeDGallery {
  cardItems: IThreeDCard[];
  tableType: string;
}

const objects: any[] = [];
const targets: any = { table: [], sphere: [], helix: [], grid: [] };

export const ThreeDGallery: FC<IThreeDGallery> = ({ cardItems, tableType }) => {
  const setCamera = (): THREE.PerspectiveCamera => {
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 3000;
    return camera;
  };
  const container = useRef(null);

  const [scene, updateScene] = useState(new THREE.Scene());

  const renderer = new CSS3DRenderer();
  const camera: THREE.PerspectiveCamera = setCamera();
  let controls: any;
  const galleryItems: any = [];

  const setUpGalleryItems = () => {
    cardItems.forEach((card: IThreeDCard, index: number) => {
      const element = document.createElement("div");
      element.className = "element";

      element.innerHTML = ReactDOMServer.renderToString(card.cardFace);

      const objectCSS = new CSS3DObject(element);
      objectCSS.position.x = Math.random() * 4000 - 2000;
      objectCSS.position.y = Math.random() * 4000 - 2000;
      objectCSS.position.z = Math.random() * 4000 - 2000;
      scene.add(objectCSS);
      const object = new THREE.Object3D();
      object.position.x = (index % 4) * 440 - 1330;
      object.position.y = -(Math.floor(index / 4) * 680) + 1090;
      galleryItems.push(objectCSS);
      objects.push(object);
    });

    formatTables();
    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);
    TWEEN.update();
    if (controls) {
      console.log(controls);
      controls.update();
    }
  };

  const update = () => {
    renderer.render(scene, camera);
  };
  const formatTables = () => {
    switch (tableType) {
      case "sphere":
        targets.sphere = formatPositionsToSphere(galleryItems);
        break;
      case "helix":
        targets.helix = formatPositionsToHelix(galleryItems);
        break;
      case "grid":
        break;
      default:
        break;
    }

    transform(targets[tableType], galleryItems, 2000);
  };

  // On mount
  useEffect(() => {
    // formatTable(props.items);

    renderer.setSize(window.innerWidth, window.innerHeight);

    let node: any = container.current;
    if (node !== null && node !== undefined) {
      node.appendChild(renderer.domElement);
      // @ts-ignore
      controls = new TrackballControls(camera, renderer.domElement);
      controls.minDistance = 500;
      controls.maxDistance = 6000;
      controls.addEventListener("change", update);

      setTimeout(() => {
        console.log(controls);
      }, 500);
    }
    setUpGalleryItems();
  }, []);

  useEffect(() => {
    if (camera) {
      renderer.render(scene, camera);
      formatTables();
    }
  }, []);

  const transform = (targets: any[], objects: any[], duration: number) => {
    TWEEN.removeAll();

    objects.forEach((object: any, index: number) => {
      const target = targets[index];
      new TWEEN.Tween(object.position)
        .to(
          { x: target.position.x, y: target.position.y, z: target.position.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

      new TWEEN.Tween(object.rotation)
        .to(
          { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    });

    new TWEEN.Tween(container.current)
      .to({}, duration * 2)
      .onUpdate(update)
      .start();
  };

  //

  return (
    <div>
      <div
        style={{ width: "inherit", height: "inherit", position: "absolute" }}
        ref={container}
      />
    </div>
  );
};
//   window.addEventListener("resize", onWindowResize);
//   animate();
//
//   function transform(targets, duration) {
//     TWEEN.removeAll();
//
//     for (let i = 0; i < objects.length; i++) {
//       const object = objects[i];
//       const target = targets[i];
//
//       new TWEEN.Tween(object.position)
//         .to(
//           {
//             x: target.position.x,
//             y: target.position.y,
//             z: target.position.z,
//           },
//           Math.random() * duration + duration
//         )
//         .easing(TWEEN.Easing.Exponential.InOut)
//         .start();
//
//       new TWEEN.Tween(object.rotation)
//         .to(
//           {
//             x: target.rotation.x,
//             y: target.rotation.y,
//             z: target.rotation.z,
//           },
//           Math.random() * duration + duration
//         )
//         .easing(TWEEN.Easing.Exponential.InOut)
//         .start();
//     }
//
//     new TWEEN.Tween(this)
//       .to({}, duration * 2)
//       .onUpdate(render)
//       .start();
//   }
//
//   function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//
//     renderer.setSize(window.innerWidth, window.innerHeight);
//
//     render();
//   }
//

//
//
// };

// handleResize = () => {
//   camera = new THREE.PerspectiveCamera(
//     705,
//     window.innerWidth / window.innerHeight,
//     1,
//     1000
//   );
//   camera.position.y = 180;
// };
// componentWillUnmount() {
//   renderer.dispose();
//   window.removeEventListener("resize", this.handleResize, false);
// }
