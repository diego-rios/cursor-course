'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { KeyIcon } from '@heroicons/react/24/outline';

export default function ApiPlayground() {
  const [apiKey, setApiKey] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    
    try {
      // Store the API key in sessionStorage for validation
      sessionStorage.setItem('api_key_to_validate', apiKey.trim());
      router.push('/protected-page');
    } catch (error) {
      console.error('Error storing API key:', error);
      // You might want to show an error message to the user here
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
        <div className="max-w-[800px] mx-auto p-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <div className="max-w-md mx-auto text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
      <div className="max-w-[800px] mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <KeyIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-semibold mb-2">API Key Validation</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your API key below to validate its authenticity and access status.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="apiKey"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  API Key
                </label>
                <input
                  id="apiKey"
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Validate Key
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an API key? 
              <a href="/dashboards" className="text-blue-500 hover:text-blue-600 ml-1">
                Generate one here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 