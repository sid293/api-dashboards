'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onHamburgerClick={() => setSidebarOpen((open) => !open)} />
      <div className="flex pt-16 justify-center">
        <div
          className={`fixed inset-0 z-20 bg-black bg-opacity-40 transition-opacity md:hidden ${
            sidebarOpen ? 'block' : 'hidden'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <aside
          className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onToggle={() => setSidebarOpen(false)} />
        </aside>
        <main
          className={`flex-1 transition-all duration-300 p-6 w-full max-w-7xl transform ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
} 