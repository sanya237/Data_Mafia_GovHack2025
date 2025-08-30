import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Download, Star, LogIn } from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { datasetRegistry } from '../data/datasetRegistry';
import { useToast } from '../hooks/use-toast';

interface AdminOverlayProps {
  open: boolean;
  onClose: () => void;
}

export const AdminOverlay = ({ open, onClose }: AdminOverlayProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { state, getAverageRating } = useAppStore();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'root') {
      setIsAuthenticated(true);
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid credentials. Try admin/root",
        variant: "destructive"
      });
    }
  };

  const getTopRated = () => {
    return datasetRegistry
      .map(dataset => ({
        ...dataset,
        avgRating: getAverageRating(dataset.id),
        reviewCount: state.ratings[dataset.id]?.count || 0
      }))
      .filter(d => d.reviewCount > 0)
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 5);
  };

  const getBottomRated = () => {
    return datasetRegistry
      .map(dataset => ({
        ...dataset,
        avgRating: getAverageRating(dataset.id),
        reviewCount: state.ratings[dataset.id]?.count || 0
      }))
      .filter(d => d.reviewCount > 0)
      .sort((a, b) => a.avgRating - b.avgRating)
      .slice(0, 5);
  };

  const getMostDownloaded = () => {
    return datasetRegistry
      .map(dataset => ({
        ...dataset,
        downloads: state.downloads[dataset.id] || 0
      }))
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 5);
  };

  const getLeastDownloaded = () => {
    return datasetRegistry
      .map(dataset => ({
        ...dataset,
        downloads: state.downloads[dataset.id] || 0
      }))
      .sort((a, b) => a.downloads - b.downloads)
      .slice(0, 5);
  };

  const StatCard = ({ title, icon: Icon, items, type }: any) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item: any, index: number) => (
            <div key={item.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
              <div className="flex-1">
                <div className="font-medium text-sm">{item.title}</div>
                <Badge variant="outline" className="text-xs mt-1">
                  {item.source}
                </Badge>
              </div>
              <div className="text-right">
                {type === 'rating' && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {item.avgRating.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({item.reviewCount})
                    </span>
                  </div>
                )}
                {type === 'downloads' && (
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span className="text-sm font-medium">
                      {item.downloads.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admin Dashboard</DialogTitle>
          <DialogDescription>
            Dataset performance analytics and management
          </DialogDescription>
        </DialogHeader>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-4 py-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <Button type="submit" className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Demo credentials: admin / root
            </p>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <StatCard
              title="Highest Rated"
              icon={TrendingUp}
              items={getTopRated()}
              type="rating"
            />
            <StatCard
              title="Lowest Rated"
              icon={TrendingDown}
              items={getBottomRated()}
              type="rating"
            />
            <StatCard
              title="Most Downloaded"
              icon={TrendingUp}
              items={getMostDownloaded()}
              type="downloads"
            />
            <StatCard
              title="Least Downloaded"
              icon={TrendingDown}
              items={getLeastDownloaded()}
              type="downloads"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};