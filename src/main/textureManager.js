const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

const TEXTURES_CACHE = path.join(__dirname, '../../cache/textures');
const FALLBACK_URL = 'https://via.placeholder.com/16/FF0000/FFFFFF?text=Missing';

async function downloadTexture(blockName) {
  const texturePath = path.join(TEXTURES_CACHE, `${blockName}.png`);
  
  if (!await fs.pathExists(texturePath)) {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.4/assets/minecraft/textures/block/${blockName}.png`,
        { responseType: 'arraybuffer' }
      );
      
      await fs.ensureDir(TEXTURES_CACHE);
      await fs.writeFile(texturePath, Buffer.from(response.data));
    } catch (error) {
      return downloadFallback();
    }
  }
  return texturePath;
}

async function downloadFallback() {
  const fallbackPath = path.join(TEXTURES_CACHE, 'missing.png');
  if (!await fs.pathExists(fallbackPath)) {
    const response = await axios.get(FALLBACK_URL, { responseType: 'arraybuffer' });
    await fs.writeFile(fallbackPath, response.data);
  }
  return fallbackPath;
}

module.exports = { getTexture: downloadTexture };
const downloadTextures = async (blocks) => {
  const uniqueBlocks = [...new Set(blocks.map(b => b.type))];
  await Promise.all(uniqueBlocks.map(block => 
    downloadTexture(block).catch(() => downloadFallback())
  ));
};

// Llamar esta función después de parsear el schematic