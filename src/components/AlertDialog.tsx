import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./button";
import { X } from "lucide-react";
import clsx from "clsx";

interface AlertDialogProps {
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  variant?: "info" | "warning" | "danger" | "success";
  children?: React.ReactNode;
  trigger?: React.ReactElement<{ onClick?: () => void }>;
  isLoading?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  variant = "info",
  children,
  trigger,
  isLoading = false,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const open = controlledIsOpen ?? isOpen;
  const onClose = controlledOnClose ?? (() => setIsOpen(false));

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Prevent scrolling when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  const getHeaderColor = () => {
    switch (variant) {
      case "warning":
        return "bg-warning-500";
      case "danger":
        return "bg-danger-500";
      case "success":
        return "bg-success-500";
      case "info":
      default:
        return "bg-primary-500";
    }
  };

  const getConfirmButtonVariant = () => {
    switch (variant) {
      case "warning":
        return "warning";
      case "danger":
        return "danger";
      case "success":
        return "success";
      case "info":
      default:
        return "primary";
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, {
          onClick: () => setIsOpen(true),
        })}

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
            />

            <motion.div
              ref={dialogRef}
              className={clsx(
                "relative bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden"
              )}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dialogVariants}
            >
              <div
                className={clsx(
                  "flex justify-between items-center p-4 text-white",
                  getHeaderColor()
                )}
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-4 py-4">
                {description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {description}
                  </p>
                )}
                {children}
              </div>

              <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  {cancelText}
                </Button>
                <Button
                  variant={getConfirmButtonVariant()}
                  size="sm"
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                  isLoading={isLoading}
                >
                  {confirmText}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
