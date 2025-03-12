import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  activeComponent?: string;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeComponent,
  isDarkMode = true,
  onThemeToggle,
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // For debugging
  useEffect(() => {
    console.log("Layout rendering with isDarkMode:", isDarkMode);
  }, [isDarkMode]);

  // Determine if we're on a component page and which component is active
  const isComponentPage = pathname.startsWith("/components/");
  const currentComponent = isComponentPage
    ? pathname.split("/").pop() || ""
    : activeComponent || "";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Create a safe theme toggle function
  const handleThemeToggle = () => {
    console.log("Layout handleThemeToggle called");
    if (onThemeToggle) {
      onThemeToggle();
    } else {
      console.warn("No theme toggle function provided to Layout");
    }
  };

  return (
    <motion.div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-950" : "bg-gray-50"
      } transition-colors duration-500`}
    >
      <Navbar
        key={`navbar-${isDarkMode ? "dark" : "light"}`}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onMenuToggle={isComponentPage ? toggleSidebar : undefined}
      />

      <div className="flex-1 flex">
        {isComponentPage && (
          <Sidebar
            activeComponent={currentComponent}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        <motion.main
          className={`flex-1 ${
            isComponentPage ? "md:ml-64" : ""
          } overflow-y-auto h-[calc(100vh-4rem)] transition-all duration-300`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              className={isComponentPage ? "max-w-7xl mx-auto p-4 md:p-6" : ""}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.main>
      </div>
    </motion.div>
  );
};
