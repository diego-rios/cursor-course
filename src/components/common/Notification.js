'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Notification({ notification, onClose }) {
  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
        notification.type === 'error' 
          ? 'bg-red-500 text-white' 
          : 'bg-green-500 text-white'
      }`}>
        <span>{notification.message}</span>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 