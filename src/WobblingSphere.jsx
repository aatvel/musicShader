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
import { gsap } from "gsap";

const AnimatedMaterial = a(MeshDistortMaterial);

const WobblingSphere = () => {
  const sphere = useRef();
  const matRef = useRef();
  const mouse = {
    x: 0,
    y: 0,
  };
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (Math.abs(mouse.x) < 0.18 && Math.abs(mouse.y) < 0.18) {
        gsap.to(matRef.current.color, {
          r: 0,
          g: 0.85,
          b: 0.4,
          duration: 2,
          ease: "circ.out",
        });
      } else {
        gsap.to(matRef.current.color, {
          r: 0.15,
          g: 0.99,
          b: 0.54,
          duration: 2,
          ease: "circ.out",
        });
      }
    });
  }, []);

  const {
    color,
    envMapIntensity,
    clearcoat,
    clearcoatRoughness,
    metalness,
    distort,
    speed,
  } = useControls("FlowerShader", {
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
      value: 1.38,
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

    if (mouse.x && mouse.y && matRef) {
      gsap.to(matRef.current, {
        distort: distort - Math.abs(mouse.x * 0.5),
        duration: 1.5,
        ease: "circ.out",
      });

      sphere.current.rotation.x = 0 + mouse.y * 0.3;
      sphere.current.rotation.y = 0 - mouse.x * 0.5;
    }
  });

  return (
    <>
      <Suspense fallback={null}>
        <a.mesh ref={sphere} scale={0.4}>
          <sphereGeometry args={[1, 128, 128]} />
          <AnimatedMaterial
            ref={matRef}
            color={"#1EFFA5"}
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
