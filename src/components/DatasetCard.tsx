import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  ExternalLink, 
  Eye, 
  Code, 
  Star, 
  Download, 
  Copy, 
  BarChart3,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Dataset } from '../data/datasetRegistry';
import { useAppStore } from '../hooks/useAppStore';
import { useToast } from '../hooks/use-toast';

interface DatasetCardProps {
  dataset: Dataset;
  fitScore: number;
  rank: number;
}

export const DatasetCard = ({ dataset, fitScore, rank }: DatasetCardProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { getAverageRating, incrementDownload } = useAppStore();
  const { toast } = useToast();

  const rating = getAverageRating(dataset.id);
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));

  const handleCopyCode = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(language);
      toast({
        title: "Code copied!",
        description: `${language} code copied to clipboard`,
      });
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy code to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleOpenSource = () => {
    incrementDownload(dataset.id);
    if (dataset.absLink) {
      window.open(dataset.absLink, '_blank');
    }
  };

  const renderChart = () => {
    const { type, data, xKey, yKey } = dataset.sampleChart;
    
    const chartProps = {
      width: 400,
      height: 200,
      data
    };

    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey={yKey} fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey={yKey} stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey={yKey}
                nameKey={xKey}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="hsl(var(--primary))"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${214 + index * 30}, 84%, ${56 + index * 10}%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
    >
      <Card className="hover:shadow-elevated transition-all duration-300 bg-gradient-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  className={dataset.source === 'ABS' ? 'bg-primary' : 'bg-muted'}
                >
                  {dataset.source}
                </Badge>
                {dataset.source !== 'ABS' && (
                  <Badge variant="outline" className="text-xs">
                    External Open Data
                  </Badge>
                )}
                <div className="flex items-center gap-1">
                  {stars.map((filled, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        filled ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({rating.toFixed(1)})
                  </span>
                </div>
              </div>
              
              <CardTitle className="text-lg leading-tight mb-2">
                {dataset.title}
              </CardTitle>
              
              <p className="text-sm text-muted-foreground mb-3">
                Last updated: {dataset.lastUpdatedText}
              </p>
              
              <div className="flex items-center gap-1 mb-3">
                <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                  {fitScore}% fit
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Rank #{rank}
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <strong>How to join:</strong> {dataset.howToJoin}
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Dataset Preview: {dataset.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <Tabs defaultValue="table" className="w-full">
                    <TabsList>
                      <TabsTrigger value="table">Sample Data</TabsTrigger>
                      <TabsTrigger value="chart">Mini Graph</TabsTrigger>
                    </TabsList>
                    <TabsContent value="table">
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {Object.keys(dataset.previewRows[0] || {}).map((key) => (
                                <TableHead key={key} className="text-xs">
                                  {key}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {dataset.previewRows.map((row, index) => (
                              <TableRow key={index}>
                                {Object.values(row).map((value, cellIndex) => (
                                  <TableCell key={cellIndex} className="text-xs">
                                    {typeof value === 'boolean' ? value.toString() : value}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value="chart">
                      <div className="h-64 flex items-center justify-center">
                        {renderChart()}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Code Snippets: {dataset.title}</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="python" className="w-full mt-4">
                  <TabsList>
                    {dataset.codeSnippets.python && <TabsTrigger value="python">Python</TabsTrigger>}
                    {dataset.codeSnippets.javascript && <TabsTrigger value="javascript">JavaScript</TabsTrigger>}
                    {dataset.codeSnippets.sql && <TabsTrigger value="sql">SQL</TabsTrigger>}
                  </TabsList>
                  
                  {Object.entries(dataset.codeSnippets).map(([lang, code]) => (
                    code && (
                      <TabsContent key={lang} value={lang}>
                        <div className="relative">
                          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2"
                            onClick={() => handleCopyCode(code, lang)}
                          >
                            {copiedCode === lang ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TabsContent>
                    )
                  ))}
                </Tabs>
              </DialogContent>
            </Dialog>

            <Button 
              variant="default" 
              size="sm"
              onClick={handleOpenSource}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Source
            </Button>
          </div>

          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>Join Keys:</span>
              {dataset.joinKeys.map((key, index) => (
                <Badge key={key} variant="outline" className="text-xs">
                  {key}
                </Badge>
              ))}
            </div>
            <div>
              Geography: {dataset.geographyLevels.join(', ')}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};