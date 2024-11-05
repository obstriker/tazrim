import React from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import axios from 'axios';

interface TaxSummaryFormProps {
  formData: any;
  onBack: () => void;
}

export function TaxSummaryForm({ formData, onBack }: TaxSummaryFormProps) {
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

  const handleDownloadReport = async () => {
    const reportData = {
      totalIncome,
      totalExpenses,
      netIncome,
      estimatedTax,
      businessDetails: formData.business,
    };

    try {
      console.log(reportData);
      const response = await axios.post('http://localhost:3000/api/report', reportData, {
        responseType: 'blob', // Important for handling binary data
      });

      // Create a URL for the blob and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.csv'); // Specify the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the report:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Annual Summary</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-600">Total Annual Income</div>
              <div className="text-2xl font-bold text-gray-900">
                ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-600">Total Annual Expenses</div>
              <div className="text-2xl font-bold text-gray-900">
                ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-600">Net Income</div>
              <div className="text-2xl font-bold text-gray-900">
                ${netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-600">Estimated Tax (25%)</div>
              <div className="text-2xl font-bold text-gray-900">
                ${estimatedTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Details</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <div className="text-sm text-gray-600">Business Name</div>
            <div className="text-lg font-medium text-gray-900">{formData.business.businessName}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Business Type</div>
            <div className="text-lg font-medium text-gray-900">{formData.business.businessType}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Fiscal Year Start</div>
            <div className="text-lg font-medium text-gray-900">{formData.business.fiscalYearStart}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Currency</div>
            <div className="text-lg font-medium text-gray-900">{formData.business.currency}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous Step
        </button>
        <button
          type="button"
          onClick={handleDownloadReport}
          className="btn-primary"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </button>
      </div>
    </div>
  );
}