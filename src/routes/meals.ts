import { create } from '@/controllers/meals/create';
import { FastifyInstance } from 'fastify';

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', create);
}
