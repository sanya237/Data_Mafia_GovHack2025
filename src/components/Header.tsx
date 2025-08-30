import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Database, Info, Settings, Sparkles } from 'lucide-react';
import { AdminOverlay } from './AdminOverlay';
import { AboutModal } from './AboutModal';

export const Header = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="border-b border-border bg-gradient-card shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-heading font-bold text-primary">
                    Data Genie
                  </h1>
                  <Badge variant="outline" className="text-xs">
                    ABS Dataset Wizard
                  </Badge>
                </div>
              </div>
            </div>

            <nav className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAbout(true)}
                className="flex items-center gap-2"
              >
                <Info className="h-4 w-4" />
                About
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Database className="h-4 w-4" />
                Datasets
              </Button>

              <Button
                variant="admin"
                size="sm"
                onClick={() => setShowAdmin(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <AdminOverlay open={showAdmin} onClose={() => setShowAdmin(false)} />
      <AboutModal open={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};