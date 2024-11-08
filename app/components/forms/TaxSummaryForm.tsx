"use client";

import React from 'react';
import { Download } from 'lucide-react';
import { NavigationButtons } from '../ui/NavigationButtons';
import { SummaryCard } from '../ui/SummaryCard';
import { FormSection } from '../ui/FormSection';

interface TaxSummaryFormProps {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function TaxSummaryForm({ formData, onNext, onBack }: TaxSummaryFormProps) {
  const calculateTotalIncome = () => {
    return formData.income.sources.reduce((total: number, source: any) => {
      const amount = parseFloat(source.amount);
      const multiplier = source.frequency === 'monthly' ? 12 : source.frequency === 'quarterly' ? 4 : 1;
      return total + (amount * multiplier);
    }, 0);
  };

  const calculateTotalExpenses = () => {
    return formData.expenses.expenses.reduce((total: number, expense: any) => {
      const amount = parseFloat(expense.amount);
      const multiplier = expense.frequency === 'monthly' ? 12 : expense.frequency === 'quarterly' ? 4 : 1;
      return total + (amount * multiplier);
    }, 0);
  };

  const totalIncome = calculateTotalIncome();
  const totalExpenses = calculateTotalExpenses();
  const netIncome = totalIncome - totalExpenses;
  const estimatedTax = netIncome * 0.25; // Simplified tax calculation

  const currencyFormatter = (value: number) => 
    `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      totalIncome,
      totalExpenses,
      netIncome,
      estimatedTax
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormSection title="Annual Summary">
        <div className="grid grid-cols-2 gap-4">
          <SummaryCard
            label="Total Annual Income"
            value={totalIncome}
            formatter={currencyFormatter}
          />
          <SummaryCard
            label="Total Annual Expenses"
            value={totalExpenses}
            formatter={currencyFormatter}
          />
          <SummaryCard
            label="Net Income"
            value={netIncome}
            formatter={currencyFormatter}
          />
          <SummaryCard
            label="Estimated Tax (25%)"
            value={estimatedTax}
            formatter={currencyFormatter}
          />
        </div>
      </FormSection>

      <FormSection title="Business Details">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <div className="text-sm text-text-secondary">Business Name</div>
            <div className="text-lg font-medium text-text-primary">
              {formData.business.businessName}
            </div>
          </div>
          <div>
            <div className="text-sm text-text-secondary">Business Type</div>
            <div className="text-lg font-medium text-text-primary">
              {formData.business.businessType}
            </div>
          </div>
          <div>
            <div className="text-sm text-text-secondary">Fiscal Year Start</div>
            <div className="text-lg font-medium text-text-primary">
              {formData.business.fiscalYearStart}
            </div>
          </div>
          <div>
            <div className="text-sm text-text-secondary">Currency</div>
            <div className="text-lg font-medium text-text-primary">
              {formData.business.currency}
            </div>
          </div>
        </div>
      </FormSection>

      <NavigationButtons 
        onBack={onBack}
        submitText="Continue to Payment"
      />
    </form>
  );
}