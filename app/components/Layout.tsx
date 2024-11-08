"use client";

import React from 'react';
import { BarChart3, Settings, HelpCircle, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen relative">
      <nav className="border-b border-border-primary backdrop-blur-md bg-bg-card/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-accent" />
              <span className="ml-2 text-xl font-bold text-text-primary">
                Annual Cashflow
              </span>
            </div>
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-text-secondary">Welcome, {user.name}</span>
                <button 
                  onClick={toggleTheme}
                  className="text-text-secondary hover:text-text-primary p-2 transition-colors"
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </button>
                <button className="text-text-secondary hover:text-text-primary p-2 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <button className="text-text-secondary hover:text-text-primary p-2 transition-colors">
                  <HelpCircle className="h-5 w-5" />
                </button>
                <button 
                  onClick={signOut}
                  className="inline-flex items-center bg-accent/20 text-accent hover:bg-accent/30 px-4 py-2 rounded-xl transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="relative">{children}</main>
    </div>
  );
}