import { prisma } from '@/prisma';

import { auth } from '@/auth';

export async function GET() {
  const session = await auth();

  const userId = session?.user?.id;

  const account = await prisma.account.findFirst({
    where: {
      userId,
    },
  });

  const accessToken = account?.access_token;

  return new Response('Alive!');
}
