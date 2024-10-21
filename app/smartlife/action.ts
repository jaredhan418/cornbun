'use server';

import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { fetchCommandApi } from '../serviceUtil';

export async function unlockFrunk() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error('not login');

  const account = await prisma.account.findFirst({
    where: {
      userId,
    },
  });

  const accessToken = account?.access_token;

  if (!accessToken) {
    throw new Error('Not has token');
  }

  const vinInfo = await prisma.vininfo.findFirst({
    where: {
      userId,
    },
  });

  if (!vinInfo) throw new Error('can find bind vin');

  const searchParams = new URLSearchParams();
  searchParams.append('token', accessToken);
  searchParams.append('vin', vinInfo.vin);

  const res = await fetchCommandApi('openFrunk', { searchParams }).text();

  return new Response(res);
}
