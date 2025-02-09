module.exports = {
    packagerConfig: {
      icon: './resources/icons/icon',
      extraResource: [
        './resources',
        './node_modules/ffmpeg-static/ffmpeg.exe'
      ]
    },
    makers: [
      {
        name: '@electron-forge/maker-squirrel',
        config: {
          name: 'SchematicRenderer',
          authors: 'Tu Nombre',
          setupIcon: './resources/icons/icon.ico'
        }
      }
    ],
    plugins: [
      [
        '@electron-forge/plugin-webpack',
        {
          mainConfig: './webpack.main.config.js',
          renderer: {
            config: './webpack.renderer.config.js',
            entryPoints: [
              {
                html: './src/renderer/index.html',
                js: './src/renderer/App.jsx',
                name: 'main_window'
              }
            ]
          }
        }
      ]
    ]
  };
  module.exports = {
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'valentinhere1',
            name: 'singularityasdsad'
          },
          prerelease: false,
          draft: false,
          authToken: process.env.GITHUB_TOKEN
        }
      }
    ],
    packagerConfig: {
      icon: './resources/icons/icon.ico',
      extraResource: [
        './cache' // Para incluir texturas descargadas
      ]
    }
  };