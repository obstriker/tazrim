import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface BusinessData {
  businessName?: string;
  businessType?: string;
  fiscalYearStart?: string;
  currency?: string;
}

interface BusinessInfoFormProps {
  initialData: BusinessData;
  onNext: (data: BusinessData) => void;
}

export function BusinessInfoForm({ initialData, onNext }: BusinessInfoFormProps) {
  const [formData, setFormData] = useState<BusinessData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Business Name
          </label>
          <input
            type="text"
            required
            value={formData.businessName || ''}
            onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter business name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Business Type
          </label>
          <select
            required
            value={formData.businessType || ''}
            onChange={e => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select type</option>
            <option value="sole-proprietorship">Sole Proprietorship</option>
            <option value="llc">LLC</option>
            <option value="corporation">Corporation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Fiscal Year Start
          </label>
          <input
            type="date"
            required
            value={formData.fiscalYearStart || ''}
            onChange={e => setFormData(prev => ({ ...prev, fiscalYearStart: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Currency
          </label>
          <select
            required
            value={formData.currency || ''}
            onChange={e => setFormData(prev => ({ ...prev, currency: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select currency</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="btn-primary"
        >
          Next Step
          <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </form>
  );
}