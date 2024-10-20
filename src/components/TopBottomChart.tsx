import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { ProgressDataPoint } from '../types';

interface TopBottomChartProps {
  data: ProgressDataPoint[];
  target: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-bold">{`Data: ${data.date}`}</p>
        <p>{`Progresso: ${data.progress}`}</p>
      </div>
    );
  }
  return null;
};

const TopBottomChart: React.FC<TopBottomChartProps> = ({ data, target }) => {
  return (
    <ChartContainer className="h-[300px]" config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, target]} />
          <ChartTooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="progress" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TopBottomChart;