import { useState, useEffect } from 'react';
import { appStore } from '../store/appStore';
import { AppState } from '../types/app';

export const useAppStore = () => {
  const [state, setState] = useState<AppState>(appStore.getState());

  useEffect(() => {
    const unsubscribe = appStore.subscribe(setState);
    return unsubscribe;
  }, []);

  return {
    state,
    createProblem: appStore.createProblem.bind(appStore),
    updateProblemAnswer: appStore.updateProblemAnswer.bind(appStore),
    addReview: appStore.addReview.bind(appStore),
    incrementDownload: appStore.incrementDownload.bind(appStore),
    getAverageRating: appStore.getAverageRating.bind(appStore),
    getActiveProblem: appStore.getActiveProblem.bind(appStore),
    detectIntent: appStore.detectIntent.bind(appStore),
    calculateFitScores: appStore.calculateFitScores.bind(appStore)
  };
};