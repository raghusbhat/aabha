import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createAppRouter } from "./router";

const App = () => {
  // Initialize with dark mode as default
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedDarkMode = localStorage.getItem("darkMode");
    // Default to true if no preference is saved
    return savedDarkMode === null ? true : savedDarkMode === "true";
  });

  // State for theme transition
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);

  // Initialize dark mode from localStorage on mount
  useEffect(() => {
    // Ensure HTML class is in sync with state
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage if it wasn't already set
    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode", "true");
    }

    console.log("Initial dark mode state:", isDarkMode);
  }, []);

  // Toggle dark mode function
  const toggleDarkMode = useCallback(() => {
    console.log("Toggle dark mode called. Current state:", isDarkMode);

    // Start transition
    setIsThemeTransitioning(true);

    // Add a slight delay before changing the theme
    setTimeout(() => {
      setIsDarkMode((prevState) => {
        const newDarkMode = !prevState;
        console.log("Setting new dark mode state:", newDarkMode);

        // Update HTML class
        if (newDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        // Save to localStorage
        localStorage.setItem("darkMode", newDarkMode.toString());

        return newDarkMode;
      });

      // End transition after theme has changed
      setTimeout(() => {
        setIsThemeTransitioning(false);
      }, 300);
    }, 50);
  }, [isDarkMode]);

  // Create the router with dark mode state and toggle function
  const router = createAppRouter(isDarkMode, toggleDarkMode);

  // Using a key to force re-render when theme changes
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isDarkMode ? "dark" : "light"}
        className={`transition-all duration-300 ${
          isThemeTransitioning
            ? "brightness-110 saturate-110"
            : "brightness-100 saturate-100"
        }`}
      >
        {router}
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
