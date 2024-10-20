export type Challenge = {
  id: number;
  name: string;
  description: string;
  metricType: 'hours' | 'times' | 'days';
  target: number;
  currentProgress: number;
};