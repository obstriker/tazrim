'use client';
import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Building2,
  Receipt,
  Calculator,
  CreditCard,
  Download,
} from 'lucide-react';
import { BusinessInfoForm } from './forms/BusinessInfoForm';
import { IncomeSourcesForm } from './forms/IncomeSourcesForm';
import { ExpensesForm } from './forms/ExpensesForm';
import { TaxSummaryForm } from './forms/TaxSummaryForm';
import { PaymentForm } from './forms/PaymentForm';
import { DownloadReportForm } from './forms/DownloadReportForm';

const steps = [
  { id: 'business', label: 'Business Info', icon: Building2 },
  { id: 'income', label: 'Income Sources', icon: DollarSign },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'tax', label: 'Tax Details', icon: Calculator },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'download', label: 'Download', icon: Download },
];

export function FormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    business: {},
    income: { sources: [] },
    expenses: { expenses: [] },
    tax: {},
    payment: {},
  });

  const handleNext = (stepData: any) => {
    setFormData((prev) => ({
      ...prev,
      [steps[currentStep].id]: stepData,
    }));
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <div className="mb-16">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center">
            {steps.map((step, index) => (
              <li key={step.id} className="relative" style={{ width: '150px' }}>
                <div className="flex flex-col items-center">
                  {index !== steps.length - 1 && (
                    <div 
                      className="absolute left-[50%] top-7 w-[calc(150px)] h-0.5 bg-gray-800"
                      style={{ transform: 'translateX(25%)' }}
                    >
                      {index < currentStep && (
                        <div className="h-full w-full bg-purple-600" />
                      )}
                    </div>
                  )}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl mb-4 relative z-10
                      ${
                        index <= currentStep
                          ? 'bg-purple-600 text-text-primary shadow-lg shadow-purple-600/30'
                          : 'bg-primary text-text-primary border border-purple-400/10'
                      }`}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary text-center absolute -bottom-6 w-full">
                    {step.label}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="mt-16">
        {currentStep === 0 && (
          <BusinessInfoForm
            initialData={formData.business}
            onNext={handleNext}
          />
        )}
        {currentStep === 1 && (
          <IncomeSourcesForm
            initialData={formData.income}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 2 && (
          <ExpensesForm
            initialData={formData.expenses}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <TaxSummaryForm
            formData={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <PaymentForm
            formData={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 5 && (
          <DownloadReportForm
            formData={formData}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}