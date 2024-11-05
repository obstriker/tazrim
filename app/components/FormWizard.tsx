"use client"
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, DollarSign, Building2, Receipt, Calculator } from 'lucide-react';
import { BusinessInfoForm } from './forms/BusinessInfoForm';
import { IncomeSourcesForm } from './forms/IncomeSourcesForm';
import { ExpensesForm } from './forms/ExpensesForm';
import { TaxSummaryForm } from './forms/TaxSummaryForm';

const steps = [
  { id: 'business', label: 'Business Info', icon: Building2 },
  { id: 'income', label: 'Income Sources', icon: DollarSign },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'tax', label: 'Tax Details', icon: Calculator },
];

export function FormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    business: {},
    income: { sources: [] },
    expenses: { expenses: [] },
    tax: {}
  });

  const handleNext = (stepData: any) => {
    setFormData(prev => ({
      ...prev,
      [steps[currentStep].id]: stepData
    }));
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`relative ${
                  index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full ${
                      index <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="absolute top-6 left-12 h-0.5 w-full bg-gray-200">
                      {index < currentStep && (
                        <div className="h-full w-full bg-blue-600" />
                      )}
                    </div>
                  )}
                </div>
                <span className="absolute left-0 top-14 w-32 text-center text-sm font-medium text-gray-500">
                  {step.label}
                </span>
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
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}