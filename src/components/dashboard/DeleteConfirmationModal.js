'use client';

export default function DeleteConfirmationModal({
  deleteConfirmation,
  setDeleteConfirmation,
  confirmDelete
}) {
  if (!deleteConfirmation) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Delete API Key</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete the API key "{deleteConfirmation.name}"? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setDeleteConfirmation(null)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 