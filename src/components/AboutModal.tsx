import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { ExternalLink, Database, Sparkles } from 'lucide-react';

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export const AboutModal = ({ open, onClose }: AboutModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            About Data Genie
          </DialogTitle>
          <DialogDescription>
            Your intelligent ABS dataset recommendation assistant
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-semibold mb-2">How it works</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. <strong>Describe your problem</strong> in natural language</p>
              <p>2. <strong>Answer 2-3 smart questions</strong> to refine context</p>
              <p>3. <strong>Get personalized dataset recommendations</strong> with join guidance</p>
              <p>4. <strong>Preview data, copy code</strong>, and access official sources</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Featured Datasets
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Badge variant="outline">SEIFA 2021</Badge>
              <Badge variant="outline">Census 2021</Badge>
              <Badge variant="outline">CABEE 2024</Badge>
              <Badge variant="outline">Building Approvals</Badge>
              <Badge variant="outline">RPPI</Badge>
              <Badge variant="outline">Journey to Work</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Data Sources</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-primary">ABS</Badge>
                <span>Australian Bureau of Statistics - Primary data source</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline">ACARA</Badge>
                <span>My School education data (External Open Data)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline">GTFS</Badge>
                <span>Victorian transit data (External Open Data)</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Smart intent detection for retail, property, school, and general use cases</li>
              <li>• Live dataset previews with sample charts</li>
              <li>• Copy-ready Python, JavaScript, and SQL code snippets</li>
              <li>• Official ABS source links for all datasets</li>
              <li>• Community reviews and ratings system</li>
              <li>• Admin dashboard with usage analytics</li>
            </ul>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Built for the Australian Bureau of Statistics ecosystem. All dataset links connect 
              to official ABS sources. External data sources are clearly marked and link to 
              authorized portals.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};