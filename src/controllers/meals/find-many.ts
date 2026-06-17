import { FastifyRequest } from 'fastify';
import { knexConfig as knex } from '@/database';

export async function findMany(request: FastifyRequest) {
  const sessionId = request.cookies.sessionId;

  const meals = await knex('meals')
    .where('session_id', sessionId)
    .orderBy('date', 'desc')
    .select();

  return { meals };
}
