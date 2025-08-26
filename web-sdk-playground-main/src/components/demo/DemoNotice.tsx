import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DemoNotice() {
  return (
    <Card variant="glass" className="mb-8 border-warning/20 bg-warning/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-warning-foreground">
          <AlertTriangle className="h-5 w-5" />
          <span>Demo Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This is a demonstration of MeshFlow built with the Mesh Connect SDK. 
          To implement real account connections, you'll need:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Mesh Connect API credentials from their dashboard</li>
          <li>Backend implementation to generate secure link tokens</li>
          <li>Real Mesh Connect Web SDK integration</li>
        </ul>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://docs.meshconnect.com/guides/getting-started', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Mesh Docs
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://dashboard.meshconnect.com/', '_blank')}
          >
            Get API Keys
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}