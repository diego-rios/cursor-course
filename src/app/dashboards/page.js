'use client';

import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';

import PlanCard from '@/components/dashboard/PlanCard';
import ApiKeysTable from '@/components/dashboard/ApiKeysTable';
import CreateKeyModal from '@/components/dashboard/CreateKeyModal';
import DeleteConfirmationModal from '@/components/dashboard/DeleteConfirmationModal';
import EmailAlerts from '@/components/dashboard/EmailAlerts';
import ContactSection from '@/components/dashboard/ContactSection';
import Notification from '@/components/common/Notification';

export default function ApiKeysDashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [alertThreshold, setAlertThreshold] = useState(90);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [expirationDays, setExpirationDays] = useState(30);
  const [monthlyLimit, setMonthlyLimit] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        showNotification('Failed to load API keys', 'error');
        throw error;
      }

      setApiKeys(data || []);
    } catch (error) {
      console.error('Error loading API keys:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const generateNewKey = async () => {
    if (!newKeyName.trim()) {
      showNotification('Please enter a key name', 'error');
      return;
    }
    
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + parseInt(expirationDays));
    
    const newKey = {
      name: newKeyName.trim(),
      key: `tvly-${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      expires_at: expirationDate.toISOString(),
      monthly_limit: monthlyLimit,
      usage: 0
    };

    try {
      const { data, error } = await supabase
        .from('api_keys')
        .insert([newKey])
        .select()
        .single();

      if (error) throw error;

      setApiKeys(prev => [data, ...prev]);
      setNewKeyName('');
      setMonthlyLimit(1000);
      setShowCreateModal(false);
      showNotification('API key created successfully');
    } catch (error) {
      console.error('Error creating API key:', error);
      showNotification('Failed to create API key', 'error');
    }
  };

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const startEditing = (key) => {
    setEditingKey(key.id);
    setEditName(key.name);
  };

  const saveEdit = async (id) => {
    if (!editName.trim()) {
      showNotification('Key name cannot be empty', 'error');
      return;
    }

    try {
      const { error } = await supabase
        .from('api_keys')
        .update({ name: editName.trim() })
        .eq('id', id);

      if (error) throw error;

      setApiKeys(apiKeys.map(key => {
        if (key.id === id) {
          return { ...key, name: editName.trim() };
        }
        return key;
      }));
      setEditingKey(null);
      showNotification('API key name updated successfully');
    } catch (error) {
      console.error('Error updating API key:', error);
      showNotification('Failed to update API key', 'error');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('API key copied to clipboard');
    } catch (err) {
      showNotification('Failed to copy to clipboard', 'error');
    }
  };

  const initiateDelete = (key) => {
    setDeleteConfirmation(key);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', deleteConfirmation.id);

      if (error) throw error;

      setApiKeys(apiKeys.filter(key => key.id !== deleteConfirmation.id));
      setVisibleKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(deleteConfirmation.id);
        return newSet;
      });
      setDeleteConfirmation(null);
      showNotification('API key deleted successfully', 'error');
    } catch (error) {
      console.error('Error deleting API key:', error);
      showNotification('Failed to delete API key', 'error');
    }
  };

  const isKeyExpired = (expiresAt) => {
    return new Date(expiresAt) < new Date();
  };

  const getExpirationStatus = (expiresAt) => {
    const now = new Date();
    const expDate = new Date(expiresAt);
    const daysLeft = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return { text: 'Expired', class: 'text-red-500' };
    if (daysLeft <= 7) return { text: `${daysLeft}d left`, class: 'text-orange-500' };
    return { text: `${daysLeft}d left`, class: 'text-green-500' };
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
      <Notification 
        notification={notification} 
        onClose={() => setNotification(null)} 
      />

      <DeleteConfirmationModal
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        confirmDelete={confirmDelete}
      />

      <CreateKeyModal
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        newKeyName={newKeyName}
        setNewKeyName={setNewKeyName}
        monthlyLimit={monthlyLimit}
        setMonthlyLimit={setMonthlyLimit}
        generateNewKey={generateNewKey}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <PlanCard apiKeys={apiKeys} />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 border-b dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
              <h2 className="text-lg sm:text-xl font-semibold">API Keys</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Create Key</span>
              </button>
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
              The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
            </p>
          </div>

          <div className="overflow-x-auto">
            <ApiKeysTable
              apiKeys={apiKeys}
              isLoading={isLoading}
              visibleKeys={visibleKeys}
              editingKey={editingKey}
              editName={editName}
              setEditName={setEditName}
              toggleKeyVisibility={toggleKeyVisibility}
              startEditing={startEditing}
              saveEdit={saveEdit}
              setEditingKey={setEditingKey}
              copyToClipboard={copyToClipboard}
              initiateDelete={initiateDelete}
              getExpirationStatus={getExpirationStatus}
              isKeyExpired={isKeyExpired}
            />
          </div>
        </div>

        <EmailAlerts
          alertThreshold={alertThreshold}
          setAlertThreshold={setAlertThreshold}
        />

        <ContactSection />
      </div>
    </div>
  );
} 