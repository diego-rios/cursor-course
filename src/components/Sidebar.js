'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  HomeIcon, 
  BeakerIcon, 
  DocumentTextIcon, 
  CommandLineIcon,
  DocumentDuplicateIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="w-60 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="dark:invert"
          />
          <span className="text-xl font-semibold">tavily</span>
        </Link>
      </div>

      {/* Account Selector */}
      <div className="px-4 mb-6">
        <button className="w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center justify-between">
          <span>Personal</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <div className="px-3 space-y-1">
          <Link
            href="/dashboards"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <HomeIcon className="w-5 h-5" />
            Overview
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <BeakerIcon className="w-5 h-5" />
            Research Assistant
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <DocumentTextIcon className="w-5 h-5" />
            Research Reports
          </Link>
          <Link
            href="/playground"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <CommandLineIcon className="w-5 h-5" />
            API Playground
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <DocumentDuplicateIcon className="w-5 h-5" />
            Invoices
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <DocumentTextIcon className="w-5 h-5" />
            Documentation
          </Link>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Diego Ariel Rios Diaz</p>
          </div>
        </div>
      </div>
    </div>
  );
} 