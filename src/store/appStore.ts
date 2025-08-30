import { AppState, ProblemState, Review, ProblemIntent } from '../types/app';
import { searchDatasets } from '../data/datasetRegistry';

const STORAGE_KEY = 'app:dataGenie';

// Seed data
const seedReviews: Review[] = [
  {
    datasetId: 'seifa-2021',
    stars: 5,
    title: 'Essential for demographic analysis',
    body: 'Perfect for understanding socio-economic context. Easy join keys and comprehensive coverage.',
    author: 'DataAnalyst_Mel',
    date: Date.now() - 86400000 * 5
  },
  {
    datasetId: 'census-2021',
    stars: 5,
    title: 'Gold standard demographics',
    body: 'The go-to source for population insights. Preview tables are exactly what you need.',
    author: 'UrbanPlanner',
    date: Date.now() - 86400000 * 12
  },
  {
    datasetId: 'cabee-2024',
    stars: 4,
    title: 'Great for competition analysis',
    body: 'ANZSIC filtering works perfectly. Would love more granular geographic breakdown.',
    author: 'RetailConsultant',
    date: Date.now() - 86400000 * 3
  },
  {
    datasetId: 'building-approvals-2024',
    stars: 4,
    title: 'Useful pipeline insight',
    body: 'Good for timing analysis. Data is current and SA2 level detail is helpful.',
    author: 'PropertyDev',
    date: Date.now() - 86400000 * 18
  },
  {
    datasetId: 'rppi-2024',
    stars: 3,
    title: 'City-level context only',
    body: 'Helpful for broad trends but limited geography. Needs more granular data.',
    author: 'Economist',
    date: Date.now() - 86400000 * 25
  },
  {
    datasetId: 'jtw-2021',
    stars: 5,
    title: 'Brilliant for retail location',
    body: 'Day vs night worker patterns are exactly what we needed for our store placement.',
    author: 'FranchiseOwner',
    date: Date.now() - 86400000 * 8
  },
  {
    datasetId: 'gtfs-vic',
    stars: 3,
    title: 'External but valuable',
    body: 'GTFS integration requires API setup but transit insights are worth it.',
    author: 'TransportAnalyst',
    date: Date.now() - 86400000 * 15
  },
  {
    datasetId: 'myschool-2024',
    stars: 4,
    title: 'Comprehensive school data',
    body: 'ICSEA and support filters work well. External data source but reliable.',
    author: 'ParentResearcher',
    date: Date.now() - 86400000 * 22
  }
];

const seedDownloads: Record<string, number> = {
  'seifa-2021': 15234,
  'census-2021': 18976,
  'cabee-2024': 8743,
  'building-approvals-2024': 6521,
  'rppi-2024': 4532,
  'jtw-2021': 9876,
  'gtfs-vic': 2341,
  'myschool-2024': 3456
};

const seedRatings: Record<string, {sum: number; count: number}> = {
  'seifa-2021': { sum: 23, count: 5 },
  'census-2021': { sum: 22, count: 5 },
  'cabee-2024': { sum: 16, count: 4 },
  'building-approvals-2024': { sum: 15, count: 4 },
  'rppi-2024': { sum: 9, count: 3 },
  'jtw-2021': { sum: 23, count: 5 },
  'gtfs-vic': { sum: 9, count: 3 },
  'myschool-2024': { sum: 15, count: 4 }
};

