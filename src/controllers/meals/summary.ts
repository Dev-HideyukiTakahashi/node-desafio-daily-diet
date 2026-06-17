import { FastifyRequest } from 'fastify';
import { knexConfig as knex } from '@/database';

export async function summary(request: FastifyRequest) {
  const { sessionId } = request.cookies;

  // A ordenação é crucial para o cálculo correto da "sequência" (streak)
  const meals = await knex('meals')
    .where({ session_id: sessionId })
    .orderBy('date', 'asc')
    .select();

  // Variável auxiliar de controle de escopo para rastrear a sequência atual
  let currentSequence = 0;

  // O reduce transforma a lista de refeições em um único objeto de resumo (summary)
  const summary = meals.reduce(
    (acc, meal) => {
      // 1. Contador de volume total
      acc.total++;

      if (meal.within_the_diet) {
        // 2. Refeições na dieta: incrementa contador e sequência atual
        acc.totalOnDiet++;
        currentSequence++;

        // Verifica se a sequência atual bateu o recorde histórico
        if (currentSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = currentSequence;
        }
      } else {
        // 3. Refeição fora da dieta: incrementa contador de erro e reseta sequência
        acc.totalOffDiet++;
        currentSequence = 0;
      }

      return acc;
    },
    // Estado inicial do acumulador (cofrinho de dados)
    {
      total: 0,
      totalOnDiet: 0,
      totalOffDiet: 0,
      bestOnDietSequence: 0,
    },
  );

  return { summary };
}
