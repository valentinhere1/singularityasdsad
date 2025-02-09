import GIF from 'gif.js';

export const generateGIF = async (frames, options) => {
  return new Promise((resolve) => {
    const gif = new GIF({
      workers: 4,
      quality: options.quality,
      width: options.width,
      height: options.height
    });

    frames.forEach(frame => gif.addFrame(frame.canvas, { delay: 100 }));
    
    gif.on('finished', blob => resolve(blob));
    gif.render();
  });
};