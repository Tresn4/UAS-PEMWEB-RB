import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      errorMessage: '' 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      errorMessage: error.message
    });
    console.error('Terjadi kesalahan:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 text-center">
          <h2 className="text-2xl text-red-600 mb-4">
            Oops! Terjadi Kesalahan
          </h2>
          <p className="text-gray-600 mb-4">
            {this.state.errorMessage || 'Silakan coba muat ulang halaman'}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => window.location.reload()}
          >
            Muat Ulang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;