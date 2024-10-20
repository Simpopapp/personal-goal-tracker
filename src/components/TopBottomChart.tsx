import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

interface DataPoint {
  date: string;
  value: number;
  isTop?: boolean;
  isBottom?: boolean;
}

interface TopBottomChartProps {
  data: DataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-bold">{`Date: ${data.date}`}</p>
        <p>{`Value: ${data.value}`}</p>
        {data.isTop && <p className="text-green-600">Top</p>}
        {data.isBottom && <p className="text-red-600">Bottom</p>}
      </div>
    );
  }
  return null;
};

const TopBottomChart: React.FC<TopBottomChartProps> = ({ data }) => {
  return (
    <ChartContainer className="h-[300px]" config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
          {data.map((point, index) => (
            (point.isTop || point.isBottom) && (
              <ReferenceDot
                key={index}
                x={point.date}
                y={point.value}
                r={5}
                fill={point.isTop ? "#82ca9d" : "#ff7300"}
                stroke="none"
              />
            )
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TopBottomChart;