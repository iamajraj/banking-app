import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db';
import { users } from '../db/schema/users';

export const getUsers = async (req: FastifyRequest, rep: FastifyReply) => {
  const allusers = await db
    .select({
      id: users.id,
      name: users.name,
    })
    .from(users);

  rep.status(200).send({
    users: allusers,
  });
};
