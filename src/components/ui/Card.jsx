import { forwardRef } from "react";

export const Card = forwardRef(function Card({
  className = "",
  children,
  hover = false,
  ...props
}, ref) {
  return (
    <article
      ref={ref}
      className={`card ${hover ? "card-hover" : ""} ${className}`}
      {...props}
    >
      {children}
    </article>
  );
});

Card.displayName = "Card";