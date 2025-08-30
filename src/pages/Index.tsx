import { useState } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { FollowUpQuestions } from '../components/FollowUpQuestions';
import { ResultsSection } from '../components/ResultsSection';
import { CommunitySection } from '../components/CommunitySection';
import { useAppStore } from '../hooks/useAppStore';

type AppPhase = 'hero' | 'questions' | 'results';

const Index = () => {
  const [currentPhase, setCurrentPhase] = useState<AppPhase>('hero');
  const [activeProblemId, setActiveProblemId] = useState<string>('');
  const { getActiveProblem } = useAppStore();

  const handleStartProblem = (problemId: string) => {
    setActiveProblemId(problemId);
    setCurrentPhase('questions');
  };

  const handleQuestionsComplete = () => {
    setCurrentPhase('results');
  };

  const activeProblem = getActiveProblem();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {currentPhase === 'hero' && (
        <HeroSection onStartProblem={handleStartProblem} />
      )}
      
      {currentPhase === 'questions' && activeProblemId && (
        <FollowUpQuestions 
          problemId={activeProblemId} 
          onComplete={handleQuestionsComplete}
        />
      )}
      
      {currentPhase === 'results' && activeProblem && (
        <>
          <ResultsSection problemId={activeProblem.id} />
          <CommunitySection />
        </>
      )}
    </div>
  );
};

export default Index;
