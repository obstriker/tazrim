import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

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
          <div
            key={expense.id}
            className="p-6 bg-gray-50 rounded-lg border border-gray-200 relative"
          >
            <div className="absolute right-4 top-4">
              {expenses.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExpense(expense.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Expense #{index + 1}
            </h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  required
                  value={expense.category}
                  onChange={e => updateExpense(expense.id, 'category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="rent">Rent/Lease</option>
                  <option value="utilities">Utilities</option>
                  <option value="payroll">Payroll</option>
                  <option value="supplies">Supplies</option>
                  <option value="marketing">Marketing</option>
                  <option value="insurance">Insurance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  required
                  value={expense.description}
                  onChange={e => updateExpense(expense.id, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  required
                  value={expense.frequency}
                  onChange={e => updateExpense(expense.id, 'frequency', e.target.value)}
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
                  value={expense.amount}
                  onChange={e => updateExpense(expense.id, 'amount', e.target.value)}
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
        onClick={addExpense}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Expense
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