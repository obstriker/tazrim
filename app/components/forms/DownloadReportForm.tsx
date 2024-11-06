import React from 'react';
import { Download } from 'lucide-react';
import axios from 'axios';

interface DownloadReportFormProps {
  formData: any;
  onBack: () => void;
}

export function DownloadReportForm({ formData }: DownloadReportFormProps) {
  const handleDownload = async () => {
    const reportData = {
      totalIncome: formData.tax.totalIncome,
      totalExpenses: formData.tax.totalExpenses,
      netIncome: formData.tax.netIncome,
      estimatedTax: formData.tax.estimatedTax,
      businessDetails: formData.business,
    };

    try {
      const response = await axios.post('/api/report', reportData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'financial_report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the report:', error);
    }
  };

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Download className="h-8 w-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">Your Report is Ready!</h2>
      <p className="text-gray-400 mb-8">Click the button below to download your financial report.</p>
      <button
        onClick={handleDownload}
        className="btn-primary mx-auto"
      >
        <Download className="mr-2 h-5 w-5" />
        Download Report
      </button>
    </div>
  );
}