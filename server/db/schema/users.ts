import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  balance: integer('balance').notNull().default(0),
  secret_code: text('secret_code').notNull(),
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;
