"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-medium",
    "rounded-lg transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25",
          "hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40",
          "active:from-blue-700 active:to-blue-600",
          "focus-visible:ring-blue-500",
        ],
        secondary: [
          "bg-gray-700 text-gray-100 shadow-sm",
          "hover:bg-gray-600",
          "active:bg-gray-800",
          "focus-visible:ring-gray-500",
        ],
        danger: [
          "bg-red-600 text-white shadow-sm shadow-red-500/25",
          "hover:bg-red-500 hover:shadow-red-500/40",
          "active:bg-red-700",
          "focus-visible:ring-red-500",
        ],
        success: [
          "bg-emerald-600 text-white shadow-sm shadow-emerald-500/25",
          "hover:bg-emerald-500 hover:shadow-emerald-500/40",
          "active:bg-emerald-700",
          "focus-visible:ring-emerald-500",
        ],
        outline: [
          "border border-gray-600 text-gray-300 bg-transparent",
          "hover:bg-white/5 hover:border-gray-500 hover:text-white",
          "active:bg-white/10",
          "focus-visible:ring-gray-500",
        ],
        ghost: [
          "text-gray-400 bg-transparent",
          "hover:bg-white/5 hover:text-white",
          "active:bg-white/10",
          "focus-visible:ring-gray-500",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading = false, icon, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
