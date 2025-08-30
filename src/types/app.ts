export type ProblemIntent = 'retail' | 'property' | 'school' | 'generic';

export type ProblemState = {
  id: string;
  rawProblem: string;
  derivedIntent: ProblemIntent;
  answers: {
    geography?: { type: 'suburb'|'sa2'; value: string; lat?:number; lon?:number };
    catchment?: 'walk10'|'drive10';
    focus?: 'workers'|'residents'|'both';
    anchor?: 'station'|'shopping'|'university'|'hospital'|null;
    stationName?: string;
    targetMarket?: 'owner'|'renter';
    horizon?: '0-2'|'2-4'|'5+';
    contextCheck?: boolean;
    addressOrSuburb?: string;
    mode?: 'walk'|'bike'|'pt'|'car';
    maxMins?: number;
    supports?: 'eal'|'asd'|'extension'|'none';
    sector?: 'government'|'catholic'|'independent';
    audience?: 'students'|'retirees'|'families'|'workers';
    product?: string;
    priceRange?: 'budget'|'mid'|'premium';
    purpose?: 'growth'|'competition'|'targeting';
  };
  recommendedDatasets: DatasetRef[];
  createdAt: number;
};

export type DatasetRef = {
  id: string;
  fitScore: number;
};

export type Review = {
  datasetId: string;
  stars: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  author: string;
  date: number;
};

export type AppState = {
  problems: ProblemState[];
  activeProblemId?: string;
  reviews: Review[];
  downloads: Record<string, number>;
  ratings: Record<string, {sum: number; count: number}>;
};

export type FollowUpQuestion = {
  id: string;
  question: string;
  type: 'chips' | 'text' | 'number';
  chips?: { value: string; label: string }[];
  answerKey: keyof ProblemState['answers'];
  required?: boolean;
};

export type UseCase = {
  id: string;
  title: string;
  description: string;
  datasetsUsed: string[];
  outcome: string;
  industry: string;
};