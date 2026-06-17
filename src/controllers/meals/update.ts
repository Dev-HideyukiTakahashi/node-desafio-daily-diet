import { FastifyReply, FastifyRequest } from 'fastify';
import { knexConfig as knex } from '@/database';
import { z } from 'zod';
import { mealUpdateSchema } from '@/schemas/meal-schema';

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.uuid(),
  });

  const { id } = paramsSchema.parse(request.params);
  const { sessionId } = request.cookies;

  const body = mealUpdateSchema.parse(request.body);

  const meal = await knex('meals')
    .where({ session_id: sessionId, id })
    .update(body)
    .returning('*');

  if (!meal) return reply.status(404).send({ error: 'meal not found' });

  return { meal };
}
