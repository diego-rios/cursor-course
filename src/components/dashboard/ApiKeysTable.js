'use client';

import { EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

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
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm border-b dark:border-gray-700">
            <th className="px-6 py-4 font-medium">NAME</th>
            <th className="px-6 py-4 font-medium">USAGE</th>
            <th className="px-6 py-4 font-medium">KEY</th>
            <th className="px-6 py-4 font-medium">EXPIRES</th>
            <th className="px-6 py-4 font-medium">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center">
                <div className="flex items-center justify-center text-gray-500">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading API keys...
                </div>
              </td>
            </tr>
          ) : apiKeys.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                No API keys yet. Create one to get started.
              </td>
            </tr>
          ) : (
            apiKeys.map((key) => {
              const expStatus = getExpirationStatus(key.expires_at);
              return (
                <tr key={key.id} className={`border-b dark:border-gray-700 ${
                  isKeyExpired(key.expires_at) ? 'opacity-50' : ''
                }`}>
                  <td className="px-6 py-4">
                    {editingKey === key.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                        />
                        <button
                          onClick={() => saveEdit(key.id)}
                          className="text-green-500 hover:text-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingKey(null)}
                          className="text-gray-500 hover:text-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {key.name}
                        <button
                          onClick={() => startEditing(key)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">{key.usage}</td>
                  <td className="px-6 py-4 font-mono">
                    <div className="flex items-center gap-2">
                      {visibleKeys.has(key.id) ? (
                        <span className="text-gray-600">{key.key}</span>
                      ) : (
                        <span>•••••••••••••••••••••••••</span>
                      )}
                      <button
                        onClick={() => copyToClipboard(key.key)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Copy
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={expStatus.class}>{expStatus.text}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title={visibleKeys.has(key.id) ? "Hide key" : "View key"}
                      >
                        {visibleKeys.has(key.id) ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => initiateDelete(key)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Delete key"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
} 