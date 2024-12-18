'use client';

import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function CreateKeyModal({
  showCreateModal,
  setShowCreateModal,
  newKeyName,
  setNewKeyName,
  monthlyLimit,
  setMonthlyLimit,
  generateNewKey
}) {
  if (!showCreateModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold">Create a new API key</h3>
          <button
            onClick={() => setShowCreateModal(false)}
            className="p-1 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enter a name and limit for the new API key.
        </p>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              Key Name
              <span className="text-gray-500">— A unique name to identify this key</span>
            </label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter key name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              Limit monthly usage
              <InformationCircleIcon className="h-4 w-4 text-gray-400" />
            </label>
            <input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            <p className="mt-1 text-sm text-gray-500">
              *If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={generateNewKey}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
} 