import { Challenge } from '../types';

let challenges: Challenge[] = [
  {
    id: 1,
    name: "Meditação Diária",
    description: "Meditar por 10 minutos todos os dias",
    metricType: "days",
    target: 30,
    currentProgress: 5
  },
  {
    id: 2,
    name: "Leitura",
    description: "Ler 20 páginas por dia",
    metricType: "times",
    target: 100,
    currentProgress: 20
  }
];
let nextId = 3;

export const fetchChallenges = (): Promise<Challenge[]> => {
  return Promise.resolve(challenges);
};

export const addChallenge = (challenge: Omit<Challenge, 'id' | 'currentProgress'>): Promise<Challenge> => {
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