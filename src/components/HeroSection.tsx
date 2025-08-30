import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../hooks/useAppStore';

interface HeroSectionProps {
  onStartProblem: (problemId: string) => void;
}

export const HeroSection = ({ onStartProblem }: HeroSectionProps) => {
  const [problem, setProblem] = useState('');
  const { createProblem } = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      const problemId = createProblem(problem.trim());
      onStartProblem(problemId);
    }
  };

  const exampleProblems = [
    "I want to open a mobile repair and accessory store",
    "I want to buy a property near a train station",
    "I want to put my kid in a new school",
    "I need to analyze market opportunities for seniors"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-hero text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-12 w-12 text-primary-glow animate-pulse" />
            <h1 className="text-5xl font-heading font-bold">
              Data Genie
            </h1>
            <Sparkles className="h-12 w-12 text-primary-glow animate-pulse" />
          </div>
          
          <p className="text-xl opacity-90 mb-4">
            Like Akinator, but for ABS datasets
          </p>
          
          <p className="text-lg opacity-75 max-w-2xl mx-auto">
            Describe your real-world problem and I'll ask smart questions to recommend 
            the perfect dataset combinations with join guidance, previews, and code snippets.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-background/10 backdrop-blur-sm rounded-lg p-8 border border-primary-foreground/20"
        >
          <div className="space-y-4">
            <Input
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Describe your problem (e.g., 'Open a repair shop in Brunswick'). The Genie will ask 2–3 smart questions, then draft you a data plan."
              className="text-lg h-14 bg-background/80 border-primary-foreground/30 text-foreground placeholder:text-muted-foreground/70"
              autoFocus
            />
            
            <Button 
              type="submit" 
              variant="genie" 
              size="xl"
              disabled={!problem.trim()}
              className="w-full"
            >
              Ask the Genie
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-6">
            <p className="text-sm opacity-75 mb-3">Example problems:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {exampleProblems.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setProblem(example)}
                  className="text-left text-sm p-3 bg-background/20 hover:bg-background/30 rounded-md border border-primary-foreground/20 hover:border-primary-foreground/40 transition-all duration-200"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};