import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Wallet, ArrowLeftRight, Settings, Menu } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const sections = [
    { id: 'connect', label: 'Connect', icon: Wallet },
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transfer', label: 'Transfer', icon: ArrowLeftRight },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-mesh rounded-lg flex items-center justify-center">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold gradient-text">MeshFlow</h1>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={currentSection === section.id ? 'hero' : 'ghost'}
                onClick={() => onSectionChange(section.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{section.label}</span>
              </Button>
            );
          })}
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}