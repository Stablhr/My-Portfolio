import { forwardRef } from "react";

export const Button = forwardRef(function Button({
  variant = "primary",
  size = "md",
  href,
  icon,
  iconRight,
  children,
  className = "",
  onClick,
  disabled,
  type = "button",
  ...props
}, ref) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent text-white font-semibold hover:bg-accent-hover hover:-translate-y-0.5",
    outline: "border border-line text-ink hover:border-blue/50 hover:bg-white/5",
    ghost: "text-ink-muted hover:text-ink hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const Component = href ? "a" : "button";
  const componentProps = href ? { href, rel: "noopener noreferrer", target: "_blank" } : { type, onClick };

  return (
    <Component
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...componentProps}
      {...(Component === "button" ? { disabled, onClick } : {})}
      {...props}
    >
      {icon && <span className="mr-2" aria-hidden="true">{icon}</span>}
      {children}
      {iconRight && <span className="ml-2" aria-hidden="true">{iconRight}</span>}
    </Component>
  );
});

Button.displayName = "Button";