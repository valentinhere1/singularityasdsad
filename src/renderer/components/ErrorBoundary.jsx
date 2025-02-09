import React from 'react';
import { Button, Dialog } from '@blueprintjs/core';

export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error Boundary:', error, info);
    if (window.electronAPI) window.electronAPI.logError(error.stack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Dialog isOpen title="Critical Error" onClose={() => window.location.reload()}>
          <div className="error-dialog">
            <pre>{this.state.error.stack}</pre>
            <Button intent="danger" onClick={() => window.location.reload()}>
              Reload App
            </Button>
          </div>
        </Dialog>
      );
    }
    return this.props.children;
  }
}