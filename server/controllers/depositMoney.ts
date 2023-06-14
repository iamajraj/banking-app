import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import { users } from '../db/schema/users';

type BodyT = {
  code: string | null;
  amount: string | number | null;
};

export const depositMoney = async (req: FastifyRequest, rep: FastifyReply) => {
  let { code, amount } = req.body as BodyT;

  if (!code || !amount)
    return rep.status(400).send({
      message: 'please provide the code and the amount',
    });

  amount = Number(amount);

  const user = await db
    .update(users)
    .set({
      balance: sql`balance + ${amount}`,
    })
    .where(eq(users.secret_code, code))
    .returning();

  rep.status(200).send({
    user: user[0],
  });
};
