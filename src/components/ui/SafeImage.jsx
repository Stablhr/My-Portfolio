import { useState } from "react";

export function SafeImage({ src, alt, initial, className = "", width, height, ...props }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex items-center justify-center bg-gradient-to-br from-blue/30 via-blue-deep to-bg overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue/20 via-blue-deep/30 to-bg" />
        <span className="relative text-4xl font-bold text-blue-bright/50 font-heading">
          {initial || "?"}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue/20 via-blue-deep/30 to-bg animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
}