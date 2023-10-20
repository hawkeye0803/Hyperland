import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

const Game = () => {
  return (
    <div className="game">
      <Canvas className="h-screen">
        <Sky sunPosition={[100, 50, 20]} turbidity={1} />
        <ambientLight intensity={0.5} />
        <Physics></Physics>
      </Canvas>
    </div>
  );
};

export default Game;
