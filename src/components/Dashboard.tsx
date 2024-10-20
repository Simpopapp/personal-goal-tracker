import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import ChallengeForm from './ChallengeForm';
import { fetchChallenges, addChallenge, updateProgress } from '../utils/api';
import { Challenge } from '../types';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const { data: challenges = [] } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallenges,
  });

  const addChallengeMutation = useMutation({
    mutationFn: addChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      toast.success('Desafio adicionado com sucesso!');
      setIsFormOpen(false);
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: updateProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      toast.success('Progresso atualizado!');
    },
  });

  const handleAddChallenge = (challenge: Omit<Challenge, 'id' | 'currentProgress'>) => {
    addChallengeMutation.mutate(challenge);
  };

  const handleQuickProgress = (id: number) => {
    updateProgressMutation.mutate({ id, progress: 1 });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Seus Desafios</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Desafio
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id}>
            <CardHeader>
              <CardTitle>{challenge.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{challenge.description}</p>
              <Progress value={(challenge.currentProgress / challenge.target) * 100} className="mb-2" />
              <p className="text-sm font-medium">
                {challenge.currentProgress} de {challenge.target} {challenge.metricType}
              </p>
              <ChartContainer className="mt-4 h-[200px]" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{ name: 'Progresso', value: challenge.currentProgress }]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="value" fill="#8884d8" />
                    <ChartTooltip>
                      {(props) => <ChartTooltipContent {...props} />}
                    </ChartTooltip>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => handleQuickProgress(challenge.id)}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Registrar Progresso
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {isFormOpen && (
        <ChallengeForm onSubmit={handleAddChallenge} onCancel={() => setIsFormOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;