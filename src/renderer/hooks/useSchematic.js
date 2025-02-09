import { useEffect, useState } from 'react';

export const useSchematic = () => {
  const [schematic, setSchematic] = useState(null);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (schematic) {
        try {
          const data = await window.electronAPI.parseSchematic(schematic.path);
          setBlocks(data.blocks);
        } catch (error) {
          console.error('Error loading schematic:', error);
        }
      }
    };
    load();
  }, [schematic]);

  return { schematic, setSchematic, blocks };
};