import { clsx } from "clsx";

type BadgeVariant = "default" | "danger" | "success" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[#F1F1F1] text-[#333333]",
  danger: "bg-red-50 text-red-600",
  success: "bg-green-50 text-green-700",
  outline: "bg-white text-[#666666] border border-[#E5E5E5]",
};

function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <>
      <span
        className={clsx(
          `inline-flex items-center px-2 py-0.5 text-xs font-medium rounded`,
          variantStyles[variant],
          className,
        )}
      >
        {children}
      </span>
    </>
  );
}

export default Badge;
