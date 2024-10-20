import { Challenge } from '../types';

let challenges: Challenge[] = [];
let nextId = 1;

export const fetchChallenges = (): Promise<Challenge[]> => {
  return Promise.resolve(challenges);
};

export const addChallenge = (challenge: Omit<Challenge, 'id'>): Promise<Challenge> => {
  const newChallenge = { ...challenge, id: nextId++, currentProgress: 0 };
  challenges.push(newChallenge);
  return Promise.resolve(newChallenge);
};

export const updateProgress = ({ id, progress }: { id: number; progress: number }): Promise<Challenge> => {
  const challenge = challenges.find(c => c.id === id);
  if (!challenge) {
    return Promise.reject(new Error('Challenge not found'));
  }
  challenge.currentProgress = Math.min(challenge.currentProgress + progress, challenge.target);
  return Promise.resolve(challenge);
};