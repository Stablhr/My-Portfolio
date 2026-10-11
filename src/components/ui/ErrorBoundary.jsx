import { Component } from "react";

/**
 * Catches render-time errors anywhere in the tree and shows a readable
 * message instead of a blank page. Styling is inline on purpose so the
 * fallback still renders even if the stylesheet (or Tailwind) fails to load.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#050608",
          color: "#F2F4F8",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "42rem",
            width: "100%",
            background: "#111823",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "1rem",
            padding: "2rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#FF5D6C",
            }}
          >
            Something went wrong
          </p>
          <h1 style={{ margin: "0.5rem 0 1rem", fontSize: "1.5rem" }}>
            The page failed to render
          </h1>
          <p style={{ margin: "0 0 1rem", color: "#A7B0BD", lineHeight: 1.6 }}>
            An unexpected error stopped the app from loading. The details below
            can help diagnose the problem.
          </p>
          <pre
            style={{
              margin: "0 0 1.5rem",
              padding: "1rem",
              background: "#050608",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "0.5rem",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              color: "#FF5D6C",
              fontSize: "0.875rem",
            }}
          >
            {String(error?.stack || error?.message || error)}
          </pre>
          <button
            type="button"
            onClick={this.handleReload}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: "9999px",
              padding: "0.75rem 1.5rem",
              background: "#D4162B",
              color: "#050608",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
