'use client';

export default function PlanCard({ apiKeys }) {
  return (
    <div className="rounded-xl p-8 mb-8 bg-gradient-to-r from-rose-200 via-purple-200 to-blue-200 dark:from-rose-900 dark:via-purple-900 dark:to-blue-900">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-sm font-medium mb-2">CURRENT PLAN</div>
          <h2 className="text-3xl font-semibold">Researcher</h2>
        </div>
        <button className="bg-white/10 hover:bg-white/20 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Manage Plan
        </button>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">API Limit</span>
            <span className="text-gray-600 text-sm">ⓘ</span>
          </div>
          <span className="text-sm">{apiKeys.reduce((acc, key) => acc + key.usage, 0)}/1,000 Requests</span>
        </div>
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/80" 
            style={{ width: `${(apiKeys.reduce((acc, key) => acc + key.usage, 0) / 1000) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
} 