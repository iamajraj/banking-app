import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db';
import { User, users } from '../db/schema/users';
import { eq } from 'drizzle-orm';

export const getUsers = async (req: FastifyRequest, rep: FastifyReply) => {
  const { code } = req.query as { code: string };

  if (code) {
    const user: Omit<User, 'secret_code'> | null = (
      await db
        .select({
          id: users.id,
          name: users.name,
          balance: users.balance,
        })
        .from(users)
        .where(eq(users.secret_code, code))
    )[0];

    return rep.status(200).send({
      users: user,
    });
  } else {
    const allusers = await db
      .select({
        id: users.id,
        balance: users.balance,
        name: users.name,
      })
      .from(users);

    rep.status(200).send({
      users: allusers,
    });
  }
};
