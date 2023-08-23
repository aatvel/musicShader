import React, { Suspense, useEffect, useState, useRef } from "react";
import * as THREE from "three";
import {
  Environment,
  MeshDistortMaterial,
  ContactShadows,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { a } from "@react-spring/three";
import { useControls } from "leva";

const AnimatedMaterial = a(MeshDistortMaterial);

const WobblingSphere = () => {
  const sphere = useRef();

  useFrame((state) => {
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(
        sphere.current.position.x,
        0,
        0.2
      );
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 0.5) / 10 + 0,
        0.2
      );
    }
  });

  const { color, envMapIntensity, clearcoat, clearcoatRoughness, metalness, distort, speed } =
    useControls("FlowerShader", {
      color: "#1EFFA5",
      envMapIntensity: {
        value: 0.5,
        step: 0.01,
        min: 0,
        max: 2,
      },
      clearcoat: {
        value: 0.2,
        step: 0.01,
        min: 0,
        max: 2,
      },
      clearcoatRoughness: {
        value: 0.4,
        step: 0.01,
        min: 0,
        max: 2,
      },
      metalness: {
        value: 0.1,
        step: 0.01,
        min: 0,
        max: 2,
      },
      distort: {
        value: 0.9,
        step: 0.01,
        min: 0,
        max: 5,
      },
      speed: {
        value: 0.7,
        step: 0.01,
        min: 0,
        max: 20,
      },
    });

  return (
    <>
      <Suspense fallback={null}>
        <a.mesh ref={sphere} scale={0.4}>
          <sphereBufferGeometry args={[1, 64, 64]} />
          <AnimatedMaterial
            color={color}
            envMapIntensity={envMapIntensity}
            clearcoat={clearcoat}
            clearcoatRoughness={clearcoatRoughness}
            metalness={metalness}
            distort={distort}
            speed={speed}
          />
        </a.mesh>
        <Environment preset="warehouse" />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.6, 0]}
          opacity={0.8}
          width={15}
          height={15}
          blur={2.5}
          far={1.6}
        />
      </Suspense>
    </>
  );
};

export default React.memo(WobblingSphere);
