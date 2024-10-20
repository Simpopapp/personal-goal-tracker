export interface DataPoint {
  date: string;
  value: number;
  isTop?: boolean;
  isBottom?: boolean;
}

export type Challenge = {
  id: number;
  name: string;
  description: string;
  metricType: 'hours' | 'times' | 'days';
  target: number;
  currentProgress: number;
};
