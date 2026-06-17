import { create } from '@/controllers/meals/create';
import { findMany } from '@/controllers/meals/find-many';
import { findOne } from '@/controllers/meals/find-one';
import { remove } from '@/controllers/meals/remove';
import { update } from '@/controllers/meals/update';
import { checkSessionId } from '@/middlewares/check-session-id';
import { FastifyInstance } from 'fastify';

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', create);
  app.get('/', { preHandler: [checkSessionId] }, findMany);
  app.get('/:id', { preHandler: [checkSessionId] }, findOne);
  app.delete('/:id', { preHandler: [checkSessionId] }, remove);
  app.put('/:id', { preHandler: [checkSessionId] }, update);
}
