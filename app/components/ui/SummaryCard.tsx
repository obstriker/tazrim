"use client";

import React from 'react';

interface SummaryCardProps {
  label: string;
  value: string | number;
  formatter?: (value: number) => string;
}

export function SummaryCard({ label, value, formatter }: SummaryCardProps) {
  const formattedValue = typeof value === 'number' && formatter 
    ? formatter(value)
    : value;

  return (
    <div className="summary-card">
      <div className="text-sm text-text-secondary">{label}</div>
      <div className="text-2xl font-bold text-text-primary">
        {formattedValue}
      </div>
    </div>
  );
}