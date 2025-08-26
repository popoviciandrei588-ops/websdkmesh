import React, { useState } from 'react';
import { MeshProvider } from '@/components/mesh/MeshProvider';
import { MeshConnect } from '@/components/mesh/MeshConnect';
import { AccountGrid } from '@/components/dashboard/AccountGrid';
import { TransferInterface } from '@/components/dashboard/TransferInterface';
import { Navigation } from '@/components/layout/Navigation';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('connect');

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <AccountGrid />;
      case 'transfer':
        return <TransferInterface />;
      default:
        return <MeshConnect />;
    }
  };

  return (
    <MeshProvider>
      <div className="min-h-screen bg-background">
        <Navigation 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
        />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {renderContent()}
        </main>
      </div>
    </MeshProvider>
  );
};

export default Index;
