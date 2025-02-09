self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js');

self.onmessage = async (e) => {
  const { frames, options } = e.data;
  const gif = new GIF({ workers: 4, ...options });

  frames.forEach((frame, index) => {
    gif.addFrame(frame, { delay: 100 });
    self.postMessage({ progress: (index + 1) / frames.length * 100 });
  });

  gif.on('finished', blob => self.postMessage({ blob }));
  gif.render();
};