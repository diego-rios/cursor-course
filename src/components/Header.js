'use client';

import { useTheme } from "@/context/ThemeContext";
import { Menu, Moon, Sun, Github, Twitter, Mail } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function Header({ isSidebarOpen, onToggleSidebar }) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboards':
        return 'Overview';
      case '/playground':
        return 'API Playground';
      case '/protected-page':
        return 'Protected Page';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center px-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        
        {/* Page Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {/* System Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Operational</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/diego-rios/cursor-course"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/diegoarielrios"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="mailto:diegoarielriosdiaz@gmail.com"
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Theme Toggle */}
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
      </div>
    </header>
  );
} 