import {
  OrbitControls,
  useGLTF,
  shaderMaterial,
  Environment,
  Sparkles,
} from "@react-three/drei";
import Cauldron from "./Cauldron";
import surfaceVertexShader from "./shaders/vertex.glsl";
import surfaceFragmentShader from "./shaders/fragment.glsl";
import GUI from "lil-gui";

export default function Experience() {
  const cauldron = useGLTF("/cauldron.glb");

  return (
    <>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.9}
        enableZoom={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.5}
      />

      <Environment preset="city" />
      <directionalLight position={[0, 3, 5]} color="green" />

      <Cauldron />
      <Sparkles
        size={6}
        scale={[4, 2, 4]}
        position-y={1}
        speed={0.2}
        count={40}
      />
    </>
  );
}
