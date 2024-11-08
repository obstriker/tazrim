"use client";

import React from 'react';
import { Layout } from './components/Layout';
import { FormWizard } from './components/FormWizard';
import { LoginForm } from './components/LoginForm';
import { useAuth } from './contexts/AuthContext';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-500 border-t-transparent"></div>
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
          <div className="inline-block">
            <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 mb-4 block">
              Financial Report Generator
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Generate Your Annual Financial Report
          </h1>
          <p className="text-lg text-text-primary-200 max-w-2xl mx-auto">
            Answer a few questions about your business finances, and we'll create a
            comprehensive Excel report showing your annual cash flow.
          </p>
        </header>

        <div className="gradient-border">
          <div className="glass-card rounded-2xl p-8">
            <FormWizard />
          </div>
        </div>
      </div>
    </Layout>
  );
}