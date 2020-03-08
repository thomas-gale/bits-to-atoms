import React from 'react';
import { Color } from 'three';

export function Lighting(): JSX.Element {
  return (
    <group>
      <ambientLight intensity={0.3} />
      <spotLight
        castShadow
        color={new Color(0xffdddd)}
        intensity={0.4}
        angle={Math.PI / 7}
        position={[10, 10, 15]}
        penumbra={2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight color={new Color(0xddddff)} intensity={0.2} />
    </group>
  );
}
