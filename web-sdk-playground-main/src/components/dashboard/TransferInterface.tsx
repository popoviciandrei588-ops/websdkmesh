import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { useMesh } from '@/components/mesh/MeshProvider';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeftRight, Send, DollarSign, Clock, CheckCircle } from 'lucide-react';

export function TransferInterface() {
  const { connectedAccounts } = useMesh();
  const { toast } = useToast();
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTransfer = async () => {
    if (!fromAccount || !toAccount || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all transfer details.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate transfer processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Transfer Initiated",
      description: `Transfer of $${amount} has been initiated successfully.`,
    });
    
    setFromAccount('');
    setToAccount('');
    setAmount('');
    setIsProcessing(false);
  };

  if (connectedAccounts.length < 2) {
    return (
      <Card variant="glass">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
            <ArrowLeftRight className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle>Transfer Funds</CardTitle>
          <CardDescription>
            Connect at least 2 accounts to start transferring funds between them
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Transfer Funds</h2>
        <p className="text-muted-foreground">
          Move money between your connected accounts instantly
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5" />
              <span>New Transfer</span>
            </CardTitle>
            <CardDescription>
              Send money between your connected accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">From Account</label>
                <select 
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="w-full mt-1 p-3 rounded-lg bg-input border border-border text-foreground"
                >
                  <option value="">Select source account</option>
                  {connectedAccounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.name} - {account.institution} ({account.accountNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">To Account</label>
                <select 
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="w-full mt-1 p-3 rounded-lg bg-input border border-border text-foreground"
                >
                  <option value="">Select destination account</option>
                  {connectedAccounts
                    .filter(account => account.id !== fromAccount)
                    .map(account => (
                    <option key={account.id} value={account.id}>
                      {account.name} - {account.institution} ({account.accountNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Amount</label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground"
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleTransfer}
              disabled={isProcessing}
              variant="hero"
              size="lg"
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Initiate Transfer
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Recent Transfers</CardTitle>
            <CardDescription>
              Your latest transfer activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, amount: 1250, from: 'Chase Checking', to: 'Coinbase Pro', status: 'completed', time: '2 hours ago' },
                { id: 2, amount: 500, from: 'Wells Fargo', to: 'Chase Checking', status: 'pending', time: '1 day ago' },
                { id: 3, amount: 750, from: 'Coinbase Pro', to: 'Wells Fargo', status: 'completed', time: '3 days ago' },
              ].map(transfer => (
                <div key={transfer.id} className="flex items-center justify-between p-4 rounded-lg bg-background-secondary/50 border border-border/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transfer.status === 'completed' ? 'bg-success' : 'bg-warning'
                    }`} />
                    <div>
                      <p className="font-medium">${transfer.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        {transfer.from} → {transfer.to}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {transfer.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Clock className="h-4 w-4 text-warning" />
                      )}
                      <span className="text-sm capitalize">{transfer.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{transfer.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}