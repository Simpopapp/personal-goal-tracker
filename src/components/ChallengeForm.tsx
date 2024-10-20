import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Challenge {
  id: string;
  name: string;
  currentProgress: number;
  target: number;
  description?: string;
  metricType: "hours" | "times" | "days";
}

type ChallengeFormProps = {
  onSubmit: (data: Omit<Challenge, 'id' | 'currentProgress'>) => void;
  onCancel: () => void;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.',
  }),
  description: z.string().min(10, {
    message: 'A descrição deve ter pelo menos 10 caracteres.',
  }),
  metricType: z.enum(['hours', 'times', 'days']),
  target: z.number().min(1, {
    message: 'A meta deve ser pelo menos 1.',
  }),
});

const ChallengeForm: React.FC<ChallengeFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      metricType: 'times',
      target: 1,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Desafio</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Meditação Diária" {...field} />
              </FormControl>
              <FormDescription>
                Dê um nome curto e descritivo para o seu desafio.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Meditar por pelo menos 10 minutos diários" {...field} />
              </FormControl>
              <FormDescription>
                Descreva brevemente o seu desafio e o que você pretende alcançar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metricType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Métrica</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de métrica" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hours">Horas</SelectItem>
                  <SelectItem value="times">Vezes</SelectItem>
                  <SelectItem value="days">Dias</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Escolha como você quer medir o seu progresso.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
              </FormControl>
              <FormDescription>
                Defina a meta que você quer alcançar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Salvar Desafio</Button>
        </div>
      </form>
    </Form>
  );
};

export default ChallengeForm;