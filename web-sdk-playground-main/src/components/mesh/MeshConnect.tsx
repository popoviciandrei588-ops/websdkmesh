import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DemoNotice } from '@/components/demo/DemoNotice';
import { useMesh } from './MeshProvider';
import { useToast } from '@/hooks/use-toast';
import { Wallet, CreditCard, Building2, Shield, Zap, Globe } from 'lucide-react';

export function MeshConnect() {
  const { addAccount, setLoading } = useMesh();
  const { toast } = useToast();

  const handleConnectAccount = useCallback(async () => {
    try {
      setLoading(true);
      
      // For demo purposes, simulate successful connection after 2 seconds
      setTimeout(() => {
        const mockAccount = {
          id: `account_${Date.now()}`,
          name: `Demo Account ${Math.floor(Math.random() * 100)}`,
          type: Math.random() > 0.5 ? 'crypto' as const : 'bank' as const,
          balance: Math.floor(Math.random() * 50000) + 1000,
          currency: Math.random() > 0.5 ? 'BTC' : 'USD',
          institution: Math.random() > 0.5 ? 'Coinbase Pro' : 'Chase Bank',
          accountNumber: `****${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
        };
        
        addAccount(mockAccount);
        setLoading(false);
        
        toast({
          title: "Account Connected!",
          description: `Successfully connected your ${mockAccount.institution} account.`,
        });
      }, 2000);

    } catch (error) {
      console.error('Error connecting account:', error);
      toast({
        title: "Connection Failed",
        description: "Unable to connect account. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  }, [addAccount, setLoading, toast]);

  return (
    <div className="space-y-8">
      <DemoNotice />
      
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold gradient-text">
            Connect Your Financial World
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Securely link your bank accounts and crypto wallets with our cutting-edge integration platform
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleConnectAccount}
            variant="hero"
            size="xl"
            className="group"
          >
            <Wallet className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Connect Your First Account
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card variant="glass" className="group hover:shadow-glow transition-all duration-300">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-lg">Bank-Level Security</CardTitle>
            <CardDescription>
              256-bit encryption and advanced security protocols protect your data
            </CardDescription>
          </CardHeader>
        </Card>

        <Card variant="glass" className="group hover:shadow-glow transition-all duration-300">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-lg">Instant Connection</CardTitle>
            <CardDescription>
              Connect to thousands of financial institutions in seconds
            </CardDescription>
          </CardHeader>
        </Card>

        <Card variant="glass" className="group hover:shadow-glow transition-all duration-300">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-lg">Global Coverage</CardTitle>
            <CardDescription>
              Support for banks and crypto exchanges worldwide
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Supported Institutions */}
      <Card variant="gradient" className="p-8">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold">Supported Institutions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/10">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-medium">Banks</span>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/10">
              <CreditCard className="h-6 w-6 text-secondary" />
              <span className="font-medium">Credit Cards</span>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/10">
              <Wallet className="h-6 w-6 text-accent" />
              <span className="font-medium">Crypto Wallets</span>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/10">
              <Globe className="h-6 w-6 text-primary-light" />
              <span className="font-medium">Exchanges</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}