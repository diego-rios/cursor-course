'use client';

import { useTheme } from "@/context/ThemeContext";
import { Menu, Moon, Sun } from "lucide-react";

export default function Header({ isSidebarOpen, onToggleSidebar }) {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center px-4">
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>
      <div className="flex-1" />
      <button
        onClick={toggleDarkMode}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </header>
  );
} 