import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';
import { getFollowUpQuestions } from '../data/followUpQuestions';
import { useAppStore } from '../hooks/useAppStore';
import { FollowUpQuestion } from '../types/app';

interface FollowUpQuestionsProps {
  problemId: string;
  onComplete: () => void;
}

export const FollowUpQuestions = ({ problemId, onComplete }: FollowUpQuestionsProps) => {
  const { getActiveProblem, updateProblemAnswer } = useAppStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<FollowUpQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [textInput, setTextInput] = useState('');

  const activeProblem = getActiveProblem();

  useEffect(() => {
    if (activeProblem) {
      const followUpQuestions = getFollowUpQuestions(activeProblem.derivedIntent);
      setQuestions(followUpQuestions);
      setAnswers(activeProblem.answers || {});
    }
  }, [activeProblem]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = !currentQuestion?.required || answers[currentQuestion.answerKey] !== undefined;
  const canGoBack = currentQuestionIndex > 0;

  const handleChipSelect = (value: string | null) => {
    if (!currentQuestion) return;

    const processedValue = value === 'true' ? true : value === 'false' ? false : value;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.answerKey]: processedValue
    }));
    
    updateProblemAnswer(problemId, currentQuestion.answerKey, processedValue);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion || !textInput.trim()) return;

    let processedValue: any = textInput.trim();
    
    if (currentQuestion.type === 'number') {
      processedValue = parseInt(textInput.trim(), 10);
    } else if (currentQuestion.answerKey === 'geography') {
      processedValue = {
        type: 'suburb',
        value: textInput.trim()
      };
    }

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.answerKey]: processedValue
    }));
    
    updateProblemAnswer(problemId, currentQuestion.answerKey, processedValue);
    setTextInput('');
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setTextInput('');
    }
  };

  const handleBack = () => {
    if (canGoBack) {
      setCurrentQuestionIndex(prev => prev - 1);
      setTextInput('');
    }
  };

  const handleSkip = () => {
    if (!currentQuestion?.required) {
      handleNext();
    }
  };

  if (!currentQuestion || questions.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-heading font-bold">Smart Questions</h2>
            <div className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
          
          <div className="w-full bg-accent rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="animate-typewriter">
                    {currentQuestion.question}
                  </span>
                  {currentQuestion.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {currentQuestion.type === 'chips' && currentQuestion.chips && (
                  <div className="flex flex-wrap gap-2">
                    {currentQuestion.chips.map((chip) => {
                      const isSelected = answers[currentQuestion.answerKey] === chip.value;
                      return (
                        <Button
                          key={chip.value || 'null'}
                          variant={isSelected ? "chip-active" : "chip"}
                          size="chip"
                          onClick={() => handleChipSelect(chip.value)}
                          className="transition-all duration-200"
                        >
                          {chip.label}
                        </Button>
                      );
                    })}
                  </div>
                )}

                {(currentQuestion.type === 'text' || currentQuestion.type === 'number') && (
                  <form onSubmit={handleTextSubmit} className="space-y-4">
                    <Input
                      type={currentQuestion.type === 'number' ? 'number' : 'text'}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder={currentQuestion.type === 'number' ? 'Enter number of minutes' : 'Type your answer...'}
                      autoFocus
                    />
                    <Button type="submit" disabled={!textInput.trim()}>
                      Submit Answer
                    </Button>
                  </form>
                )}

                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={!canGoBack}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>

                  <div className="flex gap-2">
                    {!currentQuestion.required && (
                      <Button
                        variant="ghost"
                        onClick={handleSkip}
                      >
                        <SkipForward className="h-4 w-4 mr-2" />
                        Skip
                      </Button>
                    )}

                    <Button
                      onClick={handleNext}
                      disabled={!canGoNext}
                      variant="default"
                    >
                      {isLastQuestion ? 'Get Recommendations' : 'Next'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};