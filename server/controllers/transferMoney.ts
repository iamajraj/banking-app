import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import { users } from '../db/schema/users';

type BodyT = {
  code: string | null;
  transferId: string | number | null;
  amount: string | number | null;
};

export const transferMoney = async (req: FastifyRequest, rep: FastifyReply) => {
  let { code, amount, transferId } = req.body as BodyT;

  if (!code || !amount || !transferId)
    return rep.status(400).send({
      message: 'please provide the code, transferId and the amount',
    });

  amount = Number(amount);
  transferId = Number(transferId);

  const fromAccount = (
    await db.select().from(users).where(eq(users.secret_code, code))
  )[0];

  if (!fromAccount) {
    return rep.status(404).send({
      message: "sender account desn't exist",
    });
  }

  if (fromAccount.balance < amount)
    return rep.status(400).send({
      message: 'not enough balance',
    });

  const transferAccount = (
    await db
      .update(users)
      .set({
        balance: sql`balance + ${amount}`,
      })
      .where(eq(users.id, transferId))
      .returning()
  )[0];
  const senderAccount = (
    await db
      .update(users)
      .set({
        balance: sql`balance - ${amount}`,
      })
      .where(eq(users.secret_code, code))
      .returning()
  )[0];

  rep.status(200).send({
    senderAccount,
    transferAccount,
  });
};
