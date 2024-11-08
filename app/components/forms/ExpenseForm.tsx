"use client";

import React from 'react';
import { FormSection } from '../ui/FormSection';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';

interface Expense {
  id: string;
  category: string;
  description: string;
  frequency: string;
  amount: string;
}

interface ExpenseFormProps {
  expense: Expense;
  onUpdate: (id: string, field: keyof Expense, value: string) => void;
  onRemove: () => void;
  showRemove: boolean;
  index: number;
}

const categories = [
  { value: 'rent', label: 'Rent/Lease' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'payroll', label: 'Payroll' },
  { value: 'supplies', label: 'Supplies' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'other', label: 'Other' },
];

const frequencyOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
  { value: 'variable', label: 'Variable' },
];

export function ExpenseForm({ expense, onUpdate, onRemove, showRemove, index }: ExpenseFormProps) {
  return (
    <FormSection 
      title={`Expense #${index + 1}`}
      onRemove={showRemove ? onRemove : undefined}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormSelect
          label="Category"
          required
          value={expense.category}
          onChange={(e) => onUpdate(expense.id, 'category', e.target.value)}
          options={categories}
        />
        
        <FormInput
          label="Description"
          type="text"
          required
          value={expense.description}
          onChange={(e) => onUpdate(expense.id, 'description', e.target.value)}
          placeholder="Brief description"
        />
        
        <FormSelect
          label="Frequency"
          required
          value={expense.frequency}
          onChange={(e) => onUpdate(expense.id, 'frequency', e.target.value)}
          options={frequencyOptions}
        />
        
        <FormInput
          label="Amount"
          type="number"
          required
          min="0"
          step="0.01"
          value={expense.amount}
          onChange={(e) => onUpdate(expense.id, 'amount', e.target.value)}
          placeholder="0.00"
        />
      </div>
    </FormSection>
  );
}