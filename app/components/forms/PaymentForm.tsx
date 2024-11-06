import React, { useState } from 'react';
import { ChevronLeft, CreditCard } from 'lucide-react';

interface PaymentFormProps {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function PaymentForm({ formData, onNext, onBack }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onNext({ status: 'paid' });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div className="form-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">Payment Details</h3>
          <CreditCard className="h-6 w-6 text-purple-500" />
        </div>

        <div className="space-y-4">
          <div>
            <label className="form-label">Card Number</label>
            <input
              type="text"
              className="form-input"
              placeholder="4242 4242 4242 4242"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Expiry Date</label>
              <input
                type="text"
                className="form-input"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div>
              <label className="form-label">CVC</label>
              <input
                type="text"
                className="form-input"
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Name on Card</label>
            <input
              type="text"
              className="form-input"
              placeholder="John Doe"
            />
          </div>
        </div>
      </div>

      <div className="summary-card">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Report Cost</span>
          <span className="text-white">$49.99</span>
        </div>
        <div className="flex justify-between font-medium">
          <span className="text-gray-400">Total</span>
          <span className="text-white">$49.99</span>
        </div>
      </div>

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
          disabled={isProcessing}
          className="btn-primary"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>
      </div>
    </form>
  );
}