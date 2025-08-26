import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMesh } from '@/components/mesh/MeshProvider';
import { Wallet, Building2, TrendingUp, TrendingDown, MoreHorizontal, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function AccountGrid() {
  const { connectedAccounts, removeAccount } = useMesh();
  const [hiddenBalances, setHiddenBalances] = useState<Set<string>>(new Set());

  const toggleBalanceVisibility = (accountId: string) => {
    setHiddenBalances(prev => {
      const newSet = new Set(prev);
      if (newSet.has(accountId)) {
        newSet.delete(accountId);
      } else {
        newSet.add(accountId);
      }
      return newSet;
    });
  };

  const formatBalance = (balance: number, currency: string) => {
    if (currency === 'BTC') {
      return `₿${(balance / 100000).toFixed(4)}`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(balance);
  };

  if (connectedAccounts.length === 0) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Wallet className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No Connected Accounts</h3>
          <p className="text-muted-foreground">
            Connect your first account to get started with managing your finances
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Connected Accounts</h2>
          <p className="text-muted-foreground">
            {connectedAccounts.length} account{connectedAccounts.length > 1 ? 's' : ''} connected
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <p className="text-2xl font-bold gradient-text">
            ${connectedAccounts.reduce((total, account) => {
              const balance = account.currency === 'BTC' ? account.balance * 40000 : account.balance;
              return total + balance;
            }, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectedAccounts.map((account) => (
          <Card 
            key={account.id} 
            variant="glass" 
            className="group hover:shadow-glow transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center space-x-2">
                {account.type === 'crypto' ? (
                  <Wallet className="h-5 w-5 text-accent" />
                ) : (
                  <Building2 className="h-5 w-5 text-primary" />
                )}
                <span>{account.name}</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeAccount(account.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Institution</span>
                  <span className="text-sm font-medium">{account.institution}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Account</span>
                  <span className="text-sm font-medium">{account.accountNumber}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Balance</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBalanceVisibility(account.id)}
                      className="h-6 w-6"
                    >
                      {hiddenBalances.has(account.id) ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                    <span className="text-lg font-bold text-success">
                      {hiddenBalances.has(account.id) 
                        ? '••••••' 
                        : formatBalance(account.balance, account.currency)
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1 text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+2.5%</span>
                </div>
                <span className="text-sm text-muted-foreground">24h</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}