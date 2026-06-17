import { create } from '@/controllers/meals/create';
import { findMany } from '@/controllers/meals/find-many';
import { findOne } from '@/controllers/meals/find-one';
import { checkSessionId } from '@/middlewares/check-session-id';
import { FastifyInstance } from 'fastify';

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', create);
  app.get('/', { preHandler: [checkSessionId] }, findMany);
  app.get('/:id', { preHandler: [checkSessionId] }, findOne);
}
