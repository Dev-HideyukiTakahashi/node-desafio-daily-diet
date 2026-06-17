import { z } from 'zod';

export const mealSchema = z.object({
  name: z
    .string({ error: 'O nome é obrigatório' })
    .nonempty({ error: 'O nome não pode estar vazio' }),
  description: z
    .string({ error: 'A descrição é obrigatória' })
    .nonempty({ error: 'A descrição não pode estar vazio' }),
  date: z.coerce.date({ error: 'Data inválida' }),
  within_the_diet: z.boolean({ error: 'Informe se está na dieta' }),
});

// partial: todos os campos opcionais para updates parciais
export const mealUpdateSchema = mealSchema.partial();
