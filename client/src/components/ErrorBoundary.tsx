import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  isChunkError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, isChunkError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const isChunkError = error.message?.includes('Failed to fetch dynamically imported module') ||
                         error.message?.includes('Loading chunk') ||
                         error.message?.includes('Loading CSS chunk') ||
                         error.name === 'ChunkLoadError';
    return { hasError: true, error, isChunkError };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.state.isChunkError) {
      const reloadCount = parseInt(sessionStorage.getItem('chunkErrorReloads') || '0');
      if (reloadCount < 2) {
        sessionStorage.setItem('chunkErrorReloads', String(reloadCount + 1));
        window.location.reload();
      }
    }
  }

  handleRetry = () => {
    sessionStorage.removeItem('chunkErrorReloads');
    this.setState({ hasError: false, error: undefined, isChunkError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-black/50 border border-gold/20 p-8 rounded-lg text-center">
            <h1 className="text-2xl font-bold text-gold mb-4">
              {this.state.isChunkError ? 'Connection Issue' : 'Something went wrong'}
            </h1>
            <p className="text-white/70 mb-6">
              {this.state.isChunkError 
                ? 'Unable to load the page. Please check your internet connection and try again.'
                : 'We encountered an unexpected error. Please refresh the page to continue.'}
            </p>
            <button
              onClick={this.handleRetry}
              className="bg-gold text-black px-6 py-3 font-bold tracking-widest uppercase hover:bg-white transition-colors"
              data-testid="button-reload"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
