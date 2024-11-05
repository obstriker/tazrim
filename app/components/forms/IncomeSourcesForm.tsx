import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

interface IncomeSource {
  id: string;
  name: string;
  type: string;
  frequency: string;
  amount: string;
}

interface IncomeData {
  sources: IncomeSource[];
}

interface IncomeSourcesFormProps {
  initialData: IncomeData;
  onNext: (data: IncomeData) => void;
  onBack: () => void;
}

export function IncomeSourcesForm({ initialData, onNext, onBack }: IncomeSourcesFormProps) {
  const [sources, setSources] = useState<IncomeSource[]>(
    initialData.sources.length > 0 ? initialData.sources : [createEmptySource()]
  );

  function createEmptySource(): IncomeSource {
    return {
      id: crypto.randomUUID(),
      name: '',
      type: '',
      frequency: '',
      amount: ''
    };
  }

  const addSource = () => {
    setSources(prev => [...prev, createEmptySource()]);
  };

  const removeSource = (id: string) => {
    setSources(prev => prev.filter(source => source.id !== id));
  };

  const updateSource = (id: string, field: keyof IncomeSource, value: string) => {
    setSources(prev =>
      prev.map(source =>
        source.id === id ? { ...source, [field]: value } : source
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ sources });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {sources.map((source, index) => (
          <div
            key={source.id}
            className="p-6 bg-gray-50 rounded-lg border border-gray-200 relative"
          >
            <div className="absolute right-4 top-4">
              {sources.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSource(source.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Income Source #{index + 1}
            </h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source Name
                </label>
                <input
                  type="text"
                  required
                  value={source.name}
                  onChange={e => updateSource(source.id, 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Product Sales"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Income Type
                </label>
                <select
                  required
                  value={source.type}
                  onChange={e => updateSource(source.id, 'type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="sales">Sales Revenue</option>
                  <option value="service">Service Revenue</option>
                  <option value="recurring">Recurring Revenue</option>
                  <option value="other">Other Income</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  required
                  value={source.frequency}
                  onChange={e => updateSource(source.id, 'frequency', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select frequency</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                  <option value="variable">Variable</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={source.amount}
                  onChange={e => updateSource(source.id, 'amount', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSource}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Income Source
      </button>

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