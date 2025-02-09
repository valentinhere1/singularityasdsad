import Editor from '@monaco-editor/react';

// Solución para carga de recursos :cite[9]
loader.config({ 
  paths: { 
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.34.0/min/vs' 
  }
});



export const ShaderEditor = (
  
  { onSave }) => {
  const defaultShader = `
// Vertex Shader
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
 <Editor 
    height="500px" 
    defaultLanguage="glsl" 
    theme="vs-dark" 
    options={{ minimap: { enabled: false }}}
  />
// Fragment Shader
uniform vec3 color;
void main() {
  gl_FragColor = vec4(color, 1.0);
}`;
 <Editor 
    height="500px" 
    defaultLanguage="glsl" 
    theme="vs-dark" 
    options={{ minimap: { enabled: false }}}
  />
  return (
    <div className="shader-editor">
      <Editor
        height="80vh"
        width="100%"
        defaultLanguage="glsl"
        theme="vs-dark"
        defaultValue={defaultShader}
        options={{ minimap: { enabled: false } }}
        onChange={onSave}
      />
    </div>
  );
};