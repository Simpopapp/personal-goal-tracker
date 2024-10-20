import { Challenge, DataPoint } from '../types';

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

export const fetchChartData = (): Promise<DataPoint[]> => {
  const data: DataPoint[] = [
    { date: '2023-01-01', value: 100 },
    { date: '2023-02-01', value: 120 },
    { date: '2023-03-01', value: 150, isTop: true },
    { date: '2023-04-01', value: 130 },
    { date: '2023-05-01', value: 90, isBottom: true },
    { date: '2023-06-01', value: 110 },
    { date: '2023-07-01', value: 140, isTop: true },
    { date: '2023-08-01', value: 125 },
    { date: '2023-09-01', value: 80, isBottom: true },
    { date: '2023-10-01', value: 100 },
  ];

  return Promise.resolve(data);
};