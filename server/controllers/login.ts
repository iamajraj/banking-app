import { FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../db';
import { users } from '../db/schema/users';
import { eq } from 'drizzle-orm';

type Code = { code: string };

export const login = async (req: FastifyRequest, rep: FastifyReply) => {
  const body: Code | undefined = req.body as Code;

  let code = body.code;

  if (!code) {
    return rep.status(400).send({
      message: 'ok fine you tried to login',
    });
  }

  const user = (
    await db.select().from(users).where(eq(users.secret_code, code))
  )[0];

  if (!user)
    return rep.status(400).send({
      message: 'sorry but you may not come to the existence yet',
    });

  rep.status(200).send({
    code: user.secret_code,
  });
};
