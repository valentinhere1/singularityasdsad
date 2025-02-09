import React, { useState } from 'react';
import { Button, Classes, Dialog } from '@blueprintjs/core';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Viewer3D } from './components/Viewer3D';
import { RenderQueue } from './components/RenderQueue';
import { ShaderEditor } from './components/ShaderEditor';
import './styles.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('viewer');
  const [schematic, setSchematic] = useState(null);

  const handleLoad = async () => {
    try {
      const filePath = await window.electronAPI.openFile();
      setSchematic({ path: filePath });
    } catch (error) {
      window.electronAPI.logError(`Load Error: ${error.message}`);
    }
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        <div className="sidebar">
          <Button icon="folder-open" onClick={handleLoad}>Cargar Schematic</Button>
          <Button icon="camera" onClick={() => setActiveTab('camera')}>Cámara</Button>
          <Button icon="code" onClick={() => setActiveTab('shaders')}>Shaders</Button>
          <Button icon="video" onClick={() => setActiveTab('render')}>Renderizar</Button>
          <RenderQueue />
        </div>

        <div className="content-area">
          {activeTab === 'viewer' && schematic && <Viewer3D schematic={schematic} />}
          {activeTab === 'shaders' && <ShaderEditor />}
        </div>
      </div>
    </ErrorBoundary>
  );
}