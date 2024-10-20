import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ChallengeForm from './ChallengeForm';
import { fetchChallenges, addChallenge, updateProgress, deleteChallenge } from '../utils/api';
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

  const deleteChallengesMutation = useMutation({
    mutationFn: deleteChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      toast.success('Desafio excluído com sucesso!');
    },
  });

  const handleAddChallenge = (challenge: Omit<ChallengeWithProgress, 'id' | 'currentProgress' | 'progressData'>) => {
    addChallengeMutation.mutate(challenge);
  };

  const handleQuickProgress = (id: number) => {
    updateProgressMutation.mutate({ id, progress: 1 });
  };

  const handleDeleteChallenge = (id: number) => {
    deleteChallengesMutation.mutate(id);
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{challenge.name}</CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá permanentemente o desafio e todos os dados associados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteChallenge(challenge.id)}>
                      Sim, excluir desafio
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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