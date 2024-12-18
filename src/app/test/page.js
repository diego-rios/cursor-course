'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestPage() {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const addTestResult = (operation, success, message) => {
    setTestResults(prev => [...prev, { operation, success, message, timestamp: new Date().toISOString() }]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    let testKey = null;

    try {
      // Test 1: Create
      addTestResult('CREATE', true, 'Starting create test...');
      const newKey = {
        name: 'Test Key ' + new Date().toISOString(),
        key: `test-${Math.random().toString(36).substring(2)}`,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        monthly_limit: 1000
      };

      const { data: createData, error: createError } = await supabase
        .from('api_keys')
        .insert([newKey])
        .select()
        .single();

      if (createError) throw new Error(`Create failed: ${createError.message}`);
      testKey = createData;
      addTestResult('CREATE', true, `Successfully created key with ID: ${createData.id}`);

      // Test 2: Read
      addTestResult('READ', true, 'Starting read test...');
      const { data: readData, error: readError } = await supabase
        .from('api_keys')
        .select('*')
        .eq('id', testKey.id)
        .single();

      if (readError) throw new Error(`Read failed: ${readError.message}`);
      addTestResult('READ', true, `Successfully read key: ${readData.name}`);

      // Test 3: Update
      addTestResult('UPDATE', true, 'Starting update test...');
      const updatedName = 'Updated Test Key ' + new Date().toISOString();
      const { error: updateError } = await supabase
        .from('api_keys')
        .update({ name: updatedName })
        .eq('id', testKey.id);

      if (updateError) throw new Error(`Update failed: ${updateError.message}`);
      addTestResult('UPDATE', true, `Successfully updated key name to: ${updatedName}`);

      // Test 4: Delete
      addTestResult('DELETE', true, 'Starting delete test...');
      const { error: deleteError } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', testKey.id);

      if (deleteError) throw new Error(`Delete failed: ${deleteError.message}`);
      addTestResult('DELETE', true, 'Successfully deleted test key');

    } catch (error) {
      addTestResult(error.operation || 'ERROR', false, error.message);
      
      // Cleanup: Try to delete the test key if it exists and wasn't already deleted
      if (testKey && error.operation !== 'DELETE') {
        try {
          await supabase.from('api_keys').delete().eq('id', testKey.id);
        } catch (cleanupError) {
          addTestResult('CLEANUP', false, 'Failed to cleanup test key');
        }
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Supabase Connection Tests</h1>
            <button
              onClick={runTests}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg ${
                isRunning
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isRunning ? 'Running Tests...' : 'Run Tests'}
            </button>
          </div>

          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  result.success
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900'
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-mono text-sm">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </span>
                  <span className={`font-medium ${
                    result.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {result.operation}
                  </span>
                </div>
                <p className="mt-1 text-gray-600 dark:text-gray-300">{result.message}</p>
              </div>
            ))}

            {testResults.length === 0 && !isRunning && (
              <p className="text-gray-500 text-center py-4">
                Click "Run Tests" to start testing Supabase connection
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 