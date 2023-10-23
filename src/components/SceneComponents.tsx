import { useEffect, useRef } from 'react';
import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from '@babylonjs/core';

let box: any;
let sphere: any;

const SceneComponent = ({
  antialias,
  engineOptions,
  adaptToDeviceRatio,
  sceneOptions,
  cameraPosition,
  ...rest
}: any) => {
  // canvas요소를 참조할 ref 생성
  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    // canvas가 없으면 종료
    if (!canvas) return;

    // Babylon.js engine 생성
    const engine = new Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );

    const scene = new Scene(engine, sceneOptions);

    // scene.isReady()가 true이면 onSceneReady() 호출
    if (scene.isReady()) {
      onSceneReady(scene, cameraPosition);
    } else {
      // scene.isReady()가 false이면 scene.onReadyObservable에 onSceneReady()를 추가
      scene.onReadyObservable.addOnce((scene) =>
        onSceneReady(scene, cameraPosition)
      );
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === 'function') onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener('resize', resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener('resize', resize);
      }
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    cameraPosition,
  ]);

  return <canvas style={{ width: '100%' }} ref={reactCanvas} {...rest} />;
};

const onSceneReady = (scene: any, cameraPosition: any) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera('camera1', cameraPosition, scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
  // Move the box upward 1/2 its height
  box.position.y = 0;

  sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);

  sphere.position.x = 4;
  sphere.position.y = 2;

  // Our built-in 'ground' shape.
  // MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
};

const onRender = (scene: any) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;

    // box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

export default SceneComponent;
