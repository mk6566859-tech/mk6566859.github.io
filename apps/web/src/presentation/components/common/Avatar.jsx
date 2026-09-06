import React, { useState } from "react";

export function Avatar({ src, alt, size = "lg" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`avatar avatar-${size} avatar-placeholder`} aria-label="Profile photo placeholder">
        <span>MMK</span>
      </div>
    );
  }

  return (
    <img
      className={`avatar avatar-${size}`}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
