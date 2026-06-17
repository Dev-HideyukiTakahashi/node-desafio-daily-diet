import { FastifyReply, FastifyRequest } from 'fastify';
import { knexConfig as knex } from '@/database';
import { z } from 'zod';

export async function findOne(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.uuid(),
  });

  const { id } = paramsSchema.parse(request.params);
  const { sessionId } = request.cookies;

  const meal = await knex('meals').where({ session_id: sessionId, id }).first();

  if (!meal) return reply.status(404).send({ error: 'meal not found' });

  return { meal };
}
