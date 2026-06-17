import { fastify } from 'fastify';
import cookie from '@fastify/cookie';
import { mealsRoutes } from './routes/meals';
import { errorHandler } from './middlewares/error-handler';

export const app = fastify();

app.setErrorHandler(errorHandler);
app.register(cookie);

app.register(mealsRoutes, {
  prefix: 'meals',
});
