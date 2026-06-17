import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

export function errorHandler(error: Error, _request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    return reply.status(422).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    });
  }

  console.error(error);

  return reply.status(500).send({
    message: 'Internal server error',
  });
}
