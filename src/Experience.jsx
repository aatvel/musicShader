import { OrbitControls } from "@react-three/drei";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";
import MusicShaderBlob from "./MusicShaderBlob";
import MusicShaderFlower from "./MusicShaderFlower";
import MusicShaderColor from "./MusicShaderColor.jsx";

export default function Experience() {
  const { perfVisible } = useControls("debug", {
    perfVisible: false,
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <MusicShaderBlob />
      <MusicShaderFlower />
      {/* <MusicShaderColor /> */}
    </>
  );
}
