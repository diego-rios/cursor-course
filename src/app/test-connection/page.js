'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestConnection() {
  const [status, setStatus] = useState('Testing connection...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test the connection by selecting from the api_keys table
        const { data, error } = await supabase
          .from('api_keys')
          .select('id');

        if (error) throw error;
        
        setStatus(`Connection successful! Table exists and is accessible.`);
      } catch (err) {
        console.error('Connection error:', err);
        setError(err.message);
        setStatus('Connection failed');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-4">Supabase Connection Test</h1>
        
        <div className={`p-4 rounded-lg ${
          error 
            ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900' 
            : status.includes('successful')
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900'
              : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900'
        }`}>
          <p className="font-medium">Status: {status}</p>
          {error && (
            <p className="mt-2 text-red-600 dark:text-red-400 text-sm">
              Error: {error}
            </p>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          <h2 className="font-medium text-base mb-2">Environment Variables:</h2>
          <p>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing'}</p>
          <p>SUPABASE_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'}</p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h2 className="font-medium text-base mb-2">Next Steps:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>If connection fails, verify your Supabase URL and key</li>
            <li>Make sure the api_keys table exists in your database</li>
            <li>Check if RLS (Row Level Security) policies are configured correctly</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 