//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const vertShader = `varying vec2 vUv;

void main() {

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`;

const fragShader = `
uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;

varying vec2 vUv;

void main() {

  gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

}`;

let xPos = 0;
let yPos = 0;
let oldXPos = 0;
let oldYPos = 0;
export const TensorFlow: React.FunctionComponent<{}> = () => {
  const webcamRef = useRef(null);
  const container = useRef(null);

  const [isloading, setIsLoading] = useState<boolean>();

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 240, height: 200 },
      scale: 0.8,
    });

    //
    setInterval(() => {
      detect(net);
    }, 200);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const pose = await net.estimateSinglePose(video);
      const leftWrist = pose.keypoints[10];

      if (leftWrist.score > 0.85) {
        xPos = leftWrist.position.x;
        yPos = leftWrist.position.y;
      }
      setIsLoading(false);

      // console.log(`x: ${leftWristXPos * 100}%`);
      // console.log(`y: ${leftWristYPos * 100}%`);
      //   drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };
  tf.ready().then((_) => {
    setTimeout(() => {
      runPosenet();
    }, 1500);
  });

  const ENTIRE_SCENE = 0,
    BLOOM_SCENE = 1;

  const bloomLayer = new THREE.Layers();
  bloomLayer.set(BLOOM_SCENE);

  const params = {
    exposure: 1,
    bloomStrength: 5,
    bloomThreshold: 0,
    bloomRadius: 0,
    scene: "Scene with Glow",
  };

  const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
  const materials = {};

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    camera.position.y = 500;

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.maxPolarAngle = Math.PI * 0.5;
    // controls.minDistance = 1;
    // controls.maxDistance = 100;
    // controls.addEventListener("change", render);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0x404040));

    const material = new THREE.MeshPhongMaterial({
      color: 0xe87107,
      reflectivity: 1,
    });
    const object = new THREE.Mesh(
      new THREE.SphereGeometry(25, 50, 50),
      material
    );
    object.position.set(0, 0, 0);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    scene.add(camera);
    scene.add(object);
    scene.add(camera);
    camera.lookAt(object.position);
    container.current.appendChild(renderer.domElement);
    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };
  const render = () => {
    scene.traverse((o) => {
      //@ts-ignore
      if (o.isMesh) {
        //@ts-ignore
        const delta = 5;
        if (Math.abs(oldXPos - xPos) > delta) {
          oldXPos = xPos;
          o.position.x = xPos > 320 ? -(xPos - 320) : 320 - xPos;
        }
        if (Math.abs(oldYPos - yPos) > delta) {
          oldYPos = yPos;
          o.position.z = yPos < 240 ? -240 + yPos : yPos - 240;
        }
      }
    });
    // var timer = Date.now() * 0.0003;
    // group.rotation.z += 0.005;
    // pointLight.position.set(Math.sin( timer ) * 800 , pointLight.position.y, pointLight.position.z )

    renderer.render(scene, camera);
  };

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: -1,
          width: 240,
          height: 200,
          visibility: "hidden",
        }}
      />
      <div
        key={`Animation Container`}
        style={{
          height: `${100}vh`,
          width: `${100}vw`,
          overflow: "hidden",
        }}
        ref={container}
      ></div>

      <h1
        style={{
          top: "50vh",
          left: "10vw",
          color: "white",
          position: "absolute",
          "text-align": "center",
        }}
      >
        {isloading
          ? "loading"
          : "Stand 4-5 feet away and slowly move your right hand and the orange will follow"}
      </h1>
    </div>
  );
};
