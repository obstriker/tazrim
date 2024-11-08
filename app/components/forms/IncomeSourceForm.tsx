"use client";

import React from 'react';
import { Plus, X } from 'lucide-react';
import { FormSection } from '../ui/FormSection';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';
import { NavigationButtons } from '../ui/NavigationButtons';

interface IncomeSource {
  id: string;
  name: string;
  type: string;
  frequency: string;
  amount: string;
}

interface IncomeSourceFormProps {
  source: IncomeSource;
  onUpdate: (id: string, field: keyof IncomeSource, value: string) => void;
  onRemove: () => void;
  showRemove: boolean;
  index: number;
}

const incomeTypes = [
  { value: 'sales', label: 'Sales Revenue' },
  { value: 'service', label: 'Service Revenue' },
  { value: 'recurring', label: 'Recurring Revenue' },
  { value: 'other', label: 'Other Income' },
];

const frequencyOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
  { value: 'variable', label: 'Variable' },
];

export function IncomeSourceForm({ source, onUpdate, onRemove, showRemove, index }: IncomeSourceFormProps) {
  return (
    <FormSection 
      title={`Income Source #${index + 1}`}
      onRemove={showRemove ? onRemove : undefined}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormInput
          label="Source Name"
          type="text"
          required
          value={source.name}
          onChange={(e) => onUpdate(source.id, 'name', e.target.value)}
          placeholder="e.g., Product Sales"
        />
        
        <FormSelect
          label="Income Type"
          required
          value={source.type}
          onChange={(e) => onUpdate(source.id, 'type', e.target.value)}
          options={incomeTypes}
        />
        
        <FormSelect
          label="Frequency"
          required
          value={source.frequency}
          onChange={(e) => onUpdate(source.id, 'frequency', e.target.value)}
          options={frequencyOptions}
        />
        
        <FormInput
          label="Amount"
          type="number"
          required
          min="0"
          step="0.01"
          value={source.amount}
          onChange={(e) => onUpdate(source.id, 'amount', e.target.value)}
          placeholder="0.00"
        />
      </div>
    </FormSection>
  );
}