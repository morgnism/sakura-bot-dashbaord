import { PrismaClient } from '@prisma/client';

declare global {
  var __db__: PrismaClient;
}

let prisma: PrismaClient;

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient({
      log: [
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
      errorFormat: 'pretty',
    });
  }
  prisma = global.__db__;
  prisma.$on('warn' as never, (e) => {
    console.log(e);
  });

  prisma.$on('info' as never, (e) => {
    console.log(e);
  });

  prisma.$on('error' as never, (e) => {
    console.log(e);
  });
  prisma.$connect();
}

export default prisma;
