'use client';

export default function EmailAlerts({ alertThreshold, setAlertThreshold }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Email usage alerts</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        An alert will be sent to your email when your monthly usage reaches the set threshold.
      </p>
      
      <div className="flex items-center gap-4">
        <span>Your alert threshold is currently set to:</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={alertThreshold}
            onChange={(e) => setAlertThreshold(e.target.value)}
            className="w-20 px-3 py-1.5 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
          <span>%</span>
        </div>
        <span className="text-green-500">Enabled</span>
      </div>
    </div>
  );
} 