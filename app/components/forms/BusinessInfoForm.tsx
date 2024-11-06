import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';

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

const businessTypes = [
  { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
  { value: 'llc', label: 'LLC' },
  { value: 'corporation', label: 'Corporation' },
];

const currencies = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
];

export function BusinessInfoForm({ initialData, onNext }: BusinessInfoFormProps) {
  const [formData, setFormData] = useState<BusinessData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormInput
          label="Business Name"
          type="text"
          required
          value={formData.businessName || ''}
          onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
          placeholder="Enter business name"
        />
        
        <FormSelect
          label="Business Type"
          required
          value={formData.businessType || ''}
          onChange={e => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
          options={businessTypes}
        />
        
        <FormInput
          label="Fiscal Year Start"
          type="date"
          required
          value={formData.fiscalYearStart || ''}
          onChange={e => setFormData(prev => ({ ...prev, fiscalYearStart: e.target.value }))}
        />
        
        <FormSelect
          label="Currency"
          required
          value={formData.currency || ''}
          onChange={e => setFormData(prev => ({ ...prev, currency: e.target.value }))}
          options={currencies}
        />
      </div>

      <div className="flex justify-end mt-8">
        <button type="submit" className="btn-primary">
          Next Step
          <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </form>
  );
}