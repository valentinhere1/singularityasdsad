const fs = require('fs');
const path = require('path');

const directories = [
  'cache/textures',
  'cache/schematics',
  'logs'
];

directories.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, '../', dir), { recursive: true });
});

console.log('Post-install setup completed!');