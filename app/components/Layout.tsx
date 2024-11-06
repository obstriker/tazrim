"use client";

import React from 'react';
import { BarChart3, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen relative">
      <nav className="border-b border-purple-400/10 backdrop-blur-md bg-black/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-white">
                Annual Cashflow
              </span>
            </div>
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Welcome, {user.name}</span>
                <button className="text-gray-400 hover:text-white p-2 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white p-2 transition-colors">
                  <HelpCircle className="h-5 w-5" />
                </button>
                <button 
                  onClick={signOut}
                  className="inline-flex items-center bg-purple-600/20 text-purple-400 px-4 py-2 rounded-xl hover:bg-purple-600/30 transition-colors"
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