"use client";

import { useEffect, useCallback, useRef, type HTMLAttributes } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Panel size variants                                                */
/* ------------------------------------------------------------------ */

const panelVariants = cva(
  [
    "relative w-full rounded-xl border border-white/10",
    "bg-[#0f1d32] shadow-2xl text-white",
    "flex flex-col max-h-[90vh]",
  ],
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        full: "max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] h-[90vh]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface ModalProps extends VariantProps<typeof panelVariants> {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  /** When true the overlay click will not dismiss the modal */
  persistent?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

const panelMotion = {
  initial: { opacity: 0, scale: 0.95, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 8 },
  transition: { duration: 0.15, ease: "easeOut" as const },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function Modal({
  open,
  onClose,
  title,
  description,
  size,
  children,
  className,
  persistent = false,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    /* Prevent body scroll while modal is open */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={persistent ? undefined : onClose}
            aria-hidden="true"
            {...overlayMotion}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(panelVariants({ size }), className)}
            {...panelMotion}
          >
            {/* Header */}
            {(title || true) && (
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-4">
                <div className="min-w-0">
                  {title && (
                    <h2 className="text-lg font-semibold text-white leading-tight truncate">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-gray-400">{description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    "shrink-0 rounded-lg p-1.5 text-gray-400",
                    "hover:bg-white/10 hover:text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    "transition-colors cursor-pointer"
                  )}
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal Footer (optional convenience export)                         */
/* ------------------------------------------------------------------ */

function ModalFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Modal, ModalFooter };
