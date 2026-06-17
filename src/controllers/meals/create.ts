import { z } from 'zod';
import { randomUUID } from 'crypto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { knexConfig as knex } from '@/database';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z
      .string({ error: 'O nome é obrigatório' })
      .nonempty({ error: 'O nome não pode estar vazio' }),
    description: z
      .string({ error: 'A descrição é obrigatória' })
      .nonempty({ error: 'A descrição não pode estar vazio' }),
    date: z.coerce.date({ error: 'Data inválida' }),
    within_the_diet: z.boolean({ error: 'Informe se está na dieta' }),
  });

  const body = bodySchema.parse(request.body);

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
