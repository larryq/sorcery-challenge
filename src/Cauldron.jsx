import {
  OrbitControls,
  useGLTF,
  shaderMaterial,
  Sparkles,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import surfaceVertexShader from "./shaders/vertex.glsl";
import surfaceFragmentShader from "./shaders/fragment.glsl";
import GUI from "lil-gui";

//const gui = new GUI({ width: 340 });
const debugObject = {};

debugObject.depthColor = "#ff4000";
debugObject.surfaceColor = "#151c37";

const SurfaceMaterial = shaderMaterial(
  {
    uTime: 0,
    uSurfaceColor: new THREE.Color("#151c37"),
    uDepthColor: new THREE.Color("#ff4000"),
    uBigWavesElevation: 0.2,
    uBigWavesFrequency: new THREE.Vector2(4, 4),
    uBigWavesSpeed: 0.75,

    uSmallWavesElevation: 0.15,
    uSmallWavesFrequency: 3.0,
    uSmallWavesSpeed: 0.2,
    uSmallIterations: 4.0,

    uColorOffset: 0.925,
    uColorMultiplier: 1,
  },
  surfaceVertexShader,
  surfaceFragmentShader
);

extend({ SurfaceMaterial });

export default function Model(props) {
  const { nodes, materials } = useGLTF("/cauldron.glb");
  const surfaceMaterial = useRef();
  useFrame((state, delta) => {
    surfaceMaterial.current.uTime += delta * 2;
  });
  /* console.log(surfaceMaterial);

  gui.addColor(debugObject, "depthColor").onChange(() => {
    surfaceMaterial.uDepthColor.value.set(debugObject.depthColor);
  });
  gui.addColor(debugObject, "surfaceColor").onChange(() => {
    surfaceMaterial.uSurfaceColor.value.set(debugObject.surfaceColor);
  });

  gui
    .add(surfaceMaterial.uBigWavesElevation, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("uBigWavesElevation");
  gui
    .add(surfaceMaterial.uniforms.uBigWavesFrequency.value, "x")
    .min(0)
    .max(10)
    .step(0.001)
    .name("uBigWavesFrequencyX");
  gui
    .add(surfaceMaterial.uniforms.uBigWavesFrequency.value, "y")
    .min(0)
    .max(10)
    .step(0.001)
    .name("uBigWavesFrequencyY");
  gui
    .add(surfaceMaterial.uniforms.uBigWavesSpeed, "value")
    .min(0)
    .max(4)
    .step(0.001)
    .name("uBigWavesSpeed");

  gui
    .add(surfaceMaterial.uniforms.uSmallWavesElevation, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("uSmallWavesElevation");
  gui
    .add(surfaceMaterial.uniforms.uSmallWavesFrequency, "value")
    .min(0)
    .max(30)
    .step(0.001)
    .name("uSmallWavesFrequency");
  gui
    .add(surfaceMaterial.uniforms.uSmallWavesSpeed, "value")
    .min(0)
    .max(4)
    .step(0.001)
    .name("uSmallWavesSpeed");
  gui
    .add(surfaceMaterial.uniforms.uSmallIterations, "value")
    .min(0)
    .max(5)
    .step(1)
    .name("uSmallIterations");

  gui
    .add(surfaceMaterial.uniforms.uColorOffset, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("uColorOffset");
  gui
    .add(surfaceMaterial.uniforms.uColorMultiplier, "value")
    .min(0)
    .max(10)
    .step(0.001)
    .name("uColorMultiplier"); */

  return (
    <>
      <color args={["#3c4e96"]} attach="background" />
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cauldron.geometry}
          material={materials.cauldron}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.lip.geometry}
          material={materials.lip}
          position={[0, -0.012, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.handle.geometry}
          material={materials.handles}
          position={[1.016, 0.21, 0]}
          rotation={[0, 0, -1.254]}
          scale={0.275}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.feet.geometry}
          material={materials.feet}
          position={[0.702, -0.812, -0.001]}
          rotation={[0, 0, 0.392]}
          scale={[0.09, 0.187, 0.187]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.surface.geometry}
          material={nodes.surface.material}
          position={[0, 0.744, 0]}
          scale={0.663}
        >
          <surfaceMaterial ref={surfaceMaterial} />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/cauldron.glb");
