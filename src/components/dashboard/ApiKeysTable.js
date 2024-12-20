'use client';

import { EyeIcon, EyeSlashIcon as EyeOffIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ApiKeysTable({
  apiKeys,
  isLoading,
  visibleKeys,
  editingKey,
  editName,
  setEditName,
  toggleKeyVisibility,
  startEditing,
  saveEdit,
  setEditingKey,
  copyToClipboard,
  initiateDelete,
  getExpirationStatus,
  isKeyExpired
}) {
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (apiKeys.length === 0) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">No API keys found. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <div className="grid grid-cols-12 gap-4 p-4 sm:p-6 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
        <div className="col-span-4 sm:col-span-3">NAME</div>
        <div className="col-span-6 sm:col-span-5">API KEY</div>
        <div className="hidden sm:block sm:col-span-2">USAGE</div>
        <div className="col-span-2">EXPIRES</div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {apiKeys.map((key) => (
          <div key={key.id} className="grid grid-cols-12 gap-4 p-4 sm:p-6 items-center text-sm">
            <div className="col-span-4 sm:col-span-3">
              {editingKey === key.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(key.id);
                    if (e.key === 'Escape') setEditingKey(null);
                  }}
                  className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{key.name}</span>
                  <button
                    onClick={() => startEditing(key)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="col-span-6 sm:col-span-5">
              <div className="flex items-center gap-2">
                <code className="font-mono text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {visibleKeys.has(key.id) ? key.key : '••••••••••••••••'}
                </code>
                <button
                  onClick={() => toggleKeyVisibility(key.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {visibleKeys.has(key.id) ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
                {visibleKeys.has(key.id) && (
                  <button
                    onClick={() => copyToClipboard(key.key)}
                    className="text-xs text-blue-500 hover:text-blue-600"
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
            <div className="hidden sm:block sm:col-span-2 text-gray-600 dark:text-gray-400">
              {key.usage.toLocaleString()} / {key.monthly_limit.toLocaleString()}
            </div>
            <div className="col-span-2 flex items-center justify-between gap-2">
              <span className={getExpirationStatus(key.expires_at).class}>
                {getExpirationStatus(key.expires_at).text}
              </span>
              <button
                onClick={() => initiateDelete(key)}
                className="text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 