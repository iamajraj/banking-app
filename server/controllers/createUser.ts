import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db';
import { users } from '../db/schema/users';
import { randomUUID } from 'crypto';

type BodyT = {
  name: string | null;
};

export const createUser = async (req: FastifyRequest, rep: FastifyReply) => {
  const body: BodyT | undefined = req.body as BodyT;

  if (!body.name)
    return rep.status(400).send({
      message: 'Name is required',
    });

  const { name } = body;

  const code = randomUUID();

  await db
    .insert(users)
    .values({
      name: name,
      balance: 0,
      secret_code: code,
    })
    .returning();

  rep.status(201).send({
    code: code,
  });
};
