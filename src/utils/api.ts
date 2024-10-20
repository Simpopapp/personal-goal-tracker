import { ChallengeWithProgress, ProgressDataPoint } from '../types';

let challenges: ChallengeWithProgress[] = [
  {
    id: 1,
    name: "Meditação Diária",
    description: "Meditar por 10 minutos todos os dias",
    metricType: "days",
    target: 30,
    currentProgress: 5,
    progressData: [
      { date: '2023-01-01', progress: 0 },
      { date: '2023-01-02', progress: 1 },
      { date: '2023-01-03', progress: 2 },
      { date: '2023-01-04', progress: 3 },
      { date: '2023-01-05', progress: 5 },
    ]
  },
  {
    id: 2,
    name: "Leitura",
    description: "Ler 20 páginas por dia",
    metricType: "times",
    target: 100,
    currentProgress: 20,
    progressData: [
      { date: '2023-01-01', progress: 0 },
      { date: '2023-01-02', progress: 5 },
      { date: '2023-01-03', progress: 10 },
      { date: '2023-01-04', progress: 15 },
      { date: '2023-01-05', progress: 20 },
    ]
  }
];
let nextId = 3;

export const fetchChallenges = (): Promise<ChallengeWithProgress[]> => {
  return Promise.resolve(challenges);
};

export const addChallenge = (challenge: Omit<ChallengeWithProgress, 'id' | 'currentProgress' | 'progressData'>): Promise<ChallengeWithProgress> => {
  const newChallenge = { 
    ...challenge, 
    id: nextId++, 
    currentProgress: 0, 
    progressData: [{ date: new Date().toISOString().split('T')[0], progress: 0 }] 
  };
  challenges.push(newChallenge);
  return Promise.resolve(newChallenge);
};

export const updateProgress = ({ id, progress }: { id: number; progress: number }): Promise<ChallengeWithProgress> => {
  const challenge = challenges.find(c => c.id === id);
  if (!challenge) {
    return Promise.reject(new Error('Challenge not found'));
  }
  challenge.currentProgress = Math.min(challenge.currentProgress + progress, challenge.target);
  const today = new Date().toISOString().split('T')[0];
  challenge.progressData.push({ date: today, progress: challenge.currentProgress });
  return Promise.resolve(challenge);
};