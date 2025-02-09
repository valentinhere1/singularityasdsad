import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

const Block = ({ position, blockName }) => {
  const texture = useTexture(`file://${blockName}`);
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export const Viewer3D = ({ schematic }) => {
  const [blocks, setBlocks] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      const data = await window.electronAPI.parseSchematic(schematic.path);
      setBlocks(data.blocks);
    };
    load();
  }, [schematic]);

  return (
    <Canvas camera={{ position: [0, 15, 20], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        {blocks.map((block, i) => (
          <Block key={i} position={block.position} blockName={block.texture} />
        ))}
      </Suspense>
      <OrbitControls enableDamping dampingFactor={0.05} />
    </Canvas>
  );
};