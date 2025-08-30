import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Lightbulb, Database, Link2 } from 'lucide-react';
import { DatasetCard } from './DatasetCard';
import { useAppStore } from '../hooks/useAppStore';
import { datasetRegistry, getDatasetById } from '../data/datasetRegistry';

interface ResultsSectionProps {
  problemId: string;
}

export const ResultsSection = ({ problemId }: ResultsSectionProps) => {
  const { getActiveProblem } = useAppStore();
  const activeProblem = getActiveProblem();

  if (!activeProblem || activeProblem.recommendedDatasets.length === 0) {
    return null;
  }

  const getContextSummary = () => {
    const { derivedIntent, answers } = activeProblem;
    const chips = [];

    chips.push(derivedIntent.charAt(0).toUpperCase() + derivedIntent.slice(1));
    
    if (answers.geography) {
      const geo = typeof answers.geography === 'object' 
        ? answers.geography.value 
        : answers.geography;
      chips.push(`Area: ${geo}`);
    }
    
    if (answers.audience) {
      chips.push(`Audience: ${answers.audience}`);
    }
    
    if (answers.product) {
      chips.push(`Product: ${answers.product}`);
    }
    
    if (answers.targetMarket) {
      chips.push(`Market: ${answers.targetMarket}`);
    }
    
    if (answers.priceRange) {
      chips.push(`Price: ${answers.priceRange}`);
    }
    
    if (answers.purpose) {
      chips.push(`Purpose: ${answers.purpose}`);
    }

    return chips;
  };

  const generateJoinGuidance = () => {
    const intent = activeProblem.derivedIntent;
    const topDatasets = activeProblem.recommendedDatasets.slice(0, 3);
    
    let guidance = '';
    
    if (intent === 'retail') {
      guidance = 'Join Census to SEIFA via SA2_CODE_2021 → overlay CABEE by SA2 for competitor density';
      if (topDatasets.some(d => d.id === 'jtw-2021')) {
        guidance += ' → add JTW for daytime vs nighttime population insights';
      }
      if (topDatasets.some(d => d.id === 'gtfs-vic')) {
        guidance += ' → include GTFS for transit accessibility scoring';
      }
    } else if (intent === 'property') {
      guidance = 'Join Census demographics to Building Approvals by SA2_CODE_2021 → add RPPI for city-level context';
      if (topDatasets.some(d => d.id === 'seifa-2021')) {
        guidance += ' → overlay SEIFA for socio-economic analysis';
      }
    } else if (intent === 'school') {
      guidance = 'Filter MySchool by support needs and sector → cross-reference locations with Census demographics by suburb';
      if (topDatasets.some(d => d.id === 'gtfs-vic')) {
        guidance += ' → add GTFS for public transport accessibility';
      }
    } else {
      guidance = 'Start with Census and SEIFA as base demographics → join additional datasets by SA2_CODE_2021';
    }

    return guidance;
  };

  return (
    <section className="py-12 px-4 bg-accent/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-heading font-bold mb-4">Your Solution Plan</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {getContextSummary().map((chip, index) => (
              <Badge key={index} variant="outline" className="bg-background">
                {chip}
              </Badge>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Link2 className="h-5 w-5 text-primary" />
                Join Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {generateJoinGuidance()}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {activeProblem.recommendedDatasets.map((datasetRef, index) => {
            const dataset = getDatasetById(datasetRef.id);
            if (!dataset) return null;
            
            return (
              <DatasetCard
                key={dataset.id}
                dataset={dataset}
                fitScore={datasetRef.fitScore}
                rank={index + 1}
              />
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-card border-0 shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Data Quality</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Check "last updated" dates for currency</li>
                    <li>• Preview sample data before download</li>
                    <li>• Verify geography level matches your needs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Integration</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Use SA2_CODE_2021 for most ABS joins</li>
                    <li>• External datasets require API setup</li>
                    <li>• Copy code snippets for quick start</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};