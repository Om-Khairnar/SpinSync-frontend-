'use client';

import { ReactNode, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';

interface NavigationLayoutProps {
  children: ReactNode;
}

export function NavigationLayout({ children }: NavigationLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="pt-16">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} p-6 min-h-[calc(100vh-4rem)]`}>
          {children}
        </main>
      </div>
    </div>
  );
}