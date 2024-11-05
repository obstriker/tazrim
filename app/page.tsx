"use client";

import React from 'react';
import { Layout } from './components/Layout';
import { FormWizard } from './components/FormWizard';
import { LoginForm } from './components/LoginForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Your Annual Financial Report
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answer a few questions about your business finances, and we'll create a
            comprehensive Excel report showing your annual cash flow.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <FormWizard />
        </div>
      </div>
    </Layout>
  );
}

export default Home;