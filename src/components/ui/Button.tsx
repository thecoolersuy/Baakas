import { forwardRef } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#111111] text-white hover: bg-[#333333]",
  secondary:
    "bg-white text-[#111111] border border-[#E5E5E5] hover:border-[#9a9a9a]",
  ghost:
    "bg-transparent text-[#666666] hover: text-[#111111] hover:bg-[#F1F1F1]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          "inline-flex items-center justify-center",
          "font-medium rounded transition-colors duration-150",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible-ring-[#111111] focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        aria-busy={isLoading}
        {...rest}
      >
        {isLoading ? <span className="sr-only">Loading</span> : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