export class AppStore {
  private state: AppState;
  private listeners: ((state: AppState) => void)[] = [];

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): AppState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          reviews: parsed.reviews?.length > 0 ? parsed.reviews : seedReviews,
          downloads: Object.keys(parsed.downloads || {}).length > 0 ? parsed.downloads : seedDownloads,
          ratings: Object.keys(parsed.ratings || {}).length > 0 ? parsed.ratings : seedRatings
        };
      }
    } catch (e) {
      console.warn('Failed to load app state from localStorage:', e);
    }

    return {
      problems: [],
      reviews: seedReviews,
      downloads: seedDownloads,
      ratings: seedRatings
    };
  }

  private saveState(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save app state to localStorage:', e);
    }
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.state));
    this.saveState();
  }

  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): AppState {
    return this.state;
  }

  // Intent detection
  detectIntent(problem: string): ProblemIntent {
    const lowerProblem = problem.toLowerCase();
    
    if (lowerProblem.includes('repair') || lowerProblem.includes('store') || 
        lowerProblem.includes('retail') || lowerProblem.includes('shop') ||
        lowerProblem.includes('business') || lowerProblem.includes('mobile')) {
      return 'retail';
    }
    
    if (lowerProblem.includes('buy') || lowerProblem.includes('property') || 
        lowerProblem.includes('apartment') || lowerProblem.includes('house') ||
        lowerProblem.includes('near station') || lowerProblem.includes('investment')) {
      return 'property';
    }
    
    if (lowerProblem.includes('school') || lowerProblem.includes('kid') || 
        lowerProblem.includes('child') || lowerProblem.includes('enrol') || 
        lowerProblem.includes('education')) {
      return 'school';
    }
    
    return 'generic';
  }

  // Calculate dataset fit scores based on intent and answers
  calculateFitScores(intent: ProblemIntent, answers: ProblemState['answers']): string[] {
    const scores: Record<string, number> = {};
    
    // Base scoring by intent
    if (intent === 'retail') {
      scores['census-2021'] = 90;
      scores['seifa-2021'] = 85;
      scores['cabee-2024'] = 95;
      scores['jtw-2021'] = 88;
      scores['gtfs-vic'] = answers.anchor === 'station' ? 75 : 45;
    } else if (intent === 'property') {
      scores['census-2021'] = 80;
      scores['seifa-2021'] = 75;
      scores['building-approvals-2024'] = 95;
      scores['rppi-2024'] = 90;
      scores['gtfs-vic'] = answers.stationName ? 85 : 40;
    } else if (intent === 'school') {
      scores['census-2021'] = 70;
      scores['seifa-2021'] = 65;
      scores['myschool-2024'] = 95;
      scores['gtfs-vic'] = answers.mode === 'pt' ? 80 : 50;
    } else {
      // Generic scoring
      scores['census-2021'] = 85;
      scores['seifa-2021'] = 80;
      scores['cabee-2024'] = 60;
      scores['building-approvals-2024'] = 55;
      scores['rppi-2024'] = 50;
    }

    // Geography bonus
    if (answers.geography) {
      Object.keys(scores).forEach(id => {
        if (['census-2021', 'seifa-2021', 'cabee-2024', 'building-approvals-2024', 'jtw-2021'].includes(id)) {
          scores[id] += 5;
        }
      });
    }

    // Sort by score and return dataset IDs
    return Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .map(([id]) => id);
  }

  createProblem(rawProblem: string): string {
    const intent = this.detectIntent(rawProblem);
    const problem: ProblemState = {
      id: `problem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      rawProblem,
      derivedIntent: intent,
      answers: {},
      recommendedDatasets: [],
      createdAt: Date.now()
    };

    this.state.problems.push(problem);
    this.state.activeProblemId = problem.id;
    this.notify();
    
    return problem.id;
  }

  updateProblemAnswer(problemId: string, answerKey: keyof ProblemState['answers'], value: string | number | boolean | { type: string; value: string; lat?: number; lon?: number } | null): void {
    const problem = this.state.problems.find(p => p.id === problemId);
    if (!problem) return;

    (problem.answers as any)[answerKey] = value;
    
    // Recalculate recommendations
    const rankedDatasets = this.calculateFitScores(problem.derivedIntent, problem.answers);
    problem.recommendedDatasets = rankedDatasets.map((id, index) => ({
      id,
      fitScore: Math.max(95 - (index * 8), 45)
    }));

    this.notify();
  }

  addReview(review: Omit<Review, 'date'>): void {
    const newReview: Review = {
      ...review,
      date: Date.now()
    };

    this.state.reviews.push(newReview);
    
    // Update ratings
    const datasetId = review.datasetId;
    if (!this.state.ratings[datasetId]) {
      this.state.ratings[datasetId] = { sum: 0, count: 0 };
    }
    
    this.state.ratings[datasetId].sum += review.stars;
    this.state.ratings[datasetId].count += 1;

    this.notify();
  }

  incrementDownload(datasetId: string): void {
    this.state.downloads[datasetId] = (this.state.downloads[datasetId] || 0) + 1;
    this.notify();
  }

  getAverageRating(datasetId: string): number {
    const rating = this.state.ratings[datasetId];
    return rating ? rating.sum / rating.count : 0;
  }

  getActiveProblem(): ProblemState | undefined {
    return this.state.problems.find(p => p.id === this.state.activeProblemId);
  }
}

export const appStore = new AppStore();