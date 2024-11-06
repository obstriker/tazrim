import React from 'react';
import { X } from 'lucide-react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
  showRemove?: boolean;
}

export function FormSection({ title, children, onRemove, showRemove = false }: FormSectionProps) {
  return (
    <div className="form-section">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        {showRemove && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-text-muted hover:text-red-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}