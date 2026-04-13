import { Component } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
          
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <AlertTriangle className="text-red-500 w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Something went wrong
          </h1>

          <p className="text-slate-500 mb-6 max-w-md">
            {this.state.error?.message || "Unexpected error occurred"}
          </p>

          <button
            onClick={this.handleReload}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl transition"
          >
            <RefreshCcw size={16} />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;