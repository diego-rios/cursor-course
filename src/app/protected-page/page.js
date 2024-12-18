'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function ProtectedPage() {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const validateApiKey = async () => {
      try {
        let apiKey;
        try {
          apiKey = sessionStorage.getItem('api_key_to_validate');
        } catch (e) {
          console.error('Error accessing sessionStorage:', e);
          setError('Unable to access session storage');
          setIsValidating(false);
          return;
        }

        if (!apiKey) {
          setError('No API key provided');
          setIsValidating(false);
          return;
        }

        // Query Supabase to check if the API key exists and is not expired
        const { data, error } = await supabase
          .from('api_keys')
          .select('*')
          .eq('key', apiKey)
          .single();

        if (error) throw error;

        if (!data) {
          setIsValid(false);
          setError('Invalid API key');
        } else {
          // Check if the key is expired
          const isExpired = new Date(data.expires_at) < new Date();
          if (isExpired) {
            setIsValid(false);
            setError('API key has expired');
          } else {
            setIsValid(true);
          }
        }
      } catch (err) {
        console.error('Error validating API key:', err);
        setError('Failed to validate API key');
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    if (mounted) {
      validateApiKey();
    }
  }, [mounted]);

  const handleBack = () => {
    try {
      sessionStorage.removeItem('api_key_to_validate');
    } catch (e) {
      console.error('Error clearing sessionStorage:', e);
    }
    router.push('/playground');
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
          <div className="max-w-md mx-auto text-center">
            {isValidating ? (
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-gray-600 dark:text-gray-400">Validating API key...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  {isValid ? (
                    <CheckCircleIcon className="w-16 h-16 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-16 h-16 text-red-500" />
                  )}
                </div>

                <h1 className="text-2xl font-semibold">
                  {isValid ? (
                    <span className="text-green-500">Valid API Key</span>
                  ) : (
                    <span className="text-red-500">Invalid API Key</span>
                  )}
                </h1>

                <p className="text-gray-600 dark:text-gray-400">
                  {isValid
                    ? 'Your API key is valid and active.'
                    : error || 'The provided API key is not valid.'}
                </p>

                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Another Key
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 