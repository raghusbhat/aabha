import { cva } from "class-variance-authority";
import { motion } from "motion/react";
import clsx from "clsx";
import { LucideIcon, Loader2 } from "lucide-react";
import { useState } from "react";

const buttonVariants = cva(
  "rounded-md inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-400 shadow",
        secondary:
          "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400 shadow",
        outline:
          "bg-transparent border border-gray-200 text-gray-600 hover:bg-gray-50 focus:ring-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
        ghost:
          "bg-transparent text-gray-600 hover:bg-gray-50 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-800",
        danger:
          "bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-400 shadow",
        success:
          "bg-success-500 text-white hover:bg-success-600 focus:ring-success-400 shadow",
        warning:
          "bg-warning-500 text-white hover:bg-warning-600 focus:ring-warning-400 shadow",
      },
      size: {
        xs: "text-xs h-6 px-2",
        sm: "text-sm h-8 px-2.5",
        md: "text-sm h-9 px-3",
        lg: "text-base h-10 px-4",
        xl: "text-base h-11 px-5",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
    },
  }
);

type ButtonVariants = {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "warning";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  children: React.ReactNode;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  animated?: boolean;
  isLoading?: boolean;
};

const iconAnimation = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.2, 1], transition: { duration: 0.5 } },
};

export const Button = ({
  variant,
  size,
  rounded,
  children,
  icon: Icon,
  iconPosition = "left",
  className,
  onClick,
  disabled = false,
  animated = true,
  isLoading = false,
}: ButtonVariants) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconSize = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  }[size || "md"];

  return (
    <button
      className={clsx(
        buttonVariants({ variant, size, rounded }),
        Icon && "gap-1.5",
        (disabled || isLoading) && "opacity-60 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={iconSize} />
        </motion.div>
      ) : (
        <>
          {Icon &&
            iconPosition === "left" &&
            (animated ? (
              <motion.div
                initial="initial"
                animate={isHovered ? "animate" : "initial"}
                variants={iconAnimation}
              >
                <Icon size={iconSize} />
              </motion.div>
            ) : (
              <Icon size={iconSize} />
            ))}
          {children}
          {Icon &&
            iconPosition === "right" &&
            (animated ? (
              <motion.div
                initial="initial"
                animate={isHovered ? "animate" : "initial"}
                variants={iconAnimation}
              >
                <Icon size={iconSize} />
              </motion.div>
            ) : (
              <Icon size={iconSize} />
            ))}
        </>
      )}
    </button>
  );
};
