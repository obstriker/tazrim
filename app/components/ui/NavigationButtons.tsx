"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onBack: () => void;
  submitText?: string;
}

export function NavigationButtons({ onBack, submitText = 'Next Step' }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={onBack}
        className="btn-secondary"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous Step
      </button>
      <button
        type="submit"
        className="btn-primary"
      >
        {submitText}
        <ChevronRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
}