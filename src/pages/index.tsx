import {
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Vector3,
} from '@babylonjs/core';
import SceneComponent from '@/components/SceneComponents';
import { useState } from 'react';
import styled from '@emotion/styled';

export default function Home() {
  const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 3, -5));

  const boxPosition = new Vector3(0, 3, -3);
  const spherePosition = new Vector3(7, 4, 0);

  const moveToBox = () => {
    setCameraPosition(boxPosition);
  };

  const moveToSpehere = () => {
    setCameraPosition(spherePosition);
  };

  return (
    <>
      <main>
        <Button onClick={moveToBox}>Goto Box</Button>
        <Button onClick={moveToSpehere}>Goto Sphere</Button>
        <SceneComponent
          antialias
          id='my-canvas'
          cameraPosition={cameraPosition}
        />
      </main>
    </>
  );
}

const Button = styled.button`
  padding: 5px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;
