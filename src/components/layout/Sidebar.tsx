import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ComponentItem {
  name: string;
  href: string;
}

const components: ComponentItem[] = [
  { name: "Button", href: "/components/button" },
  { name: "AlertDialog", href: "/components/alertdialog" },
  { name: "Card", href: "/components/card" },
  { name: "Checkbox", href: "/components/checkbox" },
  { name: "Dropdown", href: "/components/dropdown" },
  { name: "Input", href: "/components/input" },
  { name: "Modal", href: "/components/modal" },
  { name: "Pagination", href: "/components/pagination" },
  { name: "Progress", href: "/components/progress" },
  { name: "Radio", href: "/components/radio" },
  { name: "Select", href: "/components/select" },
  { name: "Slider", href: "/components/slider" },
  { name: "Switch", href: "/components/switch" },
  { name: "Tabs", href: "/components/tabs" },
  { name: "Toast", href: "/components/toast" },
  { name: "Tooltip", href: "/components/tooltip" },
  // Add more components here as they are created
];

interface SidebarProps {
  activeComponent?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeComponent,
  isOpen = false,
  onClose,
}) => {
  // Prevent scrolling when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sidebarContent = (
    <nav className="p-4 h-full overflow-y-auto scrollbar-thin">
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Components
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 hidden md:block">
        Components
      </h2>

      <ul className="space-y-1">
        {components.map((component) => (
          <li key={component.name}>
            <Link
              to={component.href}
              className={`block px-3 py-2 rounded-md text-sm ${
                activeComponent === component.name.toLowerCase()
                  ? "bg-primary-500 text-white font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => {
                if (window.innerWidth < 768 && onClose) {
                  onClose();
                }
              }}
            >
              {component.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar - always visible on md screens and up */}
      <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 hidden md:block z-30">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar - overlay that appears when menu is toggled */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden opacity-0"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed left-0 top-0 w-64 h-full bg-gray-50 dark:bg-slate-950 border-r border-gray-200 dark:border-gray-900 shadow-md z-50 md:hidden -translate-x-full"
              animate={{ translateX: 0 }}
              exit={{ translateX: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="pt-16">{sidebarContent}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
