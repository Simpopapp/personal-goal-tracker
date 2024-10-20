import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchChartData } from '../utils/api';
import TopBottomChart from './TopBottomChart';

const Dashboard = () => {
  const { data: chartData = [] } = useQuery({
    queryKey: ['chartData'],
    queryFn: fetchChartData,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Análise de Topos e Fundos</h2>
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Topos e Fundos</CardTitle>
        </CardHeader>
        <CardContent>
          <TopBottomChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;