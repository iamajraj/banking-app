import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '.';

migrate(db, { migrationsFolder: 'migrations' })
  .then(() => {
    console.log('Migrations complete !');
    process.exit(0);
  })
  .catch((er) => {
    console.log('Migrations failed!', er);
    process.exit(1);
  });
