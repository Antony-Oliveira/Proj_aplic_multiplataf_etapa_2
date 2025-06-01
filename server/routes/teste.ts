import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    // const a = await setUserSession(event, {
    //     // User data
    //     user: {
    //       login: 'atinux'
    //     },
    //     secure: {
    //       apiToken: '1234567890',
          
    //     },
    //     loggedInAt: new Date()
    //   })

    //   const session = await requireUserSession(event)
    //   return {a, session}

});
