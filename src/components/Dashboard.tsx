import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import ChallengeForm from './ChallengeForm';
import { fetchChallenges, addChallenge, updateProgress } from '../utils/api';
import { ChallengeWithProgress } from '../types';
import TopBottomChart from './TopBottomChart';

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

  const handleAddChallenge = (challenge: Omit<ChallengeWithProgress, 'id' | 'currentProgress' | 'progressData'>) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{challenge.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500 mb-2">{challenge.description}</p>
              <Progress value={(challenge.currentProgress / challenge.target) * 100} className="mb-2" />
              <p className="text-sm font-medium">
                {challenge.currentProgress} de {challenge.target} {challenge.metricType}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => handleQuickProgress(challenge.id)}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Registrar Progresso
              </Button>
              <div className="mt-4">
                <TopBottomChart data={challenge.progressData} target={challenge.target} />
              </div>
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