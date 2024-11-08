"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { IncomeSourceForm } from './IncomeSourceForm';
import { NavigationButtons } from '../ui/NavigationButtons';

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
          <IncomeSourceForm
            key={source.id}
            source={source}
            onUpdate={updateSource}
            onRemove={() => removeSource(source.id)}
            showRemove={sources.length > 1}
            index={index}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addSource}
        className="btn-secondary"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Income Source
      </button>

      <NavigationButtons onBack={onBack} />
    </form>
  );
}