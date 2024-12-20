'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeContext";

export default function ClientLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    setIsSidebarOpen(isDesktop);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-white dark:bg-gray-900">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <div className={`fixed lg:static lg:flex-shrink-0 z-30 transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarOpen ? 'w-60' : 'w-0 lg:w-60'}`}>
          <Sidebar isOpen={true} />
        </div>

        <div className="flex-1 flex flex-col w-full">
          <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-auto bg-[#fafafa] dark:bg-gray-900 p-4">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
} 