import { DataPoint } from '../types';

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