import { randomUUID } from 'crypto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { knexConfig as knex } from '@/database';
import { mealSchema } from '@/schemas/meal-schema';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const body = mealSchema.parse(request.body);

  let sessionId = request.cookies.sessionId;

  if (!sessionId) {
    sessionId = randomUUID();

    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true, // Impede que o JavaScript do frontend leia o cookie (segurança contra XSS)
    });
  }

  const [meal] = await knex('meals')
    .insert({
      id: randomUUID(),
      session_id: sessionId,
      ...body,
    })
    .returning('*');

  return reply.status(201).send({ meal });
}
