import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { createUser } from './controllers/createUser';
import { getUsers } from './controllers/getUsers';
import { withdrawMoney } from './controllers/withdrawMoney';
import { depositMoney } from './controllers/depositMoney';
import { transferMoney } from './controllers/transferMoney';
import { login } from './controllers/login';

const fastify = Fastify();
fastify.register(fastifyCors);

fastify.get('/', (_, rep) => {
  rep.send({
    status: 'success',
  });
});

fastify.post('/create-user', createUser);
fastify.post('/login', login);
fastify.get('/users', getUsers);
fastify.put('/withdraw-money', withdrawMoney);
fastify.put('/deposit-money', depositMoney);
fastify.put('/transfer-money', transferMoney);

const main = async () => {
  await fastify.listen({
    port: 5000,
  });
};

main()
  .then(() => console.log('Server is running...'))
  .catch((er) => console.log(er));
