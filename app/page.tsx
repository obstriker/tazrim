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
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent shadow-lg shadow-accent/20"></div>
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
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-accent/20 text-accent mb-4 block
                           shadow-lg shadow-accent/10 backdrop-blur-sm">
              Financial Report Generator
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent
                         drop-shadow-sm">
            Generate Your Annual Financial Report
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
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