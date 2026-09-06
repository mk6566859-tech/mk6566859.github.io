import React from "react";

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Unhandled UI error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="page-center">
          <section className="card narrow-card">
            <p className="eyebrow">Something went wrong</p>
            <h1>Unable to render this page.</h1>
            <p>Refresh the page and try again.</p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
