'use client';

export default function PlanCard({ apiKeys }) {
  const totalUsage = apiKeys.reduce((sum, key) => sum + key.usage, 0);
  const totalLimit = apiKeys.reduce((sum, key) => sum + key.monthly_limit, 0);
  const usagePercentage = totalLimit > 0 ? (totalUsage / totalLimit) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-semibold mb-1">Researcher</h2>
          <p className="text-sm sm:text-base opacity-90">
            Your current plan includes {totalLimit.toLocaleString()} API calls per month
          </p>
        </div>
        <div className="flex flex-col sm:items-end">
          <div className="text-sm sm:text-base font-medium mb-2">API Usage</div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 sm:w-32 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
            <span className="text-sm whitespace-nowrap">
              {Math.round(usagePercentage)}%
            </span>
          </div>
          <div className="text-xs sm:text-sm mt-1 opacity-90">
            {totalUsage.toLocaleString()} / {totalLimit.toLocaleString()} calls
          </div>
        </div>
      </div>
    </div>
  );
} 