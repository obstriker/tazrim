"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ExpenseForm } from './ExpenseForm';
import { NavigationButtons } from '../ui/NavigationButtons';

interface Expense {
  id: string;
  category: string;
  description: string;
  frequency: string;
  amount: string;
}

interface ExpensesData {
  expenses: Expense[];
}

interface ExpensesFormProps {
  initialData: ExpensesData;
  onNext: (data: ExpensesData) => void;
  onBack: () => void;
}

export function ExpensesForm({ initialData, onNext, onBack }: ExpensesFormProps) {
  const [expenses, setExpenses] = useState<Expense[]>(
    initialData.expenses?.length > 0 ? initialData.expenses : [createEmptyExpense()]
  );

  function createEmptyExpense(): Expense {
    return {
      id: crypto.randomUUID(),
      category: '',
      description: '',
      frequency: '',
      amount: ''
    };
  }

  const addExpense = () => {
    setExpenses(prev => [...prev, createEmptyExpense()]);
  };

  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateExpense = (id: string, field: keyof Expense, value: string) => {
    setExpenses(prev =>
      prev.map(expense =>
        expense.id === id ? { ...expense, [field]: value } : expense
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ expenses });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {expenses.map((expense, index) => (
          <ExpenseForm
            key={expense.id}
            expense={expense}
            onUpdate={updateExpense}
            onRemove={() => removeExpense(expense.id)}
            showRemove={expenses.length > 1}
            index={index}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addExpense}
        className="btn-secondary"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Expense
      </button>

      <NavigationButtons onBack={onBack} />
    </form>
  );
}