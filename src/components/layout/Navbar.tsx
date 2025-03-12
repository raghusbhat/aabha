import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../../public/logo.svg";
import colors from "tailwindcss/colors";

interface NavbarProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onThemeToggle,
  onMenuToggle,
}) => {
  // For debugging
  console.log("Navbar rendering with isDarkMode:", isDarkMode);

  // State for animation
  const [isAnimating, setIsAnimating] = useState(false);

  // Log when component mounts or updates
  useEffect(() => {
    console.log("Navbar mounted/updated with isDarkMode:", isDarkMode);
  }, [isDarkMode]);

  // Use useCallback to prevent unnecessary re-renders
  const handleThemeToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      console.log(
        "Navbar theme toggle clicked. Current isDarkMode:",
        isDarkMode
      );

      // Start animation
      setIsAnimating(true);

      // Delay the actual toggle to allow animation to play
      setTimeout(() => {
        onThemeToggle();
        // End animation after toggle is complete
        setTimeout(() => setIsAnimating(false), 300);
      }, 150);
    },
    [isDarkMode, onThemeToggle]
  );

  return (
    <motion.nav
      className="sticky top-0 left-0 right-0 h-16 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-md z-50 shadow-sm"
      initial={false}
      animate={{
        borderColor: isDarkMode ? colors.gray[800] : colors.gray[200],
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile menu button - only visible on small screens */}
          <motion.button
            onClick={onMenuToggle}
            className="mr-3 p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-5 w-5" />
          </motion.button>

          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <motion.img
              src={logo}
              alt="logo"
              className="w-8 h-8"
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h1 className="font-black text-4xl font-sans bg-gradient-to-r from-primary-500 to-secondary-500 inline-block text-transparent bg-clip-text">
              AABHA
            </h1>
          </Link>
        </div>

        <motion.button
          onClick={handleThemeToggle}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 relative overflow-hidden"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          type="button"
          data-theme-mode={isDarkMode ? "dark" : "light"}
          disabled={isAnimating}
          whileTap={{ scale: 0.9 }}
          whileHover={{
            backgroundColor: isDarkMode ? colors.gray[800] : colors.gray[100],
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDarkMode ? "dark" : "light"}
              initial={{ scale: 0, rotate: isDarkMode ? -30 : 30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: isDarkMode ? 30 : -30 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-primary-500" />
              ) : (
                <Sun className="h-5 w-5 text-warning-500" />
              )}
            </motion.div>
          </AnimatePresence>

          {isAnimating && (
            <motion.span
              className={`absolute inset-0 rounded-full ${
                isDarkMode ? "bg-warning-500/20" : "bg-primary-500/20"
              }`}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
};
