import React from "react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="section page-center">
      <div className="card narrow-card">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <Link className="button primary" to="/">Back home</Link>
      </div>
    </section>
  );
}
