import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-medium rounded-full transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-700/60 text-gray-300 border border-gray-600/50",
        success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
        warning: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
        danger: "bg-red-500/15 text-red-400 border border-red-500/25",
        info: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/* Dot color map for the optional indicator */
const dotColorMap: Record<string, string> = {
  default: "bg-gray-400",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  danger: "bg-red-400",
  info: "bg-blue-400",
};

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, size, dot = false, children, ...props }: BadgeProps) {
  const resolvedVariant = variant ?? "default";

  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "mr-1.5 h-1.5 w-1.5 rounded-full shrink-0",
            dotColorMap[resolvedVariant]
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
